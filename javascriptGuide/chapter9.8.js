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
Object.defineProperties(Range.protetype, {
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