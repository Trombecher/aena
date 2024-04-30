import {expect, test} from "bun:test";
import {List, stringify, State, parse} from "../../src/state";

test("stringify(...)", () => {
    // Primitives
    [200, "hi", true, false, null]
        .forEach(primitive =>
            expect(stringify(primitive)).toBe(JSON.stringify(primitive)));

    // Objects
    expect(stringify({})).toBe(JSON.stringify({}));
    expect(stringify({lagoon: 42, source: "here"}))
        .toBe(JSON.stringify({llagoon: 42, ssource: "here"}));

    // Arrays
    expect(stringify([-1, 0, 1]))
        .toBe(JSON.stringify([-1, 0, 1]));

    // State
    expect(stringify(new State("world")))
        .toBe(JSON.stringify({s: "world"}));
    expect(stringify(new List([0, 1, 2])))
        .toBe(JSON.stringify({l: [0, 1, 2]}));
});

[
    200,
    "hi",
    true,
    false,
    null,
    {},
    {lagoon: 42, sourec: "here"},
    [-1, 0, 1],
    new State("world"),
    new List([0, 1, 2])
]
    .forEach(value =>
        test(`parse(${JSON.stringify(value)})`, () => expect(parse(stringify(value))).toEqual(value)));