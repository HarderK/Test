function inherit(p){
	function F(){}
	F.prototype = p;
	return new F();
}


//这个函数创建一个新的枚举类型，实参对象表示类的每个实例的名字和值
//返回值是一个构造函数
//注意，这个构造函数也会抛出异常：不能使用它来创建该类型的新实例
//返回的构造函数包括含名/值对的映射表
//包括由值组成的数组，以及一个foreach()迭代函数
function enumeration(namesToValues){
	//这个虚拟的构造函数是返回值
	var enumeration = function(){ throw "Can't Instantiate Enumeration"; } ;

	var proto = enumeration.prototype = {
		constructor : enumeration,
		toString : function(){return this.name;},
		valueOf : function(){return this.value;},
		toJSON : function(){return this.name;}
	};

	//用来存放枚举对象的数组
	enumeration.values = [];

	//现在创建新类型的实例
	for (name in namesToValues){
		var e = inherit(proto);		//创建一个代表它的对象
		e.name = name;
		e.value = namesToValues[name];
		enumeration[name] = e;	//将对象设置为构造函数的属性
		enumeration.values.push(e);
	}

	//类方法，用来对类的实例进行迭代
	enumeration.foreach = function(f, c){
		for (var i = 0; i < this.values.length; i++) f.call(c, this.values[i]);
	};

	//返回标识这个新类型的/构造函数
	return enumeration;

}

//定义一个表示玩牌的类
function Card(suit, rank){
	this.suit = suit;	//花色
	this.rank = rank;	//点数
}

//使用枚举类型定义花色和点数
Card.Suit = enumeration({Clubs: 1, Diamonds: 2, Hearts: 3, Spaders: 4});
Card.Rank = enumeration({Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, Eight: 8, Nine: 9, Ten: 10, Jack: 11, Queen: 12, King:13, Ace: 14});

//定义用于描述牌面的文本
Card.prototype.toString = function(){
	return this.rank.toString() + "of" + this.suit.toString();
};

//比较扑克牌中两张牌的大小
Card.prototype.compareTo = function(that){
	if(this.rank < that.rank) return -1;
	if(this.rank > that.rank) return 1;
	return 0;
};

//以扑克牌的玩法对牌进行排序的函数
Card.orderByRank = function(a, b){
	return a.compareTo(b);
};

//以桥牌的玩法规则对扑克牌进行排序的函数
Card.orderBySuit = function(a, b){
	if(a.suit < b.suit) return -1;
	if(a.suit > b.suit) return 1;
	if(a.rank < b.rank) return -1;
	if(a.rank > b.rank) return 1;
	return 0;
};

//定义用以表示一副标准扑克牌的类
function Deck(){
	var cards = this.cards = [];		//一副牌就是由牌组成的数组
	Card.Suit.foreach(function(s){
		Card.Rank.foreach(function(r){
			cards.push(new Card(s, r));
		});
	});
}

//洗牌的方法：重新洗牌并返回洗好的牌
//遍历数组中的每个元素，随机找出牌面最小的元素，并与当前遍历的元素交换
Deck.prototype.shuffle = function(){
	var deck = this.cards, len = deck.length;
	for(var i = len - 1; i >= 0; i--){
		var r = Math.floor(Math.random() * (i + 1)), temp;
		temp = deck[i], deck[i] = deck[r], deck[r] = temp;
	}
	return this;
};

Deck.prototype.deal = function(n){
	if(this.cards.length < n) throw "Out of cards";
	return this.cards.splice(this.cards.length - n, n);
};




var deck = (new Deck()).shuffle();
console.log(deck);

var hand = deck.deal(13).sort(Card.orderBySuit);
console.log(hand);

Range.prototype.constructor = Range;

//一个Range对象和其他不是Range的对象均不相等
//当且仅当两个范围的端点相等，他们才相等
Range.prototype.equals = function(that){
	if(that == null) return false;

	if(that.constructor !== Range) return false;

	return this.from == that.from && this.to == that.to;
}

Set.prototype.equals = function(that){
	//一些次要情况的快捷处理
	if(this == that) return true;

	//如果that不是一个集合，它和this不相等
	//我们用到了instanceof，使得这个方法可以用于Set的任何子类
	//如果希望采用鸭式辩型的方法，可以降低检查的严格程度
	//或者可以通过 this.constructor == that.constructor 来加强检查的严格程度
	//注意null和undefined两个值是无法用于instanceof运算的
	if(! (that instanceof Set)) return false;

	//如果两个集合的大小不一样，则它们不相等
	if(this.size() != that.size()) return false;

	//检查两个集合中的元素是否完全一样
	//如果两个集合不相等，则通过抛出异常来终止foreach循环
	try {
		this.foreach(function(v){
			if( !that.contains(v)) throw false;
		});
		return true;
	} catch(x) {
		if (x == false) return false;
		throw x;
	}

};

/**
 * 方法借用的泛型实现
 */
var generic = {
	//返回一个字符串，这个字符串包含构造函数的名字（如果构造函数中含有名字）
	//以及所有非继承来的、非函数属性的名字和值
	toString : function(){
		var s = "[";
		//如果这个对象包含构造函数，且构造函数包含名字
		//这个名字会作为返回字符串的一部分
		//需要注意的是，函数的名字属性是非标准的，并不是在所有的环境中都可用
		if(this.constructor && this.constructor.name);
			s += this.constructor.name + ":";

		//枚举所有非继承且非函数的属性
		var n = 0;	//第一个不加逗号
		for (name in this){
			if(!this.hasOwnProperty(name)) continue;	//跳过继承来的属性
			var value = this[name];
			if(typeof value === "function") continue;
			if(n++) s += ",";
			s += name + "=" + value;
		}
		return s + "]";

	},

	equals : function(that) {
		if(that == null) return false;
		if((this.constructor !== that.constructor)) return false;

		for(var name in this){
			if(name ===  "|**objectid**|") continue;
			if(!this.hasOwnProperty(name)) continue;
			if( this[name] !== that[name]) return false;
		}
		return true;
	}
}

function Range(from, to ){
	this.from = function(){ return from;};
	this.to = function(){return to;};
}

Range.prototype = {
	constructor : Range,
	includes : function(x) {return this.from() <= x && x <= this.to();},
	foreach : function(f) {

	},
	toString : function(){}
};

//使用工厂方法来返回一个使用极坐标初始化的Complex对象
Complex.polar = function(r, theta){
	return new Complex(r * Math.cos(theta), r * Math.sin(theta));
};

//使用工厂方法用来通过数组初始化Set对象：
Set.fromArray = function(a){
	s = new Set();
	s.add.apply(s, a);	//将数组a的成员作为参数传入add()方法
	return s;
}；