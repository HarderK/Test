function Person(name, age){
	this.name = name;
	this.age = age;
}
Person.prototype.sayName = function(){
	console.log(this.name + " KING");
};

var person = new Person("HAHA", 33);
console.log(person);
// delete person.name;
console.log(person);
delete person.sayName;		// delete无法删除原型中的属性与方法
person.sayName();

Object.defineProperty(person, "age", {

});
console.log(Object.getOwnPropertyDescriptor(person, "age"));

for (var prop in person){
	console.log(prop);
}

function F(){};
F.prototype = {
	constructor : F,
	name : "haha",
	friends : ["King", "Song", "Gary"],
	sayName : function(){
		console.log(this.name);
	}
};

var obj1 = new F();
var obj2 = new F();
obj1.friends.push("Liu");
console.log(obj2.friends);
obj1.friends = ["guang"];
console.log(obj1.friends);
console.log(obj2.friends);

delete obj1.friends;
console.log(obj1.friends);


function Per (name,age,job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;

	return o;
}

var per = new Per("haha", 38, "Singer");
console.log(per instanceof Per);		// false