import {Unlistener} from "./index";

export type OnChangeListener<T> = (value: T) => void;

/**
 * A store for immutable data.
 *
 * # Example
 *
 * ```ts
 * const box = new Box(10);
 * box.onChange(value => console.log(value));
 * box.value = 10; // Logs `10`
 * ```
 */
export class Box<T> {
    #value: T;
    readonly #listeners = new Set<OnChangeListener<T>>();

    constructor(value: T) {
        this.#value = value;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        if(this.#value === value) return;
        this.#value = value;
        this.#listeners.forEach(listener => listener(value));
    }

    onChange(listener: OnChangeListener<T>): Unlistener {
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    }

    /**
     * Derives a new `Box` from the current one.
     *
     * # Example
     *
     * ```ts
     * const count = new Box(10);
     * const squared = count.derive(count => count * count);
     * ```
     *
     * Whenever `count` gets updated, `square` gets updated with the square.
     */
    derive<U>(transform: (value: T) => U): Box<U> {
        const box = new Box(transform(this.#value));
        this.onChange(value => box.value = transform(value));
        return box;
    }
}