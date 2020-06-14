// 数组的创建
var arr = new Array(20);
var arr = Array(20);		// 省略new操作符
var arr = [];			// 数组字面量的形式,实际上没有调用Array构造函数

// length属性可写
var arr = ['red', 'blue', 'orange'];
arr.length = 2;
console.log(arr);		// ['red', 'blue'];

arr.length = 5;
console.log(arr);		// ['red', 'blue', , , ] 后面三个值为undefined
arr.length = 2;
arr[arr.length] = 'ff';			// 利用length属性添加新项
arr[arr.length] = 'afkd';	
console.log(arr);

// 检测数组
arr instanceof Array;		// 同一个作用

Array.isArray(arr);			// ECMAScript5提供的方法，无论是哪一个全局执行环境

// 转换方法
console.log(arr.toString());
console.log(arr.toLocaleString());
console.log(arr);
console.log(arr.valueOf() instanceof Array);		// true

// 栈方法
console.log(arr.push("test1", "test2")); 		// 可以提供多个参数值， 返回新数组的长度
console.log(arr.pop());		// 没有参数，返回移除的项

// 队列方法
arr.push("test3");
var val = arr.shift();		// 移除数组的第一项
console.log(val);
var len = arr.unshift('red1', 'red2');		// 返回新数组的长度
console.log(arr);
console.log(len);

// 重排序方法, 会改变原先标识符的值
console.log(arr.reverse());
console.log(arr);
arr.sort();			// sort()方法比较的是字符串，数值会先调用toString()方法转换为字符串
console.log(arr);

var arr = [12, 3, 6, 22, 13];
arr.sort();
console.log(arr);		// [12, 13, 22, 3, 6]
function compare (val1, val2) {
	return val1 - val2;
}
arr.sort(compare);		// 接收一个比较函数
console.log(arr);

// 操作方法， 不改变原先操作符的值
var arr = ['red', 'blue', 'black', 'purple', 'white', 'grey'];
var returnArr = arr.concat("yoyo",['Kobe', 'James']);		// 将接收的参数添加到原先数组副本的结尾
console.log(returnArr);

returnArr = arr.slice(1, 5);
console.log(returnArr);
returnArr = arr.slice(1, -1);		// 接收负值参数
console.log(returnArr);

// 哈哈，强大的数组方法 splice(), 删除，插入和替换
arr.splice(1, 2);	// 删除第2项和第3项
console.log(arr);
arr.splice(0, 1, 'blue', 'black');		// 替换第一项
console.log(arr);
arr.splice(1, 0, 'red');		// 从第一项后插入
console.log(arr);

// 归并方法 
var str = arr.reduce(function(pre, cur){
	return pre+cur;
});
console.log(str);


// 稀疏数组
var arr = [,,,];
console.log(1 in arr);

// 设置length属性为只读
var arr = ['red', 'blue', 'black', 'purple', 'white', 'grey'];
Object.defineProperty(arr, 'length', {
	writable: false
});
console.log(arr, arr.length);
//arr.pop();		// 会报错，设置了length属性为只读口不能修改数组的长度

var keys = Object.keys(arr);
console.log(keys);

// reduce()方法
var arr = [1, 4, 2, 11, 5];
var sum = arr.reduce(function(x,y){return x+y;}, 100);
console.log(sum);

var arr = [[1,2,3], [3,2,1], [11,23,3]];
// var conc = arr.reduce(Array.prototype.concat.call(arr));

var isArray = Function.isArray || function(o) {
	return typeof o === 'object' && Object.prototype.toString.call(o) === '[object Array]';
};

var now = new Date();
console.log(now);
console.log(now.toString());
console.log(now.toLocaleString());

var date = new Date(Date.parse("June 4 2016 13:12:55"));
console.log(date);

var date = new Date(Date.UTC(2016, 6, 29, 13, 51, 55));		// 基于GMT时区创建
var date = new Date(2016, 6, 29, 13, 51, 55);		// 基于本地时区创建
console.log(date.toLocaleString());

var interval = Date.now() - now.valueOf();		// 不调用valueOf方法也会自动完成转换
console.log(interval);


// 正则表达式
var text = 'mom and dad and baby';
var pattern = /.nd/ig;
var matches = pattern.exec(text);
console.log(matches);

var matches = pattern.exec(text);
console.log(matches);
pattern.lastIndex = 0;		// 不设置为0，pattern搜索的起始位置为上面两次搜索后的结果

if(pattern.test(text)){
	console.log('Yes');
}


var text = "javascript java php nodejava";
var pattern = /java.+?java/i;		// 非贪婪匹配
var matches = pattern.exec(text);
console.log(matches);

function outer(){
	inner();
}

function inner(){
	console.log(arguments.callee.caller);
}
outer();

var str = new String("this is a test");		// 创建一个基本包装类型
console.log(typeof str);		// object
console.log(Boolean(str));		// true

// Object()构造函数会想工厂方法一样，
// 根据传入值的类型返回相应基本包装类型的实例
var str = new Object("this is a string");
console.log(typeof str);
console.log(str instanceof String);

var num = 10.551;
console.log(num.toFixed(2));		// 按指定的小数位返回数值的字符串表示, 自动舍入
console.log(typeof num.toFixed(2));		// string

console.log(num.toExponential(1));		// 返回以指数法表示的数值的字符串形式，同样会自动舍入

// 自动判断表示形式
console.log(num.toPrecision(1));

var arr = ["orange", 'juice', 'test'];
arr.splice(1,0,"haha","et");
console.log(arr);

// localeCompare()方法
// 按字符表中的顺序比较
var str = "yoyo";
console.log(str.localeCompare("yello"));


// fromCharCode()静态方法
console.log(String.fromCharCode(104,101,108,108,111));

var num = Math.floor(Math.random()*100+1);
console.log(num);

function selectFrom(lowervalue, uppervalue){
	var choices = uppervalue - lowervalue + 1;
	return Math.floor(Math.random()*choices + lowervalue);
}
console.log(selectFrom(55,89));

console.log(Math.LN10);
console.log(Math.LN2);
console.log(Math.LOG2E);
console.log(Math.LOG10E);
console.log(Math.SQRT1_2);

