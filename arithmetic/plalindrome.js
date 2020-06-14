// 判断是否为回文字符串
function isPlalindrome(str) {
  var mid = Math.ceil(str.length / 2) - 1;   // 求字符串的中间位置
  var arr = [];    // 用堆栈保存数据
  var top = 0;  // 栈顶位置

  // 将mid前的字符依次入栈
  for(var i = 0; i <= mid; i++) {
    arr[++top] = str.charAt(i);
  }

  // console.log(arr);
  // 根据字符串长度的基偶来判断出栈位置
  var next = mid;
  if(str.length % 2 === 0) next = mid + 1;

  for(var i = next, len = str.length; i < len; i++) {
    console.log(str.charAt(i), arr[top]);
    if(str.charAt(i) !== arr[top--]) break;
  }

  if(top == 0) {
    return true;
  } else {
    return false;
  }

}


// 判断是否为回文序列
// [1, 3, 1]、[15, 31, 3, 31, 15]
function isPlalindromeArr(arr) {
  var stack = [], top = -1;
  // 入栈
  for(var i = 0, len =  Math.ceil(arr.length / 2) - 1; i <= len; i++) {
    stack[++top] = arr[i];
  } 

  console.log(stack)
  // 根据字符串长度的基偶来判断出栈位置
  var next = Math.ceil(arr.length / 2) - 1;
  if(arr.length % 2 === 0) next += 1;

  // 出栈
  for(var i = next, len = arr.length; i < len; i++) {
    if(arr[i] !== stack[top--]) break;
  }

  if(top < 0) return true;
  return false;
}
