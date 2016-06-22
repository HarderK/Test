function Test(){}
Test.prototype.sayName = function(){};

function Try(){}
Try.prototype = Test.prototype;

var inst = new Try();
console.log(inst instanceof Test);		//instanceof实际上是检测了对象的继承关系，而不是检测创建对象的构造函数

//Set类的一个辅助构造函数
function SetFromArray(a){
	Set.apply(this, a);
}

/*//设置原型，以便SetFromArray能创建Set实例
SetFromArray.prototype = Set.prototype;

var s = new SetFromArray([1,3,45]);
//s instanceof Set;		//true;*/

console.log( 0 == null);

console.log( 0 == undefined);	//在比较相等性之前不能将null和undefined转换为其他值