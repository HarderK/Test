const Thunk = fn => (...args) => {
	return (callback) => {
		args.push(callback);
		return fn.apply(this, args);
	}
};

let a = (num1, num2, func) => func(num1, num2);

function max(num1, num2) {
	return num1 - num2;
}
let readFile = Thunk(a);
console.log(readFile(1, 2)(Math.max));

function thunkify(fn) {
	return function() {
		var args = new Array(arguments.length);
		var ctx = this;

		for(var i = 0; i < args.length; ++i) {
			args[i] = arguments[i];
		}

		return function (done) {
			var called;

			args.push(function() {
				if(called) return;

				called = true;
				done.apply(null, arguments);
			});

			try {
				fn.apply(ctx, args);
			} catch(err) {
				done(err);
			}
		};
	};
}

var gen = function* () {
	var r1 = yield readFile('1.js');
	console.log(r1.toString());
	var r2 = yield readFile('2.js');
	console.log(r2.toString());
}

var g = gen();

var r1 = g.next();
r1.value(function(err, data){
	if(err) throw err;
	var r2 = g.next(data);
	r2.value(function(err, data) {
		if(err) throw err;
		g.next(data);
	})
})

function run(fn) {
	var gen = fn();

	function next(err, data) {
		var result = gen.next(data);
		if(result.done) return;
		result.value(next);

	}

	next();
}

run(gen);


/* co模块 */
var readFile = function(fileName) {
	return new Promise(function(resolve, reject) {
		fs.readFile(fileName, function(err, data) {
			if(error) reject(error);
			resolve(data);
		})
	})
}

var gen = function* () {
	var f1 = yield readFile('1.js');
	var f2 = yield readFile('2.js');
}

var g = gen();
g.next().value.then(function(data) {
	g.next(data).value.then(function(data) {
		g.next(data);
	})
})

function run(gen) {
	var g = gen();

	function next(data) {
		var result = g.next(data);
		if(result.done) return result.value;

		result.value.then(function(data) {
			next(data);
		})
	}

	next();
}

function co(gen) {
	var ctx = this;
	return new Promise(function(resolve, reject) {
		if(typeof gen === 'function') gen = gen.call(ctx);
		if(!gen || typeof gen.next !== 'function' ) return resolve(gen);

		onFulfilled();

		function onFullfilled(res) {
			var ret;
			try{
				ret = gen.next(res);
			} catch (e) {
				return reject(e)
			};

			next(ret);
		}

		function next(ret) {
			if(ret.done) return resolve(ret.value);
			var value = toPromise.call(ctx, ret.value);
			if(value && isPromise(value)) return value.then(onFullfilled, onRejected);

			return ;
		}
	});

}