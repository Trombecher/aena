# Aena

```tsx
import {WritableBox} from "aena";

export default function App() {
    const counter = new WritableBox(0);
    
    return (
        <button onclick={() => counter.value++}>
            Count: {counter}
        </button>
    );
}
```

> [!WARNING]
> Still in beta. Do not use in production. Inherently unstable api, no guarantees made.

Aena is your next SPA TypeScript framework. It comes with components, flexible built-in state management and TSX support.

## Installation

Via [template](https://github.com/trombecher/aena-template). Instruction are [here](https://github.com/trombecher/aena-template).

You can also install [Aena](https://www.npmjs.com/package/aena) directly via NPM:

```shell
npm i aena
```

```shell
pnpm i aena
```

## This Package Does _Not_ Throw!

There are no throw expressions in `aena` because I believe that errors should be handled via returns types.
Also `try-catch` blocks have the worst syntax.

## Thanks

Huge thanks to [SolidJS](https://github.com/solidjs/solid/tree/main/packages/solid) for the types because extracting the types from specifications is very tedious. I also thank [React](https://github.com/facebook/react) for inspiration for the quickstart guide.

## Quickstart

### Components

Apps are made out of _components_. A component is a reusable piece of UI (and code) that has its own logic and appearance. Components are JavaScript functions that return markup.

```tsx
function MyButton() {
    return (
        <button>Hi</button>
    );
}
```

Components allow nesting:

```tsx
export default function App() {
    return (
        <main>
            <h1>This is my app!</h1>
            <MyButton/>
        </main>
    );
}
```

Notice that `<MyButton/>` starts with a capital letter. That’s how you know it’s a component. Component names must always start with a capital letter, while HTML tags must be lowercase.

### Fragments

Aena allows for fragments which wrap all child elements into an array.

```tsx
function About() {
    return (
        <>
            <h1>About</h1>
            <p>Hello!</p>
        </>
    );
}
```

### Styles

Use of [TailwindCSS](https://github.com/tailwindlabs/tailwindcss/) for styles is recommended but you can still set custom classes on your elements.

```tsx
function Styled() {
    return (
        <div class={"bg-blue-400"}>This is blue</div>
    );
}
```

TailwindCSS comes preinstalled with the [template](https://github.com/trombecher/aena-template).

### Attributes And Inserting

All component attributes are passed into the component as an object. You can use [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to get attributes from this object.

```tsx
function User({name}: {name: string}) {
    return (
        <div>{name}</div>
    );
}

export default function App() {
    return (
        <>
            <h1>My App!</h1>
            <User name={"Aena"}/>
        </>
    );
}
```

Parameters defined in `User(...)` are mandatory and need to be passed when instantiating.

## State Management

All state is decoupled from any dependencies and is inserted into the DOM using the `aena/glue` module.

The model for state / reactivity is based on signals. The corresponding interfaces providing listeners are `Boxed<L>` and `BoxedParent<L>`.

### `WritableBox` and `Box`

These are the primitives of state. They wrap a value whose changes you can listen to.

```typescript
import {WritableBox} from "aena/state";

const box = new WritableBox(0);
box.value = 10;
console.log(box.value); // Logs "10".
```