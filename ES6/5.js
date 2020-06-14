let makeIterator = (array) => {
	let nextIndex = 0;
	return {
		next() {
			return nextIndex < array.length ? {value: array[nextIndex++], done: false} : {value: undefined, done: true};

		}	
	}
};

let arr = [32, 12, 21, 34, 22, 9, 8];

let it = makeIterator(arr);
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(...arr[Symbol.iterator]());

function Obj(value) {
	this.value = value;
	this.next = null;
}

// JavaScript中的Thunk函数是将多参数的函数替换成单参数的版本
// 且只接受回调函数作为参数
var Thunk = function(fn) {
	return function() {
		var args = Array.prototype.slice.call(arguments);
		return function(callback){
			args.push(callback);
			return fn.apply(this, args);
		}
	}
}

// Thunkify模块
function thunkify(fn) {
	return function() {
		var args = Array.prototype.slice(arguments);
		var ctx = this;

		return function(done) {
			var called;

			args.push(function() {
				if( called) return;
				called = true;
				done.apply(null, arguments);
			});

			try {
				fn.apply(ctx, args);
			} catch (err) {
				done(err);
			}
		}
	}
}

// fn为generator
function run(fn) {
	var gen = fn();

	// next 为Thunk函数的回调函数
	function next(err, data) {
			var result = gen.next(data);
			if(result.done) return;
			result.value(next);	//每一个异步操作都要是Thunk函数
	}

	next();
}

// run(gen);


var gen = function* () {
	var f1 = yield readFile('a');
	var f2 = yield readFile('b');
}

var fs = require('fs');

var readFile = function (fileName) {
	return new Promise(function(resolve, reject) {
		fs.readFile(fileName, function(error, data) {
			if(error) reject(error);
			resolve(data);
		});
	});
};

var gen = function* () {
	var f1 = yield readFile('/filea');
	var f2 = yield readFile('/fileb');

	console.log(f1.toString());
	console.log(f2.toString());
}

var g = gen();

g.next().value.then(function(data){
	g.next(data).value.then(function(data) {
		g.next(data);
	})
});

function run(gen) {
	var g = gen();

	function next(data) {
		var result = g.next(data);
		if (result.done) return;
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
		if(!gen || typeof gen.next !== 'function') return resolve(gen);

		function onFullFilled(res) {
			var ret;
			try {
				ret = gen.next(res);
			} catch(e) {
				return reject(e);
			}

			next(ret);
		}

		function next(ret) {
			if(ret.done) return resolve(ret.value);

			var value = Promise.resolve(ret.value);

			if(value && isPromise(value)) return value.then(onFullFilled, onRejected);

			return onRejected(new TypeError('You may only yield a function, promise, generator, array'));
		}
	})
}
