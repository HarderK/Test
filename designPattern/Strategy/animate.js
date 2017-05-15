// 缓动算法
// t 为已消耗的时间
// b 为小球的原始位置
// c 为小球要移动的距离
// d 为动画持续的时间
var tween = {
	linear: function(t, b, c, d) {
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d) {
		return c*(t/=b)*t + b;
	},
	strongEaseIn: function(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	strongEaseOut: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	strongEaseOut: function(t, b, c, d) {
		return c * ((t / d - 1) * t * t + 1) + b;
	}
};

// 定义Animate类，让元素运动起来
var Animate = function(dom) {
	this.dom = dom;
	this.startTime = 0;		// 动画开始时间
	this.startPos = 0;		// 元素初始位置
	this.endPos = 0;		// 元素结束位置
	this.propertyName = '';		// 实现动画的元素属性
	this.easing = null;		// 缓动算法
	this.duration = 0;		// 动画持续的时间
};

Animate.prototype.start = function(propertyName, endPos, duration, easing) {
	this.startTime = Date.now();		// 初始化动画开始的时间
	this.startPos = this.dom.getBoundingClientRect()[propertyName];
	this.propertyName = propertyName;
	this.endPos = endPos;
	this.duration = duration;
	this.easing = tween[easing];		// 缓动算法

	var that = this;
	var timed = setInterval(function() {
		// 执行每帧操作
		if(that.step() === false) {		// 动画已结束
			clearInterval(timed);
		}
	}, 19);
};

Animate.prototype.step = function() {
	var t = Date.now();		// 执行动画的当前时间
	if( t >= this.startTime + this.duration) {		// 动画已结束
		this.update(this.endPos);
		return false;
	}

	var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);

	this.update(pos);
};

Animate.prototype.update = function(pos) {
	this.dom.style[this.propertyName] = pos + 'px';
};
