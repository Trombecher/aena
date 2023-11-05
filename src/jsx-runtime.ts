import {Box} from "./box";
import {insertBox, insertBoxWithArray} from "./glue";

export namespace JSX {
    export type Element = Node | Node[];

    export interface IntrinsicElements {
        [index: string]: any
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
            if(child.value instanceof Array) target.push(insertBoxWithArray(child));
            else target.push(insertBox(child));
        }
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
    props: {[index: string]: any},
    ...givenChildren: any[]
): JSX.Element {
    const children: JSX.Element[] = [];
    flatChildren(children, givenChildren);

    if(typeof tag === "function")
        return tag(props, children);

    const element = document.createElement(tag);
    Object.keys(props || {}).forEach(key => {
        const value = props[key];
        const translatedKey = translateKey(key);

        if(value instanceof Box) {
            // @ts-ignore
            element[keyMap[key] || key] = value.value;
            value.onChange(value => {
                // @ts-ignore
                element[translatedKey] = value;
            });
        } else {
            // @ts-ignore
            element[translatedKey] = props[key];
        }
    });

    for(let i = 0; i < children.length; i++) {
        const child = children[i]!;
        if(Array.isArray(child)) element.append(...child);
        else element.append(child);
    }

    return element;
}

export function createFragment(_: any, ...givenChildren: any[]): JSX.Element[] {
    const children: JSX.Element[] = [];
    flatChildren(children, givenChildren);
    return children;
}