import {BoxMap} from "./map";
import {
    addListenerRecursive,
    BoxedParent,
    DeepListener,
    isObject,
    removeListenerRecursive
} from "./index";

/*
export enum ReplaceInfoCode {
    FailOldValueDoesNotExist,
    FailSameValues,
    SuccessNewValueDidExist,
    SuccessNewValueDidNotExist
}
 */

export const enum Action {
    Add,
    // Replace,
    Delete
}

/*
{
    action: Action.Replace,
    newValue: T,
    oldValue: T,
    newValueDidExist: boolean
} |
 */

export type Change<T> = Readonly<{
    action: Action.Add,
    value: T
} | {
    action: Action.Delete,
    value: T
}>;

export type Listener<T> = (change: Change<T>) => void;

/**
 * A set store for immutable data.
 *
 * # Example
 *
 * ```typescript
 * import {BoxSet} from "aena/state";
 * import {Action} from "aena/state/set";
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
export class BoxSet<T> extends Set<T> implements BoxedParent<Listener<T>> {
    readonly #listeners = new Set<Listener<T>>();
    /**
     * All children of this `BoxSet` should have these listeners.
     * @private
     */
    readonly #deepListeners = new Set<() => void>();

    override add(value: T): this {
        if(this.has(value)) return this;
        super.add(value);

        // Ensure that all deep listeners are attached to all boxed descendants of `value`.
        if(isObject(value))
            this.#deepListeners.forEach(listener =>
                addListenerRecursive(value, listener));

        // Notify all listeners about the addition of this value.
        const change = {action: Action.Add, value} satisfies Change<T>;
        this.#listeners.forEach(listener => listener(change));
        this.#deepListeners.forEach(listener => listener());

        return this;
    }

    /*

     * Replaces the old value with a new one and calls the `onReplace` listeners.
     * If the set does not contain the old value, it cannot be removed and the function does nothing.
     *
     * Therefore, this function guarantees `onReplace` listeners an existent old value but not a previously non-existent new value.

    replace(oldValue: T, newValue: T): ReplaceInfoCode {
        if(!super.has(oldValue)) return ReplaceInfoCode.FailOldValueDoesNotExist;
        if(oldValue === newValue) return ReplaceInfoCode.FailSameValues;

        super.delete(oldValue);

        const change = {
            action: Action.Replace,
            newValue,
            oldValue,
            newValueDidExist: true
        } satisfies Change<T>;

        if(super.has(newValue)) {
            super.add(newValue);
            this.#listeners.forEach(listener => listener(change));
            this.#deepListeners.forEach(listener => listener());

            return ReplaceInfoCode.SuccessNewValueDidExist;
        } else {
            super.add(newValue);
            // @ts-ignore TYPESCRIPT IS WRONG ABOUT THIS.
            change.newValueDidExist = false;

            this.#listeners.forEach(listener => listener(change));
            this.#deepListeners.forEach(listener => listener());

            return ReplaceInfoCode.SuccessNewValueDidNotExist;
        }
    }
    */

    /**
     * Clears the set by deleting each value.
     *
     * This operation is overridden to be not O(1)
     * because otherwise it would introduce artifacts
     * regarding the promises of delete events on listeners.
     */
    override clear() {
        this.forEach(value => this.delete(value));
    }

    override delete(value: T) {
        // If the value was not in the set.
        if(!super.delete(value)) return false;

        // Ensure that all listeners are removed from all descendants.
        if(isObject(value))
            this.#deepListeners.forEach(listener =>
                removeListenerRecursive(value, listener));

        // Notify all listeners about the deletion of this value.
        const change = {action: Action.Delete, value} satisfies Change<T>;
        this.#listeners.forEach(listener => listener(change));
        this.#deepListeners.forEach(listener => listener());

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
     * Maps this set to an array using a `mapper` function.
     */
    map<U>(mapper: (value: T) => U): U[] {
        const array = new Array<U>(this.size);
        let i = 0;
        this.forEach(value => {
            array[i] = mapper(value);
            i++;
        });
        return array;
    }

    override toString() {
        let s = "";
        this.forEach(value => s += "," + value);
        return `{${s.substring(1)}}`;
    }

    deriveBoxMap<U>(mapper: (value: T) => U) {
        const map = new BoxMap<T, U>();
        this.forEach(value => map.set(value, mapper(value)));

        this.addListener(change => {
            switch(change.action) {
                case Action.Add:
                    map.set(change.value, mapper(change.value));
                    break;
                // case Action.Replace:
                //     map.replace(change.oldValue, change.newValue, mapper(change.newValue));
                //     break;
                case Action.Delete:
                    map.delete(change.value);
                    break;
            }
        });

        return map;
    }

    removeDeepListener(listener: DeepListener) {
        this.#deepListeners.delete(listener);
    }

    removeListener(listener: Listener<T>) {
        this.#listeners.delete(listener);
    }

    addDeepListener(listener: DeepListener): DeepListener {
        this.#deepListeners.add(listener);
        return listener;
    }

    addListener(listener: Listener<T>): Listener<T> {
        this.#listeners.add(listener);
        return listener;
    }
}