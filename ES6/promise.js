function timeout(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms, 'done');
	});
}

timeout(2000).then(value => {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, 3000, value + 'hithis');
	}) 
}).then(value => {
	console.log(value)
})

var getJSON = function(url) {
	var promise = new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();

		xhr.open('GET', url);
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4 && xhr.status === 200 ) {
				resolve(xhr.response);
			} else {
				reject(new Error(xhr.statusText));
			}
		}

		xhr.responseType = 'json';
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send();
	});

	return promise;
}

// fetch('./1.json').then(json => {
// 	console.log(json);
// }).catch(err => {
// 	console.log(err)
// });

var p = Promise.race([new Promise((resolve, reject) => { setTimeout(reject, 1000, 'time1'); }),
					  new Promise((resolve, reject) => { setTimeout(reject, 2000, 'time2'); })	
 ]);


p.then(response => {}).catch(err => console.log(err));