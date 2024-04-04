---
title: "State"
---

> Note: This part of the documentation is decoupled from any UI code.

State refers to the state in which your app is in. You can change state or make other state dependent on some state. Aena provides four "state primitives" to compose your state:

- Use [`Box`](/website2/app/docs/state/box) if you want an immutable store like a counter or a string.
- Use [`BoxArray`](/website2/app/docs/state/array) if you want a reactive array, e.g. for a todo-list container.
- Use [`BoxSet`](/website2/app/docs/state/set) if you could use a `BoxArray` but ordering does not matter. `BoxSet` is much faster than `BoxArray`, so use it where you can.
- Use [`BoxMap`](/website2/app/docs/state/map) if you want reactive keys and values (rarely used).

Instead of decoupled setters and getters of immutable stores commonly found in other frameworks/libraries, like React or SolidJS, Aena has replacements of existing datastructures to make them reactive.

## Listening

Listening is the mechanism that allows for reactive state. The basic principle is: you add a listener to your state and, when the state changes, you receive events on that listener. The listener can be removed easily.

### `Listener`s vs. `DeepListener`s

All primitives which implement the `Listen` interface, have both `Listen.addListener(...)` and `Listen.removeListener(...)` functions. Internally, listeners are stored in a [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) for constant time operations.

Arguments passed to listeners vary with the primitive. For example, [`Box` listeners are provided with the new and old value](/website2/app/docs/state/box#listening).

---

You can check if an object implements `Listen` by using `isInstanceOfListen(...)`:

```ts
import {Box, isInstanceOfListen} from "aena";

const box = new Box(0);
console.log(isInstanceOfListen(box)); // Logs true.
```

## Listening Deep

Sometimes you want to be notified of changes deep in your state. Normally, `BoxArray<Box<any>>` only reports changes of the array and not the values (here `Box`es); deep listeners solve this problem.

When you attach a deep listener to an object implementing the `ListenDeep` interface (extends `Listen`), all children (and the array itself) will invoke the listener, whenever anything changes. If a child object is not a state primitive, Aena tries to add the deep listener to all its property values.

```ts
import {BoxSet, Box} from "aena";

class Entry {
    readonly name = new Box(0);
    readonly tasks = new BoxSet<string>;
}

const entries = new BoxSet<Entry>();
const listener = entries.addListener(() => console.log(":)"));

const firstEntry = new Entry();
entries.add(firstEntry); // Logs :)

firstEntry.name.value = 20; // Logs :) because `BoxSet.add(...)` attached a listener to `name`.
firstEntry.tasks.add("First task"); // Logs :) due to the same reason.

entries.delete(firstEntry); // Logs :)

firstEntry.name.value = 30; // Does not log because `firstEntry` is not a part of `entries`.

entries.removeListener(listener); // After this, listener will not be called.
```