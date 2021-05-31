/*
1.Promise 的含义
2.基本用法
3.Promise.prototype.then()
4.Promise.prototype.catch()
5.Promise.prototype.finally()
6.Promise.all()
7.Promise.race()
8.Promise.allSettled()
9.Promise.any()
10.Promise.resolve()
11.Promise.reject()
12.应用：图片的加载
13.Promise.try()
 */
/*
1.Promise 的含义
异步编程的一种解决方案，较回调函数、事件更合理、强大
具有两个特点：
状态不受外界影响，只有三种状态：pending-等待中 fulfilled-执行成功 rejected-执行失败
状态一旦改变，就不会再变 pending->fulfilled pending->rejected

优点：可读性好、接口统一
缺点：一旦新建就无法取消；不能设置回调函数；当处于pending状态时，无法知道处于刚开始还是即将完成
 */
/*
2.基本用法

const promise = new Promise(function (resolve, reject) {
  // ... some code
  if ( 异步操作成功) {
  resolve(value);
} else {
  reject(error);
}
});
Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
promise.then(function(value){
将状态从pending->fulfilled
},function (error){
将状态从pending->rejected
});
 */
//Promise对象新建后会立即执行
let promise = new Promise(function (resolve, reject) {
  console.log('promise executive');
  resolve();
});
//在同步任务执行完才会执行resolve() or reject()
promise.then(function () {
  console.log('promise success');
});
console.log('123');

console.log('============promise demo==========');

function timeout(ms) {
  return new Promise((resolve, reject) => {
    //过ms毫秒后执行resolve回调
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value => {
  console.log(value);
}));
//一般来说，调用了resolve reject以后，promise的使命就完成了，后续的操作应该放在then方法中，不应该直接写在resolve or reject中

/*
3.Promise.prototype.then()
由于then返回的是一个新promise对象，所以可能前一个回调函数返回的是promise对象
那么promise对象的状态会影响后面then方法的执行，如果promise为reject则执行后面then方法中的第二个方法，反之这执行第一个方法
 */
const result = false;
let chainCall = new Promise((resolve, reject) => {
  resolve();
});
chainCall.then(value => {
  return new Promise((resolve, reject) => {
    if (result) {
      resolve();
    } else {
      reject();
    }
  });
}).then(value => {
  console.log('resolve');
}, () => {
  console.log('reject');
});

/*
4.Promise.prototype.catch()
等价于
.then(null | undefined, (error) => {
  console.log(error);
})
捕获异步操作中的异常，包括：promise、reject、resolve中异常

优秀实践：在then方法中不要定义reject回调，在catch中定义reject回调
promise内部的错误不会影响外部代码执行，
 */
console.log('===========catch()========');
const catchPromise = new Promise((resolve, reject) => {
  // throw new Error('error');
  // resolve();
  reject();
});
catchPromise.then(value => {

}, () => {
  throw new Error('error');
}).catch(() => {
  console.log('catch error');
});

/*
5.Promise.prototype.finally()
无论promise状态如何，finally()中的回调函数都会被执行
应存放与promise状态无关的代码
 */

/*
6.Promise.all()
用于将多个 Promise 实例，包装成一个新的 Promise 实例
多个实例都是fulfilled状态时，新的promise状态为fulfilled；反之则为reject
 */
Promise.all([chainCall, catchPromise]).then(value => {

}, (error) => {

});

/*
7.Promise.race()
用于将多个 Promise 实例，包装成一个新的 Promise 实例
率先改变状态的promise将状态传递给新的promise实例
 */
Promise.race([chainCall, catchPromise]).then(value => {

}, (error) => {

});

/*
8.Promise.allSettled()
用于将多个 Promise 实例，包装成一个新的 Promise 实例
当多个promise都返回结果时，无论fulfilled or reject，包装才会结束;状态只可能变成fulfilled
应用于：不关心异步操作的结果，只关心这些操作有没有结束
 */
// await Promise.allSettled([chainCall, catchPromise]);

/*
9.Promise.any()
用于将多个 Promise 实例，包装成一个新的 Promise 实例
只要有一个promise实例状态变为fulfilled，新promise实例就会变成fulfilled；所有promise实例都变为reject时，新promise变为reject
 */

/*
10.Promise.resolve()
分为4种情况
 */
//10.1 参数是一个 Promise 实例，原封不动不动的返回
const resolvePromise = Promise.resolve(catchPromise);
//10.2 参数是一个thenable对象，即包含方法名为then的对象，转为promise对象后立即执行then方法
const thenableObj = {
  then(resolve, reject) {
    console.log('helloworld');
  }
};
const resolveThenablePromise = Promise.resolve(thenableObj);
//10.3 参数不是具有then()方法的对象，或根本就不是对象，返回promise状态是resolved
const notPromise = Promise.resolve('helloworld-notPromise');
//立即执行resolve方法
notPromise.then(value => {
  console.log(value);
});

//10.4 不带有任何参数 返回一个resolve状态的promise实例
const noArgPromise = Promise.resolve();
noArgPromise.then(value => {
  console.log(value);
});
//需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
setTimeout(() => {
  console.log('three');
}, 0);
Promise.resolve().then(value => {
  console.log('two');
});
console.log('one');
/*
11.Promise.reject()
返回一个reject状态的promise对象，执行then方法的reject回调时，将传入的参数原封不动的传入到reject回调中
 */
const rejectPromise = Promise.reject('404 not found');
rejectPromise.catch(error => {
  console.log(error);
});

/*
13.Promise.try()
实际开发中，经常遇到一种情况：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。
因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程，用catch方法处理f抛出的错误。一般就会采用下面的写法
Promise.resolve().then(fn)
但是如果fn是同步的，会在本轮事件循环结束时执行
 */
const fn1 = () => {
  console.log('同步函数fn1');
};
const p = Promise.resolve().then(fn1);
console.log('主线程');
/*
有两种方法，让同步的方法立刻执行，异步操作异步执行
1.async
const f = () => console.log('now');
(async () => f())();
console.log('next');


2.new Promise()

 */
const f = () => console.log('he');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();


