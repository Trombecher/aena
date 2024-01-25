import {expect, test} from "vitest";
import {
    addListenerRecursive,
    BoxSet,
    isInstanceOfListen,
    isInstanceOfListenDeep,
    isObject,
    reduce, removeListenerRecursive,
    WritableBox
} from "../src/state";

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