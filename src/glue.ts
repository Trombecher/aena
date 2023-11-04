import {Box, BoxArray} from "./box";
import {JSX} from "./jsx-runtime";

export function insertBox<T>(box: Box<T>): Node {
    const textNode = document.createTextNode(box.value + "");
    box.onChange(value => textNode.textContent = value + "");
    return textNode;
}

function toNodeUnsupported(jsx: JSX.Element): Node {
    if(jsx instanceof Array)
        throw new Error("BoxStack: Cannot map value to fragment because multiple `Node`s per value are not supported");
    return jsx;
}

export function insertBoxArray<T>(boxArray: BoxArray<T>, mapper: (value: T) => JSX.Element): Node[] {
    const anchor = document.createTextNode("");
    const nodes = boxArray.map(value => toNodeUnsupported(mapper(value)));
    nodes.splice(0, 0, anchor);
    boxArray.onInsert((value, index) => {
        let target: ChildNode = anchor;
        for(let i = 0; i < index - 1; ++i) target = target.nextSibling!;
        target.after(toNodeUnsupported(mapper(value)));
    });
    boxArray.onRemove((_, index) => {
        let target: ChildNode = anchor;
        for(let i = 0; i < index + 1; ++i) target = target.nextSibling!;
        target.remove();
    });
    boxArray.onSwap((_, aIndex, __, bIndex) => {
        let a: ChildNode = anchor.nextSibling!;
        for(let i = 0; i < aIndex; ++i) a = a.nextSibling!;

        let b: ChildNode = anchor.nextSibling!;
        for(let i = 0; i < bIndex; ++i) b = b.nextSibling!;

        const nodeBeforeA = a.previousSibling!;
        b.after(a);
        nodeBeforeA.after(b);
    });
    return nodes;
}