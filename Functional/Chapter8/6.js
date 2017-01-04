var fs = require('fs');

var readFile = function(fileName) {
	return new Task(function(reject, result) {
		rs.readFile(filename, 'utf-8', function(err, data) {
			err ? reject(error) : result(data);
		});
	})
}


var getJSON = curry(function(url, param) {
	return new Task(function(reject, result) {
		$.getJSON(url, param, result).fail(reject);
	});
})

var dbUrl = function(c) {
	return (c.uname && c.pass && c.host && c.db) ? Right.of() : Left.of(Error("Invalid config"));
}

map(id) === id;
var idLaw1 = map(id);
var idLaw2 = id;