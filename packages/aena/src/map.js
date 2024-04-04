import {
    addListenersDeep,
    implementListenDeep,
    notify,
    removeListenersDeep
} from "./internal";

export const ACTION_SET = 0;
export const ACTION_DELETE = 1;

export class BoxMap extends Map {
    l = new Set; // A set of listeners
    d = new Set; // A set of deep listeners

    set(key, value) {
        if(this.has(key)) return this;
        super.set(key, value);

        // Ensure that all deep listeners are attached to all boxed descendants of `value`.
        addListenersDeep(this.d, value);

        // Notify all listeners about the addition of this value.
        notify(this, {
            action: ACTION_SET,
            key,
            value
        });

        return this;
    }

    clear() {
        this.forEach((_, key) => this.delete(key));
    }

    delete(key) {
        const value = super.get(key);

        // If the value was not in the map.
        if(!super.delete(key)) return false;

        // Ensure that all listeners are remove from all descendants.
        removeListenersDeep(this.d, value);

        // Notify all listeners about the deletion of this value.
        notify(this, {
            action: ACTION_DELETE,
            key,
            value
        });

        return true;
    }
}

implementListenDeep(BoxMap.prototype);