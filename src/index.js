import { forEachString, isArray, isInstanceOf, objectEntries } from "./shared-aliases.js";
import { attach, State } from "./state.js";

// ALIASES

let setAttributeOnElement = (element, key, value) => element.setAttribute(key, value),
    _document = document,
    createText = text => _document.createTextNode(text || ""),
    nextSibling = element => element.nextSibling,
    createElementString = "createElement",
    childrenString = "children";

// STATE INTEGRATION

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
    while (nextSibling(start) !== end) nextSibling(start).remove();
    traverseAndRender(transform(value, oldValue), node => end.before(node));
}), [start, transform(stateOrList.v, stateOrList.v), end]);

export let insertList = (
    list,
    transform,
    anchor = createText()
) => (attach(list, (_, start, deleteCount, ...itemsToInsert) => {
    let current = anchor;
    while (start--) current = nextSibling(current);

    while (deleteCount--) nextSibling(current).remove();

    current.after(...itemsToInsert.map(transform));
}),
    [anchor, list.v.map(transform)]);

// JSX

export let traverseAndRender = (element, callback) => isInstanceOf(element, Node)
    ? callback(element) // Call the callback with the node.
    : isArray(element)
        ? element[forEachString](element => traverseAndRender(element, callback)) // Call recursively for children
        : (element || element === 0) && callback("" + element); // To string if element

export let mount = (target, element) => traverseAndRender(element, node => target.append(node));

export let createElement = (tagOrFunction, props, ...children) => {
    props ||= {};

    if (isInstanceOf(tagOrFunction, Function))
        return (props[childrenString] = children, tagOrFunction(props));

    let element = tagOrFunction.slice(-1) === "_"
        ? _document[createElementString + "NS"]("http://www.w3.org/2000/svg", tagOrFunction.slice(0, -1))
        : _document[createElementString](tagOrFunction);

    objectEntries(props)[forEachString](([key, value]) => key === "ref"
        ? value(element)
        : key[0] === "_"
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

    return element;
};

export let Fragment = props => props[childrenString];

export let Suspense = (props, wrapper = createElement("div", { style: "display:contents" }, props.fallback)) => (
    Promise
        .all(props[childrenString])
        .then(children => (wrapper.innerHTML = "", mount(wrapper, children))),
    wrapper
);