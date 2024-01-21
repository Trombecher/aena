import {JSX} from "./jsx-runtime";
import {Box, BoxArray, BoxMap, BoxSet} from "./state";
import {Action as BoxArrayAction} from "./state/array";
import {Action as BoxSetAction} from "./state/set";
import {Action as BoxMapAction} from "./state/map";

export function insertBoxAsText(box: Box<any>): Node {
    const textNode = document.createTextNode(box.value + "");
    box.addListener(value => textNode.textContent = value + "");
    return textNode;
}

export function insertBox<T>(box: Box<T>, transform: (value: T) => string): Node {
    const textNode = document.createTextNode(transform(box.value));
    box.addListener(value => textNode.textContent = transform(value));
    return textNode;
}

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

function toNodeUnsupported(jsx: JSX.Element): Node {
    if(jsx instanceof Array)
        throw new Error("Cannot map value to fragment because multiple `Node`s per value are not supported");
    return jsx;
}

export function insertBoxArray<T>(boxArray: BoxArray<T>, mapper: (value: T) => JSX.Element): Node[] {
    const anchor = document.createTextNode("");
    const nodes = boxArray.map(value => toNodeUnsupported(mapper(value)));
    nodes.splice(0, 0, anchor);

    boxArray.addListener(change => {
        switch(change.action) {
            case BoxArrayAction.Insert: {
                let target: ChildNode = anchor;
                for(let i = 0; i < change.index; ++i) target = target.nextSibling!;
                target.after(toNodeUnsupported(mapper(change.value)));
                break;
            }
            case BoxArrayAction.Swap: {
                let a: ChildNode = anchor.nextSibling!;
                for(let i = 0; i < change.indexA; ++i) a = a.nextSibling!;

                let b: ChildNode = anchor.nextSibling!;
                for(let i = 0; i < change.indexB; ++i) b = b.nextSibling!;

                const nodeBeforeA = a.previousSibling!;
                b.after(a);
                nodeBeforeA.after(b);
                break;
            }
            case BoxArrayAction.Delete: {
                let target: ChildNode = anchor;
                for(let i = 0; i < change.index + 1; ++i) target = target.nextSibling!;
                target.remove();
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

export function insertBoxSet<T>(set: BoxSet<T>, mapper: (value: T) => JSX.Element) {
    const anchor = document.createTextNode("");

    // Map each value of the set to a node (through `mapper`).
    const nodeMap = new Map<T, Node>();
    set.forEach(value => nodeMap.set(value, toNodeUnsupported(mapper(value))));

    set.addListener(change => {
        switch(change.action) {
            case BoxSetAction.Add: {
                let lastChild: ChildNode = anchor;
                let setSize = set.size - 1;
                while(setSize--)
                    lastChild = lastChild.nextSibling!;

                const node = toNodeUnsupported(mapper(change.value));
                nodeMap.set(change.value, node);

                lastChild.after(node);
                break;
            }
            case BoxSetAction.Delete: {
                (nodeMap.get(change.value) as ChildNode).remove();
                nodeMap.delete(change.value);
                break;
            }
        }
    });

    // const oldNode = nodeMap.get(oldValue) as ChildNode;
    // nodeMap.delete(oldValue);
    // let newNode;
    // if(nodeMap.has(newValue)) {
    //     newNode = nodeMap.get(newValue)!;
    // } else {
    //     newNode = toNodeUnsupported(mapper(newValue));
    //     nodeMap.set(newValue, newNode);
    // }
    // oldNode.replaceWith(newNode);

    return [anchor, ...nodeMap.values()];
}

export function insertBoxSetAsText(boxSet: BoxSet<any>) {
    const textNode = document.createTextNode(boxSet.toString());
    boxSet.addListener(() => textNode.textContent = boxSet.toString());
    return textNode;
}

export function insertBoxMap<K, V>(map: BoxMap<K, V>, mapper: (key: K, value: V) => JSX.Element) {
    const anchor = document.createTextNode("");
    const nodeMap = new Map<K, Node>();
    map.forEach((value, key) =>
        nodeMap.set(key, toNodeUnsupported(mapper(key, value))));

    let previousSize = map.size;

    map.addListener(change => {
        switch(change.action) {
            case BoxMapAction.Set: {
                let prev: ChildNode = anchor;
                while(previousSize--)
                    prev = prev.nextSibling!;

                const node = toNodeUnsupported(mapper(change.key, change.value));
                nodeMap.set(change.key, node);

                prev.after(node);
                previousSize = map.size;
                break;
            }
            case BoxMapAction.Delete: {
                const node = nodeMap.get(change.key) as ChildNode;
                nodeMap.delete(change.key);
                node.remove();
                previousSize = map.size;
                break;
            }
        }
    });

    // Old replace code:

    // const oldNode = nodeMap.get(oldKey)!;
    // const newNode = toNodeUnsupported(mapper(newKey, newValue));
    // oldNode.parentNode!.replaceChild(newNode, oldNode);
    // nodeMap.delete(oldKey);
    // nodeMap.set(newKey, newNode);

    return [anchor, ...nodeMap.values()];
}

export function insertBoxMapAsText(boxMap: BoxMap<any, any>) {
    const textNode = document.createTextNode(boxMap.toString());
    boxMap.addListener(() => textNode.textContent = boxMap.toString());
    return textNode;
}