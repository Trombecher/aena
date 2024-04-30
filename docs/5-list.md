---
title: "list"
---

Equipped with `State`, you might try to implement a to-do list or similar list-like structures in your UI. The React developer inside you might embrace immutability and fall back on an immutable `State<T[]>`, where `T` is your desired type.

Although immutability has great DX, it comes at a cost: UX. This is the cost of high memory usage and frequent re-renders. Take a color-picker deep in your app's state which triggers per-frame re-renders of your entire DOM.

React solves this problem by using a virtual DOM (which has to be re-rendered) that is compared, so that the DOM does not need to be re-rendered (and more `useMemo(...)` optimizations, nobody understands). But the cost of this is the _immense_ size of your bundle, including the entire React runtime.

Aena attempts to solve this issue by using _mutable_ state, and this is the `List`.

> `List` is part of the disjoint state API `aena/state`.

## Create

You can create a `List` by invoking the constructor with an optional initial array:

```ts
import {List} from "aena/state";

const numbers = new List<number>();
const numbers2 = new List([0, 1, 2]);

// DO NOT keep a reference to the initial array!
const doNotDoThis = [];
const nope = new List<number>(doNotDoThis);
```

## Get

You can acquire a readonly reference to the underlying array in `List` by using `get(...)` (shared with `State` due to bundle size):

```ts
import {List, get} from "aena/state";

const numbers = new List([0, 1, 2]);
console.log(get(numbers)); // Logs [0, 1, 2]

get(numbers)[0] = 10; // ERROR: you cannot assign to a readonly array.
```

## Mutate

There is no _setting_ the array, you can only mutate it through `mutateList(...)`. This function exposes a [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)-like API to change the contents of the array. **Swap support is planned.**

```ts
import {List, get, mutateList} from "aena/state";

const numbers = new List([0, 1, 2]);

//         list        delete count
//         |           |
mutateList(numbers, 0, 1, 20, /* ... */);
//                  |     |-----------|
//        start index     ...items to insert

console.log(get(numbers)); // Logs [20, 1, 2]
```

## Attach / Detach Listeners

The `attach(...)` and `detach(...)` functions are shared with `State` and have the same functionality. Whenever the `List` is changed, all listeners are notified of this change:

```ts
import {List, mutateList, attach, detach} from "aena/state";

const numbers = new List([0, 1, 2]);

const listener = attach(numbers, (array, start, deleteCount, ...inserted) => {
    //                  |-----------------------------|
    //                  These are the same arguments as `Array.splice(...)`...
    
    console.log(array);
});

//                  ...which are created here
//                  |------|
mutateList(numbers, 0, 1, 20); // Logs [20, 1, 2] because of the listener

detach(numbers, listener);

mutateList(numbers, 0, 1); // Does not log
```

Note: The listener will **always run after** the action.

## Derive State

The `derive(...)` function from `State` is also shared with `List` ([read more here](./4-state#derive-state)):

```ts
import {List, derive} from "aena";

const numbers = new List([0, 1, 2]);

const sum = derive(numbers, numbers => numbers.reduce((a, b) => a + b, 0));
```

## Listen Deeply

What makes `List` so special is the ability to listen deeply. For that there is a `List`-only API including `attachDeep(...)` and `detachDeep(...)`.

The concept is straightforward: if you listen deeply to a `List`, **all changes to the List or ANY descendant of the items** should be reported (your listener will be called):

```ts
import {List, attachDeep, detachDeep, setState} from "aena/state";

const foo = new State(0);
const numbers = new List([foo]);

const deepListener = attachDeep(numbers, () => console.log("Event!"));

setState(foo, 1); // Logs "Event!"

detachDeep(numbers, deepListener);

setState(foo, 2); // Does not log
```

### Implementation

Deep listeners are stored separately from (normal) listeners. Whenever new items are added to the `List`, every deep listener will be attached to every item. Here is a quick reference:

If the item is...

- ...a primitive (like number, string, etc.), **it will be ignored**.
- ...a `State`, the deep listener will be attached (regularly).
- ...a `List`, the implementation will call `attachDeep(...)` (recursively).
- ...any other object, this matching will be done on all **values** (recursively).

Whenever items are removed from the `List`, all deep listeners are removed using the same method.