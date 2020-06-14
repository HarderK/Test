function Test(a){
	this.a = a;
}
Test.prototype.sayName = function(){};


/*Object.defineProperty(Test.prototype, "sayName", {
	enumerable : false
} );*/

var instance = new Test("hava");
Object.defineProperty(instance, "a", {
	enumerable: false
});

function Try(){}
Try.prototype = Test.prototype;
var inst = new Try();
console.log(inst instanceof Test);		//instanceof实际上是检测了对象的继承关系，而不是检测创建对象的构造函数

//Set类的一个辅助构造函数
function SetFromArray(a){
	Set.apply(this, a);
}

/*//设置原型，以便SetFromArray能创建Set实例
SetFromArray.prototype = Set.prototype;

var s = new SetFromArray([1,3,45]);
//s instanceof Set;		//true;*/

console.log( 0 == null);

console.log( 0 == undefined);	//在比较相等性之前不能将null和undefined转换为其他值

for(var name in instance){
	console.log(name);
}
// console.log(inst instanceof Try);
// 
var o = new Object();
for (var name in o){
	console.log(name);
}

/**
 * 创建一个不可变的类，它的属性和方法都是只读的
 * 这个方法可以使用new调用，也可以省略new，它可以用作构造函数也可以用作工厂函数
 */
function Range(from, to){
	//这些都是对from和to只读属性的描述符
	var props = {
		from : {value: from, enumerable: true, writable:false, configurable: false},
		to : {value: to, enumerable:true, writable: false, configurable: false}
	};
	if(this instanceof Range) Object.defineProperties(this, props);

	else return Object.create(Range.prototype, props);
}

//用同样的方法给Range.prototype对象添加属性
//那么我们需要给这些属性设置它们的特性
//因为我们无法识别出它们的可枚举性、可写性或可配置性，这些属性特性默认都是false
Object.defineProperties(Range.prototype, {
	includes : {
		value : function(x) { return this.from <= x && x <= this.to;}
	},
	foreach : {
		value : function(f) {
			for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
		}
	},
	toString : {
		value : function(){}
	}
});

var o = Object.create(Range.prototype, {
	color : {
		value : ["red", "green"], enumerable : true
	},
	getName : {
		value : function() {return this.color;}
	}
});


console.log(o.hasOwnProperty("color"));
console.log(o.hasOwnProperty("includes"));
console.log(o.__proto__);	//继承过来的值无法读取
console.log(Object.keys(o));
console.log(Object.getOwnPropertyNames(o));

var te = function test(){ console.log(1111); };
te();
console.log(te.name);

var collections;
if(!collections) collections = {};

//定义sets模块
collections.sets = (function namespace(){
	//在这里定义很多集合类，使用局部变量和函数

	//通过返回命名空间对象将其导出
	return {
		Abstract : AbstractSet,
		NotSet : NotSet,
		AbstractEnumerableSet : AbstractEnumerableSet
	};
}());

collections.sets = (new function namespace(){
	this.Abstract = AbstractEnumerableSet;
});

(function namespace(){
	collections.sets.AbstractEnumerableSet = AbstractEnumerableSet;
});
