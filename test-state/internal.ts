import {expect, test} from "vitest";
import {
    addListenersDeep,
    clampIndex,
    clampIndexLower,
    clampIndexUpTo,
    isObject,
    removeListenersDeep
} from "../src/internal";
import {Box, DeepListener} from "../src";

test("isObject", () => {
    expect(isObject({})).toBeTruthy();
    expect(isObject(100)).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
});

test("addListenersDeep / removeListenersDeep", () => {
    let count = 0;

    const set = new Set<DeepListener>().add(() => ++count);
    const box = new Box(0);
    addListenersDeep(set, {box});

    expect(count).toBe(0);
    box.value = Math.random();
    expect(count).toBe(1);

    removeListenersDeep(set, {box});
    box.value = Math.random();
    expect(count).toBe(1);
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

test("clampIndexUpTo", () => {
    const length = 10;
    expect(clampIndexUpTo(3, length)).toBe(3);
    expect(clampIndexUpTo(-1, length)).toBe(length - 1);
    expect(clampIndexUpTo(-length, length)).toBe(0);
    expect(clampIndexUpTo(-100, length)).toBe(0);
    expect(clampIndexUpTo(100, length)).toBe(length);
});