// @ts-ignore
import {expect, test} from "vitest";
import {BoxArray} from "../src/box";

function create012BoxArray(): BoxArray<number> {
    const boxArray = new BoxArray<number>();
    boxArray.add(0);
    boxArray.add(1);
    boxArray.add(2);
    return boxArray;
}

function createHelloWorldBoxArray(): BoxArray<string> {
    const boxArray = new BoxArray<string>();
    boxArray.add("Hello");
    boxArray.add("World");
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

test("set", () => {
    const boxArray = new BoxArray<number>(3);
    boxArray.set(0, 0);
    boxArray.set(1, 10);
    boxArray.set(2, 20);

    expect(boxArray.at(0)).toBe(0);
    expect(boxArray.at(1)).toBe(10);
    expect(boxArray.at(2)).toBe(20);
});

test("set RangeError", () => {
    const boxArray = new BoxArray<boolean>();
    expect(() => boxArray.set(1, true)).toThrowError();
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

    boxArray.swapIndices(0, 1);

    expect(boxArray.at(0)).toBe(1);
    expect(boxArray.at(1)).toBe(0);
    expect(boxArray.at(2)).toBe(2);
});

test("swap", () => {
    const boxArray = create012BoxArray();
    boxArray.swap(1, 2);
    expect(boxArray.at(0)).toBe(0);
    expect(boxArray.at(1)).toBe(2);
    expect(boxArray.at(2)).toBe(1);
});

test("removeAt", () => {
    const boxArray = create012BoxArray();
    boxArray.removeAt(0);
    expect(boxArray.at(0)).toBe(1);
    expect(boxArray.at(1)).toBe(2);
});

test("remove", () => {
    const boxArray = create012BoxArray();
    boxArray.remove(1);
    expect(boxArray.at(0)).toBe(0);
    expect(boxArray.at(1)).toBe(2);
});

test("onRemove", () => {
    const boxArray = createHelloWorldBoxArray();
    let removed: string | undefined;
    let removeIndex: number | undefined;
    const unlisten = boxArray.onRemove((value, index) => {
        removed = value;
        removeIndex = index;
    });

    boxArray.remove("Hello");
    expect(removed).toBe("Hello");
    expect(removeIndex).toBe(0);

    unlisten();

    boxArray.remove("World");
    // nothing should have changed
    expect(removed).toBe("Hello");
    expect(removeIndex).toBe(0);
});

test("onInsert", () => {
    const boxArray = createHelloWorldBoxArray();
    let inserted: string | undefined;
    let insertIndex: number | undefined;
    const unlisten = boxArray.onInsert((value, index) => {
        inserted = value;
        insertIndex = index;
    });

    boxArray.add("Right");
    expect(inserted).toBe("Right");
    expect(insertIndex).toBe(2);

    boxArray.insert(4, "Middle");
    expect(inserted).toBe("Middle");
    expect(insertIndex).toBe(3);

    unlisten();

    boxArray.add("Left");
    // nothing should have changed
    expect(inserted).toBe("Middle");
    expect(insertIndex).toBe(3);

    expect(boxArray.length).toBe(5);
});