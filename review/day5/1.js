function Person(name, age){
	var job = "programming engineering";
	var sayHi = function(){
		console.log("hi");
	};

	this.name = name;
	this.age = age;
	this.getPrivateFunc = sayHi;
}

var person = new Person("HAHA", 33);
console.log(person);
person.getPrivateFunc();
console.log(Person);