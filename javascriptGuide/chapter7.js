var o = [];
o[2] = 3;
console.log(o.length); 

var a1 = [,,,];
console.log(0 in a1);
var a2 = [1,,3];
console.log(1 in a2);
console.log(0 in a2);

var keys = Object.keys(o);
var values = [];
/*for(var i = 0; i < keys.length; i++){
	var key = keys[i];
	values[i].push(o[key]);
}

for(var i = 0; i < o.length; i++){
	if(!o[i]) continue;	//跳过null、undefined和不存在的元素
}*/

var data = [1,2,3,5,6];
var sumOfSquares = 0;
data.forEach(function(x){
	sumOfSquares += Math.pow(x,2);
});
console.log(sumOfSquares);

var a = [33,4,1111,222];
console.log(a.sort());
console.log(a.sort(function(a,b){
	return a - b;
}));

var a = ["ant", "Bug", "cat", "Dog"];
console.log(a.sort());
console.log(a.sort(function(a,b){
	var a = a.toLowerCase();
	var b = b.toLowerCase();
	if(a < b) return -1;
	if(a > b) return 1;
	return 0;
}));

console.log(a.slice(1, -1));

var a = [1,2,3,4,5];
var sum = a.reduce(function(x, y){
	return x+y;
}, 0);
console.log(sum);

function extend(o, p){
	for(var prop in p){
		o[prop] = p[prop];
	}
	return o;
}
function union(o, p){
	return extend(extend({},o),p);
}
var o = [{x:1}, {y:2}, {z:3}];
var merged = o.reduce(union);
console.log(merged);

o = [{x:1, a:1}, {y:2, a:2}, {z:3, a:3}];
var leftUnion = o.reduce(union);
var rightUnion = o.reduceRight(union);

console.log(leftUnion);
console.log(rightUnion);

function findAll(a, x){
	var result = [],
		len = a.length,
		pos = 0;
	while(pos < len){
		pos = a.indexOf(x, pos);
		if(pos === -1) break;
		result.push(pos);
		pos += 1;
	}
	return results;
}

var isArray = Array.isArray || function(o){
	return typeof o === "object" && Object.prototype.toString === "[object Array]";
};

var a = {"0":"a","1":"b","2":"c", length : 3};
console.log(Array.prototype.join.call(a,"+"));
Array.join = Array.join || function(a,sep){return Array.prototype.join.call(a,sep)};
console.log(Array.join(a,"+"));

var s = "Javascript";

Array.prototype.filter.call(s,function(x){
	return x.match(/[^aeiou]/);
}).join("");