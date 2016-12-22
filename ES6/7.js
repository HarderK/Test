/**
 * 日期格式化函数
 * @param  {Date}  dateTime 日期和时间
 * @param  {String}  format   日期的格式，形式类似于'yyyy-MM-dd H:i:s',
 * @param  {Boolean} pm       24小时制
 * @return {String}           格式化时间
 */
/**
 * 日期格式化函数
 * @param  {Date}  dateTime 日期和时间
 * @param  {String}  format   日期的格式，形式类似于'yyyy-MM-dd H:i:s',
 * @param  {Boolean} pm       24小时制
 * @return {String}           格式化时间
 */
function dateFormat(dateTime, format, {pm = false, str = '下午'} = {}) {
	let res = format,
		hours = dateTime.getHours(),
		minutes = dateTime.getMinutes(),
		secondes = dateTime.getSeconds();

	// 24小时制，转换小时制
	if(pm === true) {
		hours = hours > 12 ? hours - 12 : hours;
		res = res.replace(/h+.i+.s*/, '$& ' + str);
	}


	// 以对象的形式返回日期的每一部分，key值用于进行正则匹配
	let o = {
		'y+': dateTime.getFullYear(),
		'm+': dateTime.getMonth() + 1,
		'd+': dateTime.getDate(),
		'h+': dateTime.getHours(),
		'i+': minutes < 10 ? "0" + minutes : minutes,
		's+': minutes < 10 ? "0" + minutes : minutes
	}


	for(let key in o) {
		let reg = new RegExp("(" + key + ")", 'i');
		if(reg.test(format)) {
			res = res.replace(RegExp.$1, o[key]);
		}
	}

	return res;
}
// module.exports = {dateFormat: dateFormat};
var dateTime = new Date();
console.log(dateFormat(dateTime, "yyyy-MM-dd h:i:s", {pm: true}));