# Styling

Use of [TailwindCSS](https://tailwindcss.com/) is heavily recommended.

```tsx
export function MyApp() {
    return (
        <main>
            <h1 class={"text-2xl font-bold"}>Welcome To My App</h1>
            <p>Lorem ipsum...</p>
        </main>
    );
}
```

## Conditional Styling

Many times, you want to apply styles conditionally. Because TSX allows inserting strings in attribute values, you can build your class-string yourself. Consider using [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) for readability:

```tsx
export function MyApp() {
    const large = true;

    return (
        <main>
            <h1 class={`${large ? "text-2xl" : "text-sm"} text-2xl font-bold`}>Welcome To My App</h1>
            <p>Lorem ipsum...</p>
        </main>
    );
}
```

## Dynamic Styling

If you want your styles to be dependent on your state, Aena allows