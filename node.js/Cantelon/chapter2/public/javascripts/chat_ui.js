var socket = io.connect();
$(function(){
	var chatApp = new Chat(socket);

	socket.on('nameResult', function(result) {
		var message;

		if(result.success) {
			message = 'You are now known as ' + result.name + '.';
		} else {
			message = result.message;
		}

		$('#messages').append((divSystemContentElement(message)));
	});


	socket.on('joinResult', function(result) {
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('Room changed'));
	});

	socket.on('message', function(message) {
		var newElement = $('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});

	socket.on('rooms', function(rooms) {
		$('#room-list').empty();

		if(rooms.length > 0) {
			for(var i = 0, len = rooms.length; i < len; i++) {
					$('#room-list').append(divEscapedContentElement(rooms[i]));
				}
		}
		
	});


	setInterval(function() {
		socket.emit('rooms');
	}, 1000);

	$('#send-message').focus();

	$('#send-form').on('submit', function() {
		console.log(111);
		processUserInput(chatApp, socket);
		return false;
	})
})

// 辅助函数，净化文本将特殊字符转化为HTML实体
function divEscapedContentElement(message) {
	return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
	return $('<div></div>').html('<i>'+ message +'</i>');
}

// 处理原始的用户输入
function processUserInput(chatApp, socket) {
	var message = $('#send-message').val();
	var systemMessage;

	if(message.charAt(0) == '/') {
		systemMessage = chatApp.processCommand(message);		// 默认为false
		if(systemMessage) {
			$('#messages').append(divSystemContentElement(systemMessage));
		}
	} else {
		chatApp.sendMessage($('#room').text(), message);
		$('#messages').append(divEscapedContentElement(message));
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	}

	$('#send-message').val('');
}
