import {Listen} from "./index";

export type OnChangeListener<T> = (value: T) => void;

/**
 * A readonly store for immutable data.
 *
 * # Example
 *
 * ```typescript
 * import {WritableBox, Box} from "aena/state";
 *
 * const count = new WritableBox(10);
 *
 * const squared = count.derive(count => count * count);
 * square.value = 10; // Error
 *
 * count.value = 12;
 * console.log(square.value); // Logs "144".
 * ```
 *
 * Whenever `count` gets updated, `square` gets updated with the square.
 */
export class Box<T> implements Listen<OnChangeListener<T>> {
    protected _value: T;

    constructor(value: T) {
        this._value = value;
    }

    get value() {
        return this._value;
    }

    derive<U>(transform: (value: T) => U) {
        const box = new WritableBox(transform(this._value));
        this.addListener(value => box.value = transform(value));
        return box.readonly();
    }

    // The following code may repeat across files.
    protected readonly _listeners = new Set<OnChangeListener<T>>();

    addListener(listener: OnChangeListener<T>): OnChangeListener<T> {
        this._listeners.add(listener);
        return listener;
    }

    removeListener(listener: OnChangeListener<T>) {
        this._listeners.delete(listener);
    }
}

/**
 * A writable store for immutable data.
 *
 * # Example
 *
 * ```ts
 * const box = new WritableBox(10);
 * box.onChange(value => console.log(value));
 * box.value = 10; // Logs `10`
 * ```
 */
export class WritableBox<T> extends Box<T> {
    constructor(value: T) {
        super(value);
    }

    override set value(value: T) {
        if(this._value === value) return;
        this._value = value;
        this._listeners.forEach(listener => listener(value));
    }

    override get value() {
        return this._value;
    }

    readonly() {
        return this as Box<T>;
    }
}