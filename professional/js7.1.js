function callerDemo(){
	if(callerDemo.caller){
		var a = callerDemo.caller.toString();
		console.log(a);
		console.log(callerDemo.caller);
	}else{
		console.log("this is a top function");
	}
}

function handleCaller(){
	callerDemo();
}

handleCaller();
//callerDemo();
//
function factorial(num){
	if(num <= 1){
		return 1;
	}else{
		return arguments.callee(num-1);	//arguments.callee指向一个正在执行函数的指针
	}
}

console.log(factorial(10));

//也可以使用命名函数表达式来完成递归
var factorial1 = function f(num){
	if(num <= 1){
		return 1;
	}else{
		return f(num-1);
	}
};

console.log(factorial1(10));



