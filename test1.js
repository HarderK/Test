var scope = "global";

function f(){
	console.log(scope);		//undefined，局部变量在整个函数体始终室友定义的。
	var scope = "local";
	console.log(scope);		//local
}
f();

var uniqueInteger = (function(){
						var count = 0;
						return function(){return ++count;};
					}());
var count = uniqueInteger();
	count = uniqueInteger();
console.log(count);

function counter(){
	var n = 0;
	return {
		count : function(){return n++;},
		reset : function(){ n = 0;}
	};
}

var c = counter(), d = counter();
	console.log(c.count());
	console.log(d.count());

function counter1(n){
	return {
		get count(){return n++},
		set count(m){
			if(m > n) n = m;
			else throw Error("count can only be set to a larger value");
		}
	};
}

var c = counter1(1000);
console.log(c.count);
c.count = 2000;
console.log(c.count);



/**
 * 利用闭包实现私有属性存储器方法
 * @param {object} o         给对象o增加属性存储器方法
 * @param {[type]} name      [description]
 * @param {function} predicate 验证函数
 */
function addPrivateProperty(o, name, predicate){
	var value;

	o["get" + name] = function() {return value;};

	o["set" + name] = function(v){
		if(predicate && !predicate(v)){
			throw Error("set" + name + ": invalid value " + v);
		}else {
			value = v;
		}
	}
}

var o = {};
var test = function(v){
	return typeof v === "string";
}
addPrivateProperty(o,"Name",test);

o.setName("James");
console.log(o.getName());

function constfunc(v){return function(){return v;};}

	var funcs = [];
	for(var i = 0; i< 10; i++){
		funcs[i] = constfunc(i);
	}

	console.log(funcs[9]());

function not(f){
	return function(){
		var result = f.apply(this,arguments);
		return !result;
	}
}

function even(x){
	return x % 2 === 0;
}
var odd = not(even);
console.log([1,3,5,5].every(odd));