// 纯函数：相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用
var immutableState = Object.freeze({
    minimum: 21
});

// 副作用是滋生bug的温床
/*
	副作用可能包括：
	1. 更改文件系统
	2. 往数据库插入数据
	3. 发送一个http请求
	4. 可变数据
	5. 打印/log
	6. 获取用户输入
	7. DOM查询
	8. 访问系统状态
 */

// 可缓存性
var memoize = function(f) {
    var cache = {};

    return function() {
        var arg_str = JSON.stringify(arguments);
        cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
        return cache[arg_str];
    };
};

// 通过延迟执行的方式，把不纯的函数转换为纯函数
var pureHttpCall = memoize(function(url, params) {
    return function() {
        return $.getJSON(url, params);
    };
});

// 引用透明：一段代码可以替换成它执行所得的结果，而且是在不改变整个程序行为的前提下替换的，那么我们就可以说这段代码是引用透明的
var decremntHP = function(player) {
	return player.set("hp", player.hp-1);
};

var isSameTeam = function(player1, player2) {
	return player1.team = player2. team;
};

var punch = function(player, target) {
	if(isSameTeam(player, target)){ return target; }
	else { return decremntHP(target)};
};

var jobe = Immutable.Map({name:"Jobe", hp:20, team:"red"});
var michael = Immutable.Map({name:"Michael", hp:20, team:"green"});

punch(jobe, michael);

// 等式推导带来的分析能力对重构和理解代码非常重要
// 我们可以并行运行任意纯函数，因为纯函数根本不需要访问共享的内存