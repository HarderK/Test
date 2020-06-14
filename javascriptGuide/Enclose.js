/**
 * 把内容元素转入一个指定大小的窗体或视口中
 * 可选参数contentX和contentY指定内容相对于窗体的初始偏移量
 * （如果指定，它们必须 <= ）
 * 这个窗体有mousewheel事件处理程序
 * 它允许用户平移元素和缩放窗体
 */
function enclose(content, framewidth, frameheight, contentX, contentY){
	//这些参数不仅仅是初始值
	//它们保存当前状态，能被mousewheel事件处理程序使用和修改
	framewidth = Math.max(framewidth, 50);
	frameheight = Math.max(frameheight, 50);
	contentX = Math.min(contentX, 0) || 0;
	contentY = Math.min(contentY, 0) || 0;

	//创建frame元素，且设置CSS类名和样式
	var frame = document.createElement("div");
	frame.className = "enclose";
	frame.style.width = framewidth + "px";
	frame.style.height = frameheight + "px";
	frame.style.overflow = hidden;		// 没有滚动条，不能溢出
	frame.style.boxSizing = "border-box";		// boder-box简化了调整frame大小的计算
	frame.style.webkitBoxSizing = "border-box";
	frame.style.MozBoxSizing = "border-box";

	//把frame放入文档中，并把内容移入frame中
	content.parentNode.insertBefore(frame, content);
	frame.appendChild(content);

	//确定元素相对于frame的位置
	content.style.position = "relative";
	content.style.left = contentX + "px";
	conten.style.top = contentY + "px";

	//我们将需要对浏览器怪癖进行处理
	var isMacWebkit = (navigator.userAgent.indexOf("Macintosh") !== -1 && navigator.userAgent.indexOf("Webkit") !== -1);
	var isFirefox = (navigator.userAgent.indexOf("Gecko") !== -1);

	//注册mousewheel事件处理程序
	frame.onwheel = wheelHanlder;		// 未来浏览器
	frame.onmousewheel = wheelHanlder;		// 大多数当前浏览器
	if (isFirefox)
		frame.addEventListener("DOMMouseScroll", wheelHanlder, false);

	function wheelHandler(event){
		var e = event || window.event;		// 标准或IE事件对象

		//查找wheel事件对象、mousewheel事件对象(包括2D和3D形式)
		//和Firefox中的DOMMouseScroll事件对象的属性
		//从事件对象中提取旋转量
		//绽放delta以便一次鼠标滚轮“单机”相对于屏幕的缩放增量是30像素
		//如果未来浏览器在同一事件上同事触发“wheel”和“mousewheel”
		//这里最终会重复计算
		//所以，希望取消wheel事件将阻止mousewheel事件的产生
		var deltaX = e.deltaX * -30 ||		// wheel事件
					e.wheelDeltaX / 4 ||	// mousewheel
								0;			// 属性未定义
		var deltaY = e.deltaY * -30 ||		// wheel事件
					e.wheelDeltaY / 4 ||	// Webkit中的mousewheel事件
		(e.wheelDeltaY === undefined && e.wheelDelta / 4) || 
					e.detail * -10 || 		// Firefox中的DOMMouseScroll事件
					0;

	// 在大多数浏览器中，每次鼠标滚轮单击对应的delta是120
	// 但是，在Mac中，鼠标滚轮似乎对速度更敏感，
	// 其delta值通常要大120倍，使用Apple鼠标至少如此
	// 使用浏览器测试解决这个问题
	if(isMacWebkit){
		deltaX /= 30;
		deltaY /= 30;
	}

	//如果在Firefox中得到mousewheel或wheel事件，
	//那么就不在需要DOMMouseScroll
	if(isFirefox && e.type !== "DOMMouseScroll"){
		frame.removeEventListener("DOMMouseScroll", wheelHandler, false);
	}

	// 获取元素的当前尺寸
	var contenbox = content.getBoundingClientRect();
	var contentwidth = contentbox.right - contentbox.left;
	var contentheight = contentbox.bottom - contentbox.top;  
	}
}