import {Unlistener} from "./index";

export type OnInsertListener<T> = (value: T, index: number) => void;
export type OnRemoveListener<T> = (value: T, index: number) => void;
export type OnSwapListener<T> = (a: T, b: T, indexA: number, indexB: number) => void;

export enum SwapIndicesInfoCode {
    Success,
    IndexAOutOfLowerBound,
    IndexAOutOfUpperBound,
    IndexBOutOfLowerBound,
    IndexBOutOfUpperBound,
    IndicesAreEqual
}

export enum SwapInfoCode {
    Success,
    ANotFound,
    BNotFound
}

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
export class BoxArray<T> {
    readonly #array;
    readonly #onInsertListeners = new Set<OnInsertListener<T>>();
    readonly #onSwapListeners = new Set<OnSwapListener<T>>();
    readonly #onRemoveListeners = new Set<OnRemoveListener<T>>();

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

    onInsert(listener: OnInsertListener<T>): Unlistener {
        this.#onInsertListeners.add(listener);
        return () => this.#onInsertListeners.delete(listener);
    }

    onSwap(listener: OnSwapListener<T>): Unlistener {
        this.#onSwapListeners.add(listener);
        return () => this.#onSwapListeners.delete(listener);
    }

    onRemove(listener: OnRemoveListener<T>): Unlistener {
        this.#onRemoveListeners.add(listener);
        return () => this.#onRemoveListeners.delete(listener);
    }

    [Symbol.iterator]() {
        return this.#array[Symbol.iterator]();
    }

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

        const a = this.#array[indexA]!;
        const b = this.#array[indexB]!;
        this.#array[indexA] = b;
        this.#array[indexB] = a;

        this.#onSwapListeners.forEach(listener => listener(a, b, indexA, indexB));
        return SwapIndicesInfoCode.Success;
    }

    /**
     * Swaps elements a and b. If one value does not exist, nothing will be swapped.
     *
     * @param a
     * @param b
     */
    swap(a: T, b: T): SwapInfoCode {
        const indexA = this.#array.indexOf(a);
        if(indexA === -1) return SwapInfoCode.ANotFound;
        const indexB = this.#array.indexOf(b);
        if(indexB === -1) return SwapInfoCode.BNotFound;

        this.#array[indexA] = b;
        this.#array[indexB] = a;

        this.#onSwapListeners.forEach(listener => listener(a, b, indexA, indexB));
        return SwapInfoCode.Success;
    }

    /**
     * Removes the item at the specified index.
     * @param index
     */
    removeAt(index: number) {
        if(index < -this.#array.length) return;
        if(index < 0) index = index + this.#array.length;
        else if(index >= this.#array.length) return;
        const [value] = this.#array.splice(index, 1);
        this.#onRemoveListeners.forEach(listener => listener(value!, index));
    }

    remove(value: T) {
        const index = this.#array.indexOf(value);
        if(index === -1) return;
        this.#array.splice(index, 1);
        this.#onRemoveListeners.forEach(listener => listener(value, index));
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
        const oldLength = this.#array.length;
        this.#array.push(value);
        this.#onInsertListeners.forEach(listener => listener(value, oldLength));
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
    insert(index: number, value: T) {
        if(index < -this.#array.length) index = 0;
        else if(index < 0) index = index + this.#array.length;
        else if(index > this.#array.length) index = this.#array.length;

        this.#array.splice(index, 0, value);
        this.#onInsertListeners.forEach(listener => listener(value, index));
    }

    /**
     * Sets the index to the value, effectively replacing the previous value.
     */
    set(index: number, value: T) {
        if(index < -this.#array.length || index >= this.#array.length)
            throw new RangeError(`Encountered index=${index} out of bounds -${this.#array.length} and ${this.#array.length - 1} while setting value=${value} on \`BoxArray\` with length ${this.#array.length}`);
        if(index < 0) index = index + this.#array.length;

        let oldElement = this.#array[index];
        if(oldElement === value) return;
        this.#array[index] = value;

        this.#onRemoveListeners.forEach(listener => listener(oldElement!, index));
        this.#onInsertListeners.forEach(listener => listener(value, index));
    }

    join(separator: string) {
        return this.#array.join(separator);
    }

    reduce<U>(reducer: (accumulator: U, value: T, index: number) => U, initialValue: U): U {
        return this.#array.reduce(reducer, initialValue);
    }

    toString() {
        return `[${this.join(",")}]`;
    }
}