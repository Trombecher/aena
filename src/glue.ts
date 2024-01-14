import {JSX} from "./jsx-runtime";
import {Box, BoxArray, BoxMap, BoxSet} from "./box/index";

export function insertBoxAsText(box: Box<any>): Node {
    const textNode = document.createTextNode(box.value + "");
    box.onChange(value => textNode.textContent = value + "");
    return textNode;
}

export function insertBox<T>(box: Box<T>, transform: (value: T) => string): Node {
    const textNode = document.createTextNode(transform(box.value));
    box.onChange(value => textNode.textContent = transform(value));
    return textNode;
}

export function insertBoxNode(box: Box<Node>) {
    let previousNode = box.value;
    box.onChange(node => {
        previousNode.parentNode!.replaceChild(node, previousNode);
        previousNode = node;
    });
    return [previousNode];
}

export function insertBoxNodes(box: Box<Iterable<Node>>) {
    const anchor = document.createTextNode("");
    let previousLength = 0;
    for(const _ of box.value) previousLength += 1;
    box.onChange(nodes => {
        while(previousLength--) anchor.nextSibling!.remove();
        previousLength = 0;
        let lastNode: Node = anchor;
        for(const currentNode of nodes) {
            (lastNode as ChildNode).after(currentNode);
            lastNode = currentNode;
            previousLength += 1;
        }
    })
    return [anchor, ...box.value];
}

function toNodeUnsupported(jsx: JSX.Element): Node {
    if(jsx instanceof Array)
        throw new Error("Cannot map value to fragment because multiple `Node`s per value are not supported");
    return jsx;
}

export function insertBoxArray<T>(boxArray: BoxArray<T>, mapper: (value: T) => JSX.Element): Node[] {
    const anchor = document.createTextNode("");
    const nodes = boxArray.map(value => toNodeUnsupported(mapper(value)));
    nodes.splice(0, 0, anchor);
    boxArray.onInsert((value, index) => {
        let target: ChildNode = anchor;
        for(let i = 0; i < index; ++i) target = target.nextSibling!;
        target.after(toNodeUnsupported(mapper(value)));
    });
    boxArray.onRemove((_, index) => {
        let target: ChildNode = anchor;
        for(let i = 0; i < index + 1; ++i) target = target.nextSibling!;
        target.remove();
    });
    boxArray.onSwap((_, __, indexA, indexB) => {
        let a: ChildNode = anchor.nextSibling!;
        for(let i = 0; i < indexA; ++i) a = a.nextSibling!;

        let b: ChildNode = anchor.nextSibling!;
        for(let i = 0; i < indexB; ++i) b = b.nextSibling!;

        const nodeBeforeA = a.previousSibling!;
        b.after(a);
        nodeBeforeA.after(b);
    });
    return nodes;
}

export function insertBoxArrayAsText(boxArray: BoxArray<any>) {
    const textNode = document.createTextNode(boxArray.toString());
    const update = () => textNode.textContent = boxArray.toString();
    boxArray.onInsert(update);
    boxArray.onSwap(update);
    boxArray.onRemove(update);
    return textNode;
}

export function insertBoxSet<T>(set: BoxSet<T>, mapper: (value: T) => JSX.Element) {
    const anchor = document.createTextNode("");

    // Map each value of the set to a node (through `mapper`).
    const nodeMap = new Map<T, Node>();
    set.forEach(value => nodeMap.set(value, toNodeUnsupported(mapper(value))));

    set.onAdd(value => {
        let lastChild: ChildNode = anchor;
        let setSize = set.size - 1;
        while(setSize--)
            lastChild = lastChild.nextSibling!;

        const node = toNodeUnsupported(mapper(value));
        nodeMap.set(value, node);

        lastChild.after(node);
    });

    set.onDelete(value => {
        (nodeMap.get(value) as ChildNode).remove();
        nodeMap.delete(value);
    });

    set.onReplace((_, oldValue, newValue) => {
        const oldNode = nodeMap.get(oldValue) as ChildNode;
        let newNode;
        if(nodeMap.has(newValue)) {
            newNode = nodeMap.get(newValue)!;
        } else {
            newNode = toNodeUnsupported(mapper(newValue));
            nodeMap.set(newValue, newNode);
        }
        oldNode.replaceWith(newNode);
    });

    return [anchor, ...nodeMap.values()];
}

export function insertBoxSetAsText(boxSet: BoxSet<any>) {
    const textNode = document.createTextNode(boxSet.toString());
    const update = () => textNode.textContent = boxSet.toString();
    boxSet.onAdd(update);
    boxSet.onDelete(update);
    boxSet.onReplace(update);

    return textNode;
}

export function insertBoxMap<K, V>(map: BoxMap<K, V>, mapper: (key: K, value: V) => JSX.Element) {
    const anchor = document.createTextNode("");
    const nodeMap = new Map<K, Node>();
    map.forEach((value, key) => nodeMap.set(key, toNodeUnsupported(mapper(key, value))));

    let previousSize = map.size;

    map.onSet((key, value) => {
        let prev: ChildNode = anchor;
        while(previousSize--)
            prev = prev.nextSibling!;

        const node = toNodeUnsupported(mapper(key, value));
        nodeMap.set(key, node);

        prev.after(node);
        previousSize = map.size;
    });

    map.onDelete(key => {
        const node = nodeMap.get(key) as ChildNode;
        nodeMap.delete(key);
        node.remove();
        previousSize = map.size;
    });

    return [anchor, ...nodeMap.values()];
}

export function insertBoxMapAsText(boxMap: BoxMap<any, any>) {
    const textNode = document.createTextNode(boxMap.toString());
    const update = () => textNode.textContent = boxMap.toString();
    boxMap.onSet(update);
    boxMap.onDelete(update);
    return textNode;
}