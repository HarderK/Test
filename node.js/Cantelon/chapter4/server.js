// 学会如何处理响应状态码和响应头中的字段
// 如何处理异常

var http = require('http');
var url = require('url');	// 加载url模块
var path = require('path');
var qs = require('querystring');

var items = [];		// 用数组存放数据

var server = http.createServer(function(req, res) {
	switch(req.method) {
		case 'POST':
			add(req, res);
			break;
		case 'GET':
			/*var body = items.map(function(item, i) {
				return `${i}) ${item}`;
			}).join('\n');

			res.setHeader('Content-Length', Buffer.byteLength(body));		// 应为字节的长度
			res.setHeader('Cotent-Type', 'text/plain; charset="utf-8"');
			res.end(body);*/

			show(res);
			break;
		case 'DELETE':
			var path = url.parse(req.url).pathname;
			var i = parseInt(path.slice(1), 10);

			if(isNaN(i)) {
				res.statusCode = 400;
				res.end('Invalid item id');
			} else if(!item[i]) {
				res.statusCode = 404;
				res.end('Item not found!');
			} else {
				items.splice(i, 1);
				res.end('OK\n');
			}
			break;
	}
/*	res.write(`hello\n`);
	res.write('world');
	res.end();*/
	
});

server.listen(3000);


function show(res) {
	var html = `<html><head><title>Todo List</title></head><body>
		<h1>Todo List</h1>
		<ul>` + 
		items.map(function(item){
			return '<li>' + item + '</li>';
		}).join('') + `
		</ul>
		<form action="/" method="post">
		<p><input type="text" name="item" /></p>
		<p><input type="submit" value="Add Item" /></p>
		</form>
	</body></html>`;
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.setHeader('Content-Type', 'text/html');
	res.end(html);
}

function notFound(res) {
	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Not Found');
}

function badRequest(res) {
	res.statusCode = 400;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Bad Request');
}

function add(req, res) {
	var body = '';
	req.setEncoding('utf8');
	req.on('data', function(chunk) {
		body += chunk;
	});
	req.on('end', function() {
		var obj = qs.parse(body);

		items.push(obj.item);
		res.setHeader('Location', 'http://localhost:3000');
		res.statusCode = 302;
		show(res);
	})

}

// 文件上传，利用第三方的formidable模块
function showUpload(req, res) {
	var html = `
		<form action="/" method="post" enctype="multipart/form-data">
			<p><input type="text" name="name" /></p>
			<p><input type="file" name="file" /></p>
			<p><input type="submit" value="Upload" /></p>
		</form>
	`;
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Type', Buffer.byteLength(html));
	res.end(html);
}

function upload(req, res) {
	if(!isFormData(req)) {
		badRequest(res);
		return;
	}
	var form = new formidable.IncomingForm();
	form.parse(req);

	form.on('field', function(field, value) {
		console.log(field);
		console.log(value);
	});

	form.on('file', function(name, file) {
		console.log(name);
		console.log(file);
	});
	
	form.on('progress', function(bytesReceived, bytesExpected) {
		var percent = Math.floor(bytesReceived / bytesExpected * 100);
	});
	
	form.on('end', function() {
		res.end('upload complete!');
	});
}

function isFormData(req) {
	var type = req.headers['content-type'] || '';
	return 0 == type.indexOf('multipart/form-data');
}
