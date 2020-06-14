var EventUtil = {
	addEvent: function(element, type, callback) {
		if(element.addEventListener) {
			element.addEventListener(type, callback, false);
		} else if(element.attachEvent) {
			element.attachEvent('on' + type, function(event) {		// 你这么做了怎么取消事件呢？
				return callback.call(target, event);
			});
		} else {
			element['on' + type] = callback;
		}
	},
	removeEvent: function(element, type, callback) {
		if(element.removeEventListener) {
			element.removeEventListener(type, callback, false);
		} else if (element.detachEvent) {
			element.detachEvent('on' + type, callback);
		} else {
			element['on' + type] = null;
		}
	}
}