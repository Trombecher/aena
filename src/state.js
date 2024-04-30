import {_Object, forEachString, isArray, isInstanceOf, objectEntries} from "./shared-aliases";

// ALIASES

let startsWithString = "startsWith",
    sString = "s",
    lString = "l";

// STATE

export function State(value) {
    init(this, value);
}

export function List(list = []) {
    init(this, list); // Add value (this.v) and listeners (this.l)
    this.d = new Set; // Add deep listeners (this.d)
    // this.i = new Map; // (Potential) items count
}

let init = (target, value) => (target.l = new Set, target.v = value);

// STATE

export let setState = (state, value, oldValue = state.v) => value !== state.v &&
    (state.v = value, state.l[forEachString](listener => listener(value, oldValue)));

// LIST

/**
 * @param {any} item
 * @param {"add" | "delete"} method
 * @param {() => void} listener
 * @returns {any}
 */
let addOrRemoveDeepListener = (item, method, listener) => isInstanceOf(item, State)
    // SAFETY: `item` is guaranteed to be of type `State` and therefore `item.l` is of type `Set`.
    ? item.l[method](listener)
    : isInstanceOf(item, List)
        // SAFETY: `item` is guaranteed to be of type `List`
        ? (attach(item, listener, "d"), attachOrDetachDeepListenerOnTargets(listener, item.v, method))
        : (isInstanceOf(item, _Object) && _Object.values(item)[forEachString](item => addOrRemoveDeepListener(item, method, listener)));

/**
 * @param {() => void} listener
 * @param {any[]} targets
 * @param {"add" | "delete"} method
 */
let attachOrDetachDeepListenerOnTargets = (listener, targets, method) => targets[forEachString](target =>
    addOrRemoveDeepListener(target, method, listener));

/**
 * @param {List} list
 * @param {any[]} targets
 * @param {"add" | "delete"} method
 * @returns {*}
 */
let attachOrDetachDeepListenersOfListOnTargets = (list, targets, method) => list.d[forEachString](listener =>
    attachOrDetachDeepListenerOnTargets(listener, targets, method));

/**
 * SAFETY: Caller must ensure that `list` is of type `List` and `...spliceArgs` conform to `Array.splice` args.
 */
export let mutateList = (list, ...spliceArgs) => (
    // Detach all deep listeners from all removed elements
    attachOrDetachDeepListenersOfListOnTargets(list, list.v.splice(...spliceArgs), "delete"),

        // Add all existing deep listeners
        attachOrDetachDeepListenersOfListOnTargets(list, spliceArgs.slice(2), "add"),

        // Notify listeners and deep listeners
        list.l[forEachString](listener => listener(list.v, ...spliceArgs)),
        list.d[forEachString](listener => listener()));

export let attachDeep = (list, deepListener) => (attach(list, deepListener, "d"),
    attachOrDetachDeepListenerOnTargets(deepListener, list.v, "add"),
    deepListener);

export let detachDeep = (list, deepListener) => (detach(list, deepListener, "d"),
    attachOrDetachDeepListenerOnTargets(deepListener, list.v, "delete"));

// SHARED

export let get = state => state.v;

export let derive = (stateOrList, transform, newState = new State(transform(stateOrList.v, stateOrList.v))) =>
    (attach(stateOrList, (value, oldValue) => setState(newState, transform(value, oldValue))), newState);

export let attach = (stateOrList, listener, property = lString) =>
    (stateOrList[property].add(listener), listener);

export let detach = (state, listener, property = lString) => {
    state[property].delete(listener);
};

// Serialization

export let stringify = state => JSON.stringify(state, (_, value) =>
    (!isInstanceOf(value, _Object) || isArray(value))
        ? value
        : isInstanceOf(value, State)
            ? {s: value.v}
            : isInstanceOf(value, List)
                ? {l: value.v}
                : objectEntries(value).reduce((obj, [key, value]) =>
                    (obj[key[startsWithString](sString)
                        ? sString + key
                        : key[startsWithString](lString)
                            ? lString + key
                            : key] = value, obj), {}));

export let parse = input => JSON.parse(input, (_, value) =>
    (!isInstanceOf(value, _Object) || isArray(value) || isInstanceOf(value, State) || isInstanceOf(value, List))
        ? value
        : sString in value
            ? new State(value.s)
            : lString in value
                ? new List(value.l)
                : (objectEntries(value)[forEachString](([key, v]) => {
                    if(key[startsWithString](sString) || key[startsWithString](lString)) {
                        delete value[key];
                        value[key.slice(1)] = v;
                    }
                }), value));