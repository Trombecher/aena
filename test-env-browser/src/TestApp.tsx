import {
    insert,
    insertList,
    insertToString,
} from "../../src";
import {JSX} from "../../src/jsx-runtime";
import {get, List, mutateList, setState, State} from "../../src/state";

export default function TestApp() {
    const state = new State(0);
    const list = new List<number>([0, 1, 2, 3]);

    return (
        <>
            <h1>Browser Testing Suite For Aena</h1>
            <section>
                <h2>Testing: <code>aena/jsx-runtime</code></h2>

                <h3>Content And Attributes</h3>
                <div className={""}>
                    By seeing this text, aena/jsx-runtime has successfully passed createElement(...) and
                    Fragment(...) tests. This element should have an empty class attribute.
                </div>
                <div>
                    There should be a number: <Number/>
                </div>
                <div>
                    There should be wrapped content:
                    <Wrapper>Wrapped content</Wrapper>
                </div>

                <h3>SVG Support</h3>
                <svg_ _width={"128"} _height={"128"}>
                    <rect_ _width={"128"} _height={"128"} _fill={"#da3434"}/>
                </svg_>
            </section>
            <section>
                <h2>Testing: <code>State</code></h2>

                <h3><code>setState(...)</code> / <code>getState(...)</code></h3>
                <button onclick={() => setState(state, get(state) + 1)}>Increment</button>
                <button onclick={() => setState(state, get(state) - 1)}>Decrement</button>

                <h3><code>insert(...)</code></h3>
                <div>Count: {insert(state, c => <span>{c}</span>)}</div>

                <h3><code>insertToString(...)</code></h3>
                <div>Double: {insertToString(state, c => `${c * c}`)}</div>
            </section>
            <section>
                <h2>Testing: <code>List</code></h2>

                <h3><code>mutateList(...)</code></h3>
                <button onclick={() => mutateList(list, get(list).length, 0, Math.floor(Math.random() * 10))}>
                    Push Random Number
                </button>
                <button onclick={() => mutateList(list, 0, 1)}>Pop First</button>

                <h3><code>insert(...)</code></h3>
                {insert(list, list => <span>{list}</span>)}

                <h3><code>insertToString(...)</code></h3>
                {insertToString(list, list => JSON.stringify(list))}

                <h3><code>insertList(...)</code></h3>
                {insertList(list, num => (
                    <div>{num}</div>
                ))}
            </section>
            <section>
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