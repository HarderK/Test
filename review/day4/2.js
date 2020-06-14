var f = function fact() { console.log("hello world")};
f();

function getPropertyNames(o, /* optional*/ a) {
	if(a == undefined) a = [];		// 如果未定义，则使用空数组
	a = a || [];
	for(var property in o) a.push(property);

	return a;
}

console.log(null == 0);
console.log(null == undefined);
console.log(null == false);

function max (/* ... */) {
	var max = Number.NEGATIVE_INFINITY

	for(var i = 0; i < arguments.length; i++){
		max = max < arguments[i] ? arguments[i] : max;
	}
	return max;
}

var largest = max(32,32,898,23,1,-111,34);
console.log(largest);

/* 自定义函数对象的计数器属性 */
uniqueInteger.counter = 0;

function uniqueInteger(){
	return uniqueInteger++;
}

// 将函数自身当做数组来对待
function factorial(n){
	if(isFinite(n) && n > 0 && n == Math.round(n)){
		if(!(n in factorial))		// 如果没有缓存结果
			factorial[n] = n * factorial[n-1];
		return factorial[n];
	}
	return NaN;
}
factorial[1] = 1;		// 初始化缓存


var uniqueInteger = (function(){
	var counter = 0;
	return function(){
		return counter++;
	};
}());

function counter(n) {
	return {
		get count() { return n++;},
		set count(m) { n = 0;}
	}
}

function addPrivateProperty(o, name, predicate) {
	var value;

	o["get" + name] = function(){
		return value;
	};

	o["set" + name] = function(v) {
		if(predicate && !predicate(v)) {
			throw Error("set" + name + ": invalid value " + v);
		}
		else {
			value = v;
		}
	};
}

// 传入实参的个数和期待传入的个数
function check(args){
	var actual = args.length;
	var expected = args.callee.length;
	if(actual !== expected) {
		throw Error("Expected " + expected + " args; got " + actual);
	}
}

function f(x, y, z){
	check(arguments);
	return x+y+z;
}

function trace(o, m){
	var original = o[m];

	o[m] = function (){
		console.log(new Date(), "Entering:", m);
		var result = original.apply(this, arguments);
		console.log(new Date(), "Exiting:", m);
		return result;
	};
}
var obj = {say: function(x,y) {return x+y;}};
trace(obj, "say");
console.log(obj.say("hello", "world"));

/*function trace(o, m){
	var original = o[m];

	o[m] = function(){
		console.log("test");
		var result = original.apply(this, arguments);
		console.log("test end");
		return result;
	}
}*/

function func(y) {return this.x + y;}
var o = {x: 1};
var g = func.bind(o);
console.log(g(2));

var pattern = /fsdf/g;
console.log(typeof pattern);	// object

function classof(o) {
	return Object.prototype.toString.call(o);
}

console.log(classof(pattern));
console.log(classof(null));
console.log(classof(undefined));


function type(o) {
	var t, c, n;		// type, class, name
	if(o === null) return "null";
	if(o !== o) return "nan";

	// 如果typeof的值不是"object"，则使用这个值
	// 这可以识别出原始值的类型和函数
	if((t = typeof o) !== "object") return t;

	// 返回对象的类名，除非值为"object"
	// 这种方式可以识别出大多数的内置对象
	if((c = classof(o)) !== "Object") return c;

	// 如果以构造函数的名字存在的话
	if(o.constructor && typeof o.constructor === "function" && (n = o.constructor.getName()))
		return n;
}

function classof(o) {
	return Object.prototype.toString.call(o).slice(8, -1);
}

Function.prototype.getName = function(){
	if("name" in this) {
		return this.name;
	}
	return this.name = this.toString().match(/function\s([^(]*)\(/)[1];
}