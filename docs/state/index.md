# State

> Note: This part of the documentation is decoupled from any UI code.

In Aena, state is a little different from other major frameworks/libraries. Instead of decoupled setters and getters like in React or Solid, Aena follows a signal-based design with reactive classes modelling frequently used datastructures (primitives). State is composed of those primitives. Here is an overview:

- Use [`Box`](/docs/state/box) if you want a reactive primitive like a counter or a string.
- Use [`BoxArray`](/docs/state/array) if you want a reactive array, e.g. for a to-do list container.
- Use [`BoxSet`](/docs/state/set) if you could use a `BoxArray` but ordering does not matter. `BoxSet` is much faster than `BoxArray`, so use it where you can.
- Use [`BoxMap`](/docs/state/map) if you want reactive keys and values (rarely used).

## Listening

Listening is the mechanism that allows for reactive state. The basic principle is: you add a listener to your state and, when the state changes, you receive events on that listener. The listener can be removed easily.

### `Listener`s vs. `DeepListener`s



All primitives which implement the `Listen` interface, have both `Listen.addListener(...)` and `Listen.removeListener(...)` functions. Internally, listeners are stored in a [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) for constant time operations.

Arguments passed to listeners vary with the primitive. For example, [`Box` listeners are provided with the new and old value](/docs/state/box#listening).

---

You can check if an object implements `Listen` by using `isInstanceOfListen(...)`:

```ts
import {Box, isInstanceOfListen} from "aena";

const box = new Box(0);
console.log(isInstanceOfListen(box)); // Logs true.
```

## Listening Deep

Sometimes you want to be notified of changes deep in your state. Normally, `BoxArray<Box<any>>` only reports changes of the array and not the values (here `Box`es); deep listeners solve this problem.

When you attach a deep listener to an object implementing the `ListenDeep` interface (extends `Listen`), all children will 