import {JSX, renderToNode, traverseAndRender} from "./jsx-runtime";
import {Box, BoxArray, BoxMap, BoxSet} from "./index";
import {ACTION_INSERT as ARRAY_ACTION_INSERT, ACTION_SWAP as ARRAY_ACTION_SWAP, ACTION_DELETE as ARRAY_ACTION_DELETE} from "./array";
import {ACTION_ADD as SET_ACTION_ADD, ACTION_DELETE as SET_ACTION_DELETE} from "./set";
import {ACTION_SET as MAP_ACTION_SET, ACTION_DELETE as MAP_ACTION_DELETE} from "./map";

const createAnchor = () => document.createTextNode("");

export function insertBoxAsString(box: Readonly<Box<any>>): Node {
    const textNode = document.createTextNode(box.value + "");
    box.attach(value => textNode.textContent = value + "");
    return textNode;
}

export function insertBoxToString<T>(box: Readonly<Box<T>>, transform: (value: T) => string): Node {
    const textNode = document.createTextNode(transform(box.value));
    box.attach(value => textNode.textContent = transform(value));
    return textNode;
}

export function insertBox<T>(box: Readonly<Box<T>>, transform: (value: T) => JSX.Element) {
    const start = createAnchor();
    const end = createAnchor();
    box.attach(element => {
        while(start.nextSibling !== end) start.nextSibling!.remove();
        traverseAndRender(transform(element), node => end.before(node));
    });
    return [start, transform(box.value), end];
}

export function insertBoxArray<T>(array: BoxArray<T>, transform: (value: T) => JSX.Element): JSX.Element[] {
    const start = createAnchor();
    const nodes = array.map(value => renderToNode(transform(value)));
    nodes.unshift(start);

    array.attach(change => {
        switch(change.action) {
            case ARRAY_ACTION_INSERT: {
                const node = renderToNode(transform(change.value));
                (nodes[change.index] as ChildNode).after(node);
                nodes.splice(change.index + 1, 0, node);
                break;
            }
            case ARRAY_ACTION_SWAP: {
                const a = nodes[change.indexA + 1]!;
                const b = nodes[change.indexB + 1]!;

                nodes.splice(change.indexA + 1, 1, b);
                nodes.splice(change.indexB + 1, 1, a);

                // DOM Swap:

                // There is always a `previousSibling` because of the `start` anchor.
                const prevA = a.previousSibling!;
                (b as ChildNode).replaceWith(a);
                prevA.after(b);
                break;
            }
            case ARRAY_ACTION_DELETE: {
                (nodes[change.index + 1] as ChildNode).remove();
                nodes.splice(change.index + 1, 1);
                break;
            }
        }
    });

    return nodes;
}

export function insertBoxSet<T>(set: BoxSet<T>, transform: (value: T) => JSX.Element) {
    const end = createAnchor();
    // Preallocate for nodes of rendered transformed values of set and end anchor.
    const initialNodes = new Array<Node>(set.size + 1);
    const nodeMap = new Map<T, Node>();
    let i = 0;

    set.forEach(value => {
        const node = renderToNode(transform(value));
        nodeMap.set(value, node);
        initialNodes[i++] = node;
    });

    set.attach(change => {
        switch(change.action) {
            case SET_ACTION_ADD: {
                const node = renderToNode(transform(change.value));
                nodeMap.set(change.value, node);
                end.before(node);
                break;
            }
            case SET_ACTION_DELETE: {
                (nodeMap.get(change.value) as ChildNode).remove();
                nodeMap.delete(change.value);
                break;
            }
        }
    });

    initialNodes[set.size] = end;
    return initialNodes;
}

export function insertBoxMap<K, V>(map: BoxMap<K, V>, transform: (key: K, value: V) => JSX.Element): JSX.Element[] {
    const end = createAnchor();
    const initialNodes = new Array<Node>(map.size + 1);
    const nodeMap = new Map<K, Node>();
    let i = 0;

    map.forEach((value, key) => {
        const node = renderToNode(transform(key, value));
        nodeMap.set(key, node);
        initialNodes[i++] = node;
    });

    map.attach(change => {
        switch(change.action) {
            case MAP_ACTION_SET: {
                const node = renderToNode(transform(change.key, change.value));
                nodeMap.set(change.key, node);
                end.after(node);
                break;
            }
            case MAP_ACTION_DELETE: {
                (nodeMap.get(change.key) as ChildNode).remove();
                nodeMap.delete(change.key);
                break;
            }
        }
    });

    initialNodes[map.size] = end;
    return initialNodes;
}