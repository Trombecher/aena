# Integrating State

You have state and UI and want to bring them together? This page provides solutions.

All items used on this page are from `aena/glue` and return `JSX.Element`s, so you can just insert them into your UI. Note: The `aena/glue` module lacks docs for functions because it is **fairly obvious what the functions do**.

## `Box`

Most commonly, you will find yourself integrating a `Box` into you UI. Aena has the following functions:

### `insertBoxToString(...)`

Inserts the `Box` as a string. The value will be converted into a string using `String()`. Example:

```tsx
import {Box} from "aena";
import {insertBoxToString} from "./glue";

function Counter() {
    const counter = new Box(0);
    
    return (
        <button onclick={() => counter.value++}>Counter: {insertBoxToString(counter)}</button>
    );
}
```

### `insertBoxAsText(...)`

Inserts the `Box` by mapping the value to a string. Example:

```tsx
import {Box} from "aena";
import {insertBoxAsText} from "./glue";

function Counter() {
    const x = new Box(0);

    return (
        <button onclick={() => bool.value = !bool.value}>
            Squared: {insertBoxAsText(x, x => `${x * x}`)}
        </button>
    );
}
```