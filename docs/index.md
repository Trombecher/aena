---
title: "Overview"
---

Welcome to the Aena documentation!

---

Aena is a frontend framework for building [single page applications](https://developer.mozilla.org/en-US/docs/Glossary/SPA) in [TypeScript](https://www.typescriptlang.org/).

## Handy Resources

- This documentation
- [The TypeScript documentation](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)
- [The Aena source](https://github.com/Trombecher/aena)

## Overview

Aena consists of two main parts: **[state](/website/src/content/docsite/src/content/docs/state) and [ui](/website/src/content/docsite/src/content/docs/ui)**. When working with Aena, you often declare state (reactive or not) and ui, while **mapping your state into the ui**. Then you let the ui make changes to your state.

The following example is the default example for ui frameworks: the counter.

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

Aena ensures that changes to your state will be synchronized with the ui.