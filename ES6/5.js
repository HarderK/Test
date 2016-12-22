var i;
function* test() {
	const res = yield* inner();
	console.log(res)
}

function* inner(){
	yield 'inner'
	return yield ' this is inner function'
}

var hr = test();
console.log(hr.next())
console.log(hr.next())
console.log(hr.next())


console.log("next");

{
	function getFoo () {
		return "hello world";
	}

	var g = function* () {
		var foo = yield getFoo();
		 console.log(foo);
	}
	var t = g();
	console.log(t.next());
	console.log(t.next());
}
