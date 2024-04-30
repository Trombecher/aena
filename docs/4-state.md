---
title: "state"
---

There are times when you want one thing to change as another thing changes. For example: UI needs to change when the state changes. `State` is such a reactive value. When the value in the `State` is changed, all listeners are notified of this change.

Note: `State` only reports changes when the value inside changes. That does not happen if you mutate an object (like an array) stored inside the `State`, since the check `oldValue !== newValue` fails. If you want a mutable list, consider [`List`](./5-list).

## Creat

Creating a `State` is as simple as constructing it with an initial value (here: `0`):

```ts
import {State} from "aena";

const counter = new State(0);
```

## Get / Set

You can get and set the value of the `State` via `get(...)` and `setState(...)`:

```ts
import {State, get, setState} from "aena/state";

const counter = new State(0);

console.log(get(counter)); // Logs 0

setState(counter, get(counter) + 1);

console.log(get(counter)); // Logs 11
```

## Attach / Detach Listeners

Whenever the value of the `State` has been changed (means: `oldValue !== newValue`), **all listeners are notified of this change**.

You can listen to the `State` via the `attach(...)` function. This function also returns the listener you passed in, so assignment is easy. You can stop listening by calling the `detach(...)` function:

```ts
import {State, setState, attach, detach} from "aena/state";

const counter = new State(0);

const listener = attach(counter, (newValue, oldValue) => console.log(newValue, oldValue));

setState(counter, 100); // Logs 100 0
//                    new value |   | old value

detach(counter, listener);
setState(counter, 200); // Does not log
```

## Derive State

Many times, a value is dependent on another. This can be done via `derive(...)`: it creates a new `State<U>` that always has the derived value (`U` being the final type). The transform function indicates the relationship:

```ts
import {State, get, setState, derive} from "aena/state";

const counter = new State(0);
const square = derive(counter, value => value * value);

setState(counter, 9);
console.log(get(counter)); // Logs 81
```