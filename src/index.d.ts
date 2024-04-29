import {JSX} from "./jsx-runtime";
import {List, ListTransform, State, StateTransform} from "./state";

/**
 * Inserts a {@link State `State`} or a {@link List `List`} into the UI
 * by dynamically mapping the value to a {@link JSX.Element `JSX.Element`}.
 */
export declare function insert<T>(state: State<T>, transform: StateTransform<T, JSX.Element>): Node;

export declare function insert<T>(list: List<T>, transform: ListTransform<T, JSX.Element>): Node;

/**
 * Inserts a {@link State `State`} or a {@link List `List`} into the UI
 * by dynamically mapping the value to a string.
 */
export declare function insertToString<T>(state: State<T>, transform?: StateTransform<T, string>): Text;

export declare function insertToString<T>(list: List<T>, transform?: ListTransform<T, string>): Text;

/**
 * Inserts a {@link List `List`} by mapping each item to an element.
 *
 * The transform function is called **once** for each item in the list.
 * Changes made to the list are reflected in the UI.
 */
export declare function insertList<T>(list: List<T>, transform: (item: T) => JSX.Element): JSX.Element;

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
export declare function mount(target: Element, element: Readonly<JSX.Element>): void;

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