// 用代理实现单例模式
var createDiv = function(html) {
	this.html = html;
	this.__init();
}

createDiv.prototype.__init = function() {
	var div = document.createElement('div');
	div.innerHTML = this.html
	document.body.appendChild(div);
};


// 这里面创建对象和管理单例已经分开了
// 但是对象却是单一的，如果要让对象是可扩展的，怎么办呢
var ProxySingleton = (function() {
	var instance = null;
	return function(html) {
		if(instance === null) {
			insance = new createDiv(html);
		}
		return intance
	}
})();

var ProxySingleton = (function() {
	var instance = {};
	return function(constructorFunc, arg) {
		if(instance[constructorFunc.name] == undefined) {
			instance[constructorFunc.name] = new constructorFunc(arg);
		}
		return insance[constructorFunc.name];
	}
})();