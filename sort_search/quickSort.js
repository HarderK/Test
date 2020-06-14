/**
 * 快速排序
 * @param  {Array} arr   要进行排序的数组
 * @param  {Number} start 排序的开始位置
 * @param  {Number} end   排序的结束位置
 * @return {undefined} 
 */
function quickSort(arr, start, end) {
	start = start || 0,
	end = end || arr.length - 1;

	var i = start, j = end, temp = arr[start];
	while(i < j) {
		while(i < j && arr[j] >= temp) j--;

		if(i < j) {arr[i] = arr[j]; i++;}

		while(i < j && arr[i] <= temp) i++;

		if(i < j) {arr[j] = arr[i]; j--;}
	}
	arr[i] = temp;

	if(start < i -1) quickSort(arr, start, i-1);
	if(j+1 < end) quickSort(arr, j+1, end);

}

var arr=[];
for(var i = 0; i < 100; i++) {arr.push(i)}
arr.sort(function() {return Math.random() - 0.5;});


quickSort(arr)
console.log(arr)
