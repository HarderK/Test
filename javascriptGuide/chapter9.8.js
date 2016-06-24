(function(){
	Object.defineProperty(Object.prototype, "objectId", {
		get : idGetter,		//取值器
		enumerable : false,
		configurable : false
	});

	function idGetter(){
		if (!(idprop in this)){
			if(!Object.isExtensible(this))
				throw Error("cant't define id for nonextensible objects");
			Object.defineProperty(this, idprop, {
				value : nextid++,
				writable :false,
				enumerable : false,
				configurable : false
			})
		}
		return this[idprop];
		}

	var idprop = "|**objectId**|";
	var nextid = 1;
	var obj = new Object();
	console.log(obj.objectId);
	console.log(obj.objectId);
	console.log("objectId" in obj);
	console.log("toString" in obj);
	for(var name in obj){
		console.log(name);
	}

}());

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

//将o的指定名字（或所有）的属性设置为不可写的和不可配置的
function freezeProps(o /* ,... */){
	var props = (arguments.length == 1) ? Object.getOwnPropertyNames(o) : Array.prototype.splice(arguments, 1);

	props.forEach(function(n){
		if(Object.getOwnPropertyDescriptor(o, n).configurable) return;
		Object.defineProperty(o, n, { writable: false, configurable: false});
	});

	return o;		//链式调用
}

function hideProps(o){
	var prop = (arguments.length == 1) ? Object.getOwnPropertyNames(o) : Array.prototype.splice.call(arguments, 1);
	props.forEach(function(n){
		if (!Object.getOwnPropertyDescriptor(o, n).configurable ) return;
		Object.defineProperty(o, n, { enumerable: false});
	});
}

function Range(from, to){
	this.from = from;
	this.to = to;
	freezeProps(this);
}

Range.prototype = hideProps({});

//将Range累的端点严格封装起来
function Range(from, to){
	if(from > to) throw new Error("Range: from must be <= to");

	function getFrom(){ return from;}
	function getTo(){ return to; }
	funciton setFrom(f){ 
		if(f <= to) from = f;
		else throw new Error("Range: from must be <= to");
	}
	function setTo(t){
		if(t >= from ) to = t;
		else throw new Error("Range: to must be >= from");
	}

	//将使用取值器的属性设置为可枚举的、不可配置的
	Object.defineProperties(this, {
		from : { get: getFrom, set: setFrom, enumerable: true, configurable: false},
		to: { get: getTo, set: setTo, enumerable: true, configurable: false}
	});
}

Object.seal(Range.prototype);

function StringSet(){
	this.set = Object.create(null);
	this.n = 0;
	this.add.apply(this, arguments);
}

StringSet.prototype = Object.create(AbstractWritableSet.prototype, {
	constructor : { value : StringSet;},
	contains : { value : function(x){ return x in this.set;} },
	size : { value : function(x){ return this.n;}},
	foreach : { value : function(f, c){ Object.keys(this.set).forEach(f, c);}}
});

(function namespace(){
	//这个函数将成为所有对象的方法
	function properties(){
		var name;	//属性名组成的数组
		if(arguments.length == 0) names = Object.getOwnPropertyNames(this);
		else if(arguments.length == 1 && Array.isArray(arguments[0]))
			names = arguments[0];
		else 
			names = Array.prototype.splice(arguments, 0);

		//返回一个新的Properties对象，用以表示属性的名字
		return new Properties(this, names);
	}

	//将它设置为Object.prototype的新的不可枚举的属性
	//这是从私有函数作用于到处的唯一一个值
	Object.defineProperty(Object.prototype, "properties", {
		value : properties,
		enumerable : false, writable : true, configurable : true
	});

	//这个构造函数是由上面的properties()函数所调用
	//Properties类表示一个对象属性的集合
	function Properties(o, names){
		this.o = o;
		this.names = names;
	}

	//将代表这些属性的对象设置为不可枚举的
	Properties.prototype.hide = function(){
		var o = this.o, hidden = { enumerable : false };
		this.names.forEach(function(n){
			if(o.hasOwnProperty(n)) Object.defineProperty(o, n, hidden);
		});
		return this;
	};

	//返回一个对象，这个对象是名字到属性描述符的映射表
	//使用它来复制属性，连同属性特性一起复制
	Properties.prototype.descriptors = function(){
		var o = this.o, desc = {};

		this.names.forEach(function(n){	//forEach()无法在所有元素都传递给调用的函数之前终止遍历
			if (!o.hasOwnProperty(n)) return;	
			desc[n] = Object.getOwnPropertyDescriptor(o, n);
		});
		return desc;
	};

	//最后将原型对象中的实例方法设置为不可枚举的
	//这里用到了刚定义的方法
	Properties.prototype.properties().hide();
}());