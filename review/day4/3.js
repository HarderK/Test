function Person(name){
	this.name = name;
}

var person = new Person("haha");
console.log(typeof person);
console.log(classof(person));
console.log(classof(Person));

function classof(o){
	return Object.prototype.toString.call(o).slice(8, -1);
}


function Set(){
	this.value = {};
	this.n = 0;
	this.add.apply(this, arguments);
}
Set.prototype.add = function(){
	for(var i = 0; i < arguments.length; i++){

	}
};

function enumeration(namesToValues){
	var enumeration = function(){ throw "Can't instantiate Enumeration"};

	var proto = enumeration.prototype = {
		constructor : enumeration,
		toString : function(){ return this.name;},
		valueOf : function(){ return this.value;}
	}

	enumeration.values = [];

	for (name in namesToValues){
		var e = Object.create(proto);
		e.name = name;
		e.value = namesToValues[name];
		enumeration[name] = e;
		enumeration.values.push(e);
	}

	return enumeration;
}