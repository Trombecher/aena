import {Listen} from "./index";

/**
 * Infers the type `T` of {@link Box}.
 */
export type Unbox<B> = B extends Box<infer T> ? T : never;

/**
 * The listener for {@link Box} and {@link WritableBox} changes.
 */
export type OnChangeListener<T> = (value: T) => void;

/**
 * A readonly store for immutable data.
 *
 * # Example
 *
 * ```typescript
 * import {WritableBox, Box} from "aena";
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

    /**
     * Creates a new {@link  Box} from an initialValue.
     */
    constructor(value: T) {
        this._value = value;
    }

    /**
     * The value of this {@link Box}.
     */
    get value() {
        return this._value;
    }

    /**
     * Derives a new {@link Box} from this, transforming the value in the process.
     *
     * Example {@link Box here}.
     */
    derive<U>(transform: (value: T) => U) {
        const box = new WritableBox(transform(this._value));
        this.addListener(value => box.value = transform(value));
        return box.readonly();
    }

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
 * Example at {@link Box} documentation.
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

    /**
     * Casts this {@link WritableBox} to a {@link Box} (readonly).
     */
    readonly() {
        return this as Box<T>;
    }
}