var mult = function() {
	console.log('开始计算乘积');

	var a = 1;
	for (var i = 0, len = arguments.length; i < len; i++) {
		a *= arguments[i];
	}

	return a;
};

var proxyMult = (function() {
	var cache = {};

	return function() {
		var args = Array.prototype.join.call(arguments, ',');

		if(args in cache) {
			// console.log('cache中');
			return cache[args];
		}

		return cache[args] = mult.apply(this, arguments);
	}
})();

console.log(proxyMult(1, 3, 4, 4))
console.log(proxyMult(1, 3, 4, 4))
