var func = function nff(name, age) {console.log(func.name)};
func();

function factorial(n) {
	if( n <= 1) return 1;
	return n * factorial(n-1);
}

var factorial = function(n) {
	if( n <=1 ) return 1;
	return n * arguments.callee(n-1);
};

// 严格模式下，使用callee属性会导致错误
// 使用命名函数表达式来取代
var factorial = function multiply(n) {
	if( n <= 1) return 1;
	return n * multiply(n-1);
};
