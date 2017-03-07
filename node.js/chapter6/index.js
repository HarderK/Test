/**
 * 模块依赖
 */
var net = require('net');

/**
 * 创建服务器
 */

var count = 0,
	users = {};

 var server = net.createServer(function(conn) {
 	conn.setEncoding('utf8');

 	var nickname;	// 当前连接的昵称

 	console.log('\033[90m new connection!\033[39m');
 	conn.write('\n > welcome to \033[92mnode-chat\033[39m!' + '\n > ' + count + ' other people are connected at this time.'
 		+ '\n > please write your name and press enter: '
 		);
 	count++;

 	conn.on('data', function(data) {
 		// 删除回车符
 		data = data.replace('\r\n', '');
 		if(data.length <= 0) return;

 		if(!nickname) {
 			if(users[data]) {
 				conn.write('\033[93m> nickname already existed, please try another one:\033[39m ');
 				return;
 			} else {
 				nickname = data;
 				users[nickname] = conn;

 				
 				broadcast('\033[90m' + ` > ${nickname} join the chat` + '\033[39m\n');
 			}
 		} else { // 否则视为聊天消息
 			broadcast('\033[96m > ' + nickname + ':\033[39m ' + data + '\n', true);
 		}
 	})

 	conn.on('close', function() {
 		count--;
 		delete users[nickname];

 		broadcast('\033[90m' + ` > ${nickname} left the room` + '\033[39m\n');
 	})

 	function broadcast (msg, exceptMyself) {
 		for(var i in users) {
 			if(!exceptMyself || i != nickname) {
 				users[i].write(msg);
 			}
 		}
 	}
 });

 /**
  * 监听
  */
 server.listen(3000, function() {
 	console.log('\033[96m   server listening on *:3000\033[39m');
 });