var person = {};  //对象字面量语法
Object.defineProperty(person,"name",{
	writable : false,			//将属性设为只读模式
	value : "Nicholas"				
});

console.log(person.name);
person.name = "Greg";		//在严格模式下，赋值操作会被忽略，在严格模式下，赋值操作将会导致抛出错误
console.log(person.name);

Object.defineProperty(person,"name1",{
	configurable : false,
	value : "Yanxiong"
});
delete person.name1;
console.log(person.name1);

/*Object.defineProperty(person,"name1",{
	configurable : true,			//会抛出错误，
	value : "Yanxiong"
});*/

var book = {
	_year : 2004,
	edition : 1
}

Object.defineProperty(book,"year",{
	get : function(){
		return this._year;
	},
	set : function(newValue){
		if(newValue > 2004){
			this._year = newValue;
			this.edition +=newValue - 2004;
		}
	}
});



console.log(book._year);
console.log(book.year);
book.year = 2005;
console.log(book.edition);

//定义多个属性
var book1 = {};

Object.defineProperties(book1,{
	_year:{
		value:2004
	},
	edition:{
		value:1
	},
	year:{
		get:function(){
			return this._year;
		},
		set:function(newValue){
			if(newValue > 2004){
				this._year = newValue;
				this.edition += newValue - 2004;
			}
		}
	}
});

console.log(book1.year);

console.log();

//读取属性的特征
var descriptor = Object.getOwnPropertyDescriptor(book1,"_year");
console.log(descriptor.value);
console.log(descriptor.configurable);
console.log(descriptor.get);

var descriptor1 = Object.getOwnPropertyDescriptor(book1,"year");
console.log(descriptor1.value);
console.log(descriptor1.enumerable);
console.log(descriptor1.get);

function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function(){
		console.log(this.name);
	};
}

var person1 = new Person("Nicholas",29,"Software Engineer");
var person2 = new Person("Greg",27,"Doctor");

console.log(person1 instanceof Person);

function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = sayName;
}
function sayName(){
	console.log(this.name);
}


