// CONSTRUCTORS

export function State(value) {
    init(this, value);
}

export function List(list = []) {
    init(this, list);
}

// ALIASES

let setAttributeOnElement = (element, key, value) => element.setAttribute(key, value),
    isInstanceOf = (test, prototype) => test instanceof prototype,
    _document = document,
    createText = text => _document.createTextNode(text || ""),
    nextSibling = element => element.nextSibling,
    createElementString = "createElement",
    forEach = "forEach",
    toUpperCase = "toUpperCase",
    childrenString = "children";

let init = (target, value) => (target.l = new Set, target.v = value);

// STATE

export let setState = (state, value, oldValue = state.v) => value !== state.v &&
    (state.v = value, state.l[forEach](listener => listener(value, oldValue)));

// LIST

export let mutateList = (list, ...spliceArgs) =>
    (list.v.splice(...spliceArgs), list.l[forEach](listener => listener(list.v, ...spliceArgs)));

export let insertList = (
    list,
    transform,
    anchor = createText()
) => (attach(list, (_, start, deleteCount, ...itemsToInsert) => {
    let current = anchor;
    while(start--) current = nextSibling(current);

    while(deleteCount--) nextSibling(current).remove();

    current.after(...itemsToInsert.map(transform));
}),
    [anchor, list.v.map(transform)]);

// SHARED

export let get = state => state.v;

export let derive = (stateOrList, transform, newState = new State(transform(stateOrList.v, stateOrList.v))) =>
    (attach(stateOrList, (value, oldValue) => setState(newState, transform(value, oldValue))), newState);

export let attach = (stateOrList, listener) => (stateOrList.l.add(listener), listener);

export let detach = (state, listener) => {
    state.l.delete(listener);
};

export let insertToString = (
    stateOrList,
    transform = x => x,
    textNode = createText(transform(stateOrList.v, stateOrList.v))
) => (attach(stateOrList, (value, oldValue) => textNode.textContent = transform(value, oldValue)),
    textNode);

export let insert = (
    stateOrList,
    transform,
    start = createText(),
    end = createText()
) => (attach(stateOrList, (value, oldValue) => {
    while(nextSibling(start) !== end) nextSibling(start).remove();
    traverseAndRender(transform(value, oldValue), node => end.before(node));
}), [start, transform(stateOrList.v, stateOrList.v), end]);

// JSX

export let traverseAndRender = (element, callback) => isInstanceOf(element, Node)
    ? callback(element) // Call the callback with the node.
    : isInstanceOf(element, Array)
        ? element[forEach](element => traverseAndRender(element, callback)) // Call recursively for children
        : (element || element === 0) && callback("" + element); // To string if element

export let mount = (target, element) => traverseAndRender(element, node => target.append(node));

let testSVG = tag => window[`SVG${tag}Element`];

export let createElement = (tagOrFunction, props, ...children) => {
    props ||= {};

    if(isInstanceOf(tagOrFunction, Function))
        return (props[childrenString] = children, tagOrFunction(props));

    let element = testSVG(tagOrFunction[0][toUpperCase]() + tagOrFunction.slice(1)) || testSVG(tagOrFunction[toUpperCase]())
        ? _document[createElementString + "NS"]("http://www.w3.org/2000/svg", tagOrFunction)
        : _document[createElementString](tagOrFunction);

    Object.entries(props)[forEach](([key, value]) => key[0] === "_"
        ? (key = key.slice(1), setAttributeOnElement(
            element,
            key,
            isInstanceOf(value, State)
                ? (attach(value, value => setAttributeOnElement(element, key, value)), value.v)
                : value
        ))
        : element[key] = isInstanceOf(value, State)
            ? (attach(value, value => element[key] = value), value.v)
            : value);

    mount(element, children);
    // TODO: ref

    return element;
};

export let Fragment = props => props[childrenString];