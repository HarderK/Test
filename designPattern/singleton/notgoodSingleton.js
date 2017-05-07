var Singleton = function(name) {
	this.name = name;
	this.instance = null
}

Singleton.prototype.getInstance = function(name) {
	if(this.instance === null) {
		this.instance = new Singleton(name);
	}

	return this.instance;
}


var CreateDiv = (function() {
	var instance = null;

	CreateDiv = function(html) {
		if (instance === null) {
			this.html = html;
			instance = this;
		}

		return instance;
	}
})();

