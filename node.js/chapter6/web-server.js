/*var http = require('http').createServer(function(req, res){
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end('<h1>Hello World</h1>');
});
http.listen(3000);*/

require('http').createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<h1>Hello World</h1>');
}).listen(3000);