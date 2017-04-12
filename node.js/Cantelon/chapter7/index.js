var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect()
	.use('/admin', serveStatic('public', {'index': ['index.html', 'index.htm']}));



app.listen(3000);