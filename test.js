var values = new Array();

values.push.apply(values,[1,3,5]);

console.log(values);

function test(){
	console.log(arguments);
	console.log(arguments instanceof Array);
	var arr = Array.prototype.slice.call(arguments);
	console.log(arr);
	console.log(arr instanceof Array);
}
test(1,3,3,5);

var arr = [1,3,4,6,2];
console.log(arr.slice());

