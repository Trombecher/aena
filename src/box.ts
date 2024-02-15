import {Listen, Listener} from "./index";

/**
 * Infers the type `T` of {@link Box}.
 */
export type Unbox<B> = B extends Box<infer T> ? T : never;

/**
 * A readonly {@link Box} equivalent.
 */
export class ReadonlyBox<T> implements Listen<T> {
    /**
     * The internal value.
     *
     * @protected
     */
    protected _value: T;

    /**
     * Creates a new {@link ReadonlyBox} with a given initial `value`.
     */
    constructor(value: T) {
        this._value = value;
    }

    /**
     * Gets the value of this {@link ReadonlyBox}.
     */
    get value() {
        return this._value;
    }

    /**
     * Derives a new {@link ReadonlyBox}, transforming the value in the process.
     *
     * Example {@link Box here}.
     */
    derive<U>(transform: (value: T) => U): ReadonlyBox<U> {
        const box = new Box(transform(this._value));
        this.addListener(value => box.value = transform(value));
        return box.readonly();
    }

    readonly() {
        return this as ReadonlyBox<T>;
    }

    protected readonly _listeners = new Set<Listener<T>>();

    addListener(listener: Listener<T>): Listener<T> {
        this._listeners.add(listener);
        return listener;
    }

    removeListener(listener: Listener<T>) {
        this._listeners.delete(listener);
    }
}

/**
 * A readonly store for immutable data.
 *
 * # Example
 *
 * ```typescript
 * import {Box} from "aena";
 *
 * const count = new Box(10);
 *
 * const squared = count.derive(count => count * count);
 * squared.value = 10; // Error
 *
 * count.value = 12;
 * console.log(squared.value); // Logs "144"
 * ```
 *
 * Whenever `count` gets updated, `square` gets updated with the square.
 */
export class Box<T> extends ReadonlyBox<T> {
    /**
     * Creates a new {@link Box} from an initialValue.
     */
    constructor(value: T) {
        super(value);
    }

    /**
     * Gets the value of this {@link Box}.
     */
    override set value(value: T) {
        if(this._value === value) return;
        this._value = value;
        this._listeners.forEach(listener => listener(value));
    }

    /**
     * Sets the value of this {@link Box}.
     */
    override get value() {
        return this._value;
    }
}