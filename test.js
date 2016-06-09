function SuperType(name){
	this.name = name;
	this.colors = ['red','blue'];
}
SuperType.prototype.sayName = function(){return this.name};

function SubType(name,age){
	SuperType.call(this,name);
	this.age = age;
}

SubType.prototype = (function(){
	function F(){}
	F.prototype = SuperType.prototype;
	var proto = new F();
	proto.constructor = SubType;
	proto.sayAge = function(){return this.age;};	//增强对象
	return proto;
})();



var instance = new SubType("James",28);
console.log(instance.sayName());
console.log(SubType.prototype);
console.log(instance.sayAge());

var arr = [];
for (var property in instance){
	arr.push(property);
}
console.log(arr);