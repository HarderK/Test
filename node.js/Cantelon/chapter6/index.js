var connect = require('connect');

var app = connect();
app.use(logger);
app.use('/admin', admin);
app.use(hello);
app.use(errHandler());

app.listen(3000);



function logger(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
}

function hello(req, res, next) {
	foo();
/*	res.setHeader('Content-Type', 'text/plain');
	res.end('hello world');*/
	next();

}

function admin(req, res, next) {
	switch(req.url) {
		case '/':
			res.end('try /users');
			break;
		case '/users':
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(['tobi', 'loki', 'jane']));
			break;
	}
	// next();
}

function errHandler() {
	console.log(process.env.NODE_ENV);
	var env = process.env.NODE_ENV || 'development';

	return function(err, req, res, next) {
		res.statusCode = 500;
		switch(env) {
			case 'development':
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(err));
				break;
			default:
				res.end('Server error');
		}
	}

}