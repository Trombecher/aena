# Elements

Elements start with a _start tag_ (here `<div>`) and end with an _end tag_ (here `</div>`):

```tsx
const element = <div>Hello, World!</div>;
```

Both start and end tags contain the tag name (here "div"). Many times, elements are put inside parentheses for clarity:

```tsx
const element = (
    <div>Hello, World!</div>
);
```

## Nesting

Elements can nest text and other elements:

```tsx
const wrapper = (
    <main>
        <h1>Welcome To My App</h1>
        <p>Lorem ipsum...</p>
    </main>
);
```

## Self-Closing Tags

If tags do not need children, they can be self-closing:

```tsx
const horizontalLine = (
    <hr/>
);
```

## Attributes

Attributes are written as follows:

```tsx
const myImage = (
    <img src="/my-image.png" alt=""/>
);
```

or

```tsx
const myOtherImage = (
    <img src={"/my-other-image.png"} alt={""}/>
);
```

This difference is, that the curly braces `{}` indicate inserting a TypeScript expression, here a string. You could also pass in a number, a boolean or a function:

```tsx
const myButton = (
    <button onclick={() => alert("Clicked!")}>Click me!</button>
);
```

(Whenever this button is clicked, the page will alert "Clicked!").

## Dynamic Attributes

Many HTML attributes support a value type or a `Box` of that value type to allow for dynamic attributes:

```tsx
const disabled = new Box(false);

const dynamicButton = <button disabled={disabled}></button>;
```

Whenever the `Box` changes, the new value will be set to the attribute.

---

If your attribute value is dependent on your state and needs mapping before inserting, you can use `Box.derive(...)`:

```tsx
const tab = new Box<"orders" | "products">("orders");

const dynamicAnchor = <a href={tab.derive(tab => `/${tab}`)}>Jump</a>
```

Another common use case is dynamic styling, [covered here](/docs/styling#dynamic-styling).

## Inserting/Embedding Values

Like in attributes, we can insert TypeScript values into the elements using `{}`:

```tsx
const element = (
    <div>Today is day {new Date().getDay() + 1} of the week.</div>
);
```

The type of the value to insert is set by `JSX.Element` in `aena`. It can be:

- `number`: will be converted to string
- `object`: will be converted to string
- `string`
- `symbol`: will be converted to string
- `boolean`, `null` and `undefined`: will be ignored
- `Node`: will be inserted
- `JSX.Element[]` (array of itself): all nodes will be inserted

## Conditional Inserting/Embedding

In some cases, we want to render nothing conditionally. Regularly, this kind of conditional rendering would involve some kind of if-check or [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator):

```tsx
const someCondition = true;

const element = someCondition ? (
    <div>Case: true</div>
): (
    // Render nothing (`undefined` is ingored).
    undefined
);
```

But because `boolean`, `null` and `undefined` are ignored during rendering, conditional statements can be simplified:

```tsx
const someCondition = true;

const element = someCondition && (
    <div>Case: true</div>
);
```

If `someCondition` is false, false is returned from the `&&` expression and not rendered. [`&&` always returns the last value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) (if it is true, also due to type coercion), which is the div.

## Fragments

One handy feature in TSX are "fragments". They are basically a regular element without a tag name:

```tsx
const fragment = (
    <>
        <div>Hello,</div>
        <div>World!</div>
    </>
);
```

You can use them whenever you need to store/return multiple elements at once, for example in components:

```tsx
export function MyComponent() {
    return (
        <>
            <div>This is:</div>
            <div>My component.</div>
        </>
    );
}
```

In Aena, fragments resolve into arrays, because `JSX.Element` also accepts `JSX.Element[]`. So it is equivalent to writing:

```tsx
export function MyComponent() {
    return [
        <div>This is:</div>,
        <div>My component</div>
    ];
}
```