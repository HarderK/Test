var xhr = new XMLHttpRequest();
xhr.open('GET', '/test.php');

xhr.responseType = 'json';

xhr.onreadystatechange = function() {
	if(xhr.readyState === 4 && xhr.status === 200) {

	}
}

xhr.send(null);

// 解析HTTP响应
function getText(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);

	// xhr.overrideMimeType('text/plain; charset=utf-8');
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200){
			var type = xhr.getResponseHeader('Content-Type');

			if(type.indexOf('xml') !== -1 && xhr.responseXML) {
				callback(responseXML);
			} else if (type.indexOf('json') && xhr.responseText) {
				callback(JSON.parse(xhr.responseText));
			} else {
				callback(xhr.responseText);
			}
		}
	}
}



// 编码请求主题

// 编码对象的属性
function encodeFormData(data) {
	if(!data) return "";

	var pairs = [];

	for(var name in data) {
		if(!data.hasOwnProperty('name')) continue;

		if(typeof data[name] === 'function') continue;

		var value = data[name].toString();

		name = encodeURIComponent(name);
		value = encodeURIComponent(value);
		pairs.push(name + '=' + value);
	}

	return pairs.join('&');
}


// 使用表单数据发一个http请求
function postData(url, formData, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url);

	xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded"));
	
	xhr.responseType = 'json'
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200) {
			callback(xhr.response);
		} else {
			alert('error');
		}
	}
	xhr.send(new FormData(formData))
}


// json编码请求主体
function postJSON(url, data, callback) {
	var xhr = new XMLHttpRequest();

	xhr.open('POST', url);

	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.responseType = 'json';
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 ) {
				callback(xhr.response);
			} else {
				alert('request unsuccessful!');
			}
		}
	}
}

// 上传文件
input.addEventListener('change', function(){
	var file = this.files[0];
	if(!file) return; 	// 没有文件
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url);

	xhr.send(file);		// 传入file对象是重点


}, false)；


// 当传入的对象既有文件又有其他数据时
xhr.setRequestHeader('Content-Type', 'multipart/form-data');