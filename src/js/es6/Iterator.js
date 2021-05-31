/*
1.Iterator（遍历器）的概念
2.默认 Iterator 接口
3.调用 Iterator 接口的场合
4.字符串的 Iterator 接口
5.Iterator 接口与 Generator 函数
6.遍历器对象的 return()，throw()
7.for...of 循环
 */
/*
1.Iterator（遍历器）的概念
提供访问数据结构的统一接口；使得数据结构的成员按某种次序排列；供for...of消费
 */
const makeIter = arr => {
  let index = 0;

  return {
    //闭包
    next: function () {
      return index <= arr.length ? arr[index++] : undefined;
    }
  };
};
const iterObj = makeIter([1, 2, 3, 4]);
console.log(iterObj.next());
console.log(iterObj.next());
console.log(iterObj.next());
console.log(iterObj.next());
console.log(iterObj.next());

/*
2.默认 Iterator 接口
一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。
es6规定：默认的Iterator接口部署在数据结构的Symbol.iterator属性，本身是一个函数。如果部署了这个属性，for...of会自动寻找这个方法
只要部署了Symbol.iterator方法，就可以使用for...of or while遍历
 */
const obj = {
  [Symbol.iterator]: function () {
    return {
      next() {
        return {value: 1, done: true};
      }
    };
  }
};
console.log(obj[Symbol.iterator]().next());
//类似数据的对象直接调用数组对象的Symbol.iterator方法，普通对象部署Symbol.iterator方法无效
//Array.prototype[Symbol.iterator]; 等价于 [][Symbol.iterator]
const arrLikeObj = {
  0: 'apple',
  1: 'banana',
  2: 'qikelit',
  length: 3,
  [Symbol.iterator]: [][Symbol.iterator]
};
console.log(arrLikeObj[Symbol.iterator]().next());
for (let data of arrLikeObj) {
  console.log(data);
}

/*
3.调用 Iterator 接口的场合
除了for...of 会调用iterator接口，还有几种种场景会调用Iterator接口
解构赋值
扩展运算符
yield*
其他场合
 */
//3.1 解构赋值
let fromArr = [1, 2, 3];
let to = [...fromArr];
console.log(to);
//3.2 扩展运算符
let union = [...fromArr, ...to];
console.log(union);
//3.3 yield*:yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

/*
3.4 其他场合:由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口
for...of
Array.from()
Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
Promise.all()
Promise.race()
 */

/*
4.字符串的 Iterator 接口
类似数组的对象，原生具有Iterator接口
 */
const str = 'helloworld';
console.log(str[Symbol.iterator]().next());
console.log(str[0]);

/*
5.Iterator 接口与 Generator 函数

 */

/*
6.遍历器对象的 return()，throw()
遍历器对象必须部署next()方法，return() throw()可选部署
return()：如果在遍历结束前需要释放资源，可以部署return；如果for...of时由于break或者出错终止循环时，会立即执行return方法；必须返回一个对象
throw()主要配合Generator函数使用，一般的遍历器对象用不到这个方法
 */
console.log('===========test return=======');
arrLikeObj[Symbol.iterator] = () => {
  let index = 0;
  return {
    next() {
      return index < arrLikeObj.length ? {value: arrLikeObj[index++], done: false} : {value: undefined, done: true};
    },
    return() {
      console.log('循环暂停了');
      return {done: true};
    }
  };
};
console.log(arrLikeObj[Symbol.iterator]().next());
for (let data of arrLikeObj) {
  if (data === 'apple') {
    console.log(data);
  } else {
    break;
  }
}

/*
7.for...of 循环
几种遍历方式比较:for循环、for...in、for...of、forEach
for循环语法麻烦
for...in 遍历键名，主要用于遍历对象及继承的属性名，自动过滤Symbol属性、不可枚举属性
forEach 一旦开始就无法停止，continue、break、return无效
for...of 语法简洁、接口统一、可以配合continue break return 使用
 */
console.log('============遍历比较=============');
let obj2 = {
  [Symbol('city')]: '杭州',
  price: 38789
};
Object.defineProperty(obj2, 'age', {
  value: 900,
  enumerable: true
});

