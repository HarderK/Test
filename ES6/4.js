// 尾调用
// 某个函数的最后一步是调用另一个函数
function f(x) {
	if(x > 0) return g(x);
	return n(x);
}
/**
 * 对象的扩展
 */
let o = {
	x: "",
	add(x, y) {
		return x + y;
	},
	get wheel () {
		return this.x || "hello world!";
	},
	set wheel (value) {
		this.x = value.toUpperCase();
	}
}
console.log(o.add(1, 3));
o.wheel = "hi";
console.log(o.x);

// Object.is()比较两个值是否严格相等
console.log(Object.is(NaN, NaN)); // true
console.log(o.__proto__.prototype);

let s = Symbol();
console.log(typeof s);