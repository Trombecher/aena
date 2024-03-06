import {addListenerRecursively, DeepListener, removeListenerRecursively} from "./index";

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