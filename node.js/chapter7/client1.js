var http = require('http'),
	qs = require('querystring');

process.stdout.write('\n  your name: ');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(name) {
	name = name.replace('\n', '');
	name = name.trim();
	if(name.length <= 0) return;

	send(name);
})

function send(name) {
	http.request({
		host: '127.0.0.1',
		port: 3000,
		url: '/',
		method: 'POST'
	}, function(res) {
		res.setEncoding('utf8');
		// res.on('data', function() {});
		res.on('end', function() {
			console.log('\n  \033[90m request completed!\033[39m');
			process.stdout.write('\n your name: ');
		});
	}).end(qs.stringify({name}));
}