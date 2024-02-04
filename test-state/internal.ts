import {expect, test} from "vitest";
import {isObject} from "../src/internal";

test("isObject", () => {
    expect(isObject({})).toBeTruthy();
    expect(isObject(100)).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
});