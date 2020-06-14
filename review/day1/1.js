// 在不知道要转换的值是不是null或undefined的情况下，可以使用转型函数String()

var value1 = 10;
var value2 = true;
var value3 = null;
var value4 = undefined;

var arr = [];
arr.push(10);
arr.push(true);
arr.push(null);
arr.push(undefined);
for (var i = 0; i < 4; i++) {
	console.log(typeof(arr[i]));
	console.log(String(arr[i]));
	console.log(typeof(String(arr[i])),"\n");
}

// Number()转型函数将null转换为0，将undefined转换为NaN
console.log(Number(null), Number(undefined));


// 一元加操作符 +, 放在非数值前面起Number()函数的作用
console.log(+undefined, +null);

var o = {x: 1, y: 2};
var x = "haha";
with(o){ 		// 将代码的作用域设置到一个特定的对象中
	console.log(x);
}

var num = 25;
switch(true){
	case num < 0:
		//
		break;
	case num > 12:
		//
		break;
	default: 
		//
}

function setName(obj){
	obj.name = "KingZHongguo";
	obj = {};
	obj.name = "Gary";
}

var person = {};
person.name = "HAHA";
setName(person);
console.log(person.name);

console.log(typeof /test*/g);		// 对正则表达式使用typeof在firefox和IE中返回object,一些浏览器返回function