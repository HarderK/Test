var connect = require('connect'),
	RedisStore = require('connect-redis')(connect);
	fs = require('fs'),
	users = require('./users');

var server = connect(
	connect.bodyParser()
	// connect.static('static')
);

server.use(connect.cookieParser());
server.use(connect.session({store: new RedisStore, secret: 'my app secret'}));

server.use(function (req, res, next) {
	/*if('POST' === req.method && req.files.file) {
		// console.log(req.files.file);
		fs.readFile(req.files.file.path, 'utf8', function(err, data) {
			if( err ) {
				res.writeHead(500);
				res.end('Error!');
				return;
			}

			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(`
				<h3>File: ${req.files.file.name}</h3>
				<h4>Type: ${req.files.file.type}</h4>
				<h4>Contents:</h4><pre>${data}</pre>
			`);
		})
	} else {
		next();
	}*/

	if('/' == req.url && req.session.logged_in) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(`
			Welcome back, <b>${req.session.name}</b>
			<a href="/logout">Logout</a>
		`);
	} else {
		next();
	}
});

server.use(function(req, res, next) {
	if('/' == req.url && 'GET' == req.method) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(`
			<form action="/login" method="post">
				<fieldset>
					<legend>Please log in</legend>
					<p>User: <input type="text" name="user" /></p>
					<p>Password: <input type="password" name="password" /></p>
					<button>Submit</button>
				</fieldset>
			</form>
		`);
	} else {
		next();
	}
});

server.use(function(req, res, next) {
	if('/login' == req.url && 'POST' == req.method) {
		res.writeHead(200);
		if(!users[req.body.user] || req.body.password != users[req.body.user].password) {
			res.end('Bad username/password');
		} else {
			req.session.logged_in = true;
			req.session.name = users[req.body.user].name;
			res.end('Authenticated!');
		}
	} else {
		next();
	}
});

server.use(function(req, res, next) {
	if('/logout' == req.url) {
		req.session.logged_in = false;
		res.writeHead(200);
		res.end('Logged out!');
	} else {
		next();
	}
});

server.listen(3000);