// 创建对象
var person = new Object();
person.name = "haha";
person.age = 29;
person.job = "Engineer";
person.sayAge = function(){
	console.log(this.age);
};

//对象字面量语法
var person = {
	name : "haha",
	age : 29,
	job : "Engineer",
	sayAge : function(){console.log(this.age);}
};

/* 数据属性 */
Object.defineProperty(person, "name", {
	writable : false 		// 设置name属性不可写
});
person.name = "fas";		// 赋值操作将被忽略
console.log(person.name);	// haha

Object.defineProperty(person, "name", {
	configurable : false
});

delete person.name;			// 设置为不可配置后，忽略delete操作
console.log(person.name);

/*Object.defineProperty(person, "name", {	
	enumerable : false,
	configurable : true
});*/

// Object.defineProperty(person, "name", {
// 	writable: true
// });

/* 访问器属性 */
var book = {
	_year : 2016,
	edition : 1
};
Object.defineProperty(book, "year", {
	get: function() { return this._year; },
	set: function(value) { 
		this.edition += value- this._year;
		this._year = value;
	}
});

// 定义访问器属性的旧方法
book.__defineGetter__("year", function(){
	return this._year;
});
book.__defineSetter__("year", function(value){
	this.edition += value - this._year;
	this._year = value;
});

// 定义多个属性
var person = {x:1};
Object.defineProperties(person,{
	name : {
		value: "haha"			// 调用了设置属性，而不显式的设置其他属性将设置为false
	},
	_age : {
		value : 28
	},
	age : {
		get : function(){ return this._age; },
		set : function(value){ this._age = value; }
	}
});

var obj = Object.getOwnPropertyDescriptor(person, "name");		// 数据属性
console.log(obj);
var obj1 = Object.getOwnPropertyDescriptor(person, "age");		// 访问器属性
console.log(obj1);
console.log(Object.getOwnPropertyDescriptor(person, "x"));

function inherit(p) {
	if(p == null) throw TypeError();
	if(Object.create){
		return Object.create(p);
	}
	var t = typeof p;
	if(t !== "object" && t !== "function") throw TypeError();
	function f(){}
	f.prototype = p;
	return new f();
}

var o = {};
o.x = 1;
Object.defineProperty(o, "x", {writable: false});		// 设置为只读属性
var p = inherit(o);
console.log(p.x);
p.x = "haha";		// 继承自一个只读属性，那么赋值操作是不允许的
console.log(p.x);

// 内置构造函数的原型是只读的
Object.prototype = {};		// 赋值失败，但不会报错

var o = inherit({y: 2});
o.x = 1;
o.propertyIsEnumerable("x");		// true o中可枚举的自有属性
console.log(o.propertyIsEnumerable("y"));		// false: y是继承的
var b = Object.prototype.propertyIsEnumerable("toString"); 		// false: 不可枚举
console.log(b);

for(var p in o){
	if(!o.hasOwnProperty(p)) continue;		// 跳过继承的属性
	if(!o.propertyIsEnumerable(p))	continue;
	if(typeof p === "function") continue;		// 跳过方法
}

// 存取器属性对象字面量语法的扩展写法
var serialnum = {
	// $符号暗示这个属性是私有属性
	$n : 0,

	// 返回当前值，然后自增
	get next() { return $n++; },

	set next(n) {
		if( n > $n ) this.$n = n;
		else throw Error("序列号的值不能比当前值小");
	}
}


// 复制属性的特性
Object.defineProperty(Object.prototype, "extend", {
	writable : true,
	enumerable : false,
	configurable : true,
	value : function(o) {
		// 得到所有自有属性
		var names = Object.getOwnPropertyNames(o);

		// 遍历
		for(var i = 0; i < names.length; i++) {
			// 如果属性已经存在，跳过
			if(names[i] in this) continue;
			// 获得o中属性的描述符
			var desc = Object.getOwnPropertyDescriptor(o, names[i]);

			Object.defineProperty(this, names[i], desc);
		}
	}
});