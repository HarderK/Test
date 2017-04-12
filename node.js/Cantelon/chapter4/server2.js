var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

http.createServer(function(req, res) {
	var pathname = url.parse(req.url).pathname;
	var filepath = path.join(__dirname, pathname);
	
	fs.stat(filepath, function(err, stat) {
		if (err) {
			if('ENOENT' == err.code) {
				res.statusCode = 404;
				res.end('Not Found');
			} else {
				res.statusCode = 500;
				res.end('Internal Server Error');
			}
		} else {
			res.setHeader('Content-Type', stat.size);
			res.setHeader('Content-Type', 'text/plain; charset="utf-8"');

			var stream = fs.createReadStream(filepath);
			
			stream.pipe(res);
			stream.on('error', function(err) {
				res.statusCode = 500;
				res.end('Internal Server Error');
			})
		}
	});
}).listen(3000);