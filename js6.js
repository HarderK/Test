var person = {};  //对象字面量语法
Object.defineProperty(person,"name",{
	writable : false,			//将属性设为只读模式
	value : "Nicholas"				
});

console.log(person.name);
person.name = "Greg";		//在严格模式下，赋值操作会被忽略，在严格模式下，赋值操作将会导致抛出错误
console.log(person.name);

Object.defineProperty(person,"name1",{
	configurable : false,
	value : "Yanxiong"
});
delete person.name1;
console.log(person.name1);

/*Object.defineProperty(person,"name1",{
	configurable : true,			//会抛出错误，
	value : "Yanxiong"
});*/

var book = {
	_year : 2004,
	edition : 1
}

Object.defineProperty(book,"year",{
	get : function(){
		return this._year;
	},
	set : function(newValue){
		if(newValue > 2004){
			this._year = newValue;
			this.edition +=newValue - 2004;
		}
	}
});



console.log(book._year);
console.log(book.year);
book.year = 2005;
console.log(book.edition);

//定义多个属性
var book1 = {};

Object.defineProperties(book1,{
	_year:{
		value:2004
	},
	edition:{
		value:1
	},
	year:{
		get:function(){
			return this._year;
		},
		set:function(newValue){
			if(newValue > 2004){
				this._year = newValue;
				this.edition += newValue - 2004;
			}
		}
	}
});

console.log(book1.year);

console.log();

//读取属性的特征
var descriptor = Object.getOwnPropertyDescriptor(book1,"_year");
console.log(descriptor.value);
console.log(descriptor.configurable);
console.log(descriptor.get);

var descriptor1 = Object.getOwnPropertyDescriptor(book1,"year");
console.log(descriptor1.value);
console.log(descriptor1.enumerable);
console.log(descriptor1.get);

function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function(){
		console.log(this.name);
	};
}

var person1 = new Person("Nicholas",29,"Software Engineer");
var person2 = new Person("Greg",27,"Doctor");

console.log(person1 instanceof Person);

function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = sayName;
}
function sayName(){
	console.log(this.name);
}



//创建对象，时工厂模式
function createPerson(name,age,job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		console.log(this.name);
	}
	return o;
}

person1 = createPerson("Haha",20,"coder");
console.log(person1);
console.log(typeof(person1));
console.log(person1 instanceof Object);


//创建对象，原型模式
function Person2(){
}

Person2.prototype.name = "Nicholas";
Person2.prototype.age = 29;
Person2.prototype.job = "Software Engineer";
Person2.prototype.sayName = function(){
	console.log(this.name);
};

person1 = new Person2();
person1.sayName();
console.log(person1);
console.log(Person2.prototype);

console.log(Person2.prototype.isPrototypeOf(person1));	//
console.log(Object.getPrototypeOf(person1) == Person2.prototype);		//Object.getPrototypeOf(),返回[[Prototype]]的值

person1.name = "haha";
console.log(person1.name);

console.log(person1.hasOwnProperty("name"));		//使用hasOwnProperty()方法可以检测一个属性是否存在于实例中

delete person1.name;		//使用delete操作符删除实例属性
console.log(person1.name);

console.log(person1.hasOwnProperty("name"));


console.log("name" in person1);	//in操作符会在通过对象能够访问给定属性时返回true

function hasPrototypeProperty(object,name){
	return !object.hasOwnProperty(name) && (name in object);
}

console.log(hasPrototypeProperty(person1,"name"));

person1.name = "haha";
console.log(hasPrototypeProperty(person1,"name"));

console.log(Object.keys(Person2.prototype));
console.log(Object.getOwnPropertyNames(Person2.prototype));

function Person3(){}

//使用对象字面量形式重写原型对象，construct属性指向Object，需要特意将其设置回适当的值，重设后会导致
//[[Enumerable]]特性被设置为true
Person3.prototype = {
	constructor : Person3,
	name : "Peter",
	age : 24,
	job : "Software Engineer",
	sayName : function(){
		console.log(this.name);
	}
};
console.log(Object.keys(Person3.prototype));

var friend = new Person3();
console.log(friend instanceof Object);
console.log(friend instanceof Person3);
console.log(friend.constructor);

Object.defineProperty(Person3.prototype,"constructor",{
	enumerable : false
})
console.log(Object.keys(Person3.prototype));
console.log(friend.constructor);

Person3.prototype = {
	test : "test1"
}

console.log(friend.test);	//重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系




//组合使用构造函数模式和原型模式
function Person4(name,age,job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.friends = ["Shelby","Court"];
}

Person4.prototype = {
	constructor : Person4,
	sayName : function(){
		console.log(this.name);
	}
}

person1 = new Person4("Nicholas",20,"Software Engineer");
person2 = new Person4("Greg",23,"Doctor");

person1.friends.push("Van");

console.log(person1);
console.log(person2);
person1.sayName();
console.log(Person4.prototype);

/**
 * 动态原型模式
 */
function Person5(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	
	//方法
	if(typeof this.sayName != "function"){
		Person5.prototype.sayName = function(){
			console.log(this.name);
		};
	}
}

person = new Person5("Haha",35,"singer");
person.sayName();

/**
 * 寄生构造函数
 */
function Person6(name,age,job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		console.log(this.name);
	}
	return o;
}

friend = new Person6("King",29,"Manager");
//console.log(friend);
friend.sayName();

/**
 * 稳妥构造函数
 */
function Person7(name,age,job){
	var o = new Object();
	
}


/**
 * 6.3 继承，原型链
 */
function SuperType(){
	this.property = true;
	this.colors = ["red","blue","green"];

}

SuperType.prototype.getSuperValue = function(){
	return this.property;
};

function SubType(){
	this.subproperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function(){
	return this.subproperty;
};

//重写超类中的方法
SubType.prototype.getSuperValue = function(){
	return 1;
}

var instance = new SubType();

console.log(instance.getSuperValue());

console.log(instance instanceof SuperType);		//只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型

console.log(SubType.prototype.isPrototypeOf(instance));


//原型链的问题
instance.colors.push("black");

var instance2 = new SubType();
console.log(instance2.colors);

/**
 * 借用构造函数
 */
 function Super(name){
 	this.name = name;
 }
 function Sub(name){
 	Super.call(this,name);
 }
 instance = new Sub("HAHA");
 console.log(instance.name);


