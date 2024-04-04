import {addListenerRecursively, DeepListener, ListenDeep, removeListenerRecursively} from "./index";
import {BoxSet} from "./set";

/**
 * Checks if the parameter `value` is an object and not null.
 */
export function isObject(value: any): value is object {
    return typeof value === "object" && value !== null;
}

/**
 * Adds all listeners to this `value`.
 */
export function addListenersDeep(listeners: Set<DeepListener>, value: any) {
    if(isObject(value))
        listeners.forEach(listener =>
            addListenerRecursively(value, listener));
}

/**
 * Removes all listeners from this `value`.
 */
export function removeListenersDeep(listeners: Set<DeepListener>, value: any) {
    if(isObject(value))
        listeners.forEach(listener =>
            removeListenerRecursively(value, listener));
}

/**
 * Maps the index according to the following pattern:
 *
 * - If `index < -length`: return `0`
 * - If `index < 0`: return `index + length`
 * - If `index >= length`: return `length - 1`
 * - Else: return `index`
 *
 * This map ensures that the returned index is always valid.
 */
export function clampIndex(index: number, length: number): number {
    index = clampIndexLower(index, length);
    if(index >= length) return length - 1;
    return index;
}

/**
 * Maps the index according to the following pattern.
 *
 * - If `index < -length`: return `0`
 * - If `index < 0`: return `index + length`
 * - If `index > length`: return `length`
 * - Else: return `index`
 *
 * This map ensures a valid _target_ index up to (including) `length`.
 */
export function clampIndexUpTo(index: number, length: number): number {
    index = clampIndexLower(index, length);
    if(index > length) return length;
    return index;
}

/**
 * Maps the index according to the following pattern:
 *
 * - If `index < -length`: return `0`
 * - If `index < 0`: return `index + length`
 * - Else: return `index`
 *
 * This map ensures that the index is always positive, but validity is not ensured.
 */
export function clampIndexLower(index: number, length: number): number {
    if(index < -length) return 0;
    if(index < 0) return index + length;
    return index;
}

/**
 * Notifies all listeners and deep listeners of a {@link BoxSet}, {@link BoxArray} or a {@link BoxMap} of a change.
 */
export function notify<L extends (change: C) => void, C>(target: {l: Set<L>, d: Set<DeepListener>}, change: C) {
    target.l.forEach(listener => listener(change));
    target.d.forEach(listener => listener());
}

/**
 * Implements a shared {@link ListenDeep} functionality for {@link BoxSet}, {@link BoxMap} and {@link BoxArray}.
 * @param target
 */
export function implementListenDeep<L extends Function>(target: {
    l: Set<L>,
    d: Set<DeepListener>,
    forEach: (fn: (value: any) => void) => void,
} & ListenDeep<L>) {
    target.attach = function(listener) {
        this.l.add(listener);
        return listener;
    };

    target.attachDeep = function(listener) {
        this.d.add(listener);
        this.forEach(value => addListenerRecursively(value, listener));
        return listener;
    };

    target.detach = function(listener) {
        this.l.delete(listener);
    };

    target.detachDeep = function(listener) {
        this.d.delete(listener);
        this.forEach(value => removeListenerRecursively(value, listener));
    };
}