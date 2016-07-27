var express = require('express'),
	wsio = require('websocket.io');

var positions = {}, total = 0;

// create express app
var app = express.createServer();

// attach websocket server
var ws = wsio.attach(app);

// serve your code
app.use(express.static('public'));

// Listening on connections
ws.on('connection', function (socket){
	// give the socket an id
	socket.id = ++total;

	// send the positions of everyone else
	socket.send(JSON.stringify(positions));

	socket.on('message', function(msg){
		try {
			var pos = JSON.parse(msg);
		} catch (e) {
			return;
		}
		positions[socket.id] = pos;
		broadcast(JSON.stringify({type:'position', pos:pos, id:socket.id}));
	});

	// delete the information when users leave
	socket.on('close', function(){
		delete positions[socket.id];

		// 广播
	broadcast(JSON.stringify({type:'disconnect', id:socket.id}));
	});
});

function broadcast(msg) {
	for (var i = 0, l = ws.clients.length; i < l; i++){
		if(ws.clients[i] && socket.id != ws.clients[i].id) {
			ws.clients[i].send(msg);
		}
	}
}

// Listen
app.listen(3000);