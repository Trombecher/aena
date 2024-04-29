import {test, expect} from "bun:test";
import {attach, derive, detach, get, setState, State} from "../../src/state";

test("new State(...)", () => {
    new State(10)
});

test("get(...)", () => {
    const state = new State(10);
    expect(get(state)).toBe(10);
});

test("setState(...)", () => {
    const state = new State("Hi");
    setState(state, "World");
    expect(get(state)).toBe("World");
});

test("derive(...)", () => {
    const count = new State(10);
    const double = derive(count, count => count * 2);
    expect(get(double)).toBe(20);

    setState(count, 20);
    expect(get(double)).toBe(40);
});

test("attach(...) / detach(...)", () => {
    const state = new State(10);

    let lastPrev: undefined | number;
    let lastNext: undefined | number;

    const listener = attach(state, (next, prev) => (lastPrev = prev, lastNext = next));

    expect(lastPrev).toBeUndefined();
    expect(lastNext).toBeUndefined();

    setState(state, 20);

    expect(lastPrev).toBe(10);
    expect(lastNext).toBe(20);

    detach(state, listener);

    setState(state, 30);

    expect(lastPrev).toBe(10);
    expect(lastNext).toBe(20);
});