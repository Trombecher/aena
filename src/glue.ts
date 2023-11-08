import {Box, BoxArray} from "./box";
import {JSX} from "./jsx-runtime";

export function insertBoxAsText<T>(box: Box<T>): Node {
    const textNode = document.createTextNode(box.value + "");
    box.onChange(value => textNode.textContent = value + "");
    return textNode;
}

export function insertBox<T>(box: Box<T>, transform: (value: T) => string): Node {
    const textNode = document.createTextNode(transform(box.value));
    box.onChange(value => textNode.textContent = transform(value));
    return textNode;
}

export function insertBoxJSX(box: Box<JSX.Element>): Node[] {
    let len = Array.isArray(box.value) ? box.value.length : 1;
    const anchor = document.createTextNode("");
    const nodes = new Array(len + 1);
    nodes[0] = anchor;

    if(Array.isArray(box.value))
        for(let i = 1; i < len + 1; ++i)
            nodes[i] = box.value[i];
    else nodes[1] = box.value;

    box.onChange(jsx => {
        while(len--) anchor.nextSibling!.remove();

        if(jsx instanceof Node) {
            len = 1;
            anchor.after(jsx);
        } else {
            len = jsx.length;
            while(len--) anchor.after(...jsx);
            len = jsx.length;
        }
    })
    return nodes;
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

export function insertBoxArrayAsText<T>(boxArray: BoxArray<T>) {
    const textNode = document.createTextNode(boxArray.toString());
    const update = () => textNode.textContent = boxArray.toString();
    boxArray.onInsert(update);
    boxArray.onSwap(update);
    boxArray.onRemove(update);
    return textNode;
}