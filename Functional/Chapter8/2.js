var Container = function(x) {
	this.__value = x;
}

Container.of = function(x) { return new Container(x); };

// functor 
// 一旦容器里有了值，不管这个值是什么，我们就需要一中方法来让别的函数能够操作它
// 能够在不离开容器的情况下操作容器里面的值
// (a -> b) -> Container a -> Container b
Container.prototype.map = function(f) {
	return Container.of(f(this.__value));
}

// 实现了map函数的类似容器的数据类型
var Maybe = function(x) {
	this.__value = x;
}

Maybe.of = function(x) {
	return new Maybe(x);
}

Maybe.prototype.isNothing = function() {
	return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function(f) {
	return this.isNothing() ? Maybe.of(null) :  Maybe.of(f(this.__value));
}

Maybe.of("Malkovich Malkovich").map(match(/a/ig));
Maybe.of({name: "Dinah", age: 14}).map(_.prop("age")).map(add(10));

// 想保持一种pointfree的风格，以curry函数的方法来代理任何functor
// map :: Functor f => (a -> b) -> f a -> f b
var map = curry(function(f, any_functor_at_all) {
	return any_functor_at_all.map(f);
})

// safeHead :: [a] -> Maybe(a)
var safeHead = function(xs) {
	return Maybe.of(xs[0]);
};

var streetName = compose(map(_.prop('street')), safeHead, _.prop('addresses'));


// 有时候，函数可以明确返回一个Maybe(null)来表明失败
// withdraw :: Number -> Account -> Maybe(Account)
var withdraw = curry(function(amount, account) {
	return account.balance >= amount ? Maybe.of({balance: account.balance - amount}) : Maybe.of(null);
});

var finishTransaction = compose(remainBalance, updateLeger);

var getTwenty = compose(map(finishTransaction), withdraw(20));

