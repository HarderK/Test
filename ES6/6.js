class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	toString() {
		return `${this.x},fdfasd${this.y}`;
	}
}

let obj = new Point('hello', 'world');
console.log(obj.toString());
console.log(typeof Point);

console.log(obj.prototype);
console.log(toString in Point.prototype);
console.log(toString in obj.__proto__);

class ColorPoint extends Point {
	constructor(x, y, color) {
		super(x, y);
		this.color = color;
	}
}

let child = new ColorPoint('he', 'test', 'red');

console.log(child.toString());
console.log(Object.getPrototypeOf(ColorPoint));