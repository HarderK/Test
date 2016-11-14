{
	let promise = new Promise((resolve, reject) => {
		console.log('Promise');
		// resolve('test');
		console.log("haha");
		reject('this is a error')
		// throw new Error('this is a error')
	});

	promise.then((value) => console.log(value))
	.catch((err) => console.log('rejected:', err));
}

{
	function getFoo() {
	return new Promise((resolve, reject) => {
		resolve('foo');
	})

	var g = function* () {
		try {
			var foo = yield getFoo();
			console.log(foo)
		}
	}
}

