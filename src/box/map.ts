import {Unlistener} from "./index";

export enum ReplaceInfoCode {
    FailOldKeyDoesNotExist,
    FailSameKeysSameValues,
    SuccessNewKeyDidExist,
    SuccessNewKeyDidNotExist
}

export type OnSetListener<K, V> = (key: K, value: V) => void;
export type OnReplaceListener<K, V> = (
    oldKey: K,
    oldValue: V,
    newKey: K,
    newValue: V,
    newKeyDidExist: boolean
) => void;
export type OnDeleteListener<K, V> = (key: K, value: V) => void;

export class BoxMap<K, V> extends Map<K, V> {
    readonly #onSetListeners = new Set<OnSetListener<K, V>>();
    readonly #onReplaceListeners = new Set<OnReplaceListener<K, V>>();
    readonly #onDeleteListeners = new Set<OnDeleteListener<K, V>>();

    onSet(listener: OnSetListener<K, V>): Unlistener {
        this.#onSetListeners.add(listener);
        return () => this.#onSetListeners.delete(listener);
    }

    onReplace(listener: OnReplaceListener<K, V>): Unlistener {
        this.#onReplaceListeners.add(listener);
        return () => this.#onReplaceListeners.delete(listener);
    }

    onDelete(listener: OnDeleteListener<K, V>): Unlistener {
        this.#onDeleteListeners.add(listener);
        return () => this.#onDeleteListeners.delete(listener);
    }

    override set(key: K, value: V): this {
        if(!this.has(key)) {
            super.set(key, value);
            this.#onSetListeners.forEach(listener =>
                listener(key, value));
        }
        return this;
    }

    /**
     * On `BoxMapReplaceCode.OldKeyDoesNotExist` and `BoxMapReplaceCode.SameKeysSameValues` the listeners will not be called, and it is a no-op.
     */
    replace(oldKey: K, newKey: K, newValue: V): ReplaceInfoCode {
        if(!this.has(oldKey)) return ReplaceInfoCode.FailOldKeyDoesNotExist;
        const oldValue = this.get(oldKey)!;
        if(oldKey === newKey && oldValue === newValue) return ReplaceInfoCode.FailSameKeysSameValues;

        if(super.has(newKey)) {
            super.delete(oldKey);
            super.set(newKey, newValue);
            this.#onReplaceListeners.forEach(listener => listener(
                oldKey,
                oldValue,
                newKey,
                newValue,
                true
            ));
            return ReplaceInfoCode.SuccessNewKeyDidExist
        } else {
            super.delete(oldKey);
            super.set(newKey, newValue);
            this.#onReplaceListeners.forEach(listener => listener(
                oldKey,
                oldValue,
                newKey,
                newValue,
                false
            ));
            return ReplaceInfoCode.SuccessNewKeyDidNotExist;
        }
    }

    override clear() {
        this.forEach((value, key) =>
            this.#onDeleteListeners.forEach(listener =>
                listener(key, value)))
        super.clear();
    }

    override delete(key: K): boolean {
        const value = super.get(key);
        if(!super.delete(key)) return false;
        this.#onDeleteListeners.forEach(listener =>
            listener(key, value!));
        return true;
    }

    override toString() {
        let s = "";
        this.forEach((v, k) => s += `,${k}:${v}`);
        return `{${s.substring(1)}}`;
    }
}