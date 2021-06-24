// console.log('script start')
//
// async function async1() {
//   await async2()
//   console.log('async1 end')
// }
//
// async function async2() {
//   console.log('async2 end')
// }
//
// async1()
//
// setTimeout(function () {
//   console.log('setTimeout')
// }, 0)
//
// new Promise(resolve => {
//   console.log('Promise')
//   resolve()
// })
//   .then(function () {
//     console.log('promise1')
//   })
//   .then(function () {
//     console.log('promise2')
//   })
//
// console.log('script end')
// /*
// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
//
//  */
// console.log('------------------------------------------------------------------------------------------------')
//
const demo = async () => {
  let result = await setTimeout(() => {
    console.log('我延迟了一秒');
  }, 1000)
  // let result = await '123'
  console.log('我由于上面的程序还没执行完，先不执行“等待一会”');
  // return result
}
// demo().then(result => {
//   console.log('输出', result);
// })
var a = demo()
console.log(a)
console.log(a instanceof Promise)

