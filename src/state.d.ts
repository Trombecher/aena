/**
 * Describes the transformation of the value `T` of a {@link State `State<T>`} to a value `U`.
 *
 * `value` and `oldValue` are **not guaranteed to be different**.
 * Use of this type outside a {@link State `State`} context is discouraged.
 */
export declare type StateTransform<T, U> = (value: Readonly<T>, oldValue: Readonly<T>) => U;

/**
 * An immutable state.
 */
export declare class State<T> {
    private _; // Prevents type accidental coercion

    constructor(value: T);
}

/**
 * Sets the value of a {@link State `State`}.
 */
export declare function setState<T>(state: State<T>, value: T): void;

// LIST

/**
 * Describes a transformation of a {@link List `Readonly<T[]>`} to a value `U`.
 *
 * `list` is **guaranteed to be constant** for the lifetime of this function **if attached to a {@link List `List`}**.
 */
export declare type ListTransform<T, U> = (list: Readonly<T[]>) => U;

export declare type ListListener<T> = (
    list: Readonly<T[]>,
    start: number,
    deleteCount: number,
    ...itemsToInsert: Readonly<T[]>
) => void;

export declare type DeepListener = () => void;

/**
 * A mutable array-like state.
 */
export declare class List<T> {
    private _; // Prevents type accidental coercion

    constructor(initial?: T[]);
}

/**
 * Mutates the list by applying a {@link Array.splice `splice`}-like mutation.
 */
export declare function mutateList<T>(list: List<T>, start: number, deleteCount: number, ...itemsToInsert: T[]): void;

export declare function attachDeep(list: List<any>, deepListener: DeepListener): DeepListener;

export declare function detachDeep(list: List<any>, deepListener: DeepListener): void;

// SHARED

export declare type Listener<S extends State<any> | List<any>> = S extends State<infer T>
    ? StateTransform<T, void>
    : S extends List<infer T>
        ? ListListener<T>
        : never;

export declare type ValueOf<S extends State<any> | List<any>> = S extends State<infer T>
    ? Readonly<T>
    : S extends List<infer T>
        ? Readonly<T[]>
        : never;

export declare type Transform<S extends State<any> | List<any>, U> = S extends State<infer T>
    ? StateTransform<T, U>
    : S extends List<infer T>
        ? ListTransform<T, U>
        : never;

/**
 * Gets the value out of a {@link State `State`} or a {@link List `List`}.
 */
export declare function get<S extends State<any> | List<any>>(state: S): ValueOf<S>;

/**
 * Derives a new {@link State `State`} from an existing {@link State `State`} or {@link List `List`}.
 */
export declare function derive<S extends State<any> | List<any>, U>(state: S, transform: Transform<S, U>): State<U>;

/**
 * Attaches the `listener` to a {@link State `State`} or a {@link List `List`}.
 *
 * **Returns the same listener which was passed in**, for type inference.
 */
export declare function attach<S extends State<any> | List<any>>(to: S, listener: Listener<S>): Listener<S>;

/**
 * Detaches the `listener` from a {@link State `State`} or a {@link List `List`}.
 */
export declare function detach<S extends State<any> | List<any>>(from: S, listener: Listener<S>): void;

/**
 * Serializes the value which produces **valid JSON**.
 *
 * Correctly handles {@link State `State`} and {@link List `List`}, but does not serialize listeners.
 */
export declare function stringify(value: any): string;

/**
 * Parses a JSON string **produced from {@link stringify `stringify(...)`}**.
 *
 * Correctly constructs {@link State `State`} and {@link List `List`}.
 */
export declare function parse(input: string): any;