/*
Generator与异步
1.传统方法
2.基本概念
3.Generator 函数
4.Thunk 函数
5.co 模块
 */
/*
1.传统方法
回调函数
事件监听
发布订阅模式
Promise

回调函数本身没有问题，主要是会出现回调函数地狱
Promise通过链式调用解决回调函数地狱，但是代码会冗余；为什么promise可以解决回调函数地狱？
 */
/*const fs = require('fs');
fs.readFile('/u01/logs/recorder/recorder-all.log', 'utf-8',
  function (err, data) {
    if (err) {
      throw err;
    }
    console.log(data.length);
  }
);

let readFile = require('fs-readfile-promise');
readFile('/u01/logs/recorder/recorder-all.log', 'utf-8').then(function (data) {
  console.log(data.length);
}).catch(function (err) {
  console.log(err);
});*/
/*
2.基本概念
异步：一个任务不是连续完成的，将一个任务人为的分为两段
回调函数是将任务的第二段写在回调函数中

 */
let fetch = require('node-fetch');

function* gen() {
  const url = 'https://api.github.com/users/github';
  let result = yield fetch(url);
  console.log(result.bio);
}
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});

/*
3.Generator 函数
 */

/*
4.Thunk 函数
自动执行Generator函数的一种方法
参数的求值策略分为两种：传值调用，传名调用
传名调用的常规实现将临时函数作为参数传入一个函数中
 */

