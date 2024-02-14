import {Listen, Listener} from "./index";

/**
 * Infers the type `T` of {@link Box}.
 */
export type Unbox<B> = B extends Box<infer T> ? T : never;

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
export class Box<T> implements Listen<T> {
    /**
     * The internal value.
     *
     * @private
     */
    #value: T;

    /**
     * Creates a new {@link  Box} from an initialValue.
     */
    constructor(value: T) {
        this.#value = value;
    }

    /**
     * The value of this {@link Box}.
     */
    get value() {
        return this.#value;
    }

    set value(value: T) {
        if(this.#value === value) return;
        this.#value = value;
        this.#listeners.forEach(listener => listener(value));
    }

    /**
     * Derives a new {@link ReadonlyBox}, transforming the value in the process.
     *
     * Example {@link Box here}.
     */
    derive<U>(transform: (value: T) => U): ReadonlyBox<U> {
        const box = new Box(transform(this.#value));
        this.addListener(value => box.value = transform(value));
        return box.readonly();
    }

    readonly() {
        return this as ReadonlyBox<T>;
    }

    readonly #listeners = new Set<Listener<T>>();

    addListener(listener: Listener<T>): Listener<T> {
        this.#listeners.add(listener);
        return listener;
    }

    removeListener(listener: Listener<T>) {
        this.#listeners.delete(listener);
    }
}

/**
 * A readonly {@link Box}.
 */
export interface ReadonlyBox<T> extends Listen<T> {
    /**
     * The value of this {@link ReadonlyBox}.
     * @property
     */
    get value(): T;

    /**
     * Derives a new {@link ReadonlyBox}, transforming the value in the process.
     *
     * Example {@link ReadonlyBox} here.
     */
    derive<U>(transform: (value: T) => U): ReadonlyBox<U>;
}