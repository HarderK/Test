var HarderK = (function() {
	var instance = null;

	return function(age) {
		if(instance) {
			return instance;
		}
		this.age = age;

		return instance = this;
	};
})();

HarderK.prototype.sayHello = function() {
	console.log('Hello World!');
};

var harderk = new HarderK(24);
harderk.sayHello();
console.log(harderk.age)


var harderk2 = new HarderK(25);
console.log(harderk2.age)