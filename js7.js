function functionName(arg0,arg1,arg2){

}

console.log(functionName.name);			//给函数定义了一个非标准的name属性

//sayHi();	//错误；函数还不存在
//var sayHi = function(){console.log("hi");};
sayHi();

//不要这么做，浏览器会进行自动修正，不同浏览器的修正方法不同
if(true){
	function sayHi(){
		console.log("hi");
	}
}else{
	function sayHi(){
		console.log("Yo");
	}
}