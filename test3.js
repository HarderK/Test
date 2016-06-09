//工厂模式
function createPerson(name,age,job){
	var o = new Object;
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){};

	return o;
}

//构造函数模式
function Person(name,age){
	this.name = name;
	this.age = age;
	this.sayName = function(){};
}

//原型模式
function Person(){}
Person.prototype.name = "Jams";
Person.prototype.sayName = function(){alert(this.name);};

//更简单的原型语法
function Person(){}
person.prototype = {
	constructor : Person,
	name : "James",
	sayName : function(){alert(this.name);}
}


//组合使用原型语法与构造函数模式
function Person(name,age){
	this.name = name;
	this.age = age;
}

Person.prototype = {
	constructor : Person,
	sayName : function(){
		console.log(this.name);
	}
}


//动态构造函数模式
function Person(name,age){
	this.name = name;
	this.age = age;

	if(typeof Person.prototype.sayName != "function"){
		Person.prototype.sayName = function(){};
	}
}

//寄生构造函数模式
function Person(name,age){
	var o = new Object;
	o.name = name;
	o.age = age;
	return o;
}

//稳妥构造函数模式
function Person(name,age,job){
	var o = new Object;

	//私有变量
	var privateV, privateV2;

	//私有函数
	var privateF = function(){};

	//特权方法
	o.sayName = function(){
		return privateV;
	}

	return o;
}

//原型链
function SuperType(){
	this.property = true;
}
SuperType.prototype.getSuperValue = function(){
	return this.property;
}

function SubType(){
	this.subProperty = false;
}
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function(){};

//借用构造函数（伪造对象或经典继承）,超类对象只不过是在特定环境中执行代码的函数
function SuperType(name,age){
	this.name = name;
	this.age = age;
}

function SubType(name,age){
	SuperType.call(this,name,age);
	this.job = "How";
}

//组合继承（伪经典继承）结合原型链和借用构造函数
function SuperType(name){
	this.name = name;
}
SuperType.prototype.sayName = function(){};

function SubType(name,age){
	SuperType.call(this,name);
	this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){};


/**
 * 原型式继承
 * 基于已有的对象创建新对象，同时还不必创建自定义类型
 */
function object(o){
	function F(o){}
	F.prototype = o;
	return new F(o);
}

/**
 * 寄生式继承
 * 创建一个仅用于封装继承过程的函数，该函数以某种方式来增强对象
 */
function createAnother(original){
	function F() {
		this.name = "hi";
	}
	F.prototype = original;

	return new F();

}

/**
 * 寄生组合式继承
 * 
 */
function SuperType(name){
	this.name = name;
	this.colors = ['red','blue'];
}
SuperType.prototype.sayName = function(){};

function SubType(name,age){
	SuperType.call(this,name);
	this.age = age;
}

SubType.prototype = (function(){
	function F(){}
	F.prototype = SuperType.prototype;
	var proto = new F();
	proto.constructor = SubType;
	return proto;
})();

SubType.prototype.sayAge = function(){};
