import {Unlistener} from "./index";

export enum ReplaceErrorCode {
    OldKeyDoesNotExist = 0,
    SameKeysSameValues,
}

export enum ReplaceSuccessCode {
    SameKeysDifferentValues = 2,
    DifferentKeysDifferentValues,
    DifferentKeysSameValues,
}

export type ReplaceInfoCode = ReplaceErrorCode | ReplaceSuccessCode;

export type OnSetListener<K, V> = (key: K, value: V) => void;
export type OnReplaceListener<K, V> = (
    code: ReplaceSuccessCode,
    oldKey: K,
    oldValue: V,
    newKey: K,
    newValue: V
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

    /**
     * On `BoxMapReplaceCode.OldKeyDoesNotExist` and `BoxMapReplaceCode.SameKeysSameValues` the listeners will not be called, and it is a no-op.
     */
    replace(oldKey: K, newKey: K, newValue: V): ReplaceInfoCode {
        if(!this.has(oldKey)) return ReplaceErrorCode.OldKeyDoesNotExist;
        const oldValue = this.get(oldKey);
        if(oldKey === newKey) {
            if(oldValue === newValue) return ReplaceErrorCode.SameKeysSameValues;
            else {
                super.delete(oldKey);
                super.set(newKey, newValue);
                return ReplaceSuccessCode.SameKeysDifferentValues;
            }
        } else {
            if(oldValue === newValue) {
                return ReplaceSuccessCode.DifferentKeysSameValues;
            } else {
                return ReplaceSuccessCode.DifferentKeysDifferentValues;
            }
        }
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