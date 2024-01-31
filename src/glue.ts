import {JSX, renderToNode, traverseAndRender} from "./jsx-runtime";
import {Box, BoxArray, BoxMap, BoxSet} from "./index";
import {Action as BoxArrayAction} from "./array";
import {Action as BoxSetAction} from "./set";
import {Action as BoxMapAction} from "./map";

const createAnchor = () => document.createTextNode("");

export function insertBoxAsText(box: Box<any>): Node {
    const textNode = document.createTextNode(box.value + "");
    box.addListener(value => textNode.textContent = value + "");
    return textNode;
}

export function insertBoxToString<T>(box: Box<T>, transform: (value: T) => string): Node {
    const textNode = document.createTextNode(transform(box.value));
    box.addListener(value => textNode.textContent = transform(value));
    return textNode;
}

export function insertBox<T>(box: Box<T>, transform: (value: T) => JSX.Element) {
    const start = createAnchor();
    const end = createAnchor();
    box.addListener(element => {
        while(start.nextSibling !== end) start.nextSibling!.remove();
        traverseAndRender(transform(element), node => end.before(node));
    });
    return [start, transform(box.value), end];
}

/*
export function insertBoxNode(box: Box<Node>) {
    let previousNode = box.value;
    box.addListener(node => {
        previousNode.parentNode!.replaceChild(node, previousNode);
        previousNode = node;
    });
    return [previousNode];
}

export function insertBoxNodes(box: Box<Iterable<Node>>) {
    const anchor = document.createTextNode("");
    let previousLength = 0;
    for(const _ of box.value) previousLength += 1;
    box.addListener(nodes => {
        while(previousLength--) anchor.nextSibling!.remove();
        previousLength = 0;
        let lastNode: Node = anchor;
        for(const currentNode of nodes) {
            (lastNode as ChildNode).after(currentNode);
            lastNode = currentNode;
            previousLength += 1;
        }
    });
    return [anchor, ...box.value];
}
 */

export function insertBoxArray<T>(array: BoxArray<T>, transform: (value: T) => JSX.Element): JSX.Element[] {
    const start = createAnchor();
    const nodes = array.map(value => renderToNode(transform(value)));
    nodes.unshift(start);

    array.addListener(change => {
        switch(change.action) {
            case BoxArrayAction.Insert: {
                const node = renderToNode(transform(change.value));
                (nodes[change.index] as ChildNode).after(node);
                nodes.splice(change.index + 1, 0, node);
                break;
            }
            case BoxArrayAction.Swap: {
                const a = nodes[change.indexA + 1]!;
                const b = nodes[change.indexB + 1]!;

                nodes.splice(change.indexA + 1, 1, b);
                nodes.splice(change.indexB + 1, 1, a);

                // DOM Swap:

                // There is always a `previousSilbling` because of the `start` anchor.
                const prevA = a.previousSibling!;
                (b as ChildNode).replaceWith(a);
                prevA.after(b);
                break;
            }
            case BoxArrayAction.Delete: {
                (nodes[change.index + 1] as ChildNode).remove();
                nodes.splice(change.index + 1, 1);
                break;
            }
        }
    });

    return nodes;
}

export function insertBoxArrayAsText(boxArray: BoxArray<any>) {
    const textNode = document.createTextNode(boxArray.toString());
    boxArray.addListener(() => textNode.textContent = boxArray.toString());
    return textNode;
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

    set.addListener(change => {
        switch(change.action) {
            case BoxSetAction.Add: {
                const node = renderToNode(transform(change.value));
                nodeMap.set(change.value, node);
                end.before(node);
                break;
            }
            case BoxSetAction.Delete: {
                (nodeMap.get(change.value) as ChildNode).remove();
                nodeMap.delete(change.value);
                break;
            }
        }
    });

    initialNodes[set.size] = end;
    return initialNodes;
}

export function insertBoxSetAsText(boxSet: BoxSet<any>) {
    const textNode = document.createTextNode(boxSet.toString());
    boxSet.addListener(() => textNode.textContent = boxSet.toString());
    return textNode;
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

    map.addListener(change => {
        switch(change.action) {
            case BoxMapAction.Set: {
                const node = renderToNode(transform(change.key, change.value));
                nodeMap.set(change.key, node);
                end.after(node);
                break;
            }
            case BoxMapAction.Delete: {
                (nodeMap.get(change.key) as ChildNode).remove();
                nodeMap.delete(change.key);
                break;
            }
        }
    });

    initialNodes[map.size] = end;
    return initialNodes;
}

export function insertBoxMapAsText(boxMap: BoxMap<any, any>) {
    const textNode = document.createTextNode(boxMap.toString());
    boxMap.addListener(() => textNode.textContent = boxMap.toString());
    return textNode;
}