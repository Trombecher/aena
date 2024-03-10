## Components

Components are just functions that return elements, like this one:

```tsx
export function MyComponent() {
    return (
        <div>This is my Component</div>
    );
}
```

## Nesting

Components can be nested in other TSX.

```tsx
function Inner() {
    return (
        <div>Inner</div>
    );
}

export function Outer() {
    return (
        <>
            <Inner/>
            <div>in outer</div>
        </>
    )
}
```

If the tag name starts with a capital letter, like `<Inner/>`, TSX searches for a function. Otherwise, it interprets it as an HTML tag, like `<div>...</div>`.

Note: this is only handy syntax. Because components are just functions, you could also nest via insertion, however the former is preferred:

```tsx
export function Outer() {
    return (
        <>
            {Inner()}
            <div>in outer</div>
        </>
    )
}
```

## Attributes

Attributes declared on component instantiations are passed as properties on an object (often called "props", short for "properties") to the component:

```tsx
export function InsertSomething(props: {x: number}) {
    return (
        <div>X: {props.x}</div>
    )
}

export function App() {
    return (
        <>
            <InsertSomething x={10}/>
        </>
    )
}
```

Often times, [object destructuring in parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#examples) is used to extract all parameters from the object. This is equivalent to the former:

```tsx
export function InsertSomething({x}: {x: number}) {
    return (
        <div>X: {x}</div>
    )
}

export function App() {
    return (
        <>
            <InsertSomething x={10}/>
        </>
    )
}
```

## Rest Props

A frequent pattern encountered is standardizing elements. Here is a `MyButton` component that "extends" the HTML button. We take two properties from the `MyButton` props and want to pass **all remaining properties** (the rest) to the button props. We can do that by using `{...rest}` in the attributes list:

```tsx
import {JSX} from "aena";

export function MyButton({
    class: className,
    children,
    ...rest
}: JSX.IntrinsicElements<"button">) {
    return (
        <button class={`${className} <YOUR_CLASSES>`} {...rest}>
            {children}
        </button>
    );
}
```

The `rest` can be any object (it does not have to come from the parameters) but it needs to match types.

## Optional Properties

If some property can be optional, you can annotate that in the props type via a `?:`:

```tsx
export function OptionalMessage({msg}: {msg?: string}) {
    return msg && (
        <div>{msg.toUpperCase()}</div>
    );
}

export function App() {
    return (
        <>
            <OptionalMessage msg={"Hello!"}/>
            <OptionalMessage/>
        </>
    );
}
```