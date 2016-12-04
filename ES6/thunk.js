/*var Thunk = function(fn) {
	return function() {
		var args = Array.protoype.slice.call(arguments);
		return function(callback) {
			args.push(callback);
			return fn.applay(this, args);
		}
	}
}

var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);*/

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