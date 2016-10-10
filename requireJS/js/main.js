require.config({
	shim : {
		"backbone" : {
			deps : ["jquery"],
			exports : "Backbone"
		}
	},
	paths : {
		"jquery" : ["http://cdn.bootcss.com/jquery/3.1.1/jquery.min", "jquery.min"],  //在线的jquery没有加载成功就会加载本地的jquery
		"backbone" : ["http://cdn.bootcss.com/backbone.js/1.3.3/backbone-min"]
	}
})
require(["jquery", "a"], function($) {
	$(function() {
		alert("load finished!!");
	})
	// alert("load finished!");
});