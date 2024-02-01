import {expect, test} from "vitest";
import {
    addListenerRecursive, Box, BoxArray, BoxMap,
    BoxSet, deserialize,
    isInstanceOfListen,
    isInstanceOfListenDeep,
    isObject,
    reduce, removeListenerRecursive, serialize,
    WritableBox
} from "../src";

test("reduce", () => {
    const boxA = new WritableBox(10);
    const boxB = new WritableBox("Hello");

    const boxC = reduce([boxA, boxB] as const, ([a, b]) => `${a}${b}`);
    expect(boxC.value).toBe("10Hello");

    boxA.value = 13;
    expect(boxC.value).toBe("13Hello");

    boxB.value = "World";
    expect(boxC.value).toBe("13World");
});

test("isInstanceOfListen", () => {
    expect(isInstanceOfListen({})).toBeFalsy();
    expect(isInstanceOfListen(new WritableBox(0))).toBeTruthy();
    expect(isInstanceOfListen(new BoxSet())).toBeTruthy();
});

test("isInstanceOfListenDeep", () => {
    expect(isInstanceOfListenDeep({})).toBeFalsy();
    expect(isInstanceOfListenDeep(new WritableBox(0))).toBeFalsy();
    expect(isInstanceOfListenDeep(new BoxSet())).toBeTruthy();
});

test("isObject", () => {
    expect(isObject({})).toBeTruthy();
    expect(isObject(100)).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
});

test("addListenerRecursive", () => {
    let callCount = 0;

    const listener = () => ++callCount;
    const target = {
        bar: new WritableBox("Hello"),
        baz: {
            lee: new WritableBox("World")
        }
    };
    addListenerRecursive(target, listener);

    target.bar.value = "yo";
    target.baz.lee.value = "yo";

    expect(callCount).toBe(2);
});

test("removeListenerRecursive", () => {
    let callCount = 0;

    const listener = () => ++callCount;
    const target = {
        bar: new WritableBox("Hello"),
        baz: {
            lee: new WritableBox("World")
        }
    };
    addListenerRecursive(target, listener);
    removeListenerRecursive(target, listener);

    target.bar.value = "yo";
    target.baz.lee.value = "yo";

    expect(callCount).toBe(0);
})

const createState = () => ({
    number: 10,
    boolean: true,
    undefined: undefined,
    null: null,
    string: "yo",
    writableBox: new WritableBox("Hello"),
    box: new Box(0),
    boxSet: new BoxSet().add(0).add(1).add(20),
    boxMap: new BoxMap<string, string>().set("Hello", "World"),
    boxArray: new BoxArray([10])
});

test("serialize / deserialize", () => {
    const state = createState();
    const state2 = deserialize(serialize(state)) as typeof state;

    expect(state.undefined).toBe(state2.undefined);
    expect(state.number).toBe(state2.number);
    expect(state.boolean).toBe(state2.boolean);
    expect(state.null).toBe(state2.null);
    expect(state.string).toBe(state2.string);

    expect(state2.box).toBeInstanceOf(Box);
    expect(state.box.value).toBe(state2.box.value);

    expect(state2.boxSet).toBeInstanceOf(BoxSet);
    expect(state2.boxSet.map(x => state.boxSet.has(x)).every(x => x)).toBeTruthy();

    expect(state2.boxMap).toBeInstanceOf(BoxMap);
    expect(Array
        .from(state2.boxMap.entries())
        .every(([key, value]) => state.boxMap.get(key) === value)).toBeTruthy();

    expect(state2.boxArray).toBeInstanceOf(BoxArray);
    expect(state2.boxArray.map(x => x).every(x => state.boxArray.indexOf(x) !== -1)).toBeTruthy();
});