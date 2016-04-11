var person = {
	name: "Haha",
	age: 29,
	5: true
}; //属性名也可以使用字符串，数值属性会自动转换为字符串

var colors = ["red", "blue", "green"]; //数组字面量

var colorss = new Array(20); //传递一个数值，则创建一个包含参数项的数组

console.log(colors.toString()); //返回字符串
console.log(colors.join("||")); //返回字符串

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