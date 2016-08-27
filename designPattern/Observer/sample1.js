var salesOffices = {}; // 定义售楼处

salesOffices.clientList = []; // 缓存列表，用于存放订阅者的回调函数

salesOffices.listen = function(key, fn) { // 增加订阅者
	if (!this.clientList[key]) {
		this.clientList[key] = [];
	}
	this.clientList[key].push(fn);
};

salesOffices.trigger = function() { // 发布消息
	// for (var i = 0, fn; fn = this.clientList[i++];) {
	// 	fn.apply(this, arguments); // arguments是发布消息时带上的参数
	// }

	var key = Array.prototype.shift.call(arguments),
		fns = this.clientList[key];

	if (!fns || fns.length == 0) { // 如果没有订阅该消息，则返回
		return false;
	}

	for (var i = 0, fn; fn = fns[i++];) {
		fn.apply(this, arguments); // arguments是发布消息时附带的参数，第一个参数已经移出
	}
};

salesOffices.remove = function(key, fn) {
	var fns = this.clientList[key];

	if(!fns){		// 如果key对应的消息没有人订阅
		return false;
	}

	if(!fn) {		// 如果没有传入具体的回调函数
		fns && (fns.length = 0);
	} else {
		for (var l = fns.length - 1; l >= 0; l--) {		// 反向遍历订阅的回调函数列表
			var _fn = fns[l];
			if(_fn === fn) {
				fns.splice(l, 1);		// 删除订阅者的回调函数
			}
		}
	}
};


salesOffices.listen("squareMeter88",function(price) {
	console.log("价格= " + price);
	// console.log("squreMeter= " + squareMeter);
});

salesOffices.trigger('squareMeter88', 2000000);