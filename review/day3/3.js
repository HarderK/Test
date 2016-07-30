/* 创建对象 */
// 工厂模式
function createPerson(name,age){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.sayName = function(){
		return this.name;
	};
}

// 构造函数模式
function Person(name, age) {
	this.name = name; 
	this.age = age;
	this.sayName = function() {
		return this.name;
	};
}
var person = new Person("HAHA", 33);
console.log(person);
console.log(person.constructor);		// 创建一个新函数后，原型对象自动获得一个constructor属性指向prototype属性所在函数
console.log(Person.prototype.constructor === person.constructor);	// true
console.log(person instanceof Person);	// true


function  Person1(name, age) {
	this.name = name;
	this.age = age;
}
Person1.prototype.sayName = function() {
	console.log(this.name);
};

var person = new Person1("King", 43);
console.log(Person1.prototype.isPrototypeOf(person));	// true
// Object.getPrototypeOf()获得一个对象的原型
console.log(Object.getPrototypeOf(person));		// 实际上指向 Person1.prototype
console.log(Object.getPrototypeOf(person) === Person1.prototype);		// true

console.log(person.hasOwnProperty("name"));		// true
console.log(person.hasOwnProperty("sayName"));		// false
console.log("sayName" in person );		// true

var arr = Object.keys(person);
console.log(arr);
Object.defineProperty(person, "name", {
	enumerable : false
});
console.log(Object.keys(person));
console.log(Object.getOwnPropertyNames(person));		// 获取所有自有属性， 包括不可枚举

// 组合使用原型模式和构造函数模式
function Person2 (name, age) {
	this.name = name;
	this.age = age;
	this.friends = ["King", "Gary"];
}
Person2.prototype.sayName = function() {
	console.log(this.name);
};

/*Person2.prototype = {
	constructor: Person2,
	sayName : function(){
		console.log(this.name);
	}
}*/

// 动态原型模式
// 检查是否需要
function Person4(name) {
	this.name = name;

	if( typeof this.sayName !== "function"){
		Person4.prototype.sayName = function(){
			console.log(this.name);
		}
	}
}


function Person3 (name) {
	this.name = name;
	Person3.prototype.sayName = function() {
		console.log("wow");
	}
}
var person = new Person3("Yanxiong");
//console.log(Object.getPrototypeOf(person));
Person3.prototype.sayName();		// 原型方法的定义放在函数内，未实例化直接使用报错 毕竟别人定义在局部函数之中

// 寄生构造函数模式
// 返回的函数与构造函数没有关系
function Person5(name,age) {
	var o = new Object();
	o.name = name; 
	o.age = age;
	o.sayName = function(){
		console.log(this.name);
	};
	return o;
}

var friend = new Person5("Gary", 32);
console.log(friend instanceof Person5);		// false
console.log(Object.getPrototypeOf(friend));
console.log(Object.constructor);	

// 稳妥构造函数模式
function person (name,age) {
	// 私有变量和函数
	var name = name + Maht.random()*100;
	var age = 1992 + age;

	var o = new Object();
	o.sayName = function(){
		return name;
	};
	o.getAge = function(){
		return age;
	}
	return o;
}

function Person6(){
}
Person6.prototype = {
	constructor : Person6,
	name : "haha",
	friends : ["King", "Gary"]
};

var person1 = new Person6();
var person2 = new Person6();
console.log(person1.friends);
person1.friends.push("Song","li");
console.log(person2.friends);
var person3 = new Person6();
console.log(person3.friends);
person1.friends = ["yan"];
console.log(person1.friends);
console.log(person3.friends);
person3.friends.pop();
console.log(person1.friends);
console.log(person2.friends);