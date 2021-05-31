/*
1.Set
2.WeakSet
3.Map
4.WeakMap
 */

/*
1.Set
无序不可重复
 */
const s = new Set();
[1, 2, 3, 4, 5, 1, 2, 3, , 5].map(x => s.add(x));
console.log(s);

const s2 = new Set([4, 5, 2, 3, 4]);
console.log(s2);
//1.1 set 内部不会发生类型转换
const s3 = new Set();
[1, 2, 3, 4, '1', '2', '3'].forEach(x => s3.add(x));
console.log(s3);
//1.2 两个对象总是不相等的，即使是空对象
console.log(s3.size);
s3.add({});
s3.add({});
console.log(s3.size);
//1.3 一些方法:add(),delete(),has(),clear() 一些属性：size

//1.4 遍历操作 set 键值相同
//1.4.1 keys() values()
/*console.log(s3);
for (let k of s3.keys()) {
  console.log(k);
}
for(let v of s3.values()){
  console.log(v);
}*/
//1.4.2 forEach() 可以接收两个参数
s3.forEach((k, v) => console.log(k + ':' + v));
//1.4.2 扩展运算符
let unique = [...new Set([1, 2, 3, 3, 2, 1])];
console.log(unique);
//1.4.3 交集 并集 差集
let a = new Set([1, 2, 3, 4]);
let b = new Set([1, 2, 3]);
//并集
let s4 = new Set([...a, ...b]);
console.log(s4);

//交集
let s5 = new Set([...a].filter(value => b.has(value)));
console.log(s5);

//差集
let s6 = new Set([...a].filter(value => !b.has(value)));
console.log(s6);
//2.WeakSet
/*
只能存放对象，不可重复而且存放的对象不会被垃圾回收计数
不可遍历，没有size属性
可用于存储dom节点，防止内存泄漏
 */
//2.1 三个方法：add(value) delete(value) has(value)
let c = {};
let d = {name: 'guochengli', age: 24};
let weakSet = new WeakSet();
weakSet.add(c);

console.log(weakSet.has(c));
weakSet.delete(c);
console.log(weakSet.has(c));

//3.Map
/*
由于之前的object的键会自动转为字符串
为了解决这个问题，在es6中提供了map数据结构，键不限于字符串
任何具有Iterator接口，且成员都是一个双元素的数据结构都可作为Map构造方法的参数
 */
let s7 = new Set([['apple', 7.98], ['banana', 3.42]]);
console.log(s7);
let map = new Map(s7);
console.log(map);
/*
3.1 属性及方法
size属性
set(k,v)
get(k)
has(k)
delete(k)
clear()
 */

/*
3.2 遍历方法
 */
console.log('========keys()==========');
for (let k of map.keys()) {
  console.log(map.get(k));
}
console.log('========values()==========');
for (let v of map.values()) {
  console.log(v);
}
console.log('========[k,v]==========');
for (let [k, v] of map) {
  console.log([k, v]);
}
console.log('========entries()==========');
for (let item of map.entries()) {
  console.log(item);
}
console.log('========entries()==========');
map.forEach((v, k) => console.log(k + ':' + v));

//forEach可以接收第二个参数绑定this
const reporter = {
  report(k, v) {
    console.log('Key:' + k + ',Value:' + v);
  }
};
map.forEach(function (value, key, map) {
  this.report(key, value);
}, reporter);
/*
3.3 结构转换
 */
//3.3.1 与数组互转 结合数组的map filter方法也可实现map的遍历和过滤
let arr = [...map];
console.log(arr);

let map2 = new Map(arr);
console.log(map2);
//3.3.2 与对象互转
const obj = {[Symbol('city')]: 'zhengzhou', price: 14365};
console.log(new Map(Object.entries(obj)));

function map2Obj(map) {
  let obj = Object.create(null);
  for (let [k, v] of map) {
    obj[k] = v;
  }
  return obj;
}

map2.set(Symbol('fruit'), 'more');
console.log(map2);
console.log(map2Obj(map2));

/*
3.3.3 与JSON互转
如果map中都是字符串做key，可以转为json对象；
反之需要转为json数组
 */
function map2JsonArray(map) {
  return JSON.stringify([...map]);
}

console.log(map2JsonArray(map2));

function obj2JsonObj(map) {
  return JSON.stringify(map);
}

//先转为对象，后转为JSON对象
console.log(obj2JsonObj(map2Obj(map)));
/*
4.WeakMap
只接受对象作为key
键指向的对象不计入垃圾回收机制

防止内存泄漏
没有遍历操作，没有size属性，无法清空
应用：dom节点做键名
 */






