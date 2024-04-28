# Aena

![](./aena.webp)

> [!WARNING]
> Still in beta. Do not use in production.

A small (~1150 byte) web framework written in JavaScript. Features:

- 🪶 Ultra-lightweight
- 🦅 Unopinionated
- ✅ TSX
- ✅ Type definitions
- ✅ Zero dependencies
- ✅ Zero throw expressions
- ✅ Zero setup

Here is the classic counter example:

```tsx
import {
    State,
    get,
    setState,
    insertToString,
    mount
} from "aena";

let counter = new State(0);
mount(document.body, (
    <button onclick={() => setState(state, get(state) + 1)}>
        Clicked: {insertToString(state)}
    </button>
));
```

## Installation

You can install Aena via [NPM](https://www.npmjs.com/package/aena):

```shell
bun i aena
```

## [Docs Are Here](https://github.com/Trombecher/aena/blob/main/docs/index.md)

## Thanks

Huge thanks to [SolidJS](https://github.com/solidjs/solid/tree/main/packages/solid) for the types because extracting the types from specifications is very tedious. I also thank [React](https://github.com/facebook/react) for inspiration for the quickstart guide.