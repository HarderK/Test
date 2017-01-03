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

// map :: Functor f => (a -> b) ->
var map = curry(function(f, any_functor_at_all) {
	return any_functor_at_all.map(f);
});

var safeHead = function(xs) {
    return Maybe.of(xs[0]);
}

var streetName = compose(map(_.prop('street')), safeHead, _.prop('adresses'));

var withdraw = curry(function(amount, account) {
    return account.balance >= account ? Maybeof({balance: account.balance - amount}) : Maybe.of(null);
})

// maybe :: b -> (a -> b) -> Maybe a -> b
var maybe = curry(function(x, f, m){
    return m.isNothing() ? x : f(m._value);
})

// getTwenty :: Account -> String
var getTwenty = compose(maybe("you're broke!", finiseTransaction), withdraw(20));

