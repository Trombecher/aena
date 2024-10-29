import {insertList} from "../../src";
import {derive, List, mutateList, setState, State} from "../../src/state";

export default () => {
    const items = new List<number>([1, 2, 3, 4, 5, 6, 7]);
    const selected = new State<number | undefined>(undefined);

    return (
        <div>
            <button
                onclick={() => mutateList(items, 0, 1)}
            >pop first
            </button>
            {insertList(items, item => (
                <button
                    _style={derive(selected, selected => (console.log(`Updated: ${item}`), `background-color:${item === selected ? "red" : ""}`))}
                    onclick={() => setState(selected, item)}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};