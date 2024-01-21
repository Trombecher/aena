export {Box, WritableBox} from "./box";
export {BoxSet} from "./set";
export {BoxArray} from "./array";
export {BoxMap} from "./map";

import {Box, WritableBox} from "./box";

/**
 * Infers the type `T` of `Box<T>`.
 */
export type Unbox<B> = B extends Box<infer T> ? T : never;

export type UnboxArray<T extends Box<any>[]> = {
    [K in keyof T]: T[K] extends Box<infer U> ? U : never;
};

/**
 * Maps a tuple `T` to an array of boxes of each tuple element.
 */
export type TupleToBoxedTuple<T extends any[]> = {
    [K in keyof T]: Box<T[K]>;
};

/**
 * Derives a single `Box` from multiple `Box`es (dependencies).
 * Whenever one dependency changes, the resulting `Box` will change to the value generated by the reducer.
 *
 * The `as const` type annotation **is needed** for typing to work.
 *
 * # Example
 *
 * ```
 * import {reduce} from "aena/state";
 *
 * const boxedNumber = new Box(0);
 * const boxedString = new Box("foo");
 *
 * const repeated = reduce([boxedNumber, boxedString] as const, ([n, s]) => s.repeat(n));
 * ```
 */
export function reduce<V extends any[], T>(
    dependencies: Readonly<TupleToBoxedTuple<V>>,
    reducer: (values: V) => T
): Box<T> {
    const values = dependencies.map(d => d!.value) as V;

    const reducedBox = new WritableBox(reducer(values));
    dependencies.forEach((box, index) => box!.addListener(value => {
        values[index] = value;
        reducedBox.value = reducer(values);
    }));
    return reducedBox;
}

/**
 * Checks if parameter `o` is instance of a class implementing `Boxed`.
 *
 * More precisely, it checks if the prototype of `o` has the two required functions.
 */
export function isInstanceOfBoxed<T extends Function>(o: object): o is Boxed<T> {
    return "addListener" in o && "removeListener" in o;
}

/**
 * Checks if parameter `o` is instance of a class implementing `BoxedParent`.
 *
 * More precisely, it checks if the prototype of `o` has the two required functions.
 */
export function isInstanceOfBoxedParent<L extends Function>(o: object): o is BoxedParent<L> {
    return "addListener" in o
        && "removeListener" in o
        && "addDeepListener" in o
        && "removeDeepListener" in o;
}

/**
 * The standard deep listener type.
 *
 * Extracted to a separate type due to easy api adjustments.
 */
export type DeepListener = () => void;

/**
 * The basic interface for reactivity / signals.
 *
 * # Example
 *
 * ```typescript
 * const boxed = new Box(0);
 *
 * // Add a listener.
 * const listener = boxed.addListener(value => console.log(value));
 *
 * // ...
 *
 * // Remove the listener
 * boxed.removeListener(listener);
 * ```
 */
export interface Boxed<L extends Function> {
    /**
     * Add a listener.
     *
     * @returns The parameter `listener` for lazy typing.
     */
    addListener(listener: L): L,

    /**
     * Remove a listener.
     */
    removeListener(listener: L): void
}

/**
 * The extended interface useful for types which contain mutable data.
 *
 * Listening `deep` ensures that all boxed descendants of the implementation of this interface have this listener.
 *
 * # Example
 *
 * ```typescript
 * import {Listener} from "aena/state/set";
 *
 * // `BoxSet<T>` implements `Boxed<Listener<T>>`.
 * const boxedParent = new BoxSet();
 *
 * // Add listener.
 * const listener = boxedParent.addDeepListener(() => console.log("Update"));
 *
 * // ...
 *
 * // Remove listener.
 * boxedParent.removeDeepListener(listener);
 * ```
 */
export interface BoxedParent<L extends Function> extends Boxed<L> {
    /**
     * Add a deep listener.
     *
     * @returns The parameter `listener` for lazy typing.
     */
    addDeepListener(listener: DeepListener): DeepListener,

    /**
     * Remove a deep listener.
     */
    removeDeepListener(listener: DeepListener): void
}

/**
 * If `value` is an object, it adds the given listener to all boxed descendants.
 */
export function addListenerRecursive(value: any, listener: () => void): void {
    if(!isObject(value)) return;

    if(isInstanceOfBoxedParent(value)) value.addDeepListener(listener);
    else if(isInstanceOfBoxed(value)) value.addListener(listener);
    else Object.keys(value).forEach(key =>
            addListenerRecursive(value[key as keyof typeof value], listener));
}

/**
 * If `value` is an object, it removes the given listener from all boxed descendants.
 */
export function removeListenerRecursive(value: any, listener: () => void): void {
    if(!isObject(value)) return;

    if(isInstanceOfBoxedParent(value)) value.removeDeepListener(listener);
    else if(isInstanceOfBoxed(value)) value.removeListener(listener);
    else Object.keys(value).forEach(key =>
            removeListenerRecursive(value[key as keyof typeof value], listener));
}

/**
 * Checks if the parameter `value` is an object and not null.
 */
export function isObject(value: any): value is object {
    return typeof value === "object" && value !== null;
}