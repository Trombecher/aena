import {ListenDeep} from "./index";

export declare interface BoxSet<T> extends ListenDeep<(change: Change<T>) => void> {
}

export declare class BoxSet<T> extends Set<T> {
}

export declare const ACTION_ADD: 0;
export declare const ACTION_DELETE: 1;

export type Change<T> = Readonly<{
    action: typeof ACTION_ADD,
    value: T
} | {
    action: typeof ACTION_DELETE,
    value: T
}>;