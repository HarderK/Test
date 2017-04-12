var connect = require('connect');
var serveStatic = require('serve-static');
var compression = require('compression')

var app = connect()
	.use(compression({filter: filter}))
	.use(serveStatic('public', {'index': ['index.html', 'index.htm']}))


app.listen(3000);

function filter(req, res) {
	var type = res.getHeader('Content-Type') || '';
	return /json|text|javascript/.test(type);
}