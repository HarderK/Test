/**
 * 分页模块
 */

var _total,     // 总记录数
    _url,
    _pageSize;      // 每页显示的记录数


// 设置分页显示的文字信息
var _configs = {
    total: '条记录',
    next: '下一页',
    prev: '上一页',
    first: '首页',
    last: '末页',
    go: '跳转',
}

// 设置是否显示首页、上一页、下一页、尾页、go
var _normalization = {
    first: false,
    next: true,
    prev: true,
    last: false,
    go: false
}


function first() {
    return '<li><a href="javascript: setPage(' + _url + ')">'+ _configs.first +'</a></li>';
}
    
function last() {
    return '<li><a href="javascript: setPage(' + _url + ')">'+ _configs.last +'</a></li>';
}

function go() {
    return '<li class="go"><input type="text" value=""/>&nbsp; <button onclick="javascript: setPage()">Go</button></li>';
}

function next() {
    return '<li><a href="javascript: setPage(' + _url + ')">'+ _configs.next +'</a></li>';
}

function prev() {
    return '<li><a href="javascript: setPage(' + _url + ')">'+ _configs.prev +'</a></li>';
}

function total() {
    return '<li><span>共'+ Math.ceil(_total/_pageSize) +'页</span><li>';
}


function pageList(cur) {
    var listNum = Math.ceil(_total/_pageSize);  // 总页数
    var start, end;
    var res = '';

    // 当前页前面显示5项，后面显示4项
    start = cur - 5;
    end = cur + 4;

    // 如果当前页<=5,则从第一项开始显示，最多显示10项
    if(cur - 5 <= 0 ) {start = 1; end = Math.min(listNum, 10)};
    
    // 如果当前页是最后5页，则显示最后10项
    if(cur + 4 >= listNum) {
        end = listNum;
        start = end - 9;
    }

    // 如果总项数小于10， 则显示全部项
    if(listNum <= 10) {
        start = 1;
        end = listNum;
    }

    if(_normalization.first === true) res += first();
    if(_normalization.prev === true) res += prev();


    while(start <= end) {
        if(start == cur) {
            res += '<li class="active"><a href="javascript: setPage()">' + start + '</a></li>';            
        } else {
         res += '<li><a href="javascript: setPage()">' + start + '</a></li>';
        }
        start++;
    }

    if(_normalization.next === true) res += next();
    if(_normalization.last === true) res += last();
    if(_normalization.go === true) res += go();

    res += total();
    /*
    for(var i = 1; i < pageNum; i++) {
        res += '<a href="javascript: setPage(' + _url + ')">' + i + '</a>';
    }*/

    $('#pagination').html(res);
    if(cur == 1) {
        $('li:contains('+_configs.prev+')').addClass("disabled");
    }
    if(cur == listNum) {
        $('li:contains('+_configs.next+')').addClass("disabled");
    }
}

// 将对象a与b合并，用b中的同名属性覆盖a中的同名属性，a中不存在的属性不合并。 
function combine(a, b) {
    for(var key in b) {
        if(key in a) {
            a[key] = b[key];
        }
    }
    return a;
}

var page = {
    init: function(url, total, pageSize, normalization, configs) {
        _url = url;
        _total = total;
        _pageSize = pageSize;
       /* for(var key in configs) {
            if (key in _configs) {
                _configs[key] = configs[key];
            }
        }*/

        _configs = combine(_configs, configs);
        _normalization = combine(_normalization, normalization)
    },
    pageList: pageList
}


// module.exports = page;