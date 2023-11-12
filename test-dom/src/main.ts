import TestApp from "./TestApp.tsx";

const test = TestApp();
if(test instanceof Node) document.body.append(test);
else document.body.append(...test);