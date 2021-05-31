//面试
//1.说说你对this关键字的理解
/*
首先在js中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行。
this所在的函数被哪个对象调用就会指向谁。但是 js 支持运行环境动态切换，所以this的指向是动态的，没有办法事先确定到底指向哪个对象
但是js提供了3种方法：bind call apply确定this指向
1.全局上下文 正常模式下是window，严格模式下是undefine
2.直接调用函数，相当于全局上下文
3.对象.方法 调用时，方法内的this指向调用函数的对象
4.dom事件绑定，onclick和addEventerListener中的this默认指向绑定事件的元素
5.new+构造方法，指向实例对象
6.箭头函数，指向最近的非箭头函数的this，如果无则指向window
 */
let showThis = function () {
  console.log(this);
};
showThis();

//与this有关的方法：bind call apply
function A() {
  this.name = 'Tom';
  this.fun = function () {
    console.log(this.name);
  };
  this.fun2 = function (a, b) {
    console.log(this.name + ',a:' + a + ',b:' + b);
  };
}

let b = {name: 'ming'};
let a = new A();
console.log(b.name);
console.log(a.name);
//bind将函数体中的this指向新对象并返回一个新函数
// a.fun.bind(b)();
//this指向传入的对象，参数需要一个一个的传入
a.fun2.call(b, 1, 2);
//参数可以通过数组一次传入
a.fun2.apply(b, [1, 2]);

function add(a) {
  a += 1;
  return a;
}

let d = 1;
console.log(d);
console.log(add(d));
console.log(d);

/*
基础篇
 */
/*
1.js中原始数据类型有哪些？引用数据类型有哪些？
原始数据类型：Number boolean string null undefined symbol
引用数据类型：Object（包含普通对象-Object，数组对象-Array，正则对象-RegExp，日期对象-Date，数学函数-Math，函数对象-Function）
 */

//typeof 能否正确判断数据类型：如果是原始类型，除了null之外都能正确判断；如果是引用数据类型，返回的都是object。判断数据类型时使用instanceof更好一些
// ->为什么用instanceof更好一些？instanceof是基于原型链查询的，如果处于原型链中，返回的都是true
//    ->instanceof能判断原始类型么？能，不过需要自定义instanceof行为
//    ->说一下你对原型链的理解？
// ->为什么null通过typeof判断为object？
let s;
console.log(typeof (1));
console.log(typeof (true));
console.log(typeof ('a'));
console.log(typeof (null));
console.log(typeof (undefined));
console.log(typeof ({}));
console.log(typeof (s = Symbol()));

console.log('============instanceof===========');

class PrimitiveNumber {
  static [Symbol.hasInstance](x) {
    return typeof x === 'number';
  }
}
