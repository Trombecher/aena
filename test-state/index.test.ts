import {expect, test} from "vitest";
import {
    addListenerRecursively,
    Box,
    BoxSet, clampIndex, clampIndexLower,
    isInstanceOfListen,
    isInstanceOfListenDeep,
    reduce, removeListenerRecursively,
} from "../src";

test("reduce", () => {
    const boxA = new Box(10);
    const boxB = new Box("Hello");

    const boxC = reduce([boxA, boxB] as const, ([a, b]) => `${a}${b}`);
    expect(boxC.value).toBe("10Hello");

    boxA.value = 13;
    expect(boxC.value).toBe("13Hello");

    boxB.value = "World";
    expect(boxC.value).toBe("13World");
});

test("isInstanceOfListen", () => {
    expect(isInstanceOfListen({})).toBeFalsy();
    expect(isInstanceOfListen(new Box(0))).toBeTruthy();
    expect(isInstanceOfListen(new BoxSet())).toBeTruthy();
});

test("isInstanceOfListenDeep", () => {
    expect(isInstanceOfListenDeep({})).toBeFalsy();
    expect(isInstanceOfListenDeep(new Box(0))).toBeFalsy();
    expect(isInstanceOfListenDeep(new BoxSet())).toBeTruthy();
});

test("addListenerRecursively", () => {
    let callCount = 0;

    const listener = () => ++callCount;
    const target = {
        bar: new Box("Hello"),
        baz: {
            lee: new Box("World")
        }
    };
    addListenerRecursively(target, listener);

    target.bar.value = "yo";
    target.baz.lee.value = "yo";

    expect(callCount).toBe(2);
});

test("removeListenerRecursively", () => {
    let callCount = 0;

    const listener = () => ++callCount;
    const target = {
        bar: new Box("Hello"),
        baz: {
            lee: new Box("World")
        }
    };
    addListenerRecursively(target, listener);
    removeListenerRecursively(target, listener);

    target.bar.value = "yo";
    target.baz.lee.value = "yo";

    expect(callCount).toBe(0);
});

test("clampIndex", () => {
    const length = 10;
    expect(clampIndex(0, length)).toBe(0);
    expect(clampIndex(9, length)).toBe(9);
    expect(clampIndex(10, length)).toBe(9);
    expect(clampIndex(-1, length)).toBe(9);
    expect(clampIndex(-10, length)).toBe(0);
    expect(clampIndex(-11, length)).toBe(0);
});

test("clampIndexLower", () => {
    const length = 10;
    expect(clampIndexLower(0, length)).toBe(0);
    expect(clampIndexLower(9, length)).toBe(9);
    expect(clampIndexLower(10, length)).toBe(10);
    expect(clampIndex(-1, length)).toBe(9);
    expect(clampIndex(-10, length)).toBe(0);
    expect(clampIndex(-11, length)).toBe(0);
});