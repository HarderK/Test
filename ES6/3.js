let [a, b , c ] = 'hel';

console.log(a, b, c);

// 对象的解构赋值
// 先找到同名属性，然后在赋值给对应的变量
let {foo: bar} = {foo: "sthi"};

console.log(bar);

// 将所有可遍历的对象转换为数组
// 将所有类似数组的对象转换为真正的数组
// 所谓类似数组的对象，指有Length属性的对象
let arr1 = Array.from({"0": 2, length: 1}, x => x * x);
console.log(arr1);

// entries(), keys(), values()
let str = '1234578765';
let arr2 = Array.from(str, x => x + 1);
console.log(arr2.entries());
for(let index of arr2.keys()) {
	console.log(index)
}

// 函数的length属性不包括rest参数
function add(...values) {
	console.log(Array.isArray(values));
}
add(1, 3, 5);

function multiple(x, y) {
	return x * y;
}

console.log(multiple(...[5, 10]));

function add1 () {
	this.test = 1;
	return () => {
		return this;
	}

}

console.log(add1()());

