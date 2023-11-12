// @ts-ignore - cannot look up vitest but vitest still works
import {expect, test} from "vitest";
import {Box} from "../src/box";

test("value", () => {
    const box = new Box(10);
    expect(box.value).toBe(10);
});

test("onChange", () => {
    const box = new Box("");
    let newValue: string | null = null;
    box.onChange(value => newValue = value);
    box.value = "Test";
    expect(newValue).toBe("Test");
});

test("derive", () => {
    const box = new Box<any>(false);
    const boxString = box.derive(value => value.toString());
    expect(boxString.value).toBe("false");
    box.value = {};
    expect(boxString.value).toBe("[object Object]");
});