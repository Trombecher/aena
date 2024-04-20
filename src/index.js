// Aliasing
let setAttributeOnElement = (element, key, value) => element.setAttribute(key, value),
    isInstanceOf = (test, prototype) => test instanceof prototype,
    _document = document,
    createText = text => _document.createTextNode(text || ""),
    nextSibling = element => element.nextSibling,
    createElementString = "createElement",
    forEach = "forEach",
    slice = "slice",
    toUpperCase = "toUpperCase";

export function State(value) {
    this.l = new Set;
    this.v = value;
}

export let getState = state => state.v;

export let setState = (state, value, oldValue = state.v) => value !== state.v &&
    (state.v = value, state.l[forEach](listener => listener(value, oldValue)));

export let deriveState = (state, transform, newState = new State(transform(state.v))) =>
    (attach(state, (value, oldValue) => setState(newState, transform(value, oldValue))), newState);

export let attach = (state, listener) => (state.l.add(listener), listener);

export let detach = (state, listener) => {
    state.l.delete(listener);
};

export let insertStateToString = (state, transform = x => x, textNode = createText(transform(state.v))) =>
    (attach(state, (value, oldValue) => textNode.textContent = transform(value, oldValue)), textNode);

export let insertState = (state, transform, start = createText(), end = createText()) =>
    (attach(state, element => {
        while(nextSibling(start) !== end) nextSibling(start).remove();
        traverseAndRender(transform(element), node => end.before(node));
    }), [start, transform(state.v), end]);

let traverseAndRender = (element, callback) => isInstanceOf(element, Node)
    ? callback(element) // Call the callback with the node.
    : isInstanceOf(element, Array)
        ? element[forEach](element => traverseAndRender(element, callback)) // Call recursively for children
        : (element || element === 0) && callback("" + element); // To string if element

export let mount = (target, element) => traverseAndRender(element, node => target.append(node));

let testSVG = tag => window[`SVG${tag}Element`];

export let createElement = (tagOrFunction, props, ...children) => {
    props ||= {};

    if(isInstanceOf(tagOrFunction, Function))
        return (props.children = children, tagOrFunction(props));

    let element = testSVG(tagOrFunction[0][toUpperCase]() + tagOrFunction[slice](1)) || testSVG(tagOrFunction[toUpperCase]())
        ? _document[createElementString + "NS"]("http://www.w3.org/2000/svg", tagOrFunction)
        : _document[createElementString](tagOrFunction);

    Object.entries(props)[forEach](([key, value]) => key[0] === "_"
        ? (key = key[slice](1), setAttributeOnElement(
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

export let Fragment = ({children: c}) => c;