/**
 * Module dependencies
 */
var fs = require("fs");

fs.readdir(process.cwd(), function(err, files){
	var stats = [];
	console.log('');		// 输出一个空行

	if(!files.length) {
		return console.log(" \033[31m No files to show!\033[39m\n");
	}

	console.log(" Select which files or directory you want to see");

	function file(i) {
		var filename = files[i];

		// fs.stat()给出文件或者目录的元数据
		fs.stat(__dirname + "/" +filename, function(err, stat){
			stats.push(stat);
			if(stat.isDirectory()){
				console.log("   " + i + "\033[36m" + filename + "/\033[39m");
			}else {
				console.log("   " + i + "\033[90m" + filename + "\033[39m");
			}

			i++;
			if(i == files.length) {
				read();
			}else {
				file(i);
			}
		});
	}

	file(0);

	function read() {
		var stdin = process.stdin, stdout = process.stdout;

		console.log("");
		process.stdout.write(" \033[33mEnter your choice: \033[39m");
		// process.stdin.resume();
		process.stdin.setEncoding("utf8");

		// 根据用户输入做相应的处理
		stdin.on('readable', option);
	}

	function option(){
		var data = process.stdin.read();
		if(data !== null) {
			data = data.slice(0, -1);
			var filename = files[Number(data)];
			if (!files[Number(data)]) {
				process.stdout.write(" \033[31mEnter your choice: \033[39");
			}else {
				// process.stdin.pause();
				process.stdin.emit('end');

				if(stats[Number(data)].isDirectory()){
					fs.readdir(__dirname + "/" + filename, function(err, files){
						console.log("");
						console.log("    (" + files.length + " files)");
						files.forEach(function(file){
							console.log("      -" + file);
						});
						console.log("");
					});
				}else{
				fs.readFile(__dirname + '/' + filename, "utf8", function(err, data){
					console.log("");
					console.log(data.replace(/(.*)/g,"      $1"));
				});	
				}
			
			}
		}
		
	}
});


