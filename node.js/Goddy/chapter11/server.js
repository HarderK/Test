var express = require('express'),
	sio = require('socket.io');

var app = express.createServer(
		express.bodyParser(),
		express.static('public')
	);

// app.use(express.bodyParser());
// app.use(express.static('public'));

app.listen(3000);

var io = sio.listen(app);

io.sockets.on('connection', function(socket){
	// console.log('Someone connected');
	socket.on('join', function(name) {
		socket.nickname = name;
		socket.broadcast.emit('announcement', name + ' joined the chat');		// 广播消息给其他用户
	});

	socket.on('text', function(msg,fn){
		socket.broadcast.emit('text', socket.nickname, msg);

		// 确认消息已经接收
		fn(Date.now());
	});
});