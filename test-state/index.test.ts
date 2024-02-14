import {expect, test} from "vitest";
import {
    addListenerRecursively,
    Box,
    BoxSet,
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