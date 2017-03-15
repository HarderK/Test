define(['b'], function(b){
	function fun1(){
		// alert("it works!");
		console.log(b.size)
	}

	// fun1();
	setTimeout(fun1, 2000);
})