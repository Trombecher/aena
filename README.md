# Aena

```tsx
import {Box} from "aena";

export default function App() {
    const counter = new Box(0);
    
    return (
        <button onclick={() => counter.value++}>
            Count: {counter}
        </button>
    );
}
```

A lightweight frontend JavaScript framework designed for use in single page applications. It comes with a flexible built-in state management and TSX support.

## Installation

```
npm i aena
```

```
pnpm i aena
```