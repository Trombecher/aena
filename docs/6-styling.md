---
title: "Styling"
---

Use of [TailwindCSS](https://tailwindcss.com/) is heavily recommended. As of installation, you can use [this guide](https://tailwindcss.com/docs/installation/using-postcss).

```tsx
export function MyApp() {
    return (
        <main>
            <h1 className={"text-2xl font-bold"}>Welcome To My App</h1>
            <p>Lorem ipsum...</p>
        </main>
    );
}
```

## Conditional Styling

Many times, you want to apply styles conditionally. Because TSX allows inserting strings in attribute values, you can build your className-string yourself. Consider using [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) for readability:

```tsx
export function MyApp() {
    const large = true;

    return (
        <main>
            <h1 className={`${large ? "text-2xl" : "text-sm"} text-2xl font-bold`}>Welcome To My App</h1>
            <p>Lorem ipsum...</p>
        </main>
    );
}
```

## Dynamic Styling

Dynamic `className` attributes are used frequently. Here is an example:

```tsx
import {insertToString} from "aena";
import {State, derive} from "aena/state";

export function RedGreenBalance({balance}: {balance: State<number>}) {
    return (
        <div className={derive(balance, balance =>
            `${balance > 0 ? "bg-green-400" : "bg-red-400"} font-mono`)}>
            Balance: {insertToString(balance)}
        </div>
    );
}
```