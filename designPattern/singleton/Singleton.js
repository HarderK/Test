// 通用的单例模式
// 按照面向对象的理解，单例模式似乎一定先定义一个类。js中应该叫做引用类型。在将这个类实例化的过程中，我们只能创建一个实例
// 但是放在js中，我们应该这样理解，创建一个对象的过程中，确保这个对象只被创建一次，每一次重复创建都返回那个唯一的对象

var createIframe = (function() {
	var iframe;

	return function() {
		if(!iframe) {
			iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			document.body.appendChild(iframe);
		}
		return iframe;
	}
})(); 


// 以上代码中创建对象和管理单例两个功能并没有分开
// 并没有做到单一责任
// func函数用来创建想要的对象,不要传匿名函数
var getSingle = function(func) {
	var result = {};
	return function() {
		if(result[func.name] === undefined) {
			result[func.name] = func.apply(this, arguments);
		}
		
		console.log(result);
		return result[func.name];
	}
}

var func = function() {
	return [1, 2, 3];
}

console.log(func.toString())
getSingle(func)();