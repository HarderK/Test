/**
 * 闭包
 */
function createComparisonFunction(propertyName){
	return function(object1,object2){
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];

		if(value1 < value2){
			return -1;
		}else if(value1 > value2){
			return 1;
		}else{
			return 0;
		}
	};
}

var compare = createComparisonFunction("name");
var result = compare({name:"Nicholas"},{name:"Greg"});
console.log(result);

compare = null;		//解除对匿名函数的引用，以便释放内存

function createFunctions(){
	var result = new Array();

	for(var i=0;i<10;i++){
		result[i] = function(){
			return i;
		}
	}
	return result;
}
var arr = createFunctions();
console.log(arr[5]());

/**
 * 闭包与变量
 */
function createFunctions1(){
	var result = new Array();
	for(var i=0;i<10;i++){
		result[i] = function(num){
			return function(){
				return num;
			};
		}(i);		//立即执行函数
	}
	return result;
}

arr = createFunctions1();
console.log(arr[2]());

/**
 * 关于this对象
 */
var name = "The Window";
var object = {
	name : "My Object",
	getNameFunc : function(){
		var that = this;
		return function(){
			return that.name;
		};
	}
};

console.log(object.getNameFunc()());

//内存泄漏
function assignHandler(){
	var element = document.getElementById("someElement");

	element.onclick = function(){
		console.log(element.id);
	};
}				//会造成循环引用，匿名函数存在，则element占用的内存不会被回收。

//模仿块级作用域
function outputNumbers(count){
	for (var i=0;i<count;i++){
		console.log(i);
	}
	console.log(i);		//没有块级作用域，变量i是定义在函数中的活动对象，因此可以在函数内部随处访问
}
outputNumbers(3);

(function(){
	var j=0;
})();			//用匿名函数，并立即调用来模仿块级作用域
//console.log(j);	//会返回错误，j未定义


//静态私有变量，创建特权方法
(function(){
	//私有变量
	var privateVariable = 10;

	//私有函数
	function privateFunction(){
		return false;
	}

	//构造函数
	MyObject = function(){};

	//公有/特权方法
	MyObject.prototype.publicMethod = function(){
		privateVariable++;
		return privateFunction();
	}
})();

object = new MyObject();
console.log(object.publicMethod());

(function(){
	var name = "";

	Person = function(value){
		name = value;
	};

	Person.prototype.getName = function(){
		return name;
	};

	Person.prototype.setName = function(value){
		name = value;
	};
})();

	var person1 = new Person("HAHA");
	console.log(person1.getName());
	person1.setName("Kongzg");
	console.log(person1.getName());

	var person2 = new Person();
	console.log(person2.getName());		//返回undefined,因为上一行实例化过程中，相当于传了一个undefined值

	person2.setName("Songzx");
	console.log(person2.getName());
	console.log(person1.getName());

	//模块模式
	var singleton = function(){
		//私有变量
		var privateVariable = 10;

		//私有函数
		function privateFunction(){
			return false;
		}

		//特权/公有方法和属性
		return {
			publicProperty : true,
			publicMethod : function(){
				privateVariable++;
				return privateFunction();
			},
			getVariable : function(){
				return privateVariable;
			}
		};
	}();

		console.log(singleton.publicMethod());
		console.log(singleton.getVariable());		//11

function BaseComponent(){
}
function CustomType(){}

var application = function(){
	//私有变量
	var components = new Array();

	//初始化
	components.push(new BaseComponent());	

	//公共
	return {
		getComponentCount : function(){
			return components.length;
		},
		registerComponent : function(component){
			if(typeof component == "object"){
				components.push(component);
			}
		}
	};
}();

/**
 * 增强的模块模式
 * 适合强调单例必须是某种类型的实例
 */

singleton = function(){
	//私有变量和私有函数
	var privateVariable = 10;
	function privateFunction(){
		return false;
	};

	//创建对象
	var object = new CustomType();

	//添加特权/公有属性和方法
	object.publicProperty = true;
	object.publicMethod = function(){
		privateVariable++;
		return privateFunction();
	};

	return object;
}();


function factorial(num){
	if(num <= 1){
		return 1;
	}else{
		return num * arguments.callee(num-1);
	}
}

var trueFactorial = factorial;
console.log(trueFactorial(10));


function outer(){
	inner();
}

function inner(){
	console.log(inner.caller);
}
outer();

/*window.color = "red";
var o = {color:"blue"};

function sayColor(){
	console.log(this.color);
}

sayColor();
sayColor.call(this);
sayColor.call(window);
sayColor.call(o);*/

var color = "red";
var o = {color:"blue"};
function sayColor(){
	console.log(this.color);
}
var objectSayColor = sayColor.bind(o);		//bind()会创建sayColor()函数的实例，并将this绑定为对象o

objectSayColor();

//工厂模式
function createPerson(name,age){
	var o = new Object();
	o.name = name;
	o.age = age;

	return o;
}

var obj = createPerson("haha",35);
console.log(typeof obj);
console.log(obj instanceof createPerson);		//false

//构造函数模式
function Person(name,age){
	this.name = name;
	this.age = age;
}

var person = new Person("King",29);
console.log(typeof person);
console.log(person instanceof Person);	//true
console.log(person.__proto__);


//原型模式
function Person1(){

}

Person1.prototype.name = "Haha";
Person1.prototype.age = "33";

person = new Person1();
console.log(person.name);
console.log(typeof person);
console.log(person instanceof Person1);		//true

console.log(person.__proto__);	//没有标准的方式访问[[Prototype]]，但Firefox、Safari和chrome在每个对象上都支持一个属性__proto__


//组合使用构造函数模式和原型模式

function Person2(name,age){
	this.name = name;
	this.age = age;
}

Person2.prototype = {
	constructor : Person2,
	job : "Software Engineer",
	sayName : function(){
		console.log(this.name);
	}
};

person = new Person2("haha",25);
console.log(person instanceof Person2);	//true
console.log(person);
person.sayName();

console.log(person.__proto__);

//动态原型模式
function Person3(name,age){
	this.name = name;
	this.age = age;

	if(typeof this.sayName != "function"){
		Person2.prototype.sayName = function(){
			console.log(this.name);
		};
	}
}

//寄生构造函数
function Person4(name){
	var o = new Object();
	o.name = name;

	return o;
}

//稳妥构造函数模式
function Person5(name){
	var o = new Object();
	o.name = name;
	o.sayName = function(){
		console.log(name);
	};

	return o;
}

person = Person5("Yanxiong");

console.log(person.name);

function SuperType(){
	this.property = true;
}
	SuperType.prototype.getSuperValue = function(){
		return this.property;
	};
function SubType(){
	this.subproperty = false;
}
SubType.prototype = new SuperType();

var instance = new SubType();
console.log(instance);
console.log(SubType.prototype.constructor);
console.log(SuperType.prototype.constructor);