import {Box, BoxArray, BoxMap, BoxSet, JSX} from "../../src";
import {
    insertBoxArray,
    insertBox,
    insertBoxSet,
    insertBoxMap,
    insertBoxAsText,
    insertBoxArrayAsText,
    insertBoxSetAsText,
    insertBoxMapAsText,
    insertBoxToString,
} from "../../src/glue";

export default function TestApp() {
    const box = new Box(0),
        array = new BoxArray<number>(),
        set = new BoxSet<number>(),
        map = new BoxMap<string, number>();
    
    return (
        <>
            <section>
                <h1>Testing: <code>aena/jsx-runtime</code></h1>
                <div>
                    By seeing this text, aena/jsx-runtime has successfully passed createElement(...) and
                    Fragment(...) tests
                </div>
                <div>
                    There should be a number: <Number/>
                </div>
                <div>
                    There should be wrapped content:
                    <Wrapper>Wrapped content</Wrapper>
                </div>
            </section>
            <section>
                <h1>Testing: <code>aena/jsx-runtime</code> SVG support</h1>
                <svg xmlns={"https://www.w3.org/2000/svg"} width={"128"} height={"128"}>
                    <rect width={"128"} height={"128"} fill={"#da3434"}/>
                </svg>
            </section>
            <section>
                <h1>Testing: <code>aena/glue</code> integration for <code>Box</code></h1>

                <h2>Updating</h2>
                <button onclick={() => box.value++}>Increment</button>
                {" and "}
                <button onclick={() => box.value--}>Decrement</button>

                <h2>Insert As Text</h2>
                <div>There should be a counter: {insertBoxAsText(box)}</div>

                <h2>Insert As Custom Text</h2>
                <div>{insertBoxAsText(box)} * {insertBoxAsText(box)} = {insertBoxToString(box, value => String(value * value))}</div>

                <h2>Insert With Transform (AIO)</h2>
                <div>{insertBoxAsText(box)} * 100 = {insertBox(box, value => `${value * 100}`)}</div>

                <h2>Insert With Transform To Node(s)</h2>
                <div>{insertBox(box, value => (new Array(Math.abs(value))).fill(0).map((_, i) => (
                    <div>{i}</div>
                )))}</div>

                <h2>Insert With Transform To Undefined (Only Even)</h2>
                <div>{insertBox(box, value => value % 2 === 0 ? <div>{value}</div> : undefined)}</div>
            </section>
            <section>
                <h1>Testing: <code>aena/glue</code> integration for <code>BoxArray</code></h1>

                <h2>Adding</h2>
                <button onclick={() => array.push(Math.round(Math.random() * 10))}>Add random number</button>

                <h2>Swapping</h2>
                <button onclick={() => array.swapIndices(0, -1)}>Swap first and last element</button>

                <h2>Deleting</h2>
                <button onclick={() => array.splice(0, 1)}>Remove the first element</button>

                <h2>Insert As Text</h2>
                <div>{insertBoxArrayAsText(array)}</div>

                <h2>Insert With Transform</h2>
                <div>{insertBoxArray(array, value => (
                    <span>{value} * 100 = {value * 100}, </span>
                ))}</div>
            </section>
            <section>
                <h1>Testing: <code>aena/glue</code> integration for <code>BoxSet</code></h1>

                <h2>Adding</h2>
                <button onclick={() => set.add(Math.random())}>Add random number</button>

                <h2>Deleting</h2>
                <button onclick={() => set.delete(set[Symbol.iterator]().next().value)}>Delete one key</button>

                <h2>Insert As Text</h2>
                <div>{insertBoxSetAsText(set)}</div>

                <h2>Insert With Transform</h2>
                <div>{insertBoxSet(set, n => (
                    <div>{n} * {n} = {n * n}</div>
                ))}</div>
            </section>
            <section>
                <h1>Testing: <code>aena/glue</code> integration for <code>BoxMap</code></h1>

                <h2>Adding</h2>
                <button onclick={() => map.set("three", 3)}>Add three</button>

                <h2>Deleting</h2>
                <button onclick={() => map.delete("three")}>Delete three</button>

                <h2>Insert As Text</h2>
                <div>{insertBoxMapAsText(map)}</div>

                <h2>Insert</h2>
                <div>{insertBoxMap(map, (key, value) => (
                    <div>{key}: {value}</div>
                ))}</div>
            </section>
        </>
    );
}

function Number() {
    return (
        <span>1324902</span>
    );
}

function Wrapper({
    children
}: {
    children?: JSX.Element
}) {
    return (
        <>
            <div>This is a wrapper for:</div>
            <div>{children}</div>
        </>
    );
}