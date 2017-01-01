/* 实现一个Promise */

// 构造函数
function Promise(executor) {
	var self = this;
	self.status = 'pending';	// Promise的当前状态
	self.data = undefined;		//Promise的值
	self.onResolvedCallback = [];		// Promise resolve时的回调函数集
	self.onRejectedCallback = [];		// Promise reject时的回调函数集，因为在Promise结束之前可能有多个回调函数添加到它上面

	executor(resolve, reject);		// 执行executor并传入相应的参数
}

// 两个问题：
// 1. 我们给executor函数传了两个参数：resolve和reject，这两个参数目前还没有定义
// 2. executor有可能会出错（throw），而如果executor出错，Promise应该被其throw出的值reject

// 构造函数
function Promise(executor) {
	var self = this;
	self.status = 'pending';	// Promise的当前状态
	self.data = undefined;		//Promise的值
	self.onResolvedCallback = [];		// Promise resolve时的回调函数集
	self.onRejectedCallback = [];		// Promise reject时的回调函数集，因为在Promise结束之前可能有多个回调函数添加到它上面

	function resolve(value) {
		if(self.status === 'pending') {
			self.status = 'resolved';
			self.data = value;

			for(var i = 0; i < self.onResolvedCallback.length; i++) {
				self.onResolvedCallback[i](value);
			}
		}
	}

	function reject(reason) {
		if(self.status === 'pending') {
			self.status = 'rejected';
			self.data = reason;
		}

        for(var i = 0; i < self.onRejectedCallback.length; i++) {
            self.onRejectedCallback[i](reason);
        }
	}

	try { // 考虑到执行reject过程中可能出错，所有我们用try/catch块中包起来，并且在出错后以catch到的值reject掉这个Promise
		executor(resolve, reject);
	} catch(e) {
		reject(e)
	}
}

// then方法接收两个参数， onResolved, onRejected,分别为Promise成功和失败后的回调函数
Promise.prototype.then = function(onResolved, onRejected) {
	var self = this;
	var promise2;

	// 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
	onResolved = typeof onResolved === 'function' ? onResolved : function(value) {};
	onRejected = typeof onRejected === 'function' ? onRejected : function(reason) {};

	if(self.status === 'resolved') {
        // 如果promise1(此处即为this/self)的状态已经确定并且是resolved,我们调用onResolved
        // 因为考虑到有可能throw，所以我们将其包在try/catch块里
		return promise2 = new Promise(function(resolve, reject){
            try{
                var x = onResolved(self.data);

                if(x instanceof Promise) {      // 如果onResolved的返回值是一个Promise对象，直接取它的结果作为promise2的结果
                    x.then(resolve, reject);
                }
                resolve(x);     //
            }
        })
	}

    if(self.status === 'rejected') {
        return promise2 = new Promise(function(resolve, reject){
            try {
                var x = onRejected(self.data);
                if(x instanceof Promise) {
                    x.then(resolve, reject);
                }
            } catch (e) {
                reject(e);
            }
        })
    }

    if(self.status === 'pending') {
        // 如果当前的Promise还处于pending状态，我们并不能确定是调用onResolved还是onRejected
        // 只能等到Promise的状态确定后，才能确定如何处理
        // 所以我们需要把两种情况的处理逻辑作为callback放入promise1的回调函数组里面
        return promise2 = new Promise(function(resolve, reject){
            self.onResolvedCallback.push(function(value) {
                try {
                    var x = onResolved(self.data);
                    if(x instanceof Promise) {
                        x.then(resolve, reject)
                    }

                } catch(e) {
                    reject(e)
                }
            });

            self.onRejectedCallback.push(function(reason) {
                try {
                    var x = onRejected(self.data);
                    if(x instanceof Promise) {
                        x.then(resolve, reject);
                    }
                } catch (e) {
                    reject(e);
                }
            });


        });
    }
