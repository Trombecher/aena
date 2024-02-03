import {expect, test} from "vitest";
import {BoxMap, WritableBox} from "../src";
import {Action} from "../src/map";

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

test("set", () => createNumberBoxMap());

test("clear", () => {
    const map = createNumberBoxMap();
    map.clear();

    expect(map.size).toBe(0);
});

test("delete", () => {
    const map = createNumberBoxMap();
    map.delete("one");

    expect(map.has("one")).toBe(false);
    expect(map.size).toBe(2);
});

test("reduce", () => {
    const map = createNumberBoxMap();
    const squares = map.reduce(new Set<string>(),
        (set, k, v) => (set.add(`${k} (${v})`), set));
    expect(squares.has("one (1)")).toBeTruthy();
    expect(squares.has("two (2)")).toBeTruthy();
    expect(squares.has("three (3)")).toBeTruthy();
});

test("`Boxed` implementation", () => {
    const map = createNumberBoxMap();

    let lastSetKey: string | undefined = undefined;
    let lastSetValue: number | undefined = undefined;
    let lastDeletedKey: string | undefined = undefined;
    let lastDeletedValue: number | undefined = undefined;

    map.addListener(change => {
        switch(change.action) {
            case Action.Set:
                lastSetKey = change.key;
                lastSetValue = change.value;
                break;
            case Action.Delete:
                lastDeletedKey = change.key;
                lastDeletedValue = change.value;
                break;
        }
    });

    map.set("four", 4);

    expect(lastSetKey).toBe("four");
    expect(lastSetValue).toBe(4);
    expect(lastDeletedKey).toBe(undefined);
    expect(lastDeletedValue).toBe(undefined);

    map.delete("four");

    expect(lastSetKey).toBe("four");
    expect(lastSetValue).toBe(4);
    expect(lastDeletedKey).toBe("four");
    expect(lastDeletedValue).toBe(4);
});

test("`BoxedParent` implementation", () => {
    type Item = {bar: WritableBox<number>};

    const map = new BoxMap<string, Item | WritableBox<number>>();
    let callCount = 0;

    const listener = map.addDeepListener(() => ++callCount);

    const foo = {bar: new WritableBox(0)} satisfies Item;
    const lee = new WritableBox(Math.random());

    map.set("foo", foo);
    expect(callCount).toBe(1);

    foo.bar.value = Math.random();
    expect(callCount).toBe(2);

    map.delete("foo");
    expect(callCount).toBe(3);

    map.set("lee", lee);
    expect(callCount).toBe(4);

    lee.value = Math.random();
    expect(callCount).toBe(5);

    map.delete("lee");
    expect(callCount).toBe(6);

    // At this point, the listener should not be called.

    foo.bar.value = Math.random();
    lee.value = Math.random();
    expect(callCount).toBe(6);

    map.removeDeepListener(listener);
    map.set("foo", foo);
    map.delete("foo");
    expect(callCount).toBe(6);
});