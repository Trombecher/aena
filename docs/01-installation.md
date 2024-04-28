---
title: "Installation"
---

## [Via Template](https://github.com/trombecher/aena-template)

This template is a TypeScript Vite SPA template with TailwindCSS.

## Manual Install

Aena is available via [`NPM`](https://www.npmjs.com/package/aena), so you can install it with your favourite package manager.

### TypeScript Setup

If you want to use [TSX](https://www.typescriptlang.org/docs/handbook/jsx.html), you have to add those properties to your `tsconfig.json`:

```json5
{
    // ...
    "compilerOptions": {
        // ...
        "jsx": "preserve",
        "jsxFactory": "createElement",
        "jsxFragmentFactory": "Fragment",
        "jsxImportSource": "aena"
    },
}
```

### Bundler Setup

Now you just have to tell your bundler, that it should bundle TSX code with the `aena` framework functions. Here is the config for the [Vite bundler](https://vitejs.dev/) (similar to [Rollup](https://rollupjs.org/)):

```ts
// vite.config.ts

import {defineConfig, ESBuildOptions} from "vite";

export default defineConfig({
    esbuild: {
        jsxInject: "import {createElement, Fragment} from 'aena';"
    } satisfies ESBuildOptions
});
```

### Code Setup

It is good practise to have this project structure:

```
project/
  ...
  src/
    App.tsx
    main.ts
    main.css (or App.css)
    ...
```

`App.tsx` will default export some App function that returns UI and `main.ts` will mount that function to the dom. The following code accomplishes that.

```tsx
// src/App.tsx

export default function App() {
    return (
        <div>Hello, World!</div>
    );
}
```

```tsx
// src/main.ts

import "./main.css"; // or `App.css`
import App from "./App";
import {mount} from "aena";

mount(document.body, App());
```

---

Now you are ready to code!