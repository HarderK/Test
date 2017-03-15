let obj = new Proxy({}, {
	get (target, key, receiver) {
		console.log(`getting ${key}!`);
		return Reflect.get(target, key, receiver);
	},
	set (target, key, value, receiver) {
		console.log(`setting ${key}!`);
		return Reflect.set(target, key, value, receiver);
	}
});

obj.count = 1;
let a = obj.count;


// Proxy实例作为其他对象的原型
var proxy = new Proxy({}, {
	get (target, key, receiver) {
		// console.log(receiver)
		return -1;
	}
});



obj = Object.create(proxy);
// obj.time = 2;
console.log(obj);   


/**
 * get()
 */
var person = {name: 'HarderK'};

var proxy = new Proxy(person, {
	get (target, key, receiver) {
		if(key in target) {
			return target[key];
		} else {
			throw new ReferenceError(`Property "${key}" does not exist.`);
		}
	}
});

proxy.name;
// proxy.age;
var twice = x => x * x;
var pow2 = x => Math.pow(x, 2);
var window = { twice, pow2 };

var pipe = function(value) {
	var pipe = [];

	let proxy = new Proxy({}, {
		get: function(pipeObj, fnName) {
			if(fnName === 'get') {
				return pipe.reduce((val, fn) => fn(val), value);
			}
			pipe.push(window[fnName]);
			console.log(pipe)
			return proxy;
		}
	});

	return proxy;
};




console.log(pipe(2).twice.pow2.get);

/**
 * set()
 */
let validator = {
	set (obj, prop, value) {
		if (prop === 'age') {
			if(!Number.isInteger(value)) {
				return false;
			}
			if (value > 100) {
				return false;
			}

			Reflect.set(obj, prop, value);
		}
	}
};

let person1 = new Proxy({}, validator);

person1.age = 1002;
console.log( person1.age );

var handler = {
	get(target, key) {
		invariant(key, 'get');
		return target[key];
	},
	set(target, key, value) {
		invariant(key, 'set');
		return true;
	}
}

function invariant(key, action) {
	if(key[0] === '_') {
		throw new Error(`Invalid attempt to ${action} private "${key}" property`);
	}
}

var target = {};
var proxy = new Proxy(target, handler);
// proxy._prop;


/**
 * apply() 方法拦截函数的调用、call和apply操作
 */

var handler = {
	apply(target, ctx, args) {
		console.log(`I'm the proxy`);
		return Reflect.apply(...arguments);
	}
}

var target = function() {
	return `I'm the target`;
}

var proxy = new Proxy(target, handler);

var str = proxy();
console.log(str);

var twice = {
	apply(target, ctx, args) {
		return Reflect.apply(...arguments) * 2;
	}
}

function sum (a, b) {
	return a + b;
}

var proxy = new Proxy(sum, twice);

console.log(proxy(1, 3));
console.log(proxy.call(null, 1, 3));
console.log(proxy.apply(null, [1, 3]));
console.log(Reflect.apply(proxy, null, [9, 1]));


/**
 * has()
 */

/**
 * construct()
 * 用于拦截new命令
 */

var handler = {
	construct(target, args) {
		return new target(...args);
	}
}

var p = new Proxy(function() {}, {
	construct(target, args) {
		console.log('called: ' + args.join(', '));
		return {value: args[0] * 10 || 1};
	}
})

console.log(new p(2, 3));

/**
 * enumerate()
 * 拦截for...in循环
 */
var handler = {
	enumerate (target) {
		console.log(1111);
		return Object.keys(target).filter(key => key[0] !== '_')[Symbol.iterator]();
	}
};

var target = {prop: 'foo', _bar: 'baz', name: 'haha'};
var proxy = new Proxy(target, handler);
for(let key in proxy) {
	console.log(key)
}

var proto = {};
var p = new Proxy({}, {
	getPrototypeOf(target) {
		return Object.assign(Reflect.getPrototypeOf(target), {sayName(){}});
	}
})

console.log(Object.getPrototypeOf(p));	// true
console.log(proto.constructor)

