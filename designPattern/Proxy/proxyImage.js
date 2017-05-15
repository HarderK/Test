var myImage = function() {
	var imageNode = document.createElement('img');
	document.body.appendChild(imageNode);

	return function(src) {
		imageNode.src = src;
	};
};


var proxyImage = function(src) {
	var setSrc = myImage(src);
	var img = new Image();
	img.onload = function() {
		setSrc(this.src);
	}
	return function() {
		setSrc('../loading.png');
		img.src = src;
	};
};
