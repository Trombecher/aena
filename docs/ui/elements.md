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

## Inserting Values

Like in attributes, we can insert TypeScript values into the elements:

```tsx
const element = (
    <div>Today is day {new Date().getDay() + 1} of the week.</div>
);
```

The type of the value to insert is set by `JSX.Element` in `aena`. It can be:

- `number`: will be converted to string
- `object`: will be converted to string
- `string`
- `boolean`: `true` will be converted to `"true"`, `false` will be ignored
- `symbol`: will be converted to string
- `null` and `undefined`: will be ignored
- `Node`: will be inserted
- `Element[]` (array of itself): all nodes will be inserted