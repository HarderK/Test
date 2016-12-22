function timeout(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms, 'done');
	});
}

timeout(100).then((value) => {
	console.log(value);
})

function loadImageAsync(url) {
	return new Promise((resolve, reject) => {
		var image = new Image();

		image.onload = function() {
			resolve(image);
		};

		image.onerror = function() {
			reject(new Error('Could not load image'));
		};

		image.src = url;
	});
}

var getJSON = function(url) {
	var promise = new Promise((resolve, reject) => {
		var client = new XMLHttpRequest();
		client.open('GET', url);
		client.onreadystatechange = handler;
		client.responseType = 'json';
		client.setRequestHeader('Accept', 'application/json');
		client.send();

		function handler() {
			if(this.readyState === 4) {
				if(this.status === 200) {
					resolve(this.response);
				} else {
					reject(new Error(this.statusText));
				}
			}
		}
	});

	return promise;
}
