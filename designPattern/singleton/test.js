var func = function() {

}

var obj = {}
console.log(obj.test)

console.log(func.name)

var a = (function() {
	console.log(arguments.callee.name)
})();