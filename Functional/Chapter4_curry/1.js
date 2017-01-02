/*// curry: 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数
var add = function(x) {
	return function(y) {
		return x + y;
	};
};

var curry = require('loadash').curry;

var match = curry(function(what, str) {
	return str.match(what);
})

var replace = curry(function(what, replacement, str) {
	return str.replace(what, replacement);
});

var _ = require('ramda');

// 练习1
var words = function(str) {
	return split(' ', str);
};

var sentences = function(arr) {
	return map(words, arr);
};

var _keepHighest = function(x, y) {
	return x >= y ? x : y;
}

var max = function(xs) {

}*/

var res = ['11', '11', '11', '11'].map(parseInt);
console.log(res);		// 11, NaN, 3, 4
