// @ts-ignore
import {expect, test} from "vitest";
import {BoxMap} from "../src/box";

function createNumberBoxMap() {
    const boxMap = new BoxMap<string, number>();
    boxMap.set("one", 1);
    boxMap.set("two", 2);
    boxMap.set("three", 3);
    return boxMap;
}

test("new", () => {
    new BoxMap();
});

test("set", () => {
    createNumberBoxMap();
});

test("delete", () => {
    const map = createNumberBoxMap();
    map.delete("one");

    expect(map.has("one")).toBe(false); // build-in function
    expect(map.size).toBe(2); // build-in function
});

test("clear", () => {
    const map = createNumberBoxMap();
    map.clear();

    expect(map.size).toBe(0);
});

test("onSet", () => {
    const map = createNumberBoxMap();

    let lastSetKey: string | undefined = undefined;
    let lastSetValue: number | undefined = undefined;

    const unlisten = map.onSet((key, value) => {
        lastSetKey = key;
        lastSetValue = value;
    });

    map.set("four", 4);

    expect(lastSetKey).toBe("four");
    expect(lastSetValue).toBe(4);

    unlisten();

    map.set("five", 5);

    expect(lastSetKey).toBe("four");
    expect(lastSetValue).toBe(4);
});

test("onDelete", () => {
    const map = createNumberBoxMap();

    let lastDeletedKey: string | undefined = undefined;
    let lastDeletedValue: number | undefined = undefined;

    const unlisten = map.onDelete((key, value) => {
        lastDeletedKey = key;
        lastDeletedValue = value;
    });

    map.delete("three");

    expect(lastDeletedKey).toBe("three");
    expect(lastDeletedValue).toBe(3);

    unlisten();

    map.delete("two");

    expect(lastDeletedKey).toBe("three");
    expect(lastDeletedValue).toBe(3);
});