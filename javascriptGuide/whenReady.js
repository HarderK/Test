/**
 * 传递函数给whenReady()，当文档解析完毕且为操作准备就绪时，
 * 函数将作为文档对象的方法调用
 * 一旦文档就绪，所有函数都将被调用，任何传递给whenReady()的的函数都将立即调用
 */
var whenReady = (function(){
	var funcs = [];
	var ready = false;

	//当文档准备就绪时，调用事件处理程序
	function handler(e){
		if(ready) return;

		//如果发生readystatechange事件,
		//但其状态不是“complete”的话，那么文档尚未准备好
		if(e.type === "readystatechange" && document.readyState !== "complete")
			return;

		for(var i = 0; i < funcs.length; i++){
			funcs[i].call(document);
		}

		ready = true;
		funcs = null;
	}

	//为接收到的任何事件注册处理程序
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded", handler, false);
		document.addEventListener("readystatechange", handler, false);
		window.addEventListener("load", handler, false);
	}else if(document.attachEvent){
		document.attachEvent("onreadystatechange", handler);
		window.attachEvent("onload", handler);
	}

	//返回whenReady()函数
	return function whenReady(f){
		if(ready) f.call(document);
		else funcs.push(f);
	};
}());