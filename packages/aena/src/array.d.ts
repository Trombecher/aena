import {ListenDeep} from "./index";

export declare interface BoxArray<T> extends ListenDeep<(change: Change<T>) => void> {
}

export declare class BoxArray<T> extends Array<T> {
    [index: number]: never;

    /**
     * Sets the given `value` to the given `index`.
     *
     *
     */
    set(index: number, value: T): this;

    /**
     * Swaps the items at the given indices.
     *
     * Both indices are clamped to the length via {@link clampIndex}.
     */
    swapIndices(indexA: number, indexB: number): void;

    /**
     * Swaps the items `a` and `b`. If at least one is not found, this is a no-op.
     */
    swap(a: T, b: T): void;
}

export declare const ACTION_INSERT: 0;
export declare const ACTION_SWAP: 1;
export declare const ACTION_DELETE: 2;

export type Change<T> = {
    action: typeof ACTION_INSERT,
    value: T,
    index: number
} | {
    action: typeof ACTION_SWAP,
    a: T,
    b: T,
    indexA: number,
    indexB: number
} | {
    action: typeof ACTION_DELETE,
    value: T,
    index: number
};