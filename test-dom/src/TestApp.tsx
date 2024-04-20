import {getState, insertState, insertStateToString, setState, State} from "../../src";
import {JSX} from "../../src/jsx-runtime";

export default function TestApp() {
    const state = new State(0);
    
    return (
        <>
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
            <h1>Testing: State</h1>
            <div className={""}>Count: {insertState(state, c => <span>{c}</span>)}</div>
            <div>Double: {insertStateToString(state, c => `${c * c}`)}</div>
            <button onclick={() => setState(state, getState(state) + 1)}>Increment</button>
            <button onclick={() => setState(state, getState(state) - 1)}>Decrement</button>
            <section>
                <h1>Testing: <code>aena/jsx-runtime</code> SVG support</h1>
                <svg _width={"128"} _height={"128"}>
                    <rect _width={"128"} _height={"128"} _fill={"#da3434"}/>
                </svg>
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