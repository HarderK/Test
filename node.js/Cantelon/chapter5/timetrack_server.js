var http = require('http');
var work = require('./lib/timetrack');
var mysql = require('mysql');

var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'yanxiong',
	database: 'timetrack'
});

var server = http.createServer(function(req, res) {
	db.query('select * from work', function(err, rows) {
		if(err) throw err;

		var html = '<table>';
		for (var i in rows) {
			html += `<tr>
				<td>${rows[i].date}</td>
				<td>${rows[i].hours}</td>
				<td>${rows[i].description}</td>
			</tr>`;
			html += '</table>';
		}
		res.setHeader('Content-Type', 'text/html; charset="utf8"');
		res.setHeader('Content-Length', Buffer.byteLength(html));
		res.end(html);
	});
	
});

db.query("create table if not exists work ( "
	+ "id int(10) not null auto_increment, "
	+ "hours decimal(5,2) default 0, "
	+ "date DATE, "
	+ "archived INT(1) DEFAULT 0, "
	+ "description LONGTEXT, "
	+ "primary key(id))", function(err) {
		if(err) throw err;
		console.log('Server started...');
		server.listen(3000, '127.0.0.1');
	});