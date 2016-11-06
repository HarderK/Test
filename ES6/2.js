function makeIterator(array) {
	var nextIndex = 0;
	return {
		next: function() {
			return nextIndex < array.length ? {value: array[nextIndex++], done: false} : {value: undefined, done: true};
		}
	}

}

var it = makeIterator(['a', 'b']);
console.log(it.next());
console.log(it.next());
console.log(it.next());
var m = new Map();
var o = {p: 'hello world'};
m.set(o, 'content');
console.log(m.get(o));
m.delete(o);
console.log(m.has(o));

var items = [['name', '张三'], ['title', 'Author']];

var map = new Map(items);
console.log(map);

function foo({x = 1, y = 5}) {
	console.log(x, y);
}
foo({});

/* 扩展运算符 */
// 将一个数组转为用逗号分隔的参数序列
console.log(...[1,2,3]);
// 该运算符主要用于函数调用

function f(x, y, z) {
	return x + y + z;
}

console.log(f.apply(null, [ 1, 2, 3]));

console.log(Math.max.apply(null, [14,3,77]));
console.log(Math.max(...[14,3,77]));


/* 扩展运算符的应用 */
// 提供了数组合并的新写法
{
	let more = [1, 2, 3]
	console.log([1, 2].concat(more));
}

// 与结构赋值结合
{
	const [first, ...rest] = [1,2,3,4,5];
	console.log(rest);

	// 如扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错
	// const [...butLast, last] = [1, 2, 3, 4, 6];
}

// 扩展运算符可以将字符串转为真正的数组
{
	let arr = [...'hello world'];
	console.log(arr);
}

// 任何实现了Iterator接口的对象，都可以通过扩展运算符转为真正的数组
{
/*	let nodeList = document.querySelectorAll('div');
	let array = [... nodeList];*/
}

// 扩展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象都可以使用扩展运算符
{
	let map = new Map([
		[1, 'one'],
		[2, 'two'],
		[3, 'three']
		]);
	console.log([...map.keys()]);

	let go = function* () {
		yield 1;
		yield 2;
		yield 3;
	};
	console.log([...go()]);
}


/* 箭头函数 */
{
	let f = v => v;
	console.log(f(2));

	f = () => 6;
	console.log(f());
	let sum = (num1, num2) => Math.min(num1, num2);
	console.log(sum(2,33));

	// 箭头函数的代码块多余一条语句，就要使用大括号将它们括起来,并且使用return语句返回
	sum = (num1, num2) => { return num1 + num2;};
	sum = (num1, num2) => ({id: num1, name: num2});
	console.log(sum(2,3));
}

{
	function Timer() {
		setTimeout(() => {
			console.log("id: ", this.id);
		}, 100);
	}

	var id = 21;
	Timer.call({id: 42});
}

{
	function insert(value) {
		return {into: function(array) {
			return {after: function(afterValue) {
				array.splice(array.indexOf(afterValue) + 1, 0, value);
				return array;
			}};
		}};
	}

	// console.log(1);
	console.log(1, insert(2).into([1,3]).after(1));
}
