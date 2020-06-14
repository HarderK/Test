var synchronousFile = function(id) {
	console.log('开始同步文件, id为：' + id);
};

var checkbox = document.getElementsByTagName('input');

for(var i = 0, c; c = checkbox[i++]; ) {
	c.onclick = function() {
		if(this.checked === true) {
			synchronousFile(this.id);
		}
	};
}

var proxySynchronousFile = (function() {
	var cache = [],		// 保存一段时间内需要同步的id
		timer;

	return function(id) {
		cache.push(id);
		if(timer) {
			return;		// 不覆盖已经启动的timer
		}

		timer = setTimeout(function() {
			synchronousFile(cache.join(','));		// 2秒后向本体发送需要同步的ID集合
			clearTimeout(timer);		// 清空定时器
			timer = null;		// 重置timer为空
			cache.length = 0;		// 清空ID集合
		}, 2000);
	}
})();