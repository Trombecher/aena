import {expect, test} from "vitest";
import {WritableBox} from "../src";

test("value", () => {
    const box = new WritableBox(10);
    expect(box.value).toBe(10);
});

test("`Boxed` implementation", () => {
    const box = new WritableBox("");
    let newValue: string | null = null;

    const listener = box.addListener(value => newValue = value);
    box.value = "test";
    expect(newValue).toBe("test");

    box.removeListener(listener);
    box.value = "other test";
    expect(newValue).toBe("test");
});

test("derive", () => {
    const box = new WritableBox<any>(false);
    const boxString = box.derive(value => value.toString());
    expect(boxString.value).toBe("false");
    box.value = {};
    expect(boxString.value).toBe("[object Object]");
});