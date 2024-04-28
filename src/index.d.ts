import {JSX} from "./jsx-runtime";

// STATE

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
    private _; // Prevents accidental type coercion.

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

/**
 * Infers the type `T` of `L<T>` where `L` extends {@link List `List`}.
 */
export declare type InferListType<L extends List<any>> = L extends List<infer T> ? T : never;

/**
 * A mutable array-like state.
 */
export declare class List<T> {
    private _; // Prevents accidental type coercion.

    constructor(initial?: T[]);
}

/**
 * Mutates the list by applying a {@link Array.splice `splice`}-like mutation.
 */
export declare function mutateList<T>(list: List<T>, start: number, deleteCount: number, ...itemsToInsert: T[]): void;

/**
 * Inserts a {@link List `List`} by mapping each item to an element.
 *
 * The transform function is called **once** for each item in the list.
 * Changes made to the list are reflected in the UI.
 */
export declare function insertList<T>(list: List<T>, transform: (item: T) => JSX.Element): JSX.Element;

// SHARED

/**
 * Describes the transformation of `X` to `U` where `X` extends {@link State `State<T>`} or {@link List `List<T>`}.
 *
 * Use of this type outside this context is discouraged.
 */
export declare type Transform<X extends State<any> | List<any>, U> = X extends State<infer T>
    ? StateTransform<T, U>
    : X extends List<infer T>
        ? ListTransform<T, U>
        : never;

/**
 * The type of the listener function attached to a {@link State `State`} or a {@link List `List`} via {@link attach `attach(...)`}.
 */
export declare type Listener<X extends State<any> | List<any>> = X extends State<infer T>
    ? StateTransform<T, void>
    : X extends List<infer T>
        ? (list: Readonly<T[]>, start: number, deleteCount: number, ...itemsToInsert: Readonly<T[]>) => void
        : never;

/**
 * Gets the value out of a {@link State `State`} or a {@link List `List`}.
 */
export declare function get<X extends State<any> | List<any>>(
    stateOrList: X,
): Readonly<X extends State<infer T>
    ? T
    : X extends List<infer T>
        ? T[]
        : never>;

/**
 * Derives a new {@link State `State`} from an existing {@link State `State`} or {@link List `List`}.
 */
export declare function derive<X extends State<any> | List<any>, U>(
    stateOrList: X,
    transform: Transform<X, U>,
): Readonly<State<U>>;

/**
 * Attaches the `listener` to a {@link State `State`} or a {@link List `List`}.
 *
 * **Returns the same listener which was passed in**, for type inference.
 */
export declare function attach<X extends State<any> | List<any>>(
    to: X,
    listener: Listener<X>,
): Listener<X>;

/**
 * Detaches the `listener` from a {@link State `State`} or a {@link List `List`}.
 */
export declare function detach<X extends State<any> | List<any>>(
    from: X,
    listener: Listener<X>,
): void;

/**
 * Inserts a {@link State `State`} or a {@link List `List`} into the UI
 * by dynamically mapping the value to a {@link JSX.Element `JSX.Element`}.
 */
export declare function insert<X extends State<any> | List<any>>(
    stateOrList: X,
    transform: Transform<X, JSX.Element>,
): Node;

/**
 * Inserts a {@link State `State`} or a {@link List `List`} into the UI
 * by dynamically mapping the value to a string.
 */
export declare function insertToString<X extends State<any> | List<any>>(
    stateOrList: X,
    transform?: Transform<X, string>,
): Text;

// JSX

/**
 * Traverses the given `element` recursively while rendering each leaf to a {@link Node} or a string.
 *
 * This function is primarily used by `insert...(...)` implementations to add dynamic node rendering.
 */
export declare function traverseAndRender(
    element: Readonly<JSX.Element>,
    callback: (node: Readonly<Node> | string) => void,
): void;

/**
 * Renders the given `element` and appends it to the `target`.
 */
export declare function mount(target: Element, element: JSX.Element): void;

/**
 * Creates a {@link Node}.
 */
export declare function createElement<T extends (keyof JSX.IntrinsicElements) | ((...args: any) => any)>(tag: T): T extends ((...args: any) => any)
    ? ReturnType<T>
    : T extends (keyof JSX.IntrinsicElements)
        ? JSX.IntrinsicElements[T]
        : never;

/**
 * This is the fragment function.
 */
export declare function Fragment<T extends any[]>(props: {children: T}): T;