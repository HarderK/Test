function* foo() {
	yield 1;
	yield 2;
	yield 3;
	return 4;
}

for(let v of foo()) {
	console.log(v)
}

/**
 * 原生的JavaScript对象没有遍历接口， 无法使用for...of循环
 * 通过Generator函数给它加上这个接口就行了
 */
function* objectEntries() {
	let propKeys = Object.keys(this);

	for(let key of propKeys) {
		yield [key, this[key]];
	}
}

let jane = {name: 'harder', age: 23, gender: 'male'};
jane[Symbol.iterator] = objectEntries;

for(let [key, value] of jane) {
	console.log(key, value);
}

function* gen() {
	yield* [1, 3, 5];

	return 'harderk';
}

function* gen1() {
	yield 0;
	let v = yield* gen();
	yield 3 + v;
}
for(let value of gen1()) {
	console.log(value)
}
// console.log(gen().next());
