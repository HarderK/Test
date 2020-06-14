window.onload = function(){
	var socket = io.connect();

	socket.on('connect', function(){
		// 通过join事件发送昵称
		socket.emit('join', prompt("What is your nickname?"));

		// 显示聊天窗口
		document.getElementById('chat').style.display = "block";

		socket.on('announcement', function(msg){
			var li = document.createElement('li');
			li.className = 'announcement';
			li.innerHTML = msg;
			document.getElementById('messages').appendChild(li);
		});
	});



	var input = document.getElementById('input');
	document.getElementById('form').onsubmit = function(){
		var li = addMessage('me', input.value);
		socket.emit('text', input.value, function(date){
			li.className = 'confirmed';
			li.title = new Date(date).toTimeString();
		});

		// 重置输入框
		input.value = '';
		input.focus();
		return false;
	};

	function addMessage (from, text) {
		var li = document.createElement('li');
		li.className = 'message';
		li.innerHTML = '<b>' + from + '</b>: ' + text;
		document.getElementById('messages').appendChild(li);
		return li;
	}

	socket.on('text', addMessage);
}