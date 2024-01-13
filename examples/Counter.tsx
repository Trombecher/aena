import {Box} from "aena/box";

export default function App() {
    const counter = new Box(0);

    return (
        <button onclick={() => counter.value++}>
            Count: {counter}
        </button>
    );
}