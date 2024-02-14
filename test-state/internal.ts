import {expect, test} from "vitest";
import {addListenersDeep, isObject, removeListenersDeep} from "../src/internal";
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