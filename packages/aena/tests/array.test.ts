import {expect, test} from "bun:test";
import {Box, BoxArray, BoxSet} from "../src";
import {Change, ACTION_INSERT, ACTION_SWAP, ACTION_DELETE} from "../src/array";

type Item = {set: BoxSet<number>} | Box<number> | number;

/**
 * Tests the progression of changes in an array environment.
 */
function testChange<T>(
    array: BoxArray<T>,
    modify: (array: BoxArray<T>) => void,
    resultingArray: T[],
    deepCallCount: number,
    changes: Change<T>[],
    secondModify: (array: BoxArray<T>) => void,
    secondResultingArray: T[]
) {
    let count = 0;
    const recordedChanges = new Array<Change<T>>();

    const deepListener = array.attachDeep(() => ++count);
    const listener = array.attach(change => recordedChanges.push(change));

    modify(array);

    expect(resultingArray).toEqual(array);
    expect(count).toBe(deepCallCount);
    expect(changes).toEqual(recordedChanges);

    const changeCount = changes.length;
    const callCount = count;

    array.detachDeep(deepListener);
    array.detach(listener);

    secondModify(array);

    expect(secondResultingArray).toEqual(array);
    expect(count).toBe(callCount);
    expect(changes.length).toEqual(changeCount);
}

test("push", () => {
    const foo = new Box(0),
        bar = {set: new BoxSet()} satisfies Item;

    testChange(
        new BoxArray(),
        array => {
            array.push(foo, bar);
            foo.value = Math.random();
            bar.set.add(Math.random());
        },
        [foo, bar],
        4,
        [{
            action: ACTION_INSERT,
            value: foo,
            index: 0
        }, {
            action: ACTION_INSERT,
            value: bar,
            index: 1,
        }],
        array => array.push(foo),
        [foo, bar, foo]
    );
});

test("swapIndices", () => {
    testChange(
        new BoxArray(0, 1, 2),
        array => array.swapIndices(0, 2),
        [2, 1, 0],
        1,
        [{
            action: ACTION_SWAP,
            a: 0,
            b: 2,
            indexA: 0,
            indexB: 2
        }],
        array => array.swapIndices(0, 1),
        [1, 2, 0]
    );
});

test("swap", () => {
    testChange(
        new BoxArray(0, 1, 2),
        array => array.swap(0, 2),
        [2, 1, 0],
        1,
        [{
            action: ACTION_SWAP,
            a: 0,
            b: 2,
            indexA: 0,
            indexB: 2
        }],
        array => array.swap(0, 2),
        [0, 1, 2]
    );
});

// `BoxArray.copyWithin` uses `BoxArray.set`, so `ListenDeep` implementation is tested via `set`
test("copyWithin", () => {
    testChange(
        new BoxArray(0, 1, 2, 3, 4, 5),
        array => array.copyWithin(0, 2, 6),
        [2, 3, 4, 5, 4, 5],
        8,
        [
            {action: ACTION_DELETE, value: 0, index: 0},
            {action: ACTION_INSERT, value: 2, index: 0},
            {action: ACTION_DELETE, value: 1, index: 1},
            {action: ACTION_INSERT, value: 3, index: 1},
            {action: ACTION_DELETE, value: 2, index: 2},
            {action: ACTION_INSERT, value: 4, index: 2},
            {action: ACTION_DELETE, value: 3, index: 3},
            {action: ACTION_INSERT, value: 5, index: 3},
        ],
        array => array.copyWithin(0, 3, 6),
        [5, 4, 5, 5, 4, 5]
    );
});

test("fill", () => {
    testChange(
        new BoxArray(0, 1, 2),
        array => array.fill(10, 1, 2),
        [0, 10, 2],
        2,
        [{
            action: ACTION_DELETE,
            value: 1,
            index: 1
        }, {
            action: ACTION_INSERT,
            value: 10,
            index: 1,
        }],
        array => array.fill(20),
        [20, 20, 20]
    );
});

test("pop", () => {
    const foo = {set: new BoxSet()} satisfies Item;

    testChange(
        new BoxArray<Item>(200, foo),
        array => {
            foo.set.add(Math.random());
            array.pop();
            foo.set.add(Math.random());
        },
        [200],
        2,
        [{
            action: ACTION_DELETE,
            value: foo,
            index: 1
        }],
        array => array.pop(),
        []
    );
});

test("set", () => {
    const foo = {set: new BoxSet()} satisfies Item,
        bar = new Box(0);

    testChange(
        new BoxArray<Item>(foo),
        array => {
            bar.value = Math.random(); // Updates deep lister count
            foo.set.add(Math.random());
            array.set(0, bar); // Updates 2x
            bar.value = Math.random(); // Updates
            foo.set.add(Math.random());
        },
        [bar],
        4,
        [{
            action: ACTION_DELETE,
            value: foo,
            index: 0,
        }, {
            action: ACTION_INSERT,
            value: bar,
            index: 0
        }],
        array => {
            array.set(0, foo);
            bar.value = Math.random(); // Should do nothing
        },
        [foo],
    );
});

test("shift", () => {
    const foo = {set: new BoxSet()} satisfies Item;

    testChange(
        new BoxArray<Item>(foo, 200),
        array => {
            foo.set.add(Math.random());
            array.shift();
            foo.set.add(Math.random());
        },
        [200],
        2,
        [{
            action: ACTION_DELETE,
            value: foo,
            index: 0
        }],
        array => array.shift(),
        []
    );
});

test("splice", () => {
    const foo = {set: new BoxSet()} satisfies Item;

    testChange(
        new BoxArray(10, 20),
        array => {
            array.splice(0, 0, foo);
            array.splice(1, 1);
            foo.set.add(Math.random());
        },
        [foo, 20],
        3,
        [{
            action: ACTION_INSERT,
            value: foo,
            index: 0
        }, {
            action: ACTION_DELETE,
            value: 10,
            index: 1
        }],
        array => {
            array.splice(0, 1, 1);
            foo.set.add(Math.random());
        },
        [1, 20]
    );
});

test("sort", () => {
    testChange(
        new BoxArray(0, 2, 1),
        array => array.sort((a, b) => a - b),
        [0, 1, 2],
        4,
        [
            {action: ACTION_DELETE, value: 2, index: 1},
            {action: ACTION_INSERT, value: 1, index: 1},
            {action: ACTION_DELETE, value: 1, index: 2},
            {action: ACTION_INSERT, value: 2, index: 2},
        ],
        _ => {
        },
        [0, 1, 2],
    );
});

test("unshift", () => {
    const foo = {set: new BoxSet()} satisfies Item;

    testChange(
        new BoxArray(2, 3),
        array => {
            foo.set.add(Math.random());
            array.unshift(foo); // Updates
            foo.set.add(Math.random()); // Updates
        },
        [foo, 2, 3],
        2,
        [{
            action: ACTION_INSERT,
            value: foo,
            index: 0
        }],
        array => {
            foo.set.add(Math.random());
            array.unshift(10);
        },
        [10, foo, 2, 3]
    )
});