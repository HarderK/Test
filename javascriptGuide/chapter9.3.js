/**
 * 把p中所有可枚举属性复制到o中，并返回o
 * 如果o和p中含有同名属性，则覆盖o中的属性
 * 这个函数并不处理getter和setter以及复制属性
 */
/*function extend(o, p){
	for(var prop in p){
		o[prop] = p[prop];
	}
	return o;
}
*/
var extend = (function(){
	for (var p in {toString: null}){
		return function extend(o){
			for (var i = 1; i < arguments.length; i++){
				var source = arguments[i];
				for(var prop in source) o[prop] = source[prop];
			}
			return o;
		};
	}

	return function patched_extend(o){
		for(var i = 1; i < arguments.length; i++){
			var source = arguments[i];

			for(var prop in source) o[prop] = p[prop];

			for(var j = 0; j < protoprops.length; j++){
				prop = protoprops[j];
				if(source.hasOwnproperty(prop)) o[prop] = source[prop];
			}
		}
		return o;
	};

	var protoprops = ["toString", "valueOf", "constructor", "hasOwnproperty", "isPrototypeOf", "propertyIsEnumerable"
	, "toLocalString"];
}());

//一个用于定义简单类的函数
function defineClass(constructor,		//用以设置实例的属性的函数
					 methods,			//实例的方法，复制至原型中
					 statics)			//类属性，复制至构造函数中
{
	if(methods) extend(constructor.prototype, methods);
	if(statics) extend(constructor, statics);
	return constructor;
}

//这是Range类的一个实现
var SimpleRange = defineClass(function(f, t){
	this.f =f; this.t = t;
},{
	includes: function(x){ return this.f <= x && x <= this.t;},
	toString: function(){ return this.f + "..." +this.t;}
},
{
	upto: function(t) {return new SimpleRange(0, t);}
});


String.prototype.trim = String.prototype.trim || function(){
	if(!this) return this;
	return this.replace(/^\s+|\s+$/g, "");
}

Function.prototype.getName = function(){
	return this.name || this.toString().match(/function\s*([^()]*)\(/)[1];
}
