import {BoxMap, Unlistener} from "./index";

export enum ReplaceErrorCode {
    OldValueDoesNotExist = 0
}

export enum ReplaceSuccessCode {
    NewValueHasNotExisted = 1,
    NewValueHasExisted,
}

export type OnAddListener<T> = (value: T) => void;
export type OnReplaceListener<T> = (
    infoCode: ReplaceSuccessCode,
    newValue: T,
    oldValue: T
) => void;
export type OnDeleteListener<T> = (value: T) => void;

/**
 * A set store for immutable data.
 *
 * It contains three actions to modify the entries: `add`, `replace` and `delete`.
 * You can listen to each action.
 */
export class BoxSet<T> extends Set<T> {
    readonly #onAddListeners = new Set<OnAddListener<T>>();
    readonly #onReplaceListeners = new Set<OnReplaceListener<T>>();
    readonly #onDeleteListeners = new Set<OnDeleteListener<T>>();

    /**
     * Listens to `add` actions.
     */
    onAdd(listener: OnAddListener<T>): Unlistener {
        this.#onAddListeners.add(listener);
        return () => this.#onAddListeners.delete(listener);
    }

    /**
     * Listens to `replace` actions.
     */
    onReplace(listener: OnReplaceListener<T>): Unlistener {
        this.#onReplaceListeners.add(listener);
        return () => this.#onReplaceListeners.delete(listener);
    }

    /**
     * Listens to `delete` actions.
     */
    onDelete(listener: OnDeleteListener<T>): Unlistener {
        this.#onDeleteListeners.add(listener);
        return () => this.#onDeleteListeners.delete(listener);
    }

    override add(value: T): this {
        if(!this.has(value)) {
            super.add(value);
            this.#onAddListeners.forEach(listener => listener(value));
        }
        return this;
    }

    /**
     * Replaces the old value with a new one and calls the `onReplace` listeners.
     * If the set does not contain the old value, it cannot be removed and the function does nothing.
     *
     * Therefore, this function guarantees `onReplace` listeners an existent old value but not a previously non-existent new value.
     */
    replace(oldValue: T, newValue: T): ReplaceErrorCode | ReplaceSuccessCode {
        if(!super.delete(oldValue))
            return ReplaceErrorCode.OldValueDoesNotExist;
        if(super.has(newValue)) {
            super.add(newValue);
            this.#onReplaceListeners.forEach(listener => listener(
                ReplaceSuccessCode.NewValueHasExisted,
                oldValue,
                newValue
            ));
            return ReplaceSuccessCode.NewValueHasExisted;
        } else {
            super.add(newValue);
            this.#onReplaceListeners.forEach(listener => listener(
                ReplaceSuccessCode.NewValueHasNotExisted,
                oldValue,
                newValue
            ));
            return ReplaceSuccessCode.NewValueHasNotExisted;
        }
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

        this.onAdd(value => map.set(value, mapper(value)));
        this.onDelete(value => map.delete(value));
        this.onReplace((_, oldValue, newValue) => {
            map.delete(oldValue);
            if(!map.has(newValue))
                map.set(newValue, mapper(newValue));
        });

        return map;
    }
}