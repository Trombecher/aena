# UI In Aena

UI is written in special HTML-like TypeScript expressions, called [TSX](https://www.typescriptlang.org/docs/handbook/jsx.html). You can use this syntax in `.tsx` files if the [`jsx` option](https://www.typescriptlang.org/tsconfig#jsx) in your tsconfig is enabled (if you used the installation guide, this option is enabled).

---

Elements are the building blocks for UI. Here is the example from the docs home:

```tsx
import {Box} from "aena";
import {insertBoxAsText} from "aena/glue";

// Declare component
export default function App() {
    // Declare state
    const counter = new Box(0);

    // Declare ui
    return (
        <button
            // Declare state change functions in the ui
            onclick={() => counter.value++}
            
            // Insert the state into the ui
        >Counter: {insertBoxAsText(counter)}</button>
    )
}
```