import {addListenerRecursively, DeepListener, ListenDeep, Listener, removeListenerRecursively,} from "./index";
import {addListenersDeep, removeListenersDeep} from "./internal";

export const enum Action {
    Set,
    Delete
}

export type Change<K, V> = Readonly<{
    action: Action.Set,
    key: K,
    value: V
} | {
    action: Action.Delete,
    key: K,
    value: V
}>;

/**
 * A reactive map for immutable data.
 */
export class BoxMap<K, V> extends Map<K, V> implements ListenDeep<Change<K, V>> {
    override set(key: K, value: V): this {
        if(this.has(key)) return this;
        super.set(key, value);

        // Ensure that all deep listeners are attached to all boxed descendants of `value`.
        addListenersDeep(this.#deepListeners, value);

        // Notify all listeners about the addition of this value.
        this.#notify({
            action: Action.Set,
            key,
            value
        });

        return this;
    }

    /**
     * Clears the set by deleting each key and value.
     *
     * This operation is overridden to be not O(1)
     * because otherwise it would introduce artifacts
     * regarding the promises of delete events on listeners.
     */
    override clear() {
        this.forEach((_, key) => this.delete(key));
    }

    override delete(key: K): boolean {
        const value = super.get(key)!;

        // If the value was not in the map.
        if(!super.delete(key)) return false;

        // Ensure that all listeners are remove from all descendants.
        removeListenersDeep(this.#deepListeners, value);

        // Notify all listeners about the deletion of this value.
        this.#notify({
            action: Action.Delete,
            key,
            value
        });

        return true;
    }

    /**
     * Returns `true` if every value in this {@link BoxMap} matches the given predicate; otherwise `false`.
     */
    every(predicate: (key: K, value: V) => boolean) {
        for(const [key, value] of this)
            if(!predicate(key, value))
                return false;
        return true;
    }

    /**
     * Reduces this {@link BoxMap} to a `T`.
     *
     * This can be used to implement mapping behaviour.
     */
    reduce<T>(initialValue: T, reducer: (previousValue: T, key: K, value: V, index: number) => T): T {
        let i = 0;
        this.forEach((value, key) => initialValue = reducer(initialValue, key, value, i++));
        return initialValue;
    }

    override toString() {
        return JSON.stringify(this.reduce({} as Record<any, any>, (o, k, v) => (o[k as any] = v as any, o)));
    }

    // The following code may repeat across files but there is no other option.
    readonly #listeners = new Set<Listener<Change<K, V>>>();
    readonly #deepListeners = new Set<DeepListener>();

    #notify(change: Change<K, V>) {
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

    addListener(listener: Listener<Change<K, V>>) {
        this.#listeners.add(listener);
        return listener;
    }

    removeListener(listener: Listener<Change<K, V>>) {
        this.#listeners.delete(listener);
    }
}