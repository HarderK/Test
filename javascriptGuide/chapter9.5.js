/**
 * 以字符串的形式返回o的类型
 * -如果是null，返回“null”，如果是NaN，返回“nan”
 * -如果typeof所返回的值不是“object”，则返回这个值
 * -如果o的类不是“Object”，则返回这个值
 * -如果o包含构造函数并且这个构造函数有名称，则返回这个名称
 * -否则，一律返回"Object"
 */

//返回对象的类
function classOf(o){
	return Ojbect.prototype.toString.call(o).slice(8, -1);		//-1指最后一个元素
}

//返回函数的名字（可能是空字符串），不是函数的话返回null
Function.prototype.getName = function(){
	if("name" in this) return this.name;

	return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
}

function type(o){
	var t, c, n; 	// type, class, name;

	//处理null的特殊值情形
	if(o === null) return "null";

	//处理的null的特殊值情形
	if(o !== o) return "nan";

	//如果typeof的值不是"object"，则使用这个值
	//这可以识别出原始值的类型和函数
	if((t = typeof o) !== "object") return t;

	//返回对象的名字，除非值为"Object"
	//这种方式可以识别出大多数的内置对象
	if((c = typeof o) !== "Object") return c;

	//如果对象构造函数的名字存在的话，则返回他
	if(o.constructor && typeof o.constructor === "function" && (n = o.constructor.getName())) 
		return n;
}

var Complex = function(x, y){};
console.log(Complex.getName());

//如果o实现了除第一个参数之外的参数所表示的方法，则返回true
function quacks(o /*, ...*/){
	for(var i=1; i < arguments.length; i++){
		var arg = arguments[i];

		switch(typeof arg){
			case "string" :
				if(typeof o[arg] !== "function") return false;
				continue;
			case "function" :
				arg = arg.prototype;
			case "object" :
				for (var m in arg){
					if(typeof arg[m] !== "function") continue;
					if(typeof o[m] !== "function") return false;
				}
		}
	}
	return true;
}

function Set(){
	this.values = {};
	this.n = 0;
	this.add.apply(this, arguments);	//将所有参数都添加进这个集合
}

Set.prototype.add = function(){
	for (var i = 0; i < arguments.length; i++){
		var val = arguments[i];
		var str = Set._v2s(val);
		if(!this.values.hasOwnProperty(str)){
			this.values[i] = val;
			this.n++;
		}
	}
	return this;	//支持链式方法调用
}

//从集合删除元素，这些元素由参数决定
Set.prototype.remove = function(){
	for (var i = 0; i < arguments.length; i++){
		var str = Set._v2s(arguments[i]);
		if(this.values.hasOwnProperty(str)){
			delete this.values[str];
			this.n--;
		}
	}
	return this;
};

Set.prototype.contains = function(value){
	return this.values.hasOwnProperty(Set._v2s(value));
};

Set.prototype.size = function(){
	return this.n;
};

Set.prototype.foreach = function(f, context){
	for (var s in this.values){
		if(this.values.hasOwnProperty(s))
			f.call(context, this.values[s]);
	}
};

Set._v2s = function(val){
	switch (val){
		case undefined : return "u";
		case null : return "n";
		case true : return "t";
		case false : return "f";
		default : switch(typeof val){
			case "number" : return "#" + val;
			case "string" : return '"' + val;
			 default : return "@" + objectId(val);
		}
	}
};

function objectId(o){
	var prop = "|**objectid**|";	//私有属性，可以存放id
	if (!o.hasOwnProperty(prop))
		o[prop] = Set._v2s.next++;
	return o[prop];
}

Set._v2s.next = 100;

console.log(new Set("King").toString());

var extend = (function(){
	//在修复之前，首先检查是否存在bug
	for(var p in {toString: null}){
		//如果代码执行到这里，那么for/in循环会正确工作并返回
		//一个简单版本的extend()函数
		return function extend(o){
			for(var i = 1; i < arguments.length; i++){
				var source = arguments[i];
				for (var prop in source) o[prop] = source[prop];
			}
			return o;	
		};

		//如果代码执行到这里，说明for/in循环不会枚举测试对象的toString属性
		//因此返回另一个版本的extend()函数，这个函数显式测试
		//Object.prototype中的不可枚举属性
		return function patched_extend(o){
			for(var i = 1; i < arguments.length; i++){
				var source = arguments[i];
				for(var prop in source) o[prop] = source[prop];

				//现在检查特殊属性
				for(var j = 0; j < protoprops.length; j++){
					prop = protoprops[j];
					if(source.hasOwnproperty(prop)) o[prop] = source[prop];
				}
			}
			return o;
		};

		var protoprops = ["toString", "valueOf", "constructor", "hasOwnproperty", "isPrototypeOf",
						"propertyIsEnumerable", "toLocalString"];
	}
}());

extend(Set.prototype, {
	//将集合转换为字符串
	toString : function(){
		var s ="{", i = 0;

		this.foreach(function(v){
			s += ((i++ > 0) ? ", " : "") + v;
		});
		return s + "}";
	},

	toLocalString : function(){},
	toArray : function(){
		var a = [];
		this.foreach(function(v){
			a.push(v);
		});
		return a;
	}
});
console.log(new Set("King111").toString());

