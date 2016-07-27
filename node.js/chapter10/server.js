var express = require('express'),
	wsio = require('websocket.io');

var app = express.createServer();

var ws = wsio.attach(app);

app.use(express.static('public'));

ws.on('connection', function(socket){
	// 直接返回消息给客户端
	socket.on('message', function(msg){
		console.log(' \033[96mgot:\033[39m ' + msg);
	});
});

app.listen(3000);