import {
    addListenersDeep,
    clampIndex,
    clampIndexLower,
    clampIndexUpTo,
    implementListenDeep,
    notify,
    removeListenersDeep
} from "./internal";

export const ACTION_INSERT = 0;
export const ACTION_SWAP = 1;
export const ACTION_DELETE = 2;

export class BoxArray extends Array {
    l = new Set; // A set of listeners
    d = new Set; // A set of deep listeners

    set(index, value) {
        index = clampIndexLower(index, this.length);

        const oldValue = this.at(index);
        if(oldValue === value) return this;

        this[index] = value;
        removeListenersDeep(this.d, oldValue);

        // Simulate a remove change.
        notify(this, {
            action: ACTION_DELETE,
            value: oldValue,
            index
        });

        addListenersDeep(this.d, value);

        // Simulate an insert change.
        notify(this, {
            action: ACTION_INSERT,
            value,
            index
        });

        return this;
    }

    swapIndices(indexA, indexB) {
        swapIndicesUnchecked(
            this,
            clampIndex(indexA, this.length),
            clampIndex(indexB, this.length)
        );
    }

    swap(a, b) {
        const indexA = this.indexOf(a);
        if(indexA === -1) return;
        const indexB = this.indexOf(b);
        if(indexB === -1) return;

        swapIndicesUnchecked(this, indexA, indexB, a, b);
    }

    copyWithin(target, start, end) {
        target = clampIndex(target, this.length);
        start = clampIndex(start, this.length);
        end = clampIndexUpTo(end || this.length, this.length);

        for(let i = start; i < end; i++)
            this.set(target + i - start, this[i]);

        return this;
    }

    fill(value, start = 0, end = this.length) {
        for(let i = clampIndex(start, this.length); i < clampIndexUpTo(end, this.length); ++i)
            this.set(i, value);
        return this;
    }

    pop() {
        const value = super.pop();
        if(value) {
            removeListenersDeep(this.d, value);
            notify(this, {
                action: ACTION_DELETE,
                value,
                index: this.length
            });
        }
        return value;
    }

    push(...items) {
        const length = this.length;
        super.push(...items);

        items.forEach((item, index) => {
            addListenersDeep(this.d, item);
            notify(this, {
                action: ACTION_INSERT,
                value: item,
                index: index + length
            });
        });

        return this.length;
    }

    shift() {
        const item = super.shift();
        if(item) {
            removeListenersDeep(this.d, item);
            notify(this, {
                action: ACTION_DELETE,
                value: item,
                index: 0
            });
        }
        return item;
    }

    splice(start, deleteCount, ...items) {
        const removed = super.splice(start, deleteCount, ...items);
        removed.forEach(item => {
            removeListenersDeep(this.d, item);
            notify(this, {
                action: ACTION_DELETE,
                value: item,
                index: start
            });
        });
        items.forEach((item, index) => {
            addListenersDeep(this.d, item);
            notify(this, {
                action: ACTION_INSERT,
                index: index + start,
                value: item
            });
        });
        return removed;
    }

    sort(compareFn) {
        const indices = new Array(this.length);
        for(let i = 0; i < indices.length; ++i)
            indices[i] = i;
        indices.sort((a, b) => compareFn(this.at(a), this.at(b)));
        const array = [...this];
        for(let i = 0; i < indices.length; ++i)
            this.set(i, array.at(indices[i]));
        return this;
    }

    unshift(...items) {
        super.unshift(...items);
        items.forEach((item, i) => {
            addListenersDeep(this.d, item);
            notify(this, {
                action: ACTION_INSERT,
                value: item,
                index: i
            });
        });
        return this.length;
    }
}

implementListenDeep(BoxArray.prototype);

/**
 * @param boxArray {BoxArray}
 * @param indexA {number}
 * @param indexB {number}
 * @param a {any}
 * @param b {any}
 */
function swapIndicesUnchecked(
    boxArray,
    indexA,
    indexB,
    a = boxArray[indexA],
    b = boxArray[indexB],
) {
    boxArray[indexA] = b;
    boxArray[indexB] = a;

    notify(boxArray, {
        action: ACTION_SWAP,
        a,
        b,
        indexA,
        indexB
    });
}