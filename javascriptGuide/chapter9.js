function inherit(p){
	if(p == null) throw TypeError();	//p是一个对象，但是不能是null
	if(Object.create) return Object.create(p);

	var t = typeof p;
	if(t !== "object" && t !== "function") throw TypeError();
	function f(){}
	f.prototype = p;
	return new f();
}

//寄生构造函数模式
function person(name, age, job){
	var o = new Object;
	o.name = name;
	o.age = age;
	o.job = "Welcome";
	o.sayName = function(){
		return this.job;
	}
	return o;
}
var instance = person("haha", 14, "Singer");
console.log(instance.sayName());

//原型链
 function SuperType(){
 	this.property = true;
 }
 SuperType.prototype.getSuperValue = function(){
 	return this.property;
 }

 function SubType(){
 	this.property = false;
 }
 SubType.prototype = new SuperType();
 SubType.prototype.constructor = SubType;
 SubType.prototype.getSubValue = function(){
 	return this.property;
 };

//借用构造函数
function SuperType(name){
	this.colors = ["red", "gray"];
}

function SubType(name, age){
	SuperType.call(this, name);
	this.age = age;
}

//组合继承
function SuperType(name, age){
	this.name = name;
	this.age = age;
}
SuperType.prototype.getSuperValue = function(){
	return this.name;
};

function SubType(name, age, job){
	SuperType.call(this, name, age);
	this.job = job;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
	return this.age;
};

//原型式继承
function object(p){
	function F(){}
	F.prototype = o;
	return new F();
}

//寄生式继承
function createAnother(p){
	var clone = object(p);
	clone.sayHi = function(){

	}
}

//寄生组合式继承
//通过借用构造函数来继承属性，通过原型链的混成形式来继承方法
//不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已
//使用寄生式继承来继承超类型的原型，然后再将结果给子类型的原型
function inheritPrototype(subType, superType){
	var prototype = object(superType.prototype);
	prototype.constructor = subType;
	subType.prototype = prototype;
}

function SuperType(name){
	this.name = name;
}
SuperType.prototype.getValue(){
	return this.name
}

function SubType(name, age){
	SuperType.call(this, name);
	this.age = age;
}

inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function(){

};