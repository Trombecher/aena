import {expect, test} from "vitest";
import {BoxArray} from "../src";
import {Action, IndexInfoCode, SetInfoCode, SwapIndicesInfoCode, SwapInfoCode} from "../src/array";

function create012BoxArray(): BoxArray<number> {
    const boxArray = new BoxArray<number>();
    boxArray.add(0);
    boxArray.add(1);
    boxArray.add(2);
    return boxArray;
}

test("new", () => {
    new BoxArray();
});

test("new(length)", () => {
    const boxArray = new BoxArray(10);
    expect(boxArray.length).toBe(10);
});

test("add & at", () => {
    const boxArray = create012BoxArray();

    expect(boxArray.at(0)).toBe(0);
    expect(boxArray.at(1)).toBe(1);
    expect(boxArray.at(2)).toBe(2);

    expect(boxArray.length).toBe(3);
});

test("static from", () => {
    const array = BoxArray.from(3, index => index);
    expect(array.toString()).toBe("[0,1,2]");
});

test("set", () => {
    const boxArray = new BoxArray<number>(3);
    expect(boxArray.set(0, 0)).toBe(SetInfoCode.Success);
    expect(boxArray.set(0, 0)).toBe(SetInfoCode.SameValue);
    expect(boxArray.at(0)).toBe(0);

    expect(boxArray.set(-1, 3)).toBe(SetInfoCode.Success);
    expect(boxArray.at(-1)).toBe(3);

    expect(boxArray.set(10, 10)).toBe(SetInfoCode.IndexTooBig);
    expect(boxArray.set(-10, 10)).toBe(SetInfoCode.IndexTooSmall);
});

test("insert", () => {
    const boxArray = new BoxArray<boolean>();
    boxArray.insert(0, false);
    boxArray.insert(0, true);
    boxArray.insert(0, true);

    expect(boxArray.at(0)).toBe(true);
    expect(boxArray.at(1)).toBe(true);
    expect(boxArray.at(2)).toBe(false);

    expect(boxArray.length).toBe(3);
});

test("indexOf", () => {
    const boxArray = create012BoxArray();

    expect(boxArray.indexOf(1)).toBe(1);
    expect(boxArray.indexOf(1000)).toBe(-1);
});

test("BoxArray[Symbol.iterator]", () => {
    const boxArray = create012BoxArray();

    const copy = [];
    for(const element of boxArray)
        copy.push(element);

    expect(copy[0]).toBe(0);
    expect(copy[1]).toBe(1);
    expect(copy[2]).toBe(2);
});

test("swapIndices", () => {
    const boxArray = create012BoxArray();

    expect(boxArray.swapIndices(0, 1)).toBe(SwapIndicesInfoCode.Success);

    // Following statements should do nothing.
    expect(boxArray.swapIndices(0, 0)).toBe(SwapIndicesInfoCode.IndicesAreEqual);
    expect(boxArray.swapIndices(-10, 0)).toBe(SwapIndicesInfoCode.IndexAOutOfLowerBound);
    expect(boxArray.swapIndices(10, 0)).toBe(SwapIndicesInfoCode.IndexAOutOfUpperBound);
    expect(boxArray.swapIndices(0, -10)).toBe(SwapIndicesInfoCode.IndexBOutOfLowerBound);
    expect(boxArray.swapIndices(0, 10)).toBe(SwapIndicesInfoCode.IndexBOutOfUpperBound);

    // Resulting state:
    expect(boxArray.at(0)).toBe(1);
    expect(boxArray.at(1)).toBe(0);
    expect(boxArray.at(2)).toBe(2);
});

test("swap", () => {
    const boxArray = create012BoxArray();

    expect(boxArray.swap(1, 2)).toBe(SwapInfoCode.Success);

    // Following statements should do nothing.
    expect(boxArray.swap(0, 0)).toBe(SwapInfoCode.IndicesAreEqual);
    expect(boxArray.swap(10, 0)).toBe(SwapInfoCode.ANotFound);
    expect(boxArray.swap(0, 10)).toBe(SwapInfoCode.BNotFound);

    // Resulting state:
    expect(boxArray.at(0)).toBe(0);
    expect(boxArray.at(1)).toBe(2);
    expect(boxArray.at(2)).toBe(1);
});

test("deleteAt", () => {
    const boxArray = create012BoxArray();

    expect(boxArray.deleteAt(0)).toBe(IndexInfoCode.Success);
    expect(boxArray.deleteAt(-1)).toBe(IndexInfoCode.Success);

    // Following statements should do nothing.
    expect(boxArray.deleteAt(100)).toBe(IndexInfoCode.IndexTooBig);
    expect(boxArray.deleteAt(-100)).toBe(IndexInfoCode.IndexTooSmall);

    // Resulting state:
    expect(boxArray.at(0)).toBe(1);
    expect(boxArray.length).toBe(1);
});

test("delete", () => {
    const boxArray = create012BoxArray();
    expect(boxArray.delete(1)).toBeTruthy();
    expect(boxArray.delete(10)).toBeFalsy();

    expect(boxArray.at(0)).toBe(0);
    expect(boxArray.at(1)).toBe(2);
    expect(boxArray.length).toBe(2);
});

test("`Boxed` implementation", () => {
    const array = new BoxArray<number>();

    let lastInsertedValue: number | undefined = undefined;
    let lastInsertedIndex: number | undefined = undefined;
    let lastSwappedA: number | undefined = undefined;
    let lastSwappedB: number | undefined = undefined;
    let lastSwappedIndexA: number | undefined = undefined;
    let lastSwappedIndexB: number | undefined = undefined;
    let lastDeletedValue: number | undefined = undefined;
    let lastDeletedIndex: number | undefined = undefined;

    const listener = array.addListener(change => {
        switch(change.action) {
            case Action.Insert:
                lastInsertedValue = change.value;
                lastInsertedIndex = change.index;
                break;
            case Action.Swap:
                lastSwappedA = change.a;
                lastSwappedB = change.b;
                lastSwappedIndexA = change.indexA;
                lastSwappedIndexB = change.indexB;
                break;
            case Action.Delete:
                lastDeletedValue = change.value;
                lastDeletedIndex = change.index;
                break;
        }
    });

    array.insert(0, 10);
    expect(lastInsertedIndex).toBe(0);
    expect(lastInsertedValue).toBe(10);

    array.insert(1, 20);
    expect(lastInsertedIndex).toBe(1);
    expect(lastInsertedValue).toBe(20);

    array.swapIndices(0, 1);
    expect(lastSwappedIndexA).toBe(0);
    expect(lastSwappedIndexB).toBe(1);
    expect(lastSwappedA).toBe(10);
    expect(lastSwappedB).toBe(20);

    array.deleteAt(0);
    expect(lastDeletedIndex).toBe(0);
    expect(lastDeletedValue).toBe(20);

    array.set(0, 42);
    expect(lastDeletedIndex).toBe(0);
    expect(lastDeletedValue).toBe(10);
    expect(lastInsertedIndex).toBe(0);
    expect(lastInsertedValue).toBe(42);

    array.removeListener(listener);

    // TODO: Test `removeListener(...)` and `BoxedParent`
});