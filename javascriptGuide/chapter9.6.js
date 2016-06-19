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