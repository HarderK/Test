// maybe :: b -> (a -> b) -> Maybe a -> b
var maybe = curry(function(x, f, m) {
	return m.isNothing() ? x : f(m.__value);
});

// getTwenty :: Account -> String
var getTwenty = compose(
	maybe("You're broke!", finishTransaction), withdraw(20)
	)