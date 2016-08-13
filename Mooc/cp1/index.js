var classes = require("./class.js");

// classes.add("yanxiong", ["wenhao", "zhitao"]); 

exports.add = function(classes) {
	classes.forEach(function(item,index){
		var _class = item;
		var teacherName = item.teacherName;
		var students = item.students;

		classes.add(teacherName, students);
	});
}