//1.变量声明
//声明变量的6种方式：var、function、let、const、import、class

//不存在变量提升，let声明的变量只能在let所在区域生效

//ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错
//在代码块中，如果使用let声明之前的变量会报错；暂时性死区
//在let作用域中，不允许变量名重复

//var作用域包括两种：函数作用域、全局作用域    let作用域：函数作用域、全局作用域、块级作用域（被大括号包裹的）

//const 声明一个常量，一旦声明必须初始化而且不能更改；声明的变量不提升而且暂时性死区
//如果用const声明一个对象，对象是可以更改的；因为声明对象保存的是一个指针，声明原始类型保存的是一个内存地址

//2.变量的解构赋值：完全解构 不完全解构
//2.1 原始类型的解构
let [a, b, c] = [1, 2, 3];
//也可给默认值，如果右边相同位置没有值则赋默认值，反之则赋右边值
let [d = 2] = [3];
console.log(d);
//2.2 对象的解构
//2.2.1 对象属性的解构
var student = {
  name: 'xiaoming',
  age: 23
};
let {name, age} = student;
//如果变量名和属性名不一致，真实属性名为后者
// let {NAME: name, AGE: age} = student;
console.log(name);
console.log(age);
let {FOO: foo} = {FOO: 'age'};
console.log(foo);
// console.log(FOO);

//2.2.2 对象方法的解构  变量名与方法名保持一致
let {log, sin, cos} = Math;
console.log(log(3));

var stu = {
  name: 'guochengli',
  age: 23,
  sayHello: function () {
    console.log('helloworld');
  }
};
let {sayHello} = stu;
sayHello();
//对象的多层嵌套解构
const node = {
  loc: {
    start: {
      line: 1,
      column: 10
    }
  }
};
let {loc, loc: {start: STAET}, loc: {start: {line}}} = node;
console.log(STAET);

let arrObj = {
  p: [
    'hello',
    {b: 'world'}
  ]
};
let {p, p: [x, {y}]} = arrObj;

//数组的解构
let arr = [1, 2, 3, 4];
//把index=0的值赋值为first
let {0: first} = arr;
console.log(first);

//4.数值和布尔值的解构赋值
let {toString: s} = 123;
console.log(s === Number.prototype.toString);
let {toString: sr} = true;
console.log(sr === Boolean.prototype.toString);
//解构赋值规则：如果等号右边不是对象或数组，则现转为对象。基本类型转为对应的包装类
//5.函数参数的解构赋值
console.log([[1, 2], [3, 4]].map(([a, b]) => a + b));

function move({x: x = 2, y: y = 2} = {}) {
  return [x, y];
}

console.log([1, undefined, 3].map((x = 'yes') => x));
//模式不能使用圆括号的场景：
//1.变量声明
// let [(a)] = {1};
//2.函数参数
//3.赋值语句的模式
console.log('============jsonData===========');
let jsonData = {
  id: 42,
  status: 'OK',
  data: [867, 5309],
  msg: ''
};
let {id, status, data, msg = 'hellworld'} = jsonData;
console.log(data);
console.log(msg);

let map = new Map();
map.set('name', 'guochengli');
map.set('age', 23);
console.log(map);
for (let [k, v] of map) {
  console.log(k + ':' + v);
}
//只取key
console.log('===========only key============');
for (let [k] of map) {
  console.log(k);
}

console.log('===========only value============');
for (let [, v] of map) {
  console.log(v);
}
