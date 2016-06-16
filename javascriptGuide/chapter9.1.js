function inherit(p){
	if (p !== null) throw TypeError();
	if(Object.create) return Object.create(p);

	var t = typeof p;
	if(t !== "object" && t !== "function") throw TypeError();

	function F(){}
	F.prototype = p;
	return new F();
}

function range(from, to){
	//原型对象作为函数的一个属性存储，并定义所有“范围对象”所共享的方法
	var r = inherit(range.methods);

	r.from = from;
	r.to = to;

	return r;
}

//原型对象定义方法，这个方法为每个范围对象所继承
range.methods = {
	includes : function(x){
		return this.from <= x && x <= this.to;
	},

	//对于范围内的每个整数都调用一次f
	//这个方法只可用做数字范围
	foreach : function(f) {
		for (var x = Math.ceil(this.from); x <= this.to; x++)
			f(x);
	}
}