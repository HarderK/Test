/*var qs = require('querystring');
require('http').createServer(function(req, res){
	var body = '';
	req.on('data', function(chunk){
		body += chunk;
	});
	req.on('end', function(){
		res.writeHead(200);
		res.end('Done');	
		console.log('\n got name \033[90m' + qs.parse(body).name + '\033[39m\n');
	});
}).listen(3000);*/

var qs = require('querystring');

require('http').createServer(function(req, res) {
	if('/' === req.url) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(`
			<form action="/url" method="POST">
				<h1>My Form</h1>
				<fieldset>
					<label>Personal information</label>
					<p>what is your name?</p>
					<input type="text" name="name" />
					<p><button>Submit</button></p>
				</fieldset>
			</form>
			`);
	} else if('/url' === req.url && 'POST' === req.method) {
		var body = '';
		req.on('data', function(data) {
			body += data;
		});
		req.on('end', function() {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(`
				<p>Content-Type: ${req.headers['content-type']}</p>
				<p>Data: </p> <pre>${body}</pre>
				<p>Your name is ${qs.parse(body).name}</p>
				`);
		});
	} else {
		res.writeHead(404);
		res.end('Not Found');
	} 
}).listen(3000);