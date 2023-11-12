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
    let newValue: number | null = null;
    set.onAdd(value => newValue = value);
    set.add(3);
    expect(newValue).toBe(3);
});

test("onAdd", () => {
    const set = create012BoxSet();
    let newValue: number | null = null;
    set.onAdd(value => newValue = value);
    set.add(3);
    expect(newValue).toBe(3);
});

test("onDelete", () => {
    const set = create012BoxSet();
    let newValue: number | null = null;
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