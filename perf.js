const arr = Array(1_000_000);

{
    // 2.157ms
    console.time("while pre");
    let i = arr.length;
    while(--i) {
    }
    console.timeEnd("while pre");
}

{
    // 1.665ms
    console.time("while post");
    let i = arr.length;
    while(i--) {
    }
    console.timeEnd("while post");
}

// 1.634ms
console.time("for down post");
for(let i = arr.length; i > 0; i--) {
}
console.timeEnd("for down post");

// 1.618ms
console.time("for down pre");
for(let i = arr.length; i > 0; --i) {
}
console.timeEnd("for down pre");

// 1.684ms
console.time("for down post mod");
for(let i = arr.length; i; i--) {
}
console.timeEnd("for down post mod");

// 1.621ms
console.time("for down pre mod");
for(let i = arr.length; i; --i) {
}
console.timeEnd("for down pre mod");

// 1.897ms
console.time("for up post");
for(let i = 0; i < arr.length; i++) {
}
console.timeEnd("for up post");

// 1.882ms
console.time("for up pre");
for(let i = 0; i < arr.length; ++i) {
}
console.timeEnd("for up pre");

// 2.585ms
console.time("forEach");
arr.forEach(v => {});
console.timeEnd("forEach");

// 14.969ms
console.time("forOf");
for(const v of arr) {
}
console.timeEnd("forOf");