/**
 * Describes the transformation of the value `T` of a {@link State `State<T>`} to a value `U`.
 *
 * `value` and `oldValue` are **not guaranteed to be different**.
 * Use of this type outside a {@link State `State`} context is discouraged.
 */
export declare type StateTransform<T, U> = (value: Readonly<T>, oldValue: Readonly<T>) => U;

/**
 * Infers the type `T` of `S<T>` where `S` extends {@link State `State`}.
 */
export declare type InferStateType<S extends State<any>> = S extends State<infer T> ? T : never;

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

/**
 * Infers the type `T` of `L<T>` where `L` extends {@link List `List`}.
 */
export declare type InferListType<L extends List<any>> = L extends List<infer T> ? T : never;

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

/**
 * Gets the value out of a {@link State `State`} or a {@link List `List`}.
 */
export declare function get<T>(state: State<T>): Readonly<T>;

export declare function get<T>(list: List<T>): Readonly<T[]>;

/**
 * Derives a new {@link State `State`} from an existing {@link State `State`} or {@link List `List`}.
 */
export declare function derive<T, U>(state: State<T>, transform: StateTransform<T, U>): State<U>;

export declare function derive<T, U>(list: List<T>, transform: ListTransform<T, U>): State<U>;

/**
 * Attaches the `listener` to a {@link State `State`} or a {@link List `List`}.
 *
 * **Returns the same listener which was passed in**, for type inference.
 */
export declare function attach<T>(to: State<T>, listener: StateTransform<T, void>): StateTransform<T, void>;

export declare function attach<T>(to: List<T>, listener: ListListener<T>): ListListener<T>;

/**
 * Detaches the `listener` from a {@link State `State`} or a {@link List `List`}.
 */
export declare function detach<T>(from: State<T>, listener: StateTransform<T, void>): void;

export declare function detach<T>(from: List<T>, listener: ListListener<T>): void;