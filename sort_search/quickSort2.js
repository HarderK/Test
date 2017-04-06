/**
 * 分治
 * 交换
 */
function quickSort(array, left, right) {
	if(array.length < 2) return array;
	var index = partition(array, left, right);
	// console.log(array);
	if(left < index - 1) quickSort(array, left, index - 1);
	if(right > index + 1) quickSort(array, index + 1, right);
}

var partition = function(array, left, right) {
	var pivot = array[left],
		i = left,
		j = right;

	while(i < j) {
		while(i < j && array[j] >= pivot) {
			j--;
		}
		while(i < j && array[i] <= pivot) {
			i++;
		}

		if(i < j) {	
			swapQuickSort(array, i, j);
		}
		console.log(array)

	}

	// 将基数归位
	array[left] = array[i];
	array[i] = pivot;
	console.log("jishu", array)

	return i;
}

var swapQuickSort = function(array, index1, index2) {
	var temp = array[index1];
	array[index1] = array[index2];
	array[index2] = temp;
}


var arr = [1, 1,1 ,1,1];
quickSort(arr, 0, arr.length - 1);

console.log(arr);
