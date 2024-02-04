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