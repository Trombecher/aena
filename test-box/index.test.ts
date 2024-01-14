import {expect, test} from "vitest";
import {Box, reduce} from "../src/box";

test("reduce", () => {
    const boxA = new Box(10);
    const boxB = new Box("Hello");

    const boxC = reduce([boxA, boxB], ([a, b]) => `${a}${b}`);
    expect(boxC.value).toBe("10Hello");

    boxA.value = 13;
    expect(boxC.value).toBe("13Hello");

    boxB.value = "World";
    expect(boxC.value).toBe("13World");
});