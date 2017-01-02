var Container = function(x) {
	this._value = x;
};

Container.of = function(x) { return new Container(x); };

Container.prototype.map = function(f) {
	return Container.of(f(this._value));
};

// functor是实现了map函数并遵守一些特定规则的容器类型
// 当map一个函数时，我们请求容器来运行这个函数

var Maybe = function(x) {
	this._value = x;
}

Maybe.of = function(x) {
	return new Maybe(x);
}

Maybe.prototype.isNothing = function() {
	return (this._value === null || this._value === undefined);
}

Maybe.prototype.map = function(f) {
	return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this._value));
}

var map = curry(function(f, any_functor_at_all) {
	return any_functor_at_all.map(f);
})