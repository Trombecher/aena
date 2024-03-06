import {
    addListenerRecursively,
    DeepListener,
    ListenDeep,
    removeListenerRecursively
} from "./index";
import {addListenersDeep, clampIndex, clampIndexLower, clampIndexUpTo, removeListenersDeep} from "./internal";

export const enum Action {
    Insert,
    Swap,
    Delete
}

export type Listener<T> = (change: Change<T>) => void;

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

export class BoxArray<T> extends Array<T> implements ListenDeep<Listener<T>> {
    [index: number]: never;

    /**
     * Sets the given `value` to the given `index`.
     *
     *
     */
    set(index: number, value: T): this {
        index = clampIndexLower(index, this.length);

        const oldValue = this.at(index)!;
        if(oldValue === value) return this;

        this.#set(index, value);
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

        return this;
    }

    /**
     * Swaps the items at the given indices.
     *
     * Both indices are clamped to the length via {@link clampIndex}.
     */
    swapIndices(indexA: number, indexB: number) {
        this.#swapIndicesUnchecked(
            clampIndex(indexA, this.length),
            clampIndex(indexB, this.length)
        );
    }

    /**
     * Swaps the items `a` and `b`. If at least one is not found, this is a no-op.
     */
    swap(a: T, b: T) {
        const indexA = this.indexOf(a);
        if(indexA === -1) return;
        const indexB = this.indexOf(b);
        if(indexB === -1) return;

        this.#swapIndicesUnchecked(indexA, indexB, a, b);
    }

    #swapIndicesUnchecked(
        indexA: number,
        indexB: number,
        a = this.at(indexA) as T,
        b = this.at(indexB) as T,
    ) {
        this.#set(indexA, b);
        this.#set(indexB, a);

        this.#notify({
            action: Action.Swap,
            a,
            b,
            indexA,
            indexB
        });
    }

    /**
     * Bypasses the index restriction.
     * @private
     */
    #set(index: number, value: T) {
        // @ts-ignore
        this[index] = value;
    }

    override copyWithin(target: number, start: number, end?: number): this {
        target = clampIndex(target, this.length);
        start = clampIndex(start, this.length);
        end = clampIndexUpTo(end || this.length, this.length);

        for(let i = start; i < end; i++)
            this.set(target + i - start, this.at(i)!);

        return this;
    }

    override fill(value: T, start = 0, end = this.length): this {
        for(let i = clampIndex(start, this.length); i < clampIndexUpTo(end, this.length); ++i)
            this.set(i, value);
        return this;
    }

    override pop(): T | undefined {
        const value = super.pop();
        if(value) {
            removeListenersDeep(this.#deepListeners, value);
            this.#notify({
                action: Action.Delete,
                value,
                index: this.length
            });
        }
        return value;
    }

    override push(...items: T[]): number {
        const length = this.length;
        super.push(...items);

        items.forEach((item, index) => {
            addListenersDeep(this.#deepListeners, item);
            this.#notify({
                action: Action.Insert,
                value: item,
                index: index + length
            });
        });

        return this.length;
    }

    override shift(): T | undefined {
        const item = super.shift();
        if(item) {
            removeListenersDeep(this.#deepListeners, item);
            this.#notify({
                action: Action.Delete,
                value: item,
                index: 0
            });
        }
        return item;
    }

    override splice(start: number, deleteCount = 0, ...items: T[]): T[] {
        const removed = super.splice(start, deleteCount, ...items);
        removed.forEach((item, index) => {
            removeListenersDeep(this.#deepListeners, item);
            this.#notify({
                action: Action.Delete,
                value: item,
                index: index + start
            });
        });
        items.forEach((item, index) => {
            addListenersDeep(this.#deepListeners, item);
            this.#notify({
                action: Action.Insert,
                index: index + start,
                value: item
            });
        });
        return removed;
    }

    override sort(comparator: (a: T, b: T) => number = ((a, b) => +a - +b)): this {
        const indices = new Array(this.length);
        for(let i = 0; i < indices.length; ++i)
            indices[i] = i;
        indices.sort((a, b) => comparator(this.at(a)!, this.at(b)!));
        const array = [...this];
        for(let i = 0; i < indices.length; ++i)
            this.set(i!, array.at(indices[i])!);
        return this;
    }

    /**
     * Inserts the given `items` at the start.
     *
     * @returns The new array length
     */
    override unshift(...items: T[]): number {
        super.unshift(...items);
        items.forEach((item, i) => {
            addListenersDeep(this.#deepListeners, item);
            this.#notify({
                action: Action.Insert,
                value: item,
                index: i
            } satisfies Change<T>);
        });

        return this.length;
    }

    // The following code may repeat across files but there is no other option.
    readonly #listeners = new Set<Listener<T>>();
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

    addListener(listener: Listener<T>) {
        this.#listeners.add(listener);
        return listener;
    }

    removeListener(listener: Listener<T>) {
        this.#listeners.delete(listener);
    }
}