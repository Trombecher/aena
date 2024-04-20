import {JSX} from "./jsx-runtime";

export declare class State<T> {
    private _;

    constructor(value: T);
}

export declare type Listener<T> = (value: T, oldValue: T) => void;

export declare type TransformListener<T, U> = (value: T, oldValue: T) => U;

export declare function getState<T>(state: State<T>): T;

export declare function setState<T>(state: State<T>, value: T): void;

export declare function deriveState<T, U>(state: State<T>, transform: TransformListener<T, U>): State<U>;

export declare function insertState<T>(state: State<T>, transform: TransformListener<T, JSX.Element>): Node;

export declare function insertStateToString<T>(state: State<T>, transform?: TransformListener<T, string>): Text;

export declare function attach<T>(to: State<T>, listener: Listener<T>): Listener<T>;

export declare function detach<T>(to: State<T>, listener: Listener<T>): void;

export declare function mount(target: Element, element: JSX.Element): void;

export declare function createElement<T extends (keyof JSX.IntrinsicElements )| ((...args: any) => any)>(tag: T): T extends ((...args: any) => any)
    ? ReturnType<T>
    : T extends (keyof JSX.IntrinsicElements)
        ? JSX.IntrinsicElements[T]
        : never;

export declare function Fragment<T extends any[]>(props: {children: T}): T;