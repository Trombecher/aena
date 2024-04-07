import {
    addListenersDeep,
    implementListenDeep,
    notify,
    removeListenersDeep
} from "./internal";

export const ACTION_ADD = 0;
export const ACTION_DELETE = 1;

export class BoxSet extends Set {
    l = new Set; // A set of listeners
    d = new Set; // A set of deep listeners

    add(value) {
        if(this.has(value)) return this;
        super.add(value);

        // Ensure that all deep listeners are attached to all boxed descendants of `value`.
        addListenersDeep(this.l, value);

        // Notify all listeners about the addition of this value.
        notify(this, {
            action: ACTION_ADD,
            value
        });

        return this;
    }

    clear() {
        this.forEach(value => this.delete(value));
    }

    delete(value) {
        if(!super.delete(value)) return false;

        // Ensure that all listeners are removed from all descendants.
        removeListenersDeep(this.d, value);

        // Notify all listeners about the deletion of this value.
        notify(this, {
            action: ACTION_DELETE,
            value
        });

        return true;
    }
}

implementListenDeep(BoxSet.prototype);