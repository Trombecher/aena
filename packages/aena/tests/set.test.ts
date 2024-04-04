import {expect, test} from "bun:test";
import {Box, BoxSet} from "../src";
import {Action} from "../src/set";

function create012BoxSet() {
    const boxSet = new BoxSet<number>();
    boxSet.add(0);
    boxSet.add(1);
    boxSet.add(2);
    return boxSet;
}

test("new", () => {
    new BoxSet<number>();
});

test("add", () => {
    const set = create012BoxSet();

    expect(set.size).toBe(3);
    expect(set.has(0)).toBeTruthy();
    expect(set.has(1)).toBeTruthy();
    expect(set.has(2)).toBeTruthy();
});

test("clear", () => {
    const set = create012BoxSet();
    const deletedValues = new Set<number>();

    set.addListener(change => {
        expect(change.action).toBe(Action.Delete);
        deletedValues.add(change.value);
    });
    set.clear();

    expect(set.size).toBe(0);
    expect(deletedValues.has(0)).toBeTruthy();
    expect(deletedValues.has(1)).toBeTruthy();
    expect(deletedValues.has(2)).toBeTruthy();
});

test("delete", () => {
    const set = create012BoxSet();
    set.delete(0);
    expect(set.size).toBe(2);

    set.delete(10); // not contained
    expect(set.size).toBe(2);
});

test("deleteIf", () => {
    const set = create012BoxSet();
    set.deleteIf(n => n < 2);
    expect(set.size).toBe(1);
});

test("every", () => {
    const set = create012BoxSet();
    expect(set.every(n => n < 3)).toBeTruthy();
    expect(set.every(n => n < 2)).toBeFalsy();
});

test("reduce", () => {
    expect(create012BoxSet().reduce(0, (m, n) => m + n)).toBe(3);
})

test("toString", () => {
    const set = create012BoxSet();
    const array = JSON.parse(set.toString()) as number[];
    expect(array.indexOf(0) !== -1).toBeTruthy();
    expect(array.indexOf(1) !== -1).toBeTruthy();
    expect(array.indexOf(2) !== -1).toBeTruthy();
});

test("`Listen` implementation", () => {
    const set = create012BoxSet();

    let lastAdded: number | undefined = undefined;
    let lastDeleted: number | undefined = undefined;

    const listener = set.addListener(change => {
        switch(change.action) {
            case Action.Add:
                lastAdded = change.value;
                break;
            case Action.Delete:
                lastDeleted = change.value;
                break;
        }
    });

    set.add(42);
    expect(lastAdded).toBe(42);
    set.delete(42);
    expect(lastDeleted).toBe(42);

    set.removeListener(listener);

    set.add(10);
    expect(lastAdded).toBe(42);
    set.delete(10);
    expect(lastDeleted).toBe(42);
});

test("`ListenDeep` implementation", () => {
    type Item = {bar: Box<number>};

    const set = new BoxSet<Item | Box<number>>();
    let callCount = 0;

    const listener = set.addDeepListener(() => ++callCount);

    const foo = {bar: new Box(Math.random())} satisfies Item;
    const lee = new Box(Math.random());

    set.add(foo);
    expect(callCount).toBe(1);

    foo.bar.value = Math.random();
    expect(callCount).toBe(2);

    set.delete(foo);
    expect(callCount).toBe(3);

    set.add(lee);
    expect(callCount).toBe(4);

    lee.value = Math.random();
    expect(callCount).toBe(5);

    set.delete(lee);
    expect(callCount).toBe(6);

    // At this point the listener should not be called.

    foo.bar.value = Math.random();
    lee.value = Math.random();
    set.removeDeepListener(listener);
    set.add(foo);
    expect(callCount).toBe(6);
    set.delete(foo);

    expect(callCount).toBe(6);
});