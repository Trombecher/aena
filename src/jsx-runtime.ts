import {Box, BoxArray, BoxMap, BoxSet} from "./box";
import {insertBoxArrayAsText, insertBoxAsText, insertBoxJSX, insertBoxMapAsText, insertBoxSetAsText} from "./glue";
import {svgElements} from "./constants";

export namespace JSX {
    export type Element = Node | Node[];

    export interface IntrinsicElements {
        [index: string]: any;
    }
}

const keyMap: {[key: string]: string} = {
    "class": "className"
};

function flatChildren(target: JSX.Element[], children: any[]) {
    for(let i = 0; i < children.length; ++i) {
        const child = children[i];
        if(child instanceof Node) target.push(child);
        else if(child instanceof Array) flatChildren(target, child);
        else if(child instanceof Box) {
            if(child.value instanceof Array || child.value instanceof Node)
                target.push(insertBoxJSX(child));
            else target.push(insertBoxAsText(child));
        } else if(child instanceof BoxArray) target.push(insertBoxArrayAsText(child));
        else if(child instanceof BoxSet) target.push(insertBoxSetAsText(child));
        else if(child instanceof BoxMap) target.push(insertBoxMapAsText(child));
        else target.push(document.createTextNode(child));
    }
}

function translateKey(key: string): string {
    if(key in keyMap) return keyMap[key]!;
    if(key.startsWith("on") && key.toLowerCase() in window)
        return key.toLowerCase();
    return key;
}

// /**
//  * Maps the prototypes to sets. If a key is writable it is in the set mapped by the prototype.
//  */
// const writableCache = new Map<Object, Set<string>>();

function isWritable<T extends Object>(obj: T, key: keyof T) {
    while(true) {
        const desc = Object.getOwnPropertyDescriptor(obj, key);
        if(desc) return desc.writable || !!desc.set;

        obj = Object.getPrototypeOf(obj);
        if(obj === null) return false;
    }
}

export function createElement(
    tag: string | Function,
    props: {[index: string]: any} | null,
    ...givenChildren: any[]
): JSX.Element {
    const children: JSX.Element[] = [];
    flatChildren(children, givenChildren);

    props = props || {};

    if(typeof tag === "function") {
        props.children = children;
        return tag(props);
    }

    const element: Element & {[key: string]: any} = svgElements.has(tag)
        ? (delete props.xmlns, document.createElementNS("http://www.w3.org/2000/svg", tag))
        : document.createElement(tag);

    Object.keys(props).forEach(key => {
        const value = props![key];
        const translatedKey = translateKey(key);

        if(isWritable(element, translatedKey)) { // idl attribute
            if(value instanceof Box) {
                element[translatedKey] = value.value;
                value.onChange(value => element[translatedKey] = value);
            } else element[translatedKey] = value;
        } else { // html attribute
            if(value instanceof Box) {
                element.setAttribute(key, value.value);
                value.onChange(value => element.setAttribute(key, value));
            } else element.setAttribute(key, value);
        }
    });

    children.forEach(child => Array.isArray(child)
        ? element.append(...child)
        : element.append(child));

    return element;
}

export function Fragment({
    children
}: {
    children: any[]
}): JSX.Element[] {
    const flattenChildren: JSX.Element[] = [];
    flatChildren(flattenChildren, children);
    return children;
}