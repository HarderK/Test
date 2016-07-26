/*require('http').createServer(function(req, res){
	res.writeHead(200, { 'Content-Type': 'image/png' });
	var stream = require('fs').createReadStream('../../CSS Mastery/chapter5/img/email.png');
	stream.on('data', function(data){
		res.write(data);
	});

	stream.on('end', function(){
		res.end();
	});
}).listen(3000);

var http = require('http').createServer(function(req, res){
	console.log(req.headers);
	res.writeHead(200, { 'Content-Type': 'text/html'});
	res.end('Hello <b>World</b>');
});
http.listen(3000);*/

var qs = require('querystring');
require('http').createServer(function(req, res){
	if('/' == req.url) {
		res.writeHead(200, { 'Content-Type': 'text/html'});
		res.end([
			'<form method="POST" action="/url"> ',
			'<h1>My form</h1>',
			'<fieldset>',
			'<label>Personal information</label> ',
			'<p>What is your name?</p>',
			'<input type="text" name="name">',
			'<p><button>Submit</button></p>',
			'</form>'
			].join(''));
	}else if('/url' == req.url && 'POST' == req.method) {
		var body = '';
		req.on('data', function(chunk){
			body += chunk;
		});
		req.on("end",function(){
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end('<p>Content-Type: ' + req.headers['content-type'] + '</p>' + '<p>Data:</p><pre>' +
			 qs.parse(body).name + '</pre>');
		});
	} else {
		res.writeHead(404);
		res.end('Not Found');
	}
}).listen(3000);