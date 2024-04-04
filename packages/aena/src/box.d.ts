/**
 * Infers the type `T` of {@link Box}.
 */
export declare type Unbox<B> = B extends Box<infer T> ? T : never;

export declare type Listener<T> = (newValue: T, previousValue: T) => void;

/**
 * A state primitive for immutable state.
 */
export declare class Box<T> {
    /**
     * Constructs a new {@link Box}.
     * @param value
     */
    constructor(value: T);

    /**
     * Gets the value.
     */
    get value(): T;

    /**
     * Sets the value.
     */
    set value(value: T);

    /**
     * Derives a new value from this {@link Box}.
     */
    derive<U>(transform: (value: T) => U): Box<U>;

    /**
     * Adds a listener to this {@link Box}.
     */
    attach(listener: Listener<T>): Listener<T>;

    /**
     * Removes a listener from this {@link Box}.
     */
    detach<T>(listener: Listener<T>);
}