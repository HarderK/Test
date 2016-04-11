var person = {
	name: "Haha",
	age: 29,
	5: true
}; //属性名也可以使用字符串，数值属性会自动转换为字符串

var colors = ["red", "blue", "green"]; //数组字面量

var colorss = new Array(20); //传递一个数值，则创建一个包含参数项的数组

console.log(colors.toString()); //返回字符串
console.log(colors.join("||")); //改变分隔符， 返回字符串

console.log(colors.valueOf()); //返回数组

console.log(colors); //返回数组

console.log(colors.toLocaleString()); //返回字符串

var person1 = {
	toLocaleString : function() {
		return "Nikolaos";
	},
	toString : function(){
		return "Nicholas";
	}
}

var person2 = {
	toLocaleString : function(){
		return "Grigorios";
	},
	toString : function(){
		return "Greg";
	}
}

var people = [person1,person2];		

console.log(people);
console.log(people.toString());
console.log(people.toLocaleString());

var removed = colors.splice(0,1);		//删除第一项
console.log(removed);

removed = colors.splice(1,0,"yellow","orange");		//从位置1开始插入2项
console.log(removed);
console.log(colors);

removed = colors.splice(1,1,"red","purple");		//插入两项，删除一项
console.log(removed);

var numbers = [1,2,3,4,5,6,7,2,1,3,1];

var result = numbers.every(function(item,index,numbers){
	return (item > 3);
});
console.log(result);

result = numbers.filter(function(item,index,numbers){
	return (item > 2);
});
console.log(result);

result = numbers.map(function(item,index,numbers){
	return item*2;
});
console.log(result);

numbers.forEach(function(item,index,numbers){

});

var now = new Date();
console.log(now);

var someDate = new Date(Date.parse("4/11/2016 12:00:38"));	//使用Date.parse()函数接收一个表示日期的字符串，返回相应的毫秒数
console.log(someDate);


var start = Date.now();
//for(var i=0;i<1000000000;i++){}

var stop = Date.now(), result = stop-start;
console.log(result);

console.log(typeof(+new Date()));
console.log(Date.now());

var date = new Date();
console.log(date);
console.log(date.toUTCString());
console.log(date.toLocaleString());

var text = "cat, bat, sat, fat";
var pattern1 = /.at/;
var matches = pattern1.exec(text);
console.log(matches.index);
console.log(matches[0]);
console.log(pattern1.lastIndex);

matches = pattern1.exec(text);
console.log(matches.index);
console.log(matches[0]);
console.log(pattern1.lastIndex);

var pattern2 = /.at/g;
matches = pattern2.exec(text);
console.log(matches.index);
console.log(matches[0]);
console.log(pattern2.lastIndex);

matches = pattern2.exec(text);
console.log(matches.index);
console.log(matches[0]);
console.log(pattern2.lastIndex);

var pattern = new RegExp("\\[bc\\]at","gi");

console.log(pattern.toString());
console.log(pattern.valueOf());

var num = 1000;
console.log(num.toFixed(2));	//按指定的小数位返回数值的字符串形式
console.log(num.toExponential(2));		//以指数表示法，表示数值的字符串形式

