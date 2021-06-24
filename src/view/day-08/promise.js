// var promise = new Promise(function (resolve, reject) {
//   var arr = [1, 2, 3, 4]
//   var newArr = arr.map(function (value, index, array) {
//     return 1
//   })
//   console.log(456)
// })
//
// function aaa(res) {
//   setTimeout(() => {
//     let ret = 1;
//     res(ret);
//   }, 2000)
// }
//
// function bbb() {
//   return new Promise(((resolve, reject) => {
//     aaa(resolve)
//   }))
// }
//
// !async function () {
//   var result = await bbb();
//   console.log(result)
//   console.log(result);
// }
// ();
//
// const setDelay = (millisecond) => {
//   return new Promise((resolve, reject) => {
//     if (typeof millisecond != 'number') {
//       reject(new Error('参数必须是number类型'));
//     }
//     setTimeout(() => {
//       resolve(`我延迟了${millisecond}毫秒后输出的`)
//     }, millisecond)
//   })
// }
//
// const setDelaySecond = (second) => {
//   return new Promise((resolve, reject) => {
//     if (typeof second != 'number') {
//       reject(new Error('not number'))
//     }
//     setTimeout(() => {
//       resolve(`我延迟了${second}秒后输出的`)
//     }, second * 1000)
//   })
// }
//
// setDelaySecond(2)
//   .then(value => {
//     console.log(value)
//     return setDelay(1000)
//   })
//   .then(value => console.log(value))

/*
链式调用中的then的this指向的是上一个then返回的promise对象
链式调用分
await
 */
// async function async1() {
//   console.log('async1 start');
//   await async2();
//   console.log('async1 end');
// }
//
// async function async2() {
//   console.log('async2');
//   await async3()
//   console.log(123)
// }

async function async3() {
  console.log('async3');
  await async4()
  console.log(456)
}

async function async4() {
  await console.log('async4');
  console.log(789)
}

console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0)

async3();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});

async4();

console.log('script end');

console.log(123123123)
/*
script start
async3
async4
promise1
async4
script end
789
promise2
789
456
 */










