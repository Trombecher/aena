---
title: "Box"
---

There are times when you want one thing to change as another thing changes. For example: UI needs to change when the state changes. `Box` is such a reactive value. When the value in the `Box` is changed, all listeners are notified of this change.

Note: `Box` only reports changes when the value inside changes. That does not happen if you mutate an object (like an array) stored inside the `Box`, since the check `oldValue !== newValue` fails. [**You will find reactive arrays and other datastructures here**](/website/src/content/docsite/src/content/docs/state).

## Creating

Creating a `Box` is as simple as constructing it with an initial value (here: `0`):

```ts
import {Box} from "aena";

const counter = new Box(0);
```

## Get / Set

You can [get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)/[set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) the value of the `Box` via the `value` property.

```ts
import {Box} from "aena";

const counter = new Box(0);

counter.value = 10;
counter.value++;
console.log(box.value); // Logs 11
```

## Listening

> Note: `Box` implements `Listen`

Whenever the value of the `Box` has been changed (means: `oldValue !== newValue`), then **all listeners are notified of this change**.

You can listen to the `Box` via the `Box.addListener(...)` function. This function also returns the listener you passed in, so assignment is easy. You can stop listening by calling the `Box.removeListener(...)` function:

```ts
import {Box} from "aena";

const counter = new Box(0);

const listener = counter.addListener((newValue, oldValue) => console.log(newValue, oldValue));
counter.value = 100; // Logs 100 0
//                 new value |   | old value

counter.removeListener(listener);
counter.value = 200; // Does not log
```

## Deriving

Many times, a value is dependent on another. This can be done via `Box.derive(...)`: it creates a new `Readonly<Box<T>>` that always has the derived value. The parameter function indicates the relationship:

```ts
import {Box} from "aena";

const counter = new Box(0);
const square = counter.derive(value => value * value);

counter.value = 9;
console.log(square.value); // Logs 81
```