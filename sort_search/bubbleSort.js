/**
 * [bubbleSort 冒牌排序, 从小到大]
 * @param  {array} arr 传数组
 * @return {undefined}     
 */
function bubbleSort(arr) {
	var arr = arr || [];

	var flag = 1;  // 定义一个标志，检测是否进行过交换，如果没有，则表示有序，不需要再比较
	var temp;

	for(var i = 1, len = arr.length; i < len && flag === 1; i++) {
		flag = 0;
		for(var j = 0; j < len - i; j++) {
			if(arr[j] > arr[j+1]) {
				flag = 1;
				temp = arr[j+1];
				arr[j+1] = arr[j];
				arr[j] = temp;
			}
		}
	}
}

var arr = [5, 4, 3, 3, 2, 1]
bubbleSort(arr);
console.log(arr);