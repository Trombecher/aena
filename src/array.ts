import {addListenerRecursively, DeepListener, ListenDeep, Listener, removeListenerRecursively} from "./index";
import {addListenersDeep, removeListenersDeep} from "./internal";

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
export class BoxArray<T> implements ListenDeep<Change<T>> {
    readonly #array;

    /**
     * Creates a {@link BoxArray} from the given `length` and a function which is generating the elements.
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

        this.#notify({
            action: Action.Swap,
            a,
            b,
            indexA,
            indexB
        });
    }

    /**
     * Removes the value at the specified index.
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

        removeListenersDeep(this.#deepListeners, value);

        this.#notify({
            action: Action.Delete,
            value,
            index
        });
    }

    at(index: number) {
        return this.#array.at(index);
    }

    get length() {
        return this.#array.length;
    }

    /**
     * Appends a new value to the end of this {@link BoxArray}.
     */
    append(value: T) {
        addListenersDeep(this.#deepListeners, value);

        this.#notify({
            action: Action.Insert,
            value,
            index: this.#array.push(value) - 1
        });
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

        addListenersDeep(this.#deepListeners, value);

        this.#notify({
            action: Action.Insert,
            value,
            index
        });

        return IndexInfoCode.Success;
    }

    /**
     * Prepends the `value` to the start of this {@link BoxArray}
     */
    prepend(value: T) {
        this.#array.unshift(value);

        // Ensure that the value has all deep listeners.
        addListenersDeep(this.#deepListeners, value);

        this.#notify({
            action: Action.Insert,
            value,
            index: 0
        });
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

        removeListenersDeep(this.#deepListeners, oldValue);

        // Simulate a remove change.
        this.#notify({
            action: Action.Delete,
            value: oldValue,
            index
        });

        addListenersDeep(this.#deepListeners, value);

        // Simulate an insert change.
        this.#notify({
            action: Action.Insert,
            value,
            index
        });

        return SetInfoCode.Success;
    }

    /**
     * Clears this {@link BoxArray} by sequentially deleting each value, starting at the end.
     */
    clear() {
        let i = this.#array.length;
        while(i--) this.#deleteAtUnchecked(i);
    }

    /**
     * Converts all values of this {@link BoxArray} to strings and joins them via an optional separator.
     */
    join(separator?: string) {
        return this.#array.join(separator);
    }

    /**
     * @returns `true` if every value in this {@link BoxArray} matches the given predicate; otherwise `false`.
     */
    every(predicate: (value: T) => boolean) {
        return this.#array.every(predicate);
    }

    /**
     * Reduces this {@link BoxArray} to a `U`.
     *
     * Can be used to implement mapping behaviour.
     */
    reduce<U>(initialValue: U, reducer: (previousValue: U, value: T, index: number) => U): U {
        return this.#array.reduce(reducer, initialValue);
    }

    /**
     * Maps this {@link BoxArray} to `U[]`.
     *
     * Similar mapping targets can be emulated using {@link BoxArray.reduce}
     * but this function exists because it can be forwarded to a native {@link Array.map} call for speed.
     */
    map<U>(mapper: (value: T) => U): U[] {
        return this.#array.map(mapper);
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

    toArray(): readonly T[] {
        return this.#array;
    }

    // The following code may repeat across files but there is no other option.
    readonly #listeners = new Set<Listener<Change<T>>>();
    readonly #deepListeners = new Set<DeepListener>();

    #notify(change: Change<T>) {
        this.#listeners.forEach(listener => listener(change));
        this.#deepListeners.forEach(listener => listener());
    }

    addDeepListener(listener: DeepListener): DeepListener {
        this.#deepListeners.add(listener);
        this.forEach(value => addListenerRecursively(value, listener));
        return listener;
    }

    removeDeepListener(listener: DeepListener) {
        this.#deepListeners.delete(listener);
        this.forEach(value => removeListenerRecursively(value, listener));
    }

    addListener(listener: Listener<Change<T>>) {
        this.#listeners.add(listener);
        return listener;
    }

    removeListener(listener: Listener<Change<T>>) {
        this.#listeners.delete(listener);
    }
}