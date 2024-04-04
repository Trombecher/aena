import {ListenDeep} from "./index";

export declare interface BoxMap<K, V> extends ListenDeep<(change: Change<K, V>) => void> {
}

export declare class BoxMap<K, V> extends Map<K, V> {
}

export declare const ACTION_SET: 0;
export declare const ACTION_DELETE: 1;

export type Change<K, V> = Readonly<{
    action: typeof ACTION_SET,
    key: K,
    value: V
} | {
    action: typeof ACTION_DELETE,
    key: K,
    value: V
}>;