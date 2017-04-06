var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var chatServer = require('./lib/chat_server');

var cache = {}; 	// 用来缓存文件内容的对象

// 创建HTTP服务器
var server = http.createServer(function(request, response) {
	var filePath = false;

	if(request.url === '/') {
		filePath = 'public/index.html';
	} else {
		filePath = 'public' + request.url;
	}

	var absPath = './' + filePath;	// 文件路径

	serveStatic(response, cache, absPath);
});

server.listen(3000, function() {
	console.log('Server listening on port 3000.');
});

chatServer.listen(server);

/* -- 辅助函数start -- */

	// 	所请求的文件不存在时， 发送404错误
	function send404(response) {
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.write('Error 404: resource not fount.');
		response.end();
	}

	// 文件数据服务，先写出正确的http头， 然后在发送文件的内容
	function sendFile(response, filePath, fileContents) {
		response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
		response.end(fileContents);
	}

	// 确定文件是否缓存了，缓存了，则直接使用缓存，没有被缓存则从硬盘读取并添加到缓存
	// 文件不存在，则返回404错误
	function serveStatic(response, cache, absPath) {
		if (cache[absPath]) {
			sendFile(response, absPath, cache[absPath]);
		} else {
			fs.readFile(absPath, (err, data) => {
				if(err) {
					send404(response);
				} else {
					cache[absPath] = data;
					sendFile(response, absPath, data);
				} 
			})
		}

	}

/* -- 辅助函数end -- */

