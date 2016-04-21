/**
 * 闭包
 */
function createComparisonFunction(propertyName){
	return function(object1,object2){
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];

		if(value1 < value2){
			return -1;
		}else if(value1 > value2){
			return 1;
		}else{
			return 0;
		}
	};
}

var compare = createComparisonFunction("name");
var result = compare({name:"Nicholas"},{name:"Greg"});
console.log(result);

compare = null;		//解除对匿名函数的引用，以便释放内存

function createFunctions(){
	var result = new Array();

	for(var i=0;i<10;i++){
		result[i] = function(){
			return i;
		}
	}
	return result;
}
var arr = createFunctions();
console.log(arr[5]());

/**
 * 闭包与变量
 */
function createFunctions1(){
	var result = new Array();
	for(var i=0;i<10;i++){
		result[i] = function(num){
			return function(){
				return num;
			};
		}(i);		//立即执行函数
	}
	return result;
}

arr = createFunctions1();
console.log(arr[2]());

/**
 * 关于this对象
 */
var name = "The Window";
var object = {
	name : "My Object",
	getNameFunc : function(){
		var that = this;
		return function(){
			return that.name;
		};
	}
};

console.log(object.getNameFunc()());