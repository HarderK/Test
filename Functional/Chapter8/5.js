var getFromStorage = function(key) {
	return function() {
        return localStorage[key];
    }
}

var IO = function(f) {
    this.__value = f;
}

IO.of = function(x) {
    return new IO(function() {
        return x;
    })
}

IO.prototype.map = function(f) {
    return new IO(_.compose(f, this.__value));
}

var io_window = new IO(function() { return window; });

io_window.map(function(win) { return win.innerWidth });

io_window.map(_.prop('location')).map(_.prop('href')).map(split('/'));

var url = new IO(function() { return window.location.href; });

// toPairs :: String -> [[String]]
var toPairs = compose(map(split('=')), split('&'));

// params :: String -> [[String]]
var params = compose(toPairs, last, split(?));

var findParam = function(key) {
    return map(compose(Maybe.of, filter(compose(eq(key), head)), params), url);
}

