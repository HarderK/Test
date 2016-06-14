function inherit(o){
	if(o == null) throw TypeError();

	if(Object.create) return Object.create(o);

	var t = typeof o;
	if(t !== "object" && t !== "function" ) throw TypeError();

	function F(){}
	F.prototype = o;
	return new F();
}

var o = inherit({x : 1});
o.y = 2;
var b = o.hasOwnProperty("x");
var c = "x" in o;
console.log(b);
console.log(c);

Object.defineProperty(o, "y",{
	enumerable : false
});

var d = o.propertyIsEnumerable("y");
console.log(d);
d = o.hasOwnProperty("y");
console.log(d);

var arr = [];
for(var property in o){		//for-in循环，返回的是所有能够通过对象访问的、可枚举的属性（实例中的、原型中的)
	arr.push(property);
}
console.log(arr);

console.log(null !== NaN);
console.log(undefined !== NaN);
console.log(Number(null));
console.log(Number(undefined));
console.log(null === null);
console.log(undefined === undefined);

/**
 * 把p中的可枚举属性复制到o中，并返回o
 * 如果o和p具有同名属性，则覆盖o中的属性
 * 这个函数并不处理getter和setter以及复制属性
 */
function extend(o, p){
	for (var prop in p){
		o[prop] = p[prop];
	}
	return o;
}

/**
 * 将p中的可枚举属性复制到o中，并返回o
 * 如果o和p具有同名的属性，o的属性将不受影响
 * 这个函数并不处理getterhesetter以及复制属性
 */
function merge(o, p){
	for (var prop in p){
		if(o.hasOwnProperty(prop)) continue;
		o[prop] = p[prop];
	}
	return o;
}

/**
 * 如果o中的属性在p中不存在同名属性，则从o中删除这个属性
 * 返回o
 */
function restrict(o, p){
	for (var prop in o){
		if(!(prop in p)) delete o[prop];
	}
	return o;
}

/**
 * 如果o中的属性在p中存在同名属性，则从o中删除这个属性
 * 返回o
 */
function substract(o, p){
	for (var prop in p){
		delete o[prop];		//从o中删除，删除一个不存在的属性不会报错
	}
	return o;
}

/**
 * 返回一个新对象，这个对象同时拥有o的属性和p的属性
 * 如果o和p中有同名属性，使用p中的属性
 */
function union(o, p){
	return extend(extend({}, o), p);
}

/**
 * 返回一个新对象，但这个对象拥有同时存在o和p中出现的属性
 */
function intersection(o, p){
	return restrict(extend({}, o), p);
}

function keys(o){
	if(typeof o !== "object") throw TypeError();

	var result = [];
	for(var porp in o){
		if(o.hasOwnProperty(prop)) result.push(prop);
	}
	return result;
}

/**
 * 给Object.prototype添加一个不可枚举的extend()方法
 * 这个方法继承自它的对象，将作为参数传入的对象的属性一一复制
 * 除了值之外，也复制属性的所有特性，除非在目标对象中存在同名的属性，
 * 参数对象的所有自有对象（包括不可枚举的属性）也会一一复制
 */
Object.defineProperty(Object.prototype,"extend",{
	writable : true,
	enumerable : false,
	configurable : true,
	value : function(o) {
		var names = Object.getOwnpropertyNames(o);	//得到所有自有属性，包括不可枚举属性

		for(var i = 0; i < names.length; i++){
			//如果属性已经存在，则跳过
			if(names[i] in this) continue;

			//获取o的属性的描述符
			var desc = Object.getOwnpropertyDescriptor(names[i]);

			Object.defineProperty(this, names[i], desc);
		}
	}
});

var p = {x:1};
var o = Object.create(p);
p.isPrototypeOf(o);  //=>true:o继承自p
Object.prototype.isPrototypeOf(o); //=>true: p继承自Object.prototype;

function classOf(o){
	if(o === null) return "null";
	if(o === undefined) return "undefined";
	return Object.prototype.toString.call(o).slice(8, -1);
}

console.log(classOf({}));
console.log(classOf(new Date()));