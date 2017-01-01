// 'use strict';
var a = [];
for(var i = 0; i < 10; i++) {
	a[i] = function(){
		console.log(i);
	};
}
a[1]();

var b = [];
for (let j = 0; j < 10; j++) {
	b[j] = function(){
		console.log(j);
	}
}

b[5]();


/*{
	console.log(dd);
	let dd = 1;
}*/

//  暂时性死区
var temp = 123;
if(true) {
	// temp = 'abc';
	// typeof temp;
	let temp;
}

function a() {
	let a = 10;
	// var a = 1;    let不允许在相同作用域内重复声明同一个变量
}

function func(arg) {	// 不能在函数内部重复声明参数
	// let arg;
}

function func1 (arg) {
	{
		let arg;
	}
}

var tmp = new Date();

function f() {
	console.log(tmp);
	if(false) {
		var tmp = "hello world"
	}
}
f();

var s = 'hello'
for (var i = 0; i < s.length; i++) {
	console.log(s[i])
}

console.log(i)

function f1() {
	let n = 5;
	{
		let n = 10;
	}
	console.log(n);
}

f1();

// ES6 引入了块级作用域，明确允许子啊块级作用域之中声明函数，声明语句的行为类似于let
if(true) {
	function f2() {}
}

function f3() {console.log('outside');}
(function() {
	if(false) {
		let f3 = function() {console.log('inside');}
	}
	f3();
}());


// const声明一个只读的常量，一旦声明，常量的值就不能改变,只在声明所在的块级作用域内有效
const PI = 3.1415;

// 存在暂时性死区，不存在提升
if(true) {
	const MAX = 5;
}
// console.log(MAX)

function* fibs() {
	var a = 0, b = 1;
	while (a < 10) {
		yield a;
		[a, b] = [b, a + b];
	}
}

var [first, second, third, fourth, fifth, sixth] = fibs();
console.log(first, second, third, fifth);

// 解构赋值不仅可以用于数组还可以用于对象
// 变量必须与属性同名才能取到正确的值
var {bar, foo} = {foo: "aaa", bar:'bbb'};
console.log(foo, bar);

// 对象内部的解构赋值是先找到同名属性，然后再赋值给对应的变量
var {foo: bar} = {foo:'aaa', ff: 'fff'};
console.log(bar);

// let命令的下一行 的圆括号是必须的，否则会报错。因为解析器首先会将起首的大括号理解成一个代码块而不是赋值语句。
let kkk;f
({kkk} = {kkk: 'abcd'});
console.log(kkk);

// 字符串的解构赋值
const [A,B,c,d,e] = "hello";
console.log(A,B,c,d,e);

var arr = [[1,2], [3,4]];
var arr1 = arr.map(([a,b]) => a+b);
console.log(arr1);

function move({x, y} = {x: 0, y: 0}) {
	return [x, y];
}
console.log(move({}));

var arr = [1, undefined, 3];
console.log(arr.map((x='yes') => x));



{
	for(let i = 0; i < 10; i++) {
		let j = i++;
		console.log(j);
	}

}

