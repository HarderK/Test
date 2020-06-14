class Point {
	constructor(x, y) {
		this.x = x; 
		this.y = y;
	}

	toString() {
		return `${this.x} , ${this.y}`;
	}

}

let point = new Point('hello', 'world');

console.log(Point.prototype.constructor === Point);
console.log(point.constructor === Point);

console.log(Object.keys(point));
console.log(Object.getOwnPropertyNames(point));


class ColorPoint extends Point {
	constructor(x, y, color) {
		super(x, y);

		this.color = color;
	}

	toString() {
		return this.color + ',' + super.toString();
	}
}

let color = new ColorPoint('hi', 'proxy', 'red');
console.log(color.constructor);
console.log(ColorPoint.prototype.constructor);

var obj = {name: 1};
console.log(Object.getOwnPropertyDescriptor(obj, 'prototype'))