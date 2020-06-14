for(var i =0; i < 10; i++);

console.log(i);

console.log(1)

var arr = ["HAHA","Kingzhongguo","Liudashen","Songzhixiao","Gray"];

for (var i in arr) {
	console.log(i);
	console.log(arr[i]);
}

var a = [], i = 0;
for(a[i++] in arr);

console.log(a);
i = 0;
manipulate : while(i < 5){
	console.log("a");
	if(i > 3) break ;
	console.log(i);
	i++;
}

var grade = [[43,35,34],[23,43,33]];
var sucess = false, sum = 0;

compute_sum : if(grade){
	for(var x = 0; x < grade.length; x++){
		var row = grade[x];
		if(!row) break compute_sum;
			for(var y = 0; y < row.length; y++){
				var cell = row[y];
				if(!cell) break compute_sum;
				sum += cell;
			}
	}
	sucess = true;
}

console.log(sucess);
console.log(sum);
var sum = 0;
compute : for(i = 0; i < 10; i++){
			for(var j = 0; j <= i; j++){
				if(j == 5) continue compute;
				sum = sum + j;
		}
}
console.log(sum);

for (var a = 0; a < 10; a++){
	if(a == 5) break;
}
console.log(a);

a = 0;
while(a < 10){
	try{
		if(a == 5) break;
	}
	finally{
		a++;
	}
}
console.log(a);