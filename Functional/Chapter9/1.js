var fs = require('fs');

var readFile = function(filename) {
	return new IO(function() {
		return fs.readFileSync(filename, 'utf-8');
	})
}

var print = function(x) {
	return new IO(function() {
		console.log(x);
		return x;
	})
}

var cat = compose(map(print), readFile);

var catFirstChar = compose(map(map(head)), cat);

