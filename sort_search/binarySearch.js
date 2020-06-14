function binarySearch(arr, value, low, high) {
	if(arr[ high] < value || arr[low] > value) return -1;

	low = low || 0;

	high = high || arr.length - 1;
	var mid = Math.floor((low + high) / 2);

	value = value || arr[mid];

	if(arr[mid] === value) return mid;
	if(arr[mid] > value) return binarySearch(arr, value, low, mid - 1);
	else return binarySearch(arr, value, mid + 1, high);

	// return -1;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 9, 10];

console.log(binarySearch(arr, 8));