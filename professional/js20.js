var book = {
	title : "Professional JavaScript",
	authors : ["Nicholas C. Zakas"],
	edition : 3,
	year : 2011,
	releaseDate : new Date(2015,11,1),
	name : undefined
};

var jsonText = JSON.stringify(book);	//值为undefined的任何属性会被跳过
console.log(jsonText);
console.log(typeof jsonText);

function recover(key,value){
	if(key == "releaseDate"){
		return new Date(value);
	}else{
		return value;
	}
}

var bookCopy = JSON.parse(jsonText,recover);
console.log(bookCopy);
console.log(typeof bookCopy);	//object
console.log(typeof bookCopy.releaseDate);
// JSON.parse(book1);

//向现有URL的末尾添加查询字符串参数,每个参数的名称和值都必须使用encodeURIComponent()进行编码
function addURLParam(url,name,value){
	url += (url.indexof("?") == -1 ? "?" : "&");
	url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
	return url;
}

xhr.open("post","postExample.php",true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
var form = document.getElementById("user-info");
xhr.send(serialize(form));