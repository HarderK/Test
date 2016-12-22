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

		for(var i = 0; i < args.length; i++) {
			args[i] = arguments[i];
		}

		return function(done) {
			var called;

			args.push(function(){
				if(called) return;
				called = true;
				done.apply(null, arguments);
			});

			try{
				fn.apply(ctx, args);
			} catch (err) {
				done(err);
			}
		}
	}
}

function f(a, b, callback) {
	var sum = a + b;
	callback(sum);
	callback(sum);
}

var ft = thunkify(f);
var print = console.log.bind(console);

ft(1, 2)(print);