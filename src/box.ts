/**
 * A store for immutable data.
 */
export class Box<T> {
    #value: T;
    readonly #listeners = new Set<(element: T) => void>();

    constructor(element: T) {
        this.#value = element;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        if(this.#value === value) return;
        this.#value = value;
        this.#listeners.forEach(listener => listener(value));
    }

    onChange(listener: (element: T) => void): Unlistener {
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    }

    derive<U>(transform: (element: T) => U): Box<U> {
        const box = new Box(transform(this.#value));
        this.onChange(value => box.value = transform(value));
        return box;
    }
}

/**
 * `BoxArray` is a signal based array designed for immutable elements.
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
    readonly #onRemoveListeners = new Set<(element: T, index: number) => void>();
    readonly #onInsertListeners = new Set<(element: T, index: number) => void>();
    readonly #onSwapListeners = new Set<(a: T, b: T, aIndex: number, bIndex: number) => void>();

    constructor(lengthOrArray?: number | T[]) {
        this.#array = lengthOrArray
            ? (Array.isArray(lengthOrArray)
                ? lengthOrArray
                : new Array<T>(lengthOrArray))
            : new Array<T>();
    }

    onRemove(listener: (element: T, index: number) => void): Unlistener {
        this.#onRemoveListeners.add(listener);
        return () => this.#onRemoveListeners.delete(listener);
    }

    onInsert(listener: (element: T, index: number) => void): Unlistener {
        this.#onInsertListeners.add(listener);
        return () => this.#onInsertListeners.delete(listener);
    }

    onSwap(listener: (a: T, b: T, aIndex: number, bIndex: number) => void): Unlistener {
        this.#onSwapListeners.add(listener);
        return () => this.#onSwapListeners.delete(listener);
    }

    [Symbol.iterator]() {
        return this.#array[Symbol.iterator]();
    }

    indexOf(element: T): number {
        return this.#array.indexOf(element);
    }

    swapIndices(indexA: number, indexB: number) {
        if(indexA < -this.#array.length || indexA >= this.#array.length)
            throw new RangeError(`Encountered indexA=${indexA} out of bounds -${this.#array.length} and ${this.#array.length - 1} while swapping indexA=${indexA} and indexB=${indexB} on \`BoxArray\` with length ${this.#array.length}`);
        if(indexA < 0) indexA = indexA + this.#array.length;

        if(indexB < -this.#array.length || indexB >= this.#array.length)
            throw new RangeError(`Encountered indexB=${indexA} out of bounds -${this.#array.length} and ${this.#array.length - 1} while swapping indexA=${indexA} and indexB=${indexB} on \`BoxArray\` with length ${this.#array.length}`);
        if(indexB < 0) indexB = indexB + this.#array.length;

        const a = this.#array[indexA]!;
        const b = this.#array[indexB]!;
        this.#array[indexA] = b;
        this.#array[indexB] = a;

        this.#onSwapListeners.forEach(listener => listener(a, b, indexA, indexB));
    }

    /**
     * Swaps elements a and b. If one element does not exist, nothing will be swapped.
     *
     * @param a
     * @param b
     */
    swap(a: T, b: T) {
        const indexA = this.#array.indexOf(a);
        if(indexA === -1) return;
        const indexB = this.#array.indexOf(b);
        if(indexB === -1) return;

        this.#array[indexA] = b;
        this.#array[indexB] = a;

        this.#onSwapListeners.forEach(listener => listener(a, b, indexA, indexB));
    }

    /**
     * Removes the item at the specified index.
     * @param index
     */
    removeAt(index: number) {
        if(index < -this.#array.length) return;
        if(index < 0) index = index + this.#array.length;
        else if(index >= this.#array.length) return;
        const [element] = this.#array.splice(index, 1);
        this.#onRemoveListeners.forEach(listener => listener(element!, index));
    }

    remove(element: T) {
        const index = this.#array.indexOf(element);
        if(index === -1) return;
        this.#array.splice(index, 1);
        this.#onRemoveListeners.forEach(listener => listener(element, index));
    }

    at(index: number) {
        return this.#array.at(index);
    }

    map<U>(mapper: (element: T, index: number) => U): U[] {
        return this.#array.map(mapper);
    }

    get length() {
        return this.#array.length;
    }

    add(element: T) {
        const oldLength = this.#array.length;
        this.#array.push(element);
        this.#onInsertListeners.forEach(listener => listener(element, oldLength));
    }

    /**
     * Inserts the element at the index, so that the resulting index matches the specified index, effectively shifting all elements on the right by one index.
     *
     * @param element The element to insert
     *
     * @param index Specific ranges of indices are remapped as following:
     *
     * - index < -length: index = 0
     * - index < 0: index = index + length
     * - index > length: index = length
     *
     * The normalized index is then passed to the listeners (after insertion)
     */
    insert(index: number, element: T) {
        if(index < -this.#array.length) index = 0;
        else if(index < 0) index = index + this.#array.length;
        else if(index > this.#array.length) index = this.#array.length;

        this.#array.splice(index, 0, element);
        this.#onInsertListeners.forEach(listener => listener(element, index));
    }

    /**
     * Sets the index to the element, effectively replacing the previous element.
     */
    set(index: number, element: T) {
        if(index < -this.#array.length || index >= this.#array.length)
            throw new RangeError(`Encountered index=${index} out of bounds -${this.#array.length} and ${this.#array.length - 1} while setting element=${element} on \`BoxArray\` with length ${this.#array.length}`);
        if(index < 0) index = index + this.#array.length;

        let oldElement = this.#array[index];
        if(oldElement === element) return;
        this.#array[index] = element;

        this.#onRemoveListeners.forEach(listener => listener(oldElement!, index));
        this.#onInsertListeners.forEach(listener => listener(element, index));
    }

    join(separator: string) {
        return this.#array.join(separator);
    }

    reduce<U>(reducer: (accumulator: U, element: T, index: number) => U, initialValue: U): U {
        return this.#array.reduce(reducer, initialValue);
    }

    toString() {
        return `[${this.join(",")}]`;
    }
}

/**
 * Call this "unlistener" function to remove the listener you just attached.
 */
export type Unlistener = () => void;

export class BoxSet<T> {
    readonly #set: Set<T>;
    readonly #onAddListeners = new Set<(value: T) => void>();
    readonly #onDeleteListeners = new Set<(value: T) => void>();

    constructor(initialSet?: Set<T>) {
        this.#set = initialSet ? initialSet : new Set();
    }

    add(value: T) {
        this.#set.add(value);
        this.#onAddListeners.forEach(listener => listener(value));
    }

    clear() {
        this.#set.clear();
        this.#set.forEach(value => this.#onDeleteListeners.forEach(listener => listener(value)));
    }

    delete(value: T) {
        this.#set.delete(value);
        this.#onDeleteListeners.forEach(listener => listener(value));
    }

    [Symbol.iterator]() {
        return this.#set[Symbol.iterator]();
    }

    forEach(callback: (value: T) => void) {
        this.#set.forEach(callback);
    }

    has(value: T) {
        return this.#set.has(value);
    }
}