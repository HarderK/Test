/**
 * 请求事件中间件
 *
 * 选项
 * 	-'time'('Number') 超时阈值(默认100)
 *
 * @param {object} options 
 * @api public
 */

module.exports = function(opts) {
	var time = opts.time || 100;

	return function(req, res, next) {
		var timer = setTimeout(function() {
			console.log('\033[90m%s %s\033[91mis taking to long!\033[39m', req.method, req.url);
		}, time);

		/**
		 * 重写方法
		 */
		var end = res.end;	// 保持对原始函数的引用
		res.end = function(chunk, encoding) {
			res.end = end;	//恢复原始函数
			res.end(chunk, encoding); // 调用原始函数
			clearTimeout(timer);
		};

		next();
	}
}