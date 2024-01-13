// @ts-ignore
import {expect, test} from "vitest";
import {BoxSet} from "../src/box";

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
    create012BoxSet();
});

test("size", () => {
    expect(create012BoxSet().size).toBe(3);
});

test("clear", () => {
    const set = create012BoxSet();
    set.clear();
    expect(set.size).toBe(0);
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

test("map", () => {
    const set = create012BoxSet();
    const s = set.map(v => v).join("-");
    expect(
        s === "0-1-2"
        || s === "0-2-1"
        || s === "1-0-2"
        || s === "1-2-0"
        || s === "2-0-1"
        || s === "2-1-0"
    ).toBeTruthy();
});

test("toString", () => {
    const set = create012BoxSet();
    const s = set.toString();
    expect(
        s === "{0,1,2}"
        || s === "{0,2,1}"
        || s === "{1,0,2}"
        || s === "{1,2,0}"
        || s === "{2,0,1}"
        || s === "{2,1,0}"
    ).toBeTruthy();
});

test("onAdd", () => {
    const set = create012BoxSet();
    let newValue: number | undefined = undefined;
    set.onAdd(value => newValue = value);
    set.add(3);
    expect(newValue).toBe(3);
});

test("onReplace", () => {
    const set = create012BoxSet();
    let replacedOldValue: number | undefined = undefined;
    let replacedNewValue: number | undefined = undefined;
    set.onReplace((oldValue, newValue) => {
        replacedOldValue = oldValue;
        replacedNewValue = newValue;
    });

    set.replace(0, 10);
    expect(replacedOldValue).toBe(0);
    expect(replacedNewValue).toBe(10);

    set.replace(1, 2);
    expect(replacedOldValue).toBe(1);
    expect(replacedNewValue).toBe(2); // Still if `2` was in the set previously.

    set.replace(44, 10);
    // Nothing should have changed because `44` does not exist.
    expect(replacedOldValue).toBe(1);
    expect(replacedNewValue).toBe(2);
});

test("onDelete", () => {
    const set = create012BoxSet();
    let newValue: number | undefined = undefined;
    set.onDelete(value => newValue = value);
    set.delete(0);
    expect(newValue).toBe(0);
});

test("deriveBoxMap", () => {
    const set = create012BoxSet();
    const double = set.deriveBoxMap(n => n + n);
    expect(double.get(2)).toBe(4);
    set.add(20);
    expect(double.get(20)).toBe(40);
});

test("replace", () => {
    const set = create012BoxSet();
    set.replace(0, 10);
    expect(set.has(0)).toBeFalsy();
    expect(set.has(10)).toBeTruthy();
});