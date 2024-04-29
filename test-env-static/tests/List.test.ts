import {expect, test} from "bun:test";
import {attach, attachDeep, derive, detach, detachDeep, get, List, mutateList, setState, State} from "../../src/state";

test("new List(...)", () => {
    new List();
    new List([1, 2]);
});

test("get(...)", () => {
    const list = new List([1, 2, 3]);
    expect(get(list)).toEqual([1, 2, 3]);
});

test("mutateList(...)", () => {
    const list = new List([1, 2, 3]);
    mutateList(list, 0, 0, 0);
    expect(get(list)).toEqual([0, 1, 2, 3]);
});

test("derive(...)", () => {
    const list = new List([1, 2, 3]);

    const sum = derive(list, list => list.reduce((a, b) => a + b, 0));
    expect(get(sum)).toBe(6);

    mutateList(list, 0, 0, 4);
    expect(get(sum)).toBe(10);
});

test("attach(...) / detach(...)", () => {
    const list = new List([1, 2, 3]);

    let lastSplice: undefined | [number, number, ...number[]];
    const listener = attach(list, (list, ...args) => {
        expect(list).toBe(list);
        lastSplice = args;
    });

    expect(lastSplice).toBeUndefined();

    mutateList(list, 0, 1, 5);
    expect(lastSplice).toEqual([0, 1, 5]);

    detach(list, listener);

    mutateList(list, 0, 1, 4);
    expect(lastSplice).toEqual([0, 1, 5]);
});

test("attachDeep(...) / detachDeep(...)", () => {
    type Item = {foo: State<number>} | State<string>;

    const state = new State("Hello"),
        foo = {foo: new State(42)};

    const list = new List<Item>([
        state,
        foo
    ]);

    let count = 0;
    const deepListener = attachDeep(list, () => count++);
    expect(count).toBe(0);

    mutateList(list, 0, 0, new State("20"));
    expect(count).toBe(1);

    setState(state, "World");
    expect(count).toBe(2);

    setState(foo.foo, 20);
    expect(count).toBe(3);

    detachDeep(list, deepListener);

    mutateList(list, 0, 1);
    expect(count).toBe(3);

    setState(state, "!");
    expect(count).toBe(3);

    setState(foo.foo, 200);
    expect(count).toBe(3);
});