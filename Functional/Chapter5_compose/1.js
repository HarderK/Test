var compose = function(f, g) {
	return function(x) {
		return f(g(x));
	};
};

var head = function(x) { return x[0];};

var reverse = reduce(function(acc, x) {
	return [x].concat(acc);
}, []);

var last = compose(head, reverse);

// 结合律
var associative = compose(f, compose(g,h)) == compose(compose(f,g), h);

var loudLastUpper = compose(exclaim, toUpperCase, head, reverse);

var last = compose(head, reverse);
var loudLastUpper = compose(exclaim, toUpperCase, last);

// 函数无需提及将要操作的是什么数据
// 非pointfree，因为提到了数据: word
var snakeCase = function(word) {
	return word.toLowerCase().replace(/\s+/ig, '_')
}

// pointfree
var snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);

var trace = curry(function(tag, x) {
	console.log(tag, x);
	return x;
	})

var dasherize = compose(join('-'), map(toLower), split(' '), replace(/\s{2, }/ig, ' '));


var isLastInStock = _.compose(_.prop('in_stock'), _.last);

var nameOfFirstCar = _.compose(_.prop('name'), _.head);

var _average = function(xs) { return reduce(add, 0, xs) / xs.length; };
var averageDollarValue = _.compose(_average, map(_.prop('dollar_value')))

var _underscore = replace(/\W+/g, '_');
var sanitizeNames = compose(_.map(compse(_underscore, _.toLowerCase)))

var availablePrices = compose(_.join(', '), _.map(formatPrice), _filter(_.prop('in_stock')));

var fastestCar = _.compose(_.flip(_.concat), _.last, _.sortBy(_.prop('horsepower')))