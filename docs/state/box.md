# `Box`

This is the simplest immutable state primitive, analogous to [Svelte's `Store`](https://svelte.dev/docs/svelte-store) and [React's `useState`](https://react.dev/reference/react/useState). What sets `Box` apart is, that you have real object instead of decoupled setters and getters like in React.

> Beware: `Box` only reports changes when the value inside changes. That does not happen if you mutate an object (like an array) stored inside the `Box`, since the check `oldValue !== newValue` fails. [**You will find reactive arrays and other datastructures here**](/docs/state).

## Creating

Creating a `Box` is as simple as constructing it with an initial value (here: `0`):

```ts
import {Box} from "aena";

const counter = new Box(0);
```

## Get / Set

You can [get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)/[set]((https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)) the value of the `Box` via the `value` property.

```ts
counter.value = 10;
counter.value++;
console.log(box.value);
```

## Listening

> Note: `Box` implements `Listen`

Whenever the value of the `Box` has been changed (means: `oldValue !== newValue`), then **all listeners are notified of this change**.

You can listen to the `Box` via the `Box.addListener(...)` function. This function also returns the listener you passed in, so assignment is easy. You can stop listening by calling the `Box.removeListener(...)` function:

```ts
const listener = counter.addListener((newValue, oldValue) => console.log(newValue, oldValue));
counter.value = 100; // Logs 100.

counter.removeListener(listener);
counter.value = 200; // Does not log.
```

## Deriving

Many times, a value is dependent on another. Therefore `Box.derive(...)` or `ReadonlyBox.derive(...)` create a new `ReadonlyBox` that always has the derived value. The parameter function indicates the relationship:

```ts
const square = counter.derive(value => value * value);
```

## `ReadonlyBox`

`ReadonlyBox` is a readonly type of `Box` and does not allow setting the value:

```ts
import {Box} from "aena";

const readonlyBox = new Box(0).readonly();
console.log(readonlyBox.value); // Ok
readonlyBox.value = 10; // Compile-time error
```

Most of the time this class is used to restrict write access to a `Box` for other functions or components (they are only meant to listen to it). Also, `Box.derive(...)` returns a `ReadonlyBox` because the value should not be changed independently.