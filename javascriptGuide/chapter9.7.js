function defineSubClass(superClass, constructor, methods, statics){
	//建立子类的原型对象
	constructor.prototype = inherit(superClass.prototype);
	constructor.prototype.constructor = constructor;

	if(methods) extend(constructor.prototype, methods);
	if(statics) extend(constructor, statics);

	return constructor;
}

function extend(o, p){
	for (var name in p){
		o[name] = p[name];
	}
	return o;
}


//通过父类构造函数的方法实现继承
Function.prototype.extend = function(constructor, methods, statics){
	return defineSubClass(this, constructor, methods, statics);
};

function SingletonSet(member){
	this.member = member;
}

SingletonSet.prototype = inherit(Set.prototype);

extend(SingletonSet.protype, {
	constructor : SingletonSet,
	add : function(){ throw "read-ony set";},
	remove : function(){ throw "read-only set";},
	size : function() {return 1;},
	foreach : function(f,context){f.call(context, this.member);},
	contains : function(x) {return x === this.member;};
}); 


//在子类中调用父类的构造函数和方法

function NonNullSet(){
	//作为普通函数调用父类的构造函数来初始化通过该构造函数调用创建的对象
	Set.apply(this, arguments);
}

//将NonNullSet设置为Set的子类
NonNullSet.prototype = inherit(Set.prototype);
NonNullSet.prototype.constructor = NonNullSet;

//将null和undefined排除在外，重写add()方法
NonNullSet.prototype.add = function(){
	for(var i = 0; i < arguments.length; i++){
		if(arguments[i] == null) throw new Error("Can't add null or undefined to a NonNullSet");
	}

	return Set.prototype.add.apply(this, arguments);
};

//类工厂和方法链
/**
 * 这个函数返回具体set类的子类
 * 并重写该类的add()方法用以对添加的元素做特殊的过滤
 */
function filterSetSubclass(superclass, filter){
	var constructor = function(){
		superclass.apply(this, arguments);
	};

	var proto = constructor.prototype = inherit(superclass.prototype);
	proto.constructor = constructor;
	proto.add = function(){
		for(var i = 0; i < arguments.length; i++){
			var v = arguments[i];
			if (!filter(v)) throw ("value" + "v" + "rejected by fileter");
		}

		superclass.prototype.add.apply(this, arguments);
	};
}

//利用Function.prototype.extend()方法来重写NonNullSet
var NonNullSet = (function(){
	var superclass = Set;

	return superclass.extend(
		function() {superclass.apply(this, arguments);},
		{
			add : function(){
				for (var i = 0; i < arguments.length; i++) 
					if(arguments[i] == null) throw new Error("Can't add null or undefined");
				return superclass.prototype.add.apply(this, arguments);
			}

		}
		);
}());	

//这个函数可以用作任何抽象方法
function abstractmethod() { throw new Error("abstract method");}

/**
 * AbstractSet类定义了一个抽象方法: contains()
 */
function AbstractSet() { throw new Error("Can's instantiate abstract classes");}
AbstractSet.prototype.contains = abstractmethod;

/**
 *  NotSet是AbstractSet的一个非抽象子类
 *  
 */
var NotSet = AbstractSet.extend(
	function NotSet(set){ this.set = set;},
	{
		contains : function(x) {return !this.set.contains(x);},
		equals : function(){}
	}
	);

/**
 * AbstractEnumerableSet 是AbstractSet的一个抽象子类
 */
var AbstractEnumerableSet = AbstractSet.extend(
	function () { throw new Error("Can't instantiate abstract classes");},
	{
		size : abstractmethod,
		foreach : abstractmethod,
		isEmpty : function(){ return this.size() == 0;}
		toString : function(){}
	}
	);