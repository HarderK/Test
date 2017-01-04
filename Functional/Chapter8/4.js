var Left = function(x) {
	this.__value = x;
}

Left.of = function(x) {
	return new Left(x);
}

Left.prototype.map = function(f) {
	return this;
}

var Right = function(x) {
	this.__value = x;
}

Right.of = function(x) {
	return new Right(x);
}

Right.prototype.map = function(f) {
	return Right.of(f(this.__value));
}

var right = Right.of('rain').map(function(str) {
	return 'b' + str;
})
 console.log(right);

 var moment = require('moment');

// getAge :: Date -> User -> Either(String, Number)
 var getAge = curry(function(now, user) {
	var birthdate = moment(user.birthdate, 'YYYY-MM-DD');
	if(!birthdate.isValid()) return Left.of("Birth date could not be parsed");
	return Right.of(now.diff(birthdate. 'years'));
 })

 getAge(moment(), {birthdate: '2017-1-3'});

// fortune :: Number -> String
 var fortune = compose(concat("If you survive, you will be "), add(1));

 var zoltar = compose(map(console.log), map(fortune), getAge(moment()));

 var either = curry(function(f, g, e) {
 	switch(e.consturctor) {
 		case Left: return f(e.__value);
 		case Right: return g(e.__value);
 	}
 });

 var zoltar = compose(console.log, either(id, fortune), getAge(moment()));




