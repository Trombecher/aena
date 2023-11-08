import {Box, BoxArray} from "./box";
import {insertBoxArrayAsText, insertBoxAsText, insertBoxJSX} from "./glue";
import {svgElements, svgKeys} from "./constants";

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
        else target.push(document.createTextNode(child));
    }
}

function translateKey(key: string): string {
    if(key in keyMap) return keyMap[key]!;
    if(key.startsWith("on") && key.toLowerCase() in window)
        return key.toLowerCase();
    return key;
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

    const element = svgElements.has(tag)
        ? document.createElementNS("http://www.w3.org/2000/svg", tag)
        : document.createElement(tag);

    delete props.xmlns;
    Object.keys(props).forEach(key => {
        const value = props![key];
        const translatedKey = translateKey(key);

        if(svgKeys.has(translatedKey)) {
            if(value instanceof Box) {
                element.setAttribute(translatedKey, value.value);
                value.onChange(value => element.setAttribute(translatedKey, value));
            } else {
                element.setAttribute(translatedKey, value);
            }
        } else {
            if(value instanceof Box) {
                // @ts-ignore
                element[translatedKey] = value.value;
                value.onChange(value => {
                    // @ts-ignore
                    element[translatedKey] = value;
                });
            } else {
                // @ts-ignore
                element[translatedKey] = value;
            }
        }
    });

    for(let i = 0; i < children.length; i++) {
        const child = children[i]!;
        if(Array.isArray(child)) element.append(...child);
        else element.append(child);
    }

    return element;
}

export function createFragment({
    children
}: {
    children: any[]
}): JSX.Element[] {
    const flattenChildren: JSX.Element[] = [];
    flatChildren(flattenChildren, children);
    return children;
}