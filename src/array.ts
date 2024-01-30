import {addListenerRecursive, DeepListener, ListenDeep, removeListenerRecursive} from "./index";

export const enum SwapIndicesInfoCode {
    Success,
    IndexAOutOfLowerBound,
    IndexAOutOfUpperBound,
    IndexBOutOfLowerBound,
    IndexBOutOfUpperBound,
    IndicesAreEqual
}

export const enum IndexInfoCode {
    Success,
    IndexTooSmall = -1,
    IndexTooBig = -2
}

export const enum SetInfoCode {
    Success = IndexInfoCode.Success,
    IndexTooSmall = IndexInfoCode.IndexTooSmall,
    IndexTooBig = IndexInfoCode.IndexTooBig,
    SameValue = -3
}

export const enum SwapInfoCode {
    Success,
    ANotFound,
    BNotFound,
    IndicesAreEqual
}

export const enum Action {
    Insert,
    Swap,
    Delete
}

export type Change<T> = {
    action: Action.Insert,
    value: T,
    index: number
} | {
    action: Action.Swap,
    a: T,
    b: T,
    indexA: number,
    indexB: number
} | {
    action: Action.Delete,
    value: T,
    index: number
};

export type Listener<T> = (change: Change<T>) => void;

/**
 * `BoxArray` is a signal based array designed for immutable values.
 *
 * # Example
 *
 * ```ts
 * const numbers = new BoxArray<number>();
 *
 * const strings = new BoxArray<string>(10);
 *
 * const booleans = new BoxArray([true, false]);
 * ```
 */
export class BoxArray<T> implements ListenDeep<Listener<T>> {
    readonly #array;

    /**
     * Creates a `BoxArray` from the given `length` and a function, generating the elements.
     */
    static from<T>(length: number, generate: (index: number) => T): BoxArray<T> {
        const array = new Array<T>(length);
        while(length--) array[length] = generate(length);
        return new BoxArray(array);
    }

    constructor(lengthOrArray?: number | T[]) {
        this.#array = lengthOrArray
            ? (Array.isArray(lengthOrArray)
                ? lengthOrArray
                : new Array<T>(lengthOrArray))
            : new Array<T>();
    }

    [Symbol.iterator]() {
        return this.#array[Symbol.iterator]();
    }

    forEach(handler: (value: T, index: number) => void) {
        this.#array.forEach(handler);
    }

    /**
     * Returns the index of the provided `value` and `-1` if the value was not found.
     * @param value
     */
    indexOf(value: T): number {
        return this.#array.indexOf(value);
    }

