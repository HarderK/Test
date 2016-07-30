/* 继承 */

// 原型链
function SuperType(){
	this.property = false;
}
SuperType.prototype.getSuperValue = function(){
	return this.property;
};

function SubType(){
	this.subproperty = true;
}
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function(){		// 必须要放在重写构造函数的后面，不然什么叫重写
	return this.subproperty;
};

var instance = new SubType();
console.log(instance.getSuperValue());
console.log(Object.getPrototypeOf(instance).constructor);		// 指向SuperType
console.log(instance instanceof SubType);
console.log(instance instanceof SuperType);
console.log(SuperType.prototype.isPrototypeOf(instance));
console.log("property" in instance);		// true

// 借用构造函数
function Super(name, age){
	this.name = name;
	this.age = age;
}

function Sub(name, age) {
	Super.apply(this, arguments);
}
var instance1 = new Sub("Wen", 24);
console.log(instance1);


// 组合继承
function SuperClass (name, age) {
	this.name = name;
	this.age = age;
}
SuperClass.prototype.sayName = function(){
	console.log(this.name);
};

function SubClass (name, age) {
	SuperClass.apply(this, arguments);
}

SubClass.prototype = new SuperClass();
SubClass.prototype.constructor = SubClass;
SubClass.prototype.getAge = function(){
	return this.age;
};

var instance1 = new SubClass("James", 31);
console.log(instance1);
instance1.sayName();
console.log("name" in Object.getPrototypeOf(instance1));
console.log(Object.getPrototypeOf(instance1));

// 原型式继承
function object(o) {
	if(Object.create) return Object.create(o);

	if(typeof o !== "function" && typeof o !== "object")
		throw TypeError();

	function F(){}
	F.prototype = o;
	return new F();
}

// 寄生式继承
// 封装继承过程的函数
// 在函数内部以某种方式增强对象
function createObject(o) {
	var clone = object(o);
	clone.sayName = function(){
		console.log("haha");
	};
	return clone;
}

// 继承组合式继承
function SuperHero(name, age) {
	this.name = name;
	this.age = age;
}
SuperHero.prototype.sayName = function() {
	console.log(this.name);
};	

function SubHero(name, age) {
	SuperHero.call(this, name, age);
}

function inheritPrototype (SubType, SuperType) {
	var proto = object(SuperType.prototype);
	proto.constructor = SubType;
	SubType.protoype = proto;
}
inheritPrototype(SubHero, SuperHero);

SubType.prototype.getAge = function() {
	console.log(this.age);
};

var instance = new SubHero("NONONO", 22);
console.log(SubHero.prototype);