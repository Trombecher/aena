import {expect, test} from "bun:test";
import {Box} from "../src";

test("value", () => {
    const box = new Box(10);
    expect(box.value).toBe(10);
});

test("`Listen` implementation", () => {
    const box = new Box("");
    let newValue: string | null = null;

    const listener = box.addListener(value => newValue = value);
    box.value = "test";
    expect(newValue).toBe("test");

    box.removeListener(listener);
    box.value = "other test";
    expect(newValue).toBe("test");
});

test("derive", () => {
    const box = new Box<any>(false);
    const boxString = box.derive(value => value.toString());
    expect(boxString.value).toBe("false");
    box.value = {};
    expect(boxString.value).toBe("[object Object]");
});