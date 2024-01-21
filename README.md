# Aena

```tsx
import {WritableBox} from "aena/state";

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
> Still ín beta. Do not use in production. Inherently unstable api, no guarantees made.

Aena is your next SPA TypeScript framework. It comes with components, flexible built-in state management and TSX support.

## Installation

```shell
npm i aena
```

```shell
pnpm i aena
```

## State Management

All state is located in `aena/state`. It is decoupled from any dependencies and incorporated into the DOM using the `aena/glue` module, so it is fine to use on its own.

The model for state / reactivity is based on signals. The corresponding interfaces providing listeners are `Boxed<L>` and `BoxedParent<L>`.

### `WritableBox` and `Box`

These are the primitives of state. They wrap a value whose changes you can listen to.

```typescript
import {WritableBox} from "aena/state";

const box = new WritableBox(0);
box.value = 10;
console.log(box.value); // Logs "10".
```