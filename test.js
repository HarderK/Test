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

function Point(x,y){
	this.x = x;
	this.y = y;
	/*this.compute = function(){
		return Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
	};*/
}
var p = new Point(1,1);
p.compute = function(){return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));};

Point.prototype.r = function(){
	return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
}

console.log(p.r());
console.log(p.compute());

function Bottle(x,y){
	this.x = x;
	this.y = y;

	var obj = {
		x : x+1,  //沿着作用于链一级一级解析
		x1 : this.x,
		y : y+1,
		y1 : this.y,
		y2 :y,
		sayAge : function(){
			return [this.x, this.y];
		}
	};

	this.output = function(){
		return obj;
	}

}

var bottle = new Bottle(1,2);
var o = bottle.output();
console.log(o);
console.log(o.sayAge());