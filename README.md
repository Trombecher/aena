# Aena

```tsx
import {Box} from "aena/box";

export default function App() {
    const counter = new Box(0);
    
    return (
        <button onclick={() => counter.value++}>
            Count: {counter}
        </button>
    );
}
```

Aena is a lightweight frontend JavaScript framework designed for use in single page applications. It comes with flexible built-in state management and TSX support.

## Installation

```
npm i aena
```

```
pnpm i aena
```