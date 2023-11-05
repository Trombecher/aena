/**
 * A store for immutable data.
 */
export class Box<T> {
    #value: T;
    readonly #listeners = new Set<(value: T) => void>();

    constructor(value: T) {
        this.#value = value;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
        this.#listeners.forEach(listener => listener(value));
    }

    onChange(listener: (value: T) => void): Unlistener {
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    }

    derive<U>(transform: (value: T) => U): Box<U> {
        const box = new Box(transform(this.#value));
        this.onChange(value => box.value = transform(value));
        return box;
    }
}

export class BoxArray<T> {
    readonly #array = new Array<T>();
    readonly #onRemoveListeners = new Set<(value: T, index: number) => void>();
    readonly #onInsertListeners = new Set<(value: T, index: number) => void>();
    readonly #onSwapListeners = new Set<(a: T, aIndex: number, b: T, bIndex: number) => void>();

    onRemove(listener: (value: T, index: number) => void): Unlistener {
        this.#onRemoveListeners.add(listener);
        return () => this.#onRemoveListeners.delete(listener);
    }

    onInsert(listener: (value: T, index: number) => void): Unlistener {
        this.#onInsertListeners.add(listener);
        return () => this.#onInsertListeners.delete(listener);
    }

    onSwap(listener: (a: T, aIndex: number, b: T, bIndex: number) => void): Unlistener {
        this.#onSwapListeners.add(listener);
        return () => this.#onSwapListeners.delete(listener);
    }

    [Symbol.iterator] = this.#array[Symbol.iterator];

    indexOf(value: T): number {
        return this.#array.indexOf(value);
    }

    swapIndices(a: number, b: number) {
        if(a < -this.#array.length) return;
        if(a < 0) a = a + this.#array.length;
        else if(a >= this.#array.length) return;
        if(b < -this.#array.length) return;
        if(b < 0) b = b + this.#array.length;
        else if(b >= this.#array.length) return;

        const valueA = this.#array[a]!;
        const valueB = this.#array[b]!;
        this.#array[a] = valueB;
        this.#array[b] = valueA;

        this.#onSwapListeners.forEach(listener => listener(valueA, a, valueB, b));
    }

    swap(a: T, b: T) {
        const indexA = this.#array.indexOf(a);
        if(indexA === -1) return;
        const indexB = this.#array.indexOf(a);
        if(indexB === -1) return;

        this.#array[indexA] = b;
        this.#array[indexB] = a;

        this.#onSwapListeners.forEach(listener => listener(a, indexA, b, indexB));
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

    at = this.#array.at;

    map<U>(mapper: (value: T, index: number) => U): U[] {
        return this.#array.map(mapper);
    }

    get length() {
        return this.#array.length;
    }

    add(value: T) {
        this.#array.push(value);
        this.#onInsertListeners.forEach(listener => listener(value, this.#array.length));
    }

    insert(value: T, index: number) {
        if(index < -this.#array.length) return;
        if(index < 0) index = index + this.#array.length;
        else if(index >= this.#array.length) return;
        this.#array.splice(index, 0, value);
        this.#onInsertListeners.forEach(listener => listener(value, index));
    }

    set(value: T, index: number) {
        if(index < -this.#array.length) return;
        if(index < 0) index = index + this.#array.length;
        else if(index >= this.#array.length) return;
        let [oldValue] = this.#array.splice(index, 1, value);
        this.#onRemoveListeners.forEach(listener => listener(oldValue!, index));
        this.#onInsertListeners.forEach(listener => listener(value, index));
    }
}

/**
 * Call this "unlistener" function to remove the listener you just attached.
 */
export type Unlistener = () => void;