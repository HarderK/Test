var Flock = function(n) {
    this.seagulls = n;
};

Flock.prototype.conjoin = function(other) {
    this.seagulls += other.seagulls;
    return this;
};

Flock.prototype.breed = function(other) {
    this.seagulls = this.seagulls * other.seagulls;
    return this;
};

var flock_a = new Flock(4);
var flock_b = new Flock(2);
var flock_c = new Flock(0);

var result = flock_a.conjoin(flock_c).breed(flock_b).conjoin(flock_a.breed(flock_b)).seagulls;

var cojoin = function(flock_x, flock_y) {
    return flock_x + flock_y;
};

var hi = function(name) {
    return "hi" + name;
};

var greeting = function(name) {
    return hi(name);
}

// 为何还要定义一个额外的包裹函数
var greeting = hi;

var getServerStuff= function(callback) {
    return ajaxCall(function(json) {
        return callback(json)
    });
};

// 重构上面的代码
var getServerStuff = function(callback) {
    return ajaxCall(callback);
}

// 如果一个函数被不必要的包裹，而且发生了改动，那么包裹它的那个函数也要做相应的变动
// 在命名的时候，我们特别容易吧自己限定在特定的数据上
// 小心this值
var fs = require('fs');

fs.readFile('re.txt', Db.save);

fs.readFile('re.txt', Db.save.bind(DB));
