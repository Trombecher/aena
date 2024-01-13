/**
 * A store for immutable data.
 *
 * # Example
 *
 * ```ts
 * const box = new Box(10);
 * box.onChange(value => console.log(value));
 * box.value = 10; // Logs `10`
 * ```
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

    /**
     * Derives a new `Box` from the current one.
     *
     * # Example
     *
     * ```ts
     * const count = new Box(10);
     * const squared = count.derive(count => count * count);
     * ```
     *
     * Whenever `count` gets updated, `square` gets updated with the square.
     */
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

/**
 * A set store for immutable data.
 *
 * It contains three actions to modify the entries: `add`, `replace` and `delete`.
 * You can listen to each event.
 */
export class BoxSet<T> extends Set<T> {
    readonly #onAddListeners = new Set<(value: T) => void>();
    readonly #onDeleteListeners = new Set<(value: T) => void>();
    readonly #onReplaceListeners = new Set<(newValue: T, oldValue: T) => void>();

    override toString() {
        let s = "";
        this.forEach(value => s += "," + value);
        return `{${s.substring(1)}}`;
    }

    onAdd(listener: (value: T) => void): Unlistener {
        this.#onAddListeners.add(listener);
        return () => this.#onAddListeners.delete(listener);
    }

    onDelete(listener: (value: T) => void): Unlistener {
        this.#onDeleteListeners.add(listener);
        return () => this.#onDeleteListeners.delete(listener);
    }

    onReplace(listener: (oldValue: T, newValue: T) => void): Unlistener {
        this.#onReplaceListeners.add(listener);
        return () => this.#onReplaceListeners.delete(listener);
    }

    /**
     * Replaces the old value with a new one and calls the `onReplace` listeners.
     * If the set does not contain the old value, it cannot be removed and the function does nothing.
     *
     * Therefore, this function guarantees `onReplace` listeners an existent old value but not a previously non-existent new value.
     */
    replace(oldValue: T, newValue: T): this {
        if(super.delete(oldValue)) {
            super.add(newValue);
            this.#onReplaceListeners.forEach(listener => listener(oldValue, newValue));
        }
        return this;
    }

    override add(value: T): this {
        if(!this.has(value)) {
            super.add(value);
            this.#onAddListeners.forEach(listener => listener(value));
        }
        return this;
    }

    override clear() {
        this.forEach(value => this.#onDeleteListeners.forEach(listener => listener(value)));
        super.clear();
    }

    override delete(value: T) {
        if(super.delete(value)) {
            this.#onDeleteListeners.forEach(listener => listener(value));
            return true;
        }
        return false;
    }

    deleteIf(predicate: (value: T) => boolean) {
        this.forEach(value => {
            if(predicate(value))
                this.delete(value);
        });
    }

    map<U>(mapper: (value: T) => U): U[] {
        const array = new Array<U>(this.size);
        let i = 0;
        this.forEach(value => {
            array[i] = mapper(value);
            i++;
        });
        return array;
    }

    deriveBoxMap<U>(mapper: (value: T) => U) {
        const map = new BoxMap<T, U>();
        this.forEach(value => map.set(value, mapper(value)));

        this.onAdd(value => map.set(value, mapper(value)));
        this.onDelete(value => map.delete(value));
        this.onReplace((oldValue, newValue) => {
            map.delete(oldValue);
            if(!map.has(newValue))
                map.set(newValue, mapper(newValue));
        });

        return map;
    }
}

export class BoxMap<K, V> extends Map<K, V> {
    readonly #onSetListeners = new Set<(key: K, value: V) => void>();
    readonly #onDeleteListeners = new Set<(key: K, value: V) => void>();

    onSet(listener: (key: K, value: V) => void): Unlistener {
        this.#onSetListeners.add(listener);
        return () => this.#onSetListeners.delete(listener);
    }

    onDelete(listener: (key: K, value: V) => void): Unlistener {
        this.#onDeleteListeners.add(listener);
        return () => this.#onDeleteListeners.delete(listener);
    }

    override clear() {
        const entries = super.entries();
        super.clear();

        for(const [key, value] of entries)
            this.#onDeleteListeners.forEach(listener =>
                listener(key, value));
    }

    override delete(key: K): boolean {
        const value = super.get(key);
        if(!super.delete(key)) return false;
        this.#onDeleteListeners.forEach(listener =>
            listener(key, value!));
        return true;
    }

    override set(key: K, value: V): this {
        if(!this.has(key)) {
            super.set(key, value);
            this.#onSetListeners.forEach(listener =>
                listener(key, value));
        }
        return this;
    }

    override toString() {
        let s = "";
        this.forEach((v, k) => s += `,${k}:${v}`);
        return `{${s.substring(1)}}`;
    }
}

/**
 * Derives a single `Box` from multiple `Box`es (dependencies).
 * Whenever one dependency changes, the resulting `Box` will change to the value generated by the reducer.
 *
 * This function supports a maximum of 26 dependencies for typing (it is very unlikely to have more than 26 different types at compile-time)
 * but - ignoring typing - you can pass a variable length array of dependencies into this function.
 */
export function reduce<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $>(
    dependencies: [
        Box<A>, Box<B>, Box<C>?, Box<D>?, Box<E>?, Box<F>?, Box<G>?, Box<H>?, Box<I>?,
        Box<J>?, Box<K>?, Box<L>?, Box<M>?, Box<N>?, Box<O>?, Box<P>?, Box<Q>?, Box<R>?,
        Box<S>?, Box<T>?, Box<U>?, Box<V>?, Box<W>?, Box<X>?, Box<Y>?, Box<Z>?
    ],
    reducer: (values: [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z]) => $
): Box<$> {
    const values = dependencies.map(d => d!.value);
    // @ts-ignore
    const reducedBox = new Box(reducer(values));
    dependencies.forEach((box, index) => box!.onChange(value => {
        values[index] = value;
        // this works, I promise!
        // @ts-ignore
        reducedBox.value = reducer(values);
    }));
    return reducedBox;
}