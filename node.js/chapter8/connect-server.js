// /**
//  * 模块依赖
//  */
// var connect = require('connect');

// /**
//  * 创建服务器
//  */
// var server = connect.createServer();

// /**
//  * 处理
//  */
// server.use(function(req, res, next){
// 	// 记录日志
// 	console.error('%s %s', req.method, req.url);
// 	next();
// });

// server.use(function(req, res, next){
// 	if('GET' == req.method && '/images' == req.url.substr(0, 7)){
// 		//托管图片
// 		res.writeHead(200);
// 		res.end("test1");
// 	} else {
// 		// 交给其他中间件去处理
// 		next();
// 	}
// });

// server.use(function(req, res, next){
// 	if('GET' == req.method && '' == req.url){
// 		// 响应index文件
// 		res.writeHead(200);
// 		res.end("test2");
// 	} else {
// 		// 交给其他中间件处理
// 		next();
// 	}
// });

// server.use(function(req, res, next){
// 	// 最后一个中间件
// 	res.writeHead(404);
// 	res.end('Not Found');
// });

// /**
//  * 监听
//  */
// server.listen(3000);


var connect = require('connect');

var server = connect.creatServer();

server.use(connect.static(__dirname));

server.listen(3000);




