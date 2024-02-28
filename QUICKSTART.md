# Quickstart

Welcome to the Aena quickstart guide. This guide will give you a brief introduction into common concepts found in Aena. This tutorial is heavily based on the [React quickstart guide](https://react.dev/learn) because React shares similar concepts with Aena and was a source of inspiration.

## Components

Aena apps are made out of components which are reusable pieces of UI. A function that returns HTML can be used as a component:

```tsx
function MyButton() {
    return (
        <button>I'm a button</button>
    );
} 
```

Components allow nesting because they just return HTML:

```tsx
export default function MyApp() {
    return (
        <main>
            <h1>My App</h1>
            <MyButton/>
        </main>
    )
}
```

Components must start with a capital letter, like `<MyButton/>` and HTML tags must be lowercase.

### TSX: HTML in TypeScript

The way we write HTML in TypeScript is called TSX.