var ws = new WeakSet();

var a = [[1, 2], [3, 4]];

ws = new WeakSet(a);

var m = new Map();
var o = {p: 'Hello World'}

m.set(o, 'content');

console.log(m.get(o));

var map = new Map([['name', 'HarderK'], ['title', 'I have a dream']]);
console.log(map.size, map.has('name'), map.get('name'));