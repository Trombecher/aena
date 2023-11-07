import {Box} from "aena";

export default function App() {
    const counter = new Box(0);

    return (
        <button onclick={() => counter.value++}>
            Count: {counter}
        </button>
    );
}