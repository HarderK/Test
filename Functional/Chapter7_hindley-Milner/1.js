// match :: Regex -> String -> [String]
var match = curry(function(reg, s){
	return s.match(reg);
})

// match :: Regex -> (String -> [String])
var match = curry(function(reg, s){
	return s.match(reg);
})

// onHoliday :: String -> [String]
// onHoliday就是已经有了Regex参数的match
var onHoliday = match(/holiday/ig);

// id :: a -> a  a可以为任意类型，但是a到a必须是同一种类型
var id = fucntion(x) { return x; }

// map :: (a -> b) -> [a] -> [b]
var map = curry(function(f, xs) {
	return xs.map(f);
})

// head :: [a] -> a
var head = function(xs) { return xs[0]; }

// filter :: (a -> Bool) -> [a] -> [a]
var filter = curry(function(f, xs) {
	return xs.filter(f);
})

// reduce :: (b -> a -> b) -> b -> [a] -> b
var reduce = curry(function(f, x, xs) {
	return xs.reduce(f, x);
})

// 类型约束
// sort :: Ord a => [a] -> [a]


