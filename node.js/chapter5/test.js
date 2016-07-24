function test(test){
	return console.log("haha");
}
console.log(test("haha"));

console.log(process.argv);
var fs = require("fs");
var stream = fs.createReadStream('index.js',{encoding: "utf8"});
stream.on("data", function(chunk){
	console.log("fasfdasd");
	console.log(chunk);
});