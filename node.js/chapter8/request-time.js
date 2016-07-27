/**
 * 请求事件中间件
 *
 * 选项
 * 	-'time'('Number') 超时阈值(默认100)
 *
 * @param {object} options 
 * @api public
 */

module.exports = function(opts){
	var time = opts.time || 100;

	return function(req, res, next){
		var timer = setTimeout(function(){
			console.log('\033[90m%s\033[39m \033[91mis taking to long!\033[39m', req.method, req.url);
		}, time)
	};

	var end = res.end;		// 保持对原始函数的引用
	res.end = function(chunk, encoding){
		res.end = end;
		res.end(chunk, encoding);
		clearTimeout(timer);
	};
};