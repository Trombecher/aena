---
title: "Elements"
---

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

## TypeScript Attributes

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

This difference is, that the curly braces `{}` insert a TypeScript expression, here a string. You could also pass in a number, a boolean or a function:

```tsx
const myButton = (
    <button onclick={() => alert("Clicked!")}>Click me!</button>
);
```

(Whenever this button is clicked, the page will alert "Clicked!").

## HTML Attributes

If you cannot find a TypeScript attribute, try prefixing it with an underscore:

```tsx
const mySvg = (
    <svg _width={32} _height={32} _viewState={"0 0 32 32"}></svg>
);
```

_Why and when do you need to do this?_ The [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) specifies two types of attributes: [content and IDL attributes](https://developer.mozilla.org/en-US/docs/Glossary/IDL#content_versus_idl_attributes). In short, _content attributes_ are the attributes that you set _on the HTML element_ via `setAttribute` and _IDL attributes_ are the attributes that you set _on the TypeScript object representing the element_.

**Content / HTML Attributes are prefixed with an underscore.** This underscore is omitted in the process, but it instructs Aena on how to set the attribute. Previous versions of Aena used a recursive algorithm to determine if an attribute was an IDL attribute, but using this prefixing we can reduce the bundle size significantly.

## Dynamic Attributes

Many HTML attributes support a value type or a `State` of that value type to allow for dynamic attributes:

```tsx
import {State} from "aena/state";

const disabled = new State(false);

const dynamicButton = <button disabled={disabled}></button>;
```

Whenever the `State` changes, the new value will be set to the attribute.

---

If your attribute value is dependent on your state and needs mapping before inserting, you can use `derive(...)`:

```tsx
import {State, derive} from "aena/state";

const tab = new State<"orders" | "products">("orders");

const dynamicAnchor = <a href={derive(tab, tab => `/${tab}`)}>Jump</a>;
```

Another common use case is dynamic styling, [covered here](./6-styling.md).

## Inserting/Embedding Values

Like in attributes, we can insert TypeScript values into the elements using `{}`:

```tsx
const element = (
    <div>Today is day {new Date().getDay() + 1} of the week.</div>
);
```

The type of the value to insert is set by `JSX.Element` in `aena`. It can be:

- `number`: will be converted to string
- `string`
- `symbol`: will be converted to string
- `boolean`, `null` and `undefined`: will be ignored
- `Node`: will be inserted
- `JSX.Element[]` (array of itself): all nodes will be inserted

## Conditional Insertion/Embedding

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

## Dynamic Insertion

If you have some `State` you can bind it to the ui in the following ways:

### `insertToString`

This function is used if the state should simply map to text.

```tsx
import {insertToString} from "aena";
import {State, get, setState} from "aena";

export function Counter() {
    const counter = new Box(0);
    
    return (
        <button onclick={() => setState(counter, get(counter) + 1)}>
            Squared: {insertToString(counter, value => `${value * value}`)}
        </button>
    );
}
```

### `insertState`

If the state should be mapped dynamically to nodes, use this function.

This example maps each number to an array of `<div/>`s, counting from 0 to the number:

```tsx
import {State, insertState, getState, setState} from "aena";

export function Counter() {
    const counter = new Box(0);
    
    return (
        <>
            <button onclick={() => setState(counter, getState(counter) + 1)}>Increment</button>
            {insertState(counter, value => (new Array).fill(0).map((_, index) => <div>${value}</div>))}
        </>
    );
}
```

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