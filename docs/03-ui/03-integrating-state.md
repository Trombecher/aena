---
title: "Integrating State"
---

You have state and UI and want to bring them together? This page provides solutions.

All items used on this page are from `aena/glue` and return `JSX.Element`s, so you can just insert them into your UI. Note: The `aena/glue` module lacks docs for functions because it is **fairly obvious what the functions do**.

## Integrating `Box`es

Most commonly, you will find yourself integrating a `Box` into you UI. Aena has the following functions:

### `insertBoxAsString(...)`

Inserts the `Box` as a string. The value will be converted into a string using `String()`. Example:

```tsx
import {Box} from "aena";
import {insertBoxToString} from "./glue";

export function Counter() {
    const counter = new Box(0);
    
    return (
        <button onclick={() => counter.value++}>
            Squared: {insertBoxtoString(x)}
        </button>
    );
}
```

### `insertBoxToString(...)`

Inserts the `Box` by mapping the value to a string. Example:

```tsx
import {Box} from "aena";
import {insertBoxToString} from "./glue";

export function Counter() {
    const x = new Box(0);

    return (
        <button onclick={() => bool.value = !bool.value}>
            Counter: {insertBoxToString(counter, x => `${x * x}`)}
        </button>
    );
}
```

### `insertBox(...)`

...

## Integrating `BoxSet`s

You can integrate a `BoxSet` by inserting `insertBoxSet(...)`. This function maps each value of the set to a `JSX.Element`. If the given `BoxSet` hat changed, elements are deleted and added to the end accordingly, so that state and UI are always synchronized.

Note, that order is not preserved because this is a set.

The following example maps each value of the set to a list item in an unordered list:

```tsx
import {BoxSet} from "aena";
import {insertBoxSet} from "aena/glue";

export function Entries({
    set
}: {
    set: BoxSet<number>
}) {
    return (
        <ul>{insertBoxSet(set, num => (
            <li>Number {num}</li>
        ))}</ul>
    );
}
```

---

For debugging purposes, `insertBoxSetAsString(...)` inserts the given `BoxArray` as a string.

## Integrating `BoxArray`s

You can integrate a `BoxArray` by inserting `insertBoxaRray`. This is similar to inserting a `BoxSet` but order is preserved.

```tsx
import {Box, BoxArray} from "aena";
import {insertBoxArray} from "aena/glue";

class Item {
    readonly content = new Box("");
}

export function ToDo() {
    const todo = new BoxArray<Item>();
    
    return (
        <>
            <button onclick={() => todo.push(new Item())}>+ Add Item</button>
            <ul>{insertBoxArray(todo, item => (
                <li>
                    <input
                        value={item.content.value}
                        oninput={e => item.content = e.target.value}
                    />
                    <button onclick={() => todo.splice(todo.indexOf(item), 1)}>Remove</button>
                </li>
            ))}</ul>
        </>
    );
}
```