import {Listen} from "./index";

/**
 * Infers the type `T` of {@link Box}.
 */
export type Unbox<B> = B extends Box<infer T> ? T : never;

export type Listener<T> = (newValue: T, previousValue: T) => void;

/**
 * A state primitive for immutable state.
 */
export class Box<T> implements Listen<Listener<T>> {
    /**
     * The internal value.
     */
    #value: T;

    /**
     * Creates a new {@link Box} with a given initial `value`.
     */
    constructor(value: T) {
        this.#value = value;
    }

    /**
     * Gets the value.
     */
    get value() {
        return this.#value;
    }

    /**
     * Sets the value.
     */
    set value(value: T) {
        if(this.#value === value) return;
        const previousValue = this.#value;
        this.#value = value;
        this.#listeners.forEach(listener => listener(value, previousValue));
    }

    /**
     * Derives a new readonly {@link Box}, transforming the value in the process.
     */
    derive<U>(transform: (value: T) => U): Readonly<Box<U>> {
        const box = new Box(transform(this.#value));
        this.addListener(value => box.value = transform(value));
        return box.readonly();
    }

    readonly() {
        return this as Readonly<Box<T>>
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