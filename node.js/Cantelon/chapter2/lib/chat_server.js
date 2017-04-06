var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};		// 保存昵称和对应的socket.id
var namesUsed = [];
var currentRoom = {};
var allRooms = [];

// 定义聊天服务器函数
exports.listen = function(server) {
	io = socketio.listen(server);
	// io.set('log level', 1);

	io.sockets.on('connection', function(socket) {
		
		// console.log(socket.rooms);
		guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);		// 用户连接上赋予其一个访客名
		joinRoom(socket, 'Lobby');
		
		handleMessageBroadcasting(socket, nickNames);		// 处理用户消息
		handleNameChangeAttempts(socket, nickNames, namesUsed);		// 处理用户更名
		handleRoomJoining(socket);		// 处理聊天室的创建和变更

		// 用户发出请求时，向其提供已经被占用的聊天室列表
		socket.on('rooms', function() {	
			// console.log(allRooms);
			socket.emit('rooms', allRooms);

		});

		handleClientDisconnection(socket, nickNames, namesUsed);
		console.log(io.sockets.adapter.rooms);
	});
};

/**
 * 分配用户昵称
 * @param  {[type]} socket      [description]
 * @param  {Number} guestNumber [description]
 * @param  {String} nickNames   [description]
 * @param  {Array} namesUsed   [description]
 * @return {Number}             new guestNumber
 */
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
	var name = 'Guest' + guestNumber;
	nickNames[socket.id] = name;
	socket.emit('nameResult', {			// 给该socket的客户端发送信息
		success: true,
		name: name
	});

	namesUsed.push(name);

	return guestNumber + 1;
}

/**
 * 加入聊天室，并且让其他人知道
 * @param  {[type]} socket [description]
 * @param  {[type]} room   [description]
 * @return {[type]}        [description]
 */
function joinRoom(socket, room) {
	socket.join(room);		// 让用户进入房间
	if(allRooms.indexOf(room) == -1) {
		allRooms.push(room);	
	}
	currentRoom[socket.id] = room;		// 记录用户的当前房间

	socket.emit('joinResult', {room: room});	// 向客户端发送joinResult事件

	// 给房间里的其他用户发送新用户加入信息
	socket.broadcast.to(room).emit('message', {
		text: `${nickNames[socket.id]} has joined ${room}.`
	});

	var usersInRoom = io.sockets.adapter.rooms[room].sockets;	// 所有在room中的client

	if(usersInRoom.length > 1) {
		var usersInRoomSummary = `Users currently in ` + room + ': ';
		for(var index in usersInRoom) {
			var userSocketId = index;
			if(userSocketId != socket.id) {
				if(index > 0) {
					usersInRoomSummary += ', ';
				}
				usersInRoomSummary += nickNames[userSocketId];
			}
		}

		usersInRoomSummary += '.';

		socket.emit('message', {text: usersInRoomSummary});
	}


}

/**
 * 更改昵称的请求逻辑
 * @param  {[type]} socket    [description]
 * @param  {[type]} nickNames [description]
 * @param  {[type]} namesUsed [description]
 * @return {[type]}           [description]
 */
function handleNameChangeAttempts(socket, nickNames, namesUsed) {
	socket.on('nameAttempt', function(name) {
		if(name.indexOf('Guest') == 0) {		// 新昵称不能以Guest开头
			socket.emit('nameResult', {
				sucess: false,
				message: 'Names cannot begin with "Guest".'
			});
		} else {	
			if(namesUsed.indexOf(name) == -1) {		// 新昵称不存在
				var previousName = nickNames[socket.id];
				var previousNameIndex = namesUsed.indexOf(previousName);
				namesUsed.push(name);
				nickNames[socket.id] = name;
				delete namesUsed[previousNameIndex];	// 删除先前的昵称

				socket.emit('nameResult', {
					success: true,
					name: name
				});

				socket.broadcast.to(currentRoom[socket.id]).emit('message', {
					text: `${previousName} is now known as ${name}.`
				});
			} else {	// 新昵称已经存在
				socket.emit('nameResult', {
					success: false,
					message: 'That name is already in use'
				});
			}
		}
	} )
}

/**
 * 处理客户端发送过来的聊天消息，并向其他用户转发
 * @param  {[type]} socket [description]
 * @return {[type]}        [description]
 */
function handleMessageBroadcasting(socket) {
	socket.on('message', function(message) {	// message是对象，包括room和text信息
		socket.broadcast.to(message.room).emit('message', {
			text: `${nickNames[socket.id]} : ${message.text}`
		});
	});
}

/**
 * 创建房间或者加入新房间
 * @param  {[type]} socket [description]
 * @return {[type]}        [description]
 */
function handleRoomJoining(socket) {
	socket.on('join', function(room) {		// 监听客户端发过来的join事件
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket, room.newRoom);
	});
}

function handleClientDisconnection(socket) {
	socket.on('disconnect', function() {
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		console.log(nickNames[socket.id] + ' left');
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	});
}


