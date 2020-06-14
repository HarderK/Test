function Polygon(sides) {
	if(this instanceof Polygon) {
		this.sides = sides;
		this.getArea = function(){
			return 0;
		};
	} else {
		return new Polygon(sides);
	}
}

function Rectangle(width, height) {
	Polygon.call(this, 2);
	this.width = width;
	this.heigh = height;
	this.getArea = function(){
		return this.width * this.height;
	};
}

Rectangle.prototype = new Polygon();

var rect = new Rectangle(5, 10);
console.log(rect);

function curry(fn) {
	var args = Array.prototype.slice.call(arguments, 1);
	return function(){
		var innerArgs = Array.prototype.slice.apply(arguments);
		var finalArgs = args.concat(innerArgs);

		return fn.apply(null, finialArgs);
	};
}

function bind(fn, context) {
	var args = Array.prototype.slice.call(arguments, 2);
	return function(){
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat(innerArgs);
		return fn.apply(context, finalArgs);
	};
}

function chunk(array, process, context) {
	setTimeout(function(){
		var item = array.shift();
		process.call(context, item);

		if(array.length > 0) {
			setTimeout(arguments.callee, 100);
		}
	}, 100);
}

var processor = {
	timeoutId : null,

	performProcessing : function(){

	},

	process : function (){
		clearTimeout(this.timeoutId);

		var that = this;
		this.timeoutId = setTimeout(function(){
			that.performProcessing();
		}, 100);
	}
};

// 简化上述操作
function throttle(method, context) {
	clearTimeout(method.tId);
	method.tId = setTimeout(function(){
		method.call(context);
	}, 100);
}