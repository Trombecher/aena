import {_Object, forEachString, isInstanceOf} from "./shared-aliases.js";

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

let addOrRemoveDeepListener = (item, method, listener) => isInstanceOf(item, State)
    // SAFETY: `item` is guaranteed to be of type `State` and therefore `item.l` is of type `Set`.
    ? item.l[method](listener)
    : isInstanceOf(item, List)
        // SAFETY: `item` is guaranteed to be of type `List` and therefore `item.d` is of type `Set`.
        ? item.d[method](listener)
        : (isInstanceOf(item, _Object) && _Object.values(item)[forEachString](item => addOrRemoveDeepListener(item, method, listener)));

let attachOrDetachListenerOnTargets = (listener, targets, method) => targets[forEachString](target =>
    addOrRemoveDeepListener(target, method, listener));

let attachOrDetachDeepList = (list, targets, method) => list.d[forEachString](listener =>
    attachOrDetachListenerOnTargets(listener, targets, method));

/**
 * SAFETY: Caller must ensure that `list` is of type `List` and `...spliceArgs` conform to `Array.splice` args.
 */
export let mutateList = (list, ...spliceArgs) => (
    // Detach all deep listeners from all removed elements
    attachOrDetachDeepList(list, list.v.splice(...spliceArgs), "delete"),

        // Add all existing deep listeners
        attachOrDetachDeepList(list, spliceArgs.slice(2), "add"),

        // Notify listeners and deep listeners
        list.l[forEachString](listener => listener(list.v, ...spliceArgs)),
        list.d[forEachString](listener => listener()));

export let attachDeep = (list, deepListener) => (attach(list, deepListener, "d"),
    attachOrDetachListenerOnTargets(deepListener, list.v, "add"),
    deepListener);

export let detachDeep = (list, deepListener) => (detach(list, deepListener, "d"),
    attachOrDetachListenerOnTargets(deepListener, list.v, "delete"));

// SHARED

export let get = state => state.v;

export let derive = (stateOrList, transform, newState = new State(transform(stateOrList.v, stateOrList.v))) =>
    (attach(stateOrList, (value, oldValue) => setState(newState, transform(value, oldValue))), newState);

export let attach = (stateOrList, listener, property = "l") =>
    (stateOrList[property].add(listener), listener);

export let detach = (state, listener, property = "l") => {
    state[property].delete(listener);
};