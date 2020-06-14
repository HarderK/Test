/**
 * 缓存代理工厂函数
 * @param  {Function} fn 需要缓存结果的操作函数
 * @return {Function}    添加缓存代理后的操作函数 
 */
var createCacheProxyFactory = function(fn) {
	var cache = {};		// 缓存结果，以return部分的闭包的参数作为键

	return function() {
		var args = Array.prototype.join.call(arguments, ',');		// 将参数转化为cache的键

		if(args in cache) {
			return cache[args];
		}

		return cache[args] = fn.apply(this, arguments);
	};
}
