# Aena

![](./aena.webp)

> [!WARNING]
> Still in beta. Do not use in production.

A small web framework supporting TSX, written in JavaScript. Features:

- 🪶 Ultra-lightweight
- 🦅 Unopinionated
- ✅ TSX
- ✅ Type definitions
- ❌ Zero dependencies
- ❌ Zero runtime errors
- ❌ Zero setup

Here is the classic counter example:

```tsx
import {
    State,
    getState,
    setState,
    insertStateToString,
    mount
} from "aena";

let counter = new State(0);
mount(document.body, (
    <button onclick={() => setState(state, getState(state) + 1)}>
        Clicked: {insertStateToString(state)}
    </button>
));
```

## Installation

You can install `wurm` via [NPM](https://www.npmjs.com/package/wurm):

```shell
bun i aena
```

## [Docs Are Here](https://github.com/Trombecher/aena/blob/main/docs/index.md)

## Thanks

Huge thanks to [SolidJS](https://github.com/solidjs/solid/tree/main/packages/solid) for the types because extracting the types from specifications is very tedious. I also thank [React](https://github.com/facebook/react) for inspiration for the quickstart guide.