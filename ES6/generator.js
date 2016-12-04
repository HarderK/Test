function* m1() {
	console.log(1);
	yield * m2Iterator;
	console.log(3);
	yield 4;
	console.log(4);
}

function* m2() {
	// yield 2;
	console.log(2);
}
var m1Iterator = m1(),
	m2Iterator = m2();

m1Iterator.next(); //