    swapIndices(indexA: number, indexB: number): SwapIndicesInfoCode {
        if(indexA < -this.#array.length)
            return SwapIndicesInfoCode.IndexAOutOfLowerBound;
        else if(indexA >= this.#array.length)
            return SwapIndicesInfoCode.IndexAOutOfUpperBound;

        if(indexA < 0) indexA = indexA + this.#array.length;

        if(indexB < -this.#array.length)
            return SwapIndicesInfoCode.IndexBOutOfLowerBound;
        else if(indexB >= this.#array.length)
            return SwapIndicesInfoCode.IndexBOutOfUpperBound;

        if(indexB < 0) indexB = indexB + this.#array.length;

        if(indexA === indexB)
            return SwapIndicesInfoCode.IndicesAreEqual;

        this.#swapIndicesUnchecked(indexA, indexB);
        return SwapIndicesInfoCode.Success;
    }

    /**
     * Swaps values a and b. If one value does not exist, nothing will be swapped.
     */
    swap(a: T, b: T): SwapInfoCode {
        if(a === b) return SwapInfoCode.IndicesAreEqual;

        const indexA = this.#array.indexOf(a);
        if(indexA === -1) return SwapInfoCode.ANotFound;
        const indexB = this.#array.indexOf(b);
        if(indexB === -1) return SwapInfoCode.BNotFound;

        this.#swapIndicesUnchecked(indexA, indexB);
        return SwapInfoCode.Success;
    }

    #swapIndicesUnchecked(indexA: number, indexB: number) {
        const a = this.#array[indexA]!;
        const b = this.#array[indexB]!;
        this.#array[indexA] = b;
        this.#array[indexB] = a;

        const change = {action: Action.Swap, a, b, indexA, indexB} satisfies Change<T>;
        this.#listeners.forEach(listener => listener(change));
        this.#deepListeners.forEach(listener => listener());
    }

    /**
     * Removes the item at the specified index.
     * @param index
     */
    deleteAt(index: number): IndexInfoCode {
        index = this.#normalizeIndex(index);
        if(index < 0) return index;

        this.#deleteAtUnchecked(index);
        return IndexInfoCode.Success;
    }

    /**
     * Removes the value.
     *
     * @returns `true` if the value was successfully removed, `false` otherwise.
     */
    delete(value: T): boolean {
        const index = this.#array.indexOf(value);
        if(index === -1) return false;
        this.#deleteAtUnchecked(index);
        return true;
    }

    #deleteAtUnchecked(index: number) {
        const value = this.#array.splice(index, 1)[0]!;

        const change = {
            action: Action.Delete,
            value, index
        } satisfies Change<T>;
        this.#listeners.forEach(listener => listener(change));
        this.#deepListeners.forEach(listener => listener());
    }

    at(index: number) {
        return this.#array.at(index);
    }

    map<U>(mapper: (value: T, index: number) => U): U[] {
        return this.#array.map(mapper);
    }

    get length() {
        return this.#array.length;
    }

    add(value: T) {
        const change = {
            action: Action.Insert,
            value,
            index: this.#array.length
        } satisfies Change<T>;

        this.#array.push(value);

        this.#listeners.forEach(listener => listener(change));
        this.#deepListeners.forEach(listener => listener());
    }

    /**
     * Inserts the value at the index, so that the resulting index matches the specified index, effectively shifting all elements on the right by one index.
     *
     * @param value The value to insert
     *
     * @param index Specific ranges of indices are remapped as following:
     *
     * - index < -length: index = 0
     * - index < 0: index = index + length
     * - index > length: index = length
     *
     * The normalized index is then passed to the listeners (after insertion)
     */
    insert(index: number, value: T): IndexInfoCode {
        // We cannot use `#normalizeIndex(...)` because `index == length` is also valid.
        if(index < -this.#array.length) return IndexInfoCode.IndexTooSmall;
        if(index < 0) index = index + this.#array.length;
        else if(index > this.#array.length) return IndexInfoCode.IndexTooBig;

        this.#array.splice(index, 0, value);

        const change = {action: Action.Insert, value, index} satisfies Change<T>;
        this.#listeners.forEach(listener => listener(change));
        this.#deepListeners.forEach(listener => listener());
        return IndexInfoCode.Success;
    }

    /**
     * Sets the index to the value, effectively replacing the previous value.
     */
    set(index: number, value: T): SetInfoCode {
        index = this.#normalizeIndex(index);
        if(index < 0) return index;

        const oldValue = this.#array[index]!;
        if(oldValue === value) return SetInfoCode.SameValue;
        this.#array[index] = value;

        // Simulate a remove change.
        const removeChange = {
            action: Action.Delete,
            value: oldValue,
            index
        } satisfies Change<T>;
        this.#listeners.forEach(listener => listener(removeChange));
        this.#deepListeners.forEach(listener => listener());

        // Simulate an insert change.
        const insertChange = {
            action: Action.Insert,
            value,
            index
        } satisfies Change<T>;
        this.#listeners.forEach(listener => listener(insertChange));
        this.#deepListeners.forEach(listener => listener());

        return SetInfoCode.Success;
    }

    join(separator: string) {
        return this.#array.join(separator);
    }

    reduce<U>(reducer: (accumulator: U, value: T, index: number) => U, initialValue: U): U {
        return this.#array.reduce(reducer, initialValue);
    }

    /**
     * @returns An info code less than zero or `0 <= index < length`
     * @private
     */
    #normalizeIndex(index: number): IndexInfoCode {
        if(index < -this.#array.length) return IndexInfoCode.IndexTooSmall;
        if(index < 0) index = index + this.#array.length;
        else if(index >= this.#array.length) return IndexInfoCode.IndexTooBig;
        return index;
    }

    toString() {
        return `[${this.join(",")}]`;
    }

    // The following code may repeat across files.
    readonly #listeners = new Set<Listener<T>>();
    readonly #deepListeners = new Set<DeepListener>();

    addDeepListener(listener: DeepListener): DeepListener {
        this.#deepListeners.add(listener);
        this.forEach(value => addListenerRecursive(value, listener));
        return listener;
    }

    removeDeepListener(listener: DeepListener) {
        this.#deepListeners.delete(listener);
        this.forEach(value => removeListenerRecursive(value, listener));
    }

    addListener(listener: Listener<T>) {
        this.#listeners.add(listener);
        return listener;
    }

    removeListener(listener: Listener<T>) {
        this.#listeners.delete(listener);
    }
}