var pattern = /Java(?!Script)([A-Z\w])/;
var pattern1 = /Java(?=\b)/;
var str = "Java script";
console.log(pattern.test(str));
console.log(pattern1.test(str));