import {
    addListenerRecursive,
    DeepListener,
    isObject, ListenDeep,
    removeListenerRecursive
} from "./index";

export const enum Action {
    Set,
    // Replace,
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

export type Listener<K, V> = (change: Change<K, V>) => void;

export class BoxMap<K, V> extends Map<K, V> implements ListenDeep<Listener<K, V>> {
    override set(key: K, value: V): this {
        if(this.has(key)) return this;
        super.set(key, value);

        // Ensure that all deep listeners are attached to all boxed descendants of `value`.
        if(isObject(value))
            this.#deepListeners.forEach(listener =>
                addListenerRecursive(value, listener));

        // Notify all listeners about the addition of this value.
        const change = {
            action: Action.Set,
            key,
            value
        } satisfies Change<K, V>;
        this.#listeners.forEach(listener => listener(change));
        this.#deepListeners.forEach(listener => listener());

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
        if(isObject(value))
            this.#deepListeners.forEach(listener =>
                removeListenerRecursive(value, listener));

        // Notify all listeners about the deletion of this value.
        const change = {
            action: Action.Delete,
            key,
            value
        } satisfies Change<K, V>;
        this.#listeners.forEach(listener => listener(change));
        this.#deepListeners.forEach(listener => listener());

        return true;
    }

    override toString() {
        let s = "";
        this.forEach((v, k) => s += `,${k}:${v}`);
        return `{${s.substring(1)}}`;
    }

    // The following code may repeat across files; but there is no other option.
    readonly #listeners = new Set<Listener<K, V>>();
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

    addListener(listener: Listener<K, V>) {
        this.#listeners.add(listener);
        return listener;
    }

    removeListener(listener: Listener<K, V>) {
        this.#listeners.delete(listener);
    }
}