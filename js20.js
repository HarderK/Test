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
