import {expect, test} from "vitest";
import {BoxSet} from "../src/box";
import {ReplaceInfoCode} from "../src/box/set";

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
    let replaceNewValueDidExist: boolean | undefined = undefined;

    set.onReplace((oldValue, newValue, newValueDidExist) => {
        replacedOldValue = oldValue;
        replacedNewValue = newValue;
        replaceNewValueDidExist = newValueDidExist;
    });

    // Replace call should fail because 44 is not part of the set.
    expect(set.replace(44, 22))
        .toBe(ReplaceInfoCode.FailOldValueDoesNotExist);
    expect(replacedOldValue).toBe(undefined);
    expect(replacedNewValue).toBe(undefined);
    expect(replaceNewValueDidExist).toBe(undefined);

    // Replace call should fail because trying to replace 0 with 0 should do nothing.
    expect(set.replace(0, 0))
        .toBe(ReplaceInfoCode.FailSameValues);
    expect(replacedOldValue).toBe(undefined);
    expect(replacedNewValue).toBe(undefined);
    expect(replaceNewValueDidExist).toBe(undefined);

    // Replace call should succeed with `ReplaceSuccessCode.NewValueHasNotExisted`
    // because 10 is not part of the set.
    expect(set.replace(0, 10))
        .toBe(ReplaceInfoCode.SuccessNewValueDidNotExist);
    expect(replacedOldValue).toBe(0);
    expect(replacedNewValue).toBe(10);
    expect(replaceNewValueDidExist).toBeFalsy();

    // Replace call should succeed with `ReplaceSuccessCode.NewValueHasExisted`
    // because 2 is part of the set.
    expect(set.replace(1, 2))
        .toBe(ReplaceInfoCode.SuccessNewValueDidExist);
    expect(replacedOldValue).toBe(1);
    expect(replacedNewValue).toBe(2);
    expect(replaceNewValueDidExist).toBeTruthy();
});

test("onDelete", () => {
    const set = create012BoxSet();
    let newValue: number | undefined = undefined;
    set.onDelete(value => newValue = value);
    set.delete(0);
    expect(newValue).toBe(0);
});

test("add", () => {
    create012BoxSet();
});

test("replace", () => {
    const set = create012BoxSet();
    set.replace(0, 10);
    expect(set.has(0)).toBeFalsy();
    expect(set.has(10)).toBeTruthy();
});

test("clear", () => {
    const set = create012BoxSet();
    const deletedValues = new Set<number>();

    set.onDelete(value => deletedValues.add(value));
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

test("deriveBoxMap", () => {
    const set = create012BoxSet();
    const double = set.deriveBoxMap(n => n + n);
    expect(double.get(2)).toBe(4);
    set.add(20);
    expect(double.get(20)).toBe(40);
});