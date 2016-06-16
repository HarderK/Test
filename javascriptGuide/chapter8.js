var o = {
	m: function(){
		var self = this;
		console.log(this === o);

		f();

		function f(){
			console.log(this === o);
			console.log(self === o);
		}
	}
};

o.m();

function max(/* ... */){
	var max = Number.NEGATIVE_INFINITY;

	for(var i = 0; i < arguments.length; i++){
		max = arguments[i] > max ? arguments[i] : max;
	}

	return max;
}

var largest = max(1, 1000, 10, 20, 24, 200, 10024, 99, -1111);
console.log(largest);

function flexisum(a){
	var total = 0;
	for(var i = 0; i < arguments.length; i++){
		var element = arguments[i], n;
		if(element == null) continue;

		if(isArray(element)) n = flexisum.apply(this, element);
		else if(typeof element === "function") n = Number(element());
		else n = Number(element);

		if(isNaN(n)) throw Error("");

		total += n;
	}
	return total;
}

var operators = {
	add: function(x, y){return x + y;},
	substract: function(x, y){return x - y;}
}
function operator(operation, operand1, operand2){
	if(typeof operators[operation] === "function")
		return operators[operation](operand1, operand2);
	else throw "unknown operator";
}

//初始化函数对象的计数器属性
//由于函数声明被提前了，因此这里是可以在函数声明之前给它的成员赋值
uniqueInteger.counter = 0;

//每次调用这个函数都会返回一个不同的整数
//它使用一个属性来记住下一次将要返回的值
function uniqueInteger(){
	return uniqueInteger.counter++;
}

//计算阶乘，并将结果缓存值函数的属性中
function factorial(n){
	if(isFinite(n) && n > 0 && n == Math.round(n)){
		if( !(n in factorial)) 
			factorial[n] = n * factorial[n-1];
		return factorial[n];
	}else return NaN;
}
	
factorial[1] = 1;

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

var sum = function(x,y){return x + y;};

//创建一个类似于sum的新函数，但是this的值绑定到null
//并且第一个参数绑定到1，这个新的函数期望只传入一个实参
var succ = sum.bind(null,1);
console.log(succ(2));

//ECMAScript3版本的Function.bind()方法
if(!Function.prototype.bind){
	Function.prototype.bind = function(o /*, args */){
		//将this和arguments的值保存至变量中
		//以便在后面嵌套的函数中可以使用它们
		var self = this, boundArgs = arguments;

		//返回值是一个函数
		return function(){
			//创建一个实参列表，将传入bind()的第二个及后续的实参都传入这个函数
			var args = [], i;
			for(i = 1; i < boundArgs.length; i++) args.push(boundArgs[i]);
			for(i = 0; i < arguments.length; i++) args.push(arguments[i]);
			//现在将self作为o的方法来调用，传入这些实参
			return self.apply(o, args);
		}
	}
}

function isFunction(x){
	return Object.prototype.toString.call(x) === "[object Function]";
}

var sum = function(x, y){return x + y;};
var square = function(x, y){return x*x;};

//计算出平均数和标准差
var data = [1,1,3,4,6];
var mean = data.reduce(sum)/data.length;
var deviations = data.map(function(x){return x - mean;});
var stddev = Math.sqrt(deviations.map(square).reduce(sum)/(data.length-1));

//自定义map()函数
//对于每个数组函数调用函数f()，并返回一个结果数组
//如果Array.prototype.map定义了的话，就使用这个方法
var map = Array.prototype.map ? function(a, f){return a.map(f);} : function(a, f){
	var results = [];
	for(var i = 0; i < a.length; i++){
		if(i in a) results[i] = f.call(null, a[i], i, a);
	}
	return results;
};

var reduce = Array.prototype.reduce ? function(a, f, initial){
	if(arguments.length > 2)
	return a.reduce(f, initial);
	else return a.reduce(f);
	} : function(a, f ,initial){
		var i = 0, len = a.length, accumulator;
	if(arguments.length > 2){
		accumulator = initial;
	}else{
		if(len == 0) throw TypeError();
		while(i < len){
			if(i in a){
				accumulator = a[i++];
				break;
			}
			i++;
		}
		if(i == len) throw TypeError();
	}

	//对于数组中剩下的元素依次调用f()
	while(i < len){
		if(i in a)
			accumulator = f.call(null, accumulator, a[i], i, a);
		i++;
	}
	return accumulator;
};

function not(f){
	return function(){
		var result = f.apply(this, arguments);
		return !result;
	}
}

function compose(f, g){
	return function(){
		return f.call(this, g.apply(this, arguments));
	}
}

function array(a, n){
	return Array.prototype.slice.call(a, n || 0);
}

//这个函数的实参传递至左侧
function partialLeft(f /*, ...*/){
	var args = arguments;
	return function(){
		var a = array(args, 1);
		a.concat(array(arguments));
		return f.apply(this, a);
	};
}

function partialRight(f /*, ...*/){
	var args = arguments;
	return function(){
		var a = array(arguments);
		a.concat(array(args, 1));
		return f.apply(this, a);
	};
}
function partial(f /*, ...*/){
	var args = arguments;
	return function(){
		var a = array(args, 1);
		var j = 0;
		for(var i = 0; i < a.length; i++){
			if(a[i] === undefined) a[i] = arguments[j++];


		}
			//将剩下的内部实参都追加进去
			a = a.concat(array(arguments, j));

			return f.apply(this, a);
	};
}

var data = [1, 1, 3, 5, 5];
var sum = function(x, y){ return x + y;};
var product = function(x, y){ return x * y;};
var neg = partial(product, -1);
var square = partial(Math.pow, undefined, 2);
var sqrt = partial(Math.pow, undefined, .5);
var reciprocal = partial(Math.pow, undefined, -1);
var mean = product(data.reduce(sum), reciprocal(data.length));
var stddev = sqrt(product(data.map(compose(square, partial(sum, neg(mean)))).reduce(sum), reciprocal(sum(data.length, -1))));
console.log(1);
console.log(mean);
console.log(stddev);
console.log(data.map(compose(square, partial(sum, neg(mean)))));

//返回f()的带有记忆功能的版本
//只有当f()的实参的字符串表示都不相同时它才会工作
function memorize(f){
	var cache = {};

	return function(){
		//将实参转换为字符串形式，并将其用作缓存的键
		var key = arguments.length + Array.prototype.join.call(arguments, ",");
		if(key in cache) return cache[key];
		else return cache[key] = f.apply(this, arguments);
	};
}

//返回两个整数的最大公约数
//使用欧几里得算法
function gcd(a, b){
	if(a === null || a === undefined) throw TypeError();
	var t;	//临时变量用来存储交换数值
	if(a < b) t=b, b=a, a=t;	//确保a >= b
	while(b != 0) t=b, b=a%b, a=t;	//求最大公约数的欧几里得算法
	return a;
}

var  gcdmemo = memorize(gcd);
console.log(gcd(18,96));
console.log(gcd(18,96));

//注意，当我们写一个递归函数时，往往需要实现记忆功能
//我们更希望调用实现了记忆功能的递归函数，而不是原递归函数
var factorial = memorize(function(n){ return (n <= 1) ? 1 : n * factorial(n-1); });