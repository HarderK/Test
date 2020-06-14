function createFunctions(){
	var results = [];

	for (var i = 0; i < 10; i++) {
		results[i] = function(){
			return i;
		};
	}

	return results;
}

function createFunction(){
	var results = [];

	for(var i = 0; i < 10; i++) {
		results[i] = (function(num){
			return function() {
				return num;
			};
		})(i);
	}

	return results;
}
var results = createFunctions();
console.log(results[3]());

var results = createFunction();
console.log(results[3]());

var result = function(i){		 // 如何区分函数声明和函数表达式，function关键字的左边的字符非常重要
	console.log(i);
}(10);				

(function(i) {
	console.log(i);
})(10);		

// 闭包
function createComparisonFunction(propertyName) {
	return function(obj1, obj2) {
		var value1 = obj1[propertyName];
		var value2 = obj2[propertyName];

		switch(true){
			case value1 < value2 :
				return -1;			// 函数中可以使用return来终止switch,实际上是终止了函数
			case value1 > value2 :
				return 1;
			default:
				return 0;
		}
		console.log("hi");
	};
}

var func = createComparisonFunction("age");
var ret = func({name: "haha", age: 33}, {name: "King", age: 45});
console.log(ret);

ret = null;		// 解除对匿名函数的引用，以便释放内存

// 有关this对象不得不说的故事
var name = "The Window";

var obj = {
	name : "My Object",
	getNameFunc : function(){
		//var that = this;
		return function test(){
			return this.name;
		};
	}
};

console.log(this);

// 内存泄漏见test.html


/* 私有变量 */

// 构造函数中定义特权方法
function MyObject(){
	var privateVal = 10;
	function privateFunc() {
		return "this is my house";
	}

	this.publicMethod = function(){
		privateVal++;
		return privateFunc();
	};
	this.publicGet = function(){
		return privateVal;
	}
}

var obj = new MyObject();		// 实例中不包含私有变量,
console.log(obj.publicMethod());
console.log(obj.publicGet());
console.log(obj);

var obj1 = new MyObject();
console.log(obj1.publicGet());		// 10,构造函数不共享私有变量 

// 静态私有变量
(function(){
	var privateVal = 10;
	var privateFunc = function(){
		return "hello world";
	};

	MyObj = function(){};		// 使用未经声明的变量自动创建一个全局变量

	MyObj.prototype.getVal = function(){
		return privateVal++;
	};

})();

var obj = new MyObj();
console.log(obj.getVal());
var obj1 = new MyObj();
console.log(obj.getVal());		// 所有实例共享私有变量


// 模块模式
// 以对象字面量形式来创建单例对象
var singleton = (function() {
	var privateVal = 10;
	function privateFunc() {
		return "Fighting!";
	}

	return {
		publicVal : 22,
		publicFunc : function(){
			//
			return privateFunc();
		},
		publicGet : function(){
			return privateVal++;
		}
	}
})();

console.log(singleton.publicFunc());
console.log(singleton.publicGet());
console.log(singleton.publicGet());


var application = (function(){
	var components = [];
	//初始化
	components.push(new BaseComponent());

	// 公共
	return {
		getComponentCount : function(){
			return components.length;
		},
		registerComponent : function(component){
			if(typeof component === "object") {
				component.push(component);
			}
		}
	};
}());

function BaseComponent(){
}

console.log(application);

// 增强的模块模式
var singleton = (function(){
	var privateVal = 10;
	var privateFunc = function(){};

	// 返回对象是某种特定类型
	var obj = new CustomType();

	// 添加特权方法,共有属性和方法
	obj.publicProperty = true;
	obj.publicFunc = function(){
		return privateVal;
	};
	return obj;
}());


var application = function(){
	var components = [];

	// 初始化
	components.push(new BaseComponent());

	var app = new BaseComponent();

	app.getComponentCount = function(){
		return components.length;
	};
	app.registerComponent = function(component){
		if(typeof component === "object"){
			component.push(component);
		}
	};
	return app;

}();