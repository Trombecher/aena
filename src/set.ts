import {addListenerRecursively, DeepListener, ListenDeep, Listener, removeListenerRecursively} from "./index";
import {addListenersDeep, removeListenersDeep} from "./internal";

export const enum Action {
    Add,
    Delete
}

export type Change<T> = Readonly<{
    action: Action.Add,
    value: T
} | {
    action: Action.Delete,
    value: T
}>;

/**
 * A set store for immutable data.
 *
 * # Example
 *
 * ```typescript
 * import {BoxSet} from "aena";
 * import {Action} from "aena/set";
 *
 * const set = new BoxSet<number>();
 *
 * const listener = set.addListener(change => {
 *     switch(change.action) {
 *         case Action.Add:
 *             console.log(`Added ${change.value}`);
 *             break;
 *         case Action.Delete:
 *             console.log(`Deleted ${change.value}`);
 *             break;
 *     }
 * });
 *
 * set.add(0); // Logs "Added 0".
 * set.delete(0); // Logs "Deleted 0".
 *
 * set.removeListener(listener);
 *
 * set.add(0); // Logs nothing.
 * set.delete(0); // Logs nothing.
 *
 * const deepListener = set.addDeepListener(() => console.log("Set has changed."));
 *
 * set.add(0); // Logs "Set has changed".
 * set.delete(0); // Logs "Set has changed".
 *
 * set.removeDeepListener(deepListener);
 * ```
 */
export class BoxSet<T> extends Set<T> implements ListenDeep<Change<T>> {
    override add(value: T): this {
        if(this.has(value)) return this;
        super.add(value);

        // Ensure that all deep listeners are attached to all boxed descendants of `value`.
        addListenersDeep(this.#deepListeners, value);

        // Notify all listeners about the addition of this value.
        this.#notify({
            action: Action.Add,
            value
        });

        return this;
    }

    /**
     * Clears this {@link BoxSet} by deleting each value sequentially.
     *
     * This operation is overridden to be not O(1)
     * because otherwise it would introduce artifacts
     * regarding the promises of delete events on listeners.
     */
    override clear() {
        this.forEach(value => this.delete(value));
    }

    override delete(value: T) {
        if(!super.delete(value)) return false;

        // Ensure that all listeners are removed from all descendants.
        removeListenersDeep(this.#deepListeners, value);

        // Notify all listeners about the deletion of this value.
        this.#notify({
            action: Action.Delete,
            value
        });

        return true;
    }

    /**
     * Deletes all values that match the given predicate.
     */
    deleteIf(predicate: (value: T) => boolean) {
        this.forEach(value => {
            if(predicate(value))
                this.delete(value);
        });
    }

    /**
     * Returns `true` if every value in this {@link BoxSet} matches the given predicate; otherwise `false`.
     */
    every(predicate: (value: T) => boolean) {
        for(const value of this)
            if(!predicate(value))
                return false;
        return true;
    }

    /**
     * Reduces this {@link BoxSet} to a `T`.
     *
     * This can be used to implement mapping behaviour.
     */
    reduce<U>(initialValue: U, reducer: (previousValue: U, value: T, index: number) => U) {
        let i = 0;
        this.forEach(value => initialValue = reducer(initialValue, value, i++));
        return initialValue;
    }

    override toString() {
        return JSON.stringify(this.reduce(new Array<any>(this.size),
            (array, v, i) => (array[i] = v, array)));
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