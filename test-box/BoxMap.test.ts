import {expect, test} from "vitest";
import {BoxMap} from "../src/box";
import {ReplaceInfoCode} from "../src/box/map";

function createNumberBoxMap() {
    const boxMap = new BoxMap<string, number>();
    boxMap.set("one", 1);
    boxMap.set("two", 2);
    boxMap.set("three", 3);
    return boxMap;
}

test("new", () => {
    new BoxMap();
});

test("onSet", () => {
    const map = createNumberBoxMap();

    let lastSetKey: string | undefined = undefined;
    let lastSetValue: number | undefined = undefined;

    const unlisten = map.onSet((key, value) => {
        lastSetKey = key;
        lastSetValue = value;
    });

    map.set("four", 4);

    expect(lastSetKey).toBe("four");
    expect(lastSetValue).toBe(4);

    unlisten();

    map.set("five", 5);

    expect(lastSetKey).toBe("four");
    expect(lastSetValue).toBe(4);
});

test("replace / onReplace", () => {
    const map = createNumberBoxMap();

    let replacedOldKey: string | undefined = undefined;
    let replacedOldValue: number | undefined = undefined;
    let replacedNewKey: string | undefined = undefined;
    let replacedNewValue: number | undefined = undefined;
    let replaceNewValueDidExist: boolean | undefined = undefined;

    map.onReplace((
        oldKey,
        oldValue,
        newKey,
        newValue,
        newKeyDidExist
    ) => {
        replacedOldKey = oldKey;
        replacedOldValue = oldValue;
        replacedNewKey = newKey;
        replacedNewValue = newValue;
        replaceNewValueDidExist = newKeyDidExist;
    });

    // Replace should fail because the key `"four"` does not exist.
    expect(map.replace("four", "five", 5))
        .toBe(ReplaceInfoCode.FailOldKeyDoesNotExist);
    expect(map.get("four")).toBe(undefined);
    expect(map.get("five")).toBe(undefined);

    expect(replacedOldKey).toBe(undefined);
    expect(replacedOldValue).toBe(undefined);
    expect(replacedNewKey).toBe(undefined);
    expect(replacedNewValue).toBe(undefined);
    expect(replaceNewValueDidExist).toBe(undefined);

    // Replace should fail because the keys and values are identical.
    expect(map.replace("one", "one", 1))
        .toBe(ReplaceInfoCode.FailSameKeysSameValues);
    expect(replacedOldKey).toBe(undefined);
    expect(replacedOldValue).toBe(undefined);
    expect(replacedNewKey).toBe(undefined);
    expect(replacedNewValue).toBe(undefined);
    expect(replaceNewValueDidExist).toBe(undefined);

    // Replace should succeed because the keys are identical but the values are different.
    expect(map.replace("one", "one", 1.1))
        .toBe(ReplaceInfoCode.SuccessNewKeyDidExist);
    expect(map.get("one")).toBe(1.1);

    expect(replacedOldKey).toBe("one");
    expect(replacedOldValue).toBe(1);
    expect(replacedNewKey).toBe("one");
    expect(replacedNewValue).toBe(1.1);
    expect(replaceNewValueDidExist).toBeTruthy();

    // Replace should succeed because the keys are different but the value are identical.
    expect(map.replace("two", "newTwo", 2))
        .toBe(ReplaceInfoCode.SuccessNewKeyDidNotExist);
    expect(map.get("two")).toBe(undefined);
    expect(map.get("newTwo")).toBe(2);

    expect(replacedOldKey).toBe("two");
    expect(replacedOldValue).toBe(2);
    expect(replacedNewKey).toBe("newTwo");
    expect(replacedNewValue).toBe(2);
    expect(replaceNewValueDidExist).toBeFalsy();
});

test("onDelete", () => {
    const map = createNumberBoxMap();

    let lastDeletedKey: string | undefined = undefined;
    let lastDeletedValue: number | undefined = undefined;

    const unlisten = map.onDelete((key, value) => {
        lastDeletedKey = key;
        lastDeletedValue = value;
    });

    map.delete("three");

    expect(lastDeletedKey).toBe("three");
    expect(lastDeletedValue).toBe(3);

    unlisten();

    map.delete("two");

    expect(lastDeletedKey).toBe("three");
    expect(lastDeletedValue).toBe(3);
});

test("clear", () => {
    const map = createNumberBoxMap();
    map.clear();

    expect(map.size).toBe(0);
});

test("delete", () => {
    const map = createNumberBoxMap();
    map.delete("one");

    expect(map.has("one")).toBe(false); // build-in function
    expect(map.size).toBe(2); // build-in function
});