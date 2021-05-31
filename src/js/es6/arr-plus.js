/*
1.扩展运算符
2.Array.from()
3.Array.of()
4.数组实例的 copyWithin()
5.数组实例的 find() 和 findIndex()
6.数组实例的 fill()
7.数组实例的 entries()，keys() 和 values()
8.数组实例的 includes()
9.数组实例的 flat()，flatMap()
10.数组的空位
11.Array.prototype.sort() 的排序稳定性
 */
/*
1.扩展运算符
将一个数组转为逗号隔开的参数，展开数组
 */
console.log(1, 2, ...[2, 3, 4, 5], 6, 7);
console.log(1, 2, 3, 4, 5);

//1.1替代函数的apply方法
/*
apply() 接收数组形式的参数

 */
function f(x, y, z) {
  console.log(x, y, z);
}

f.apply(null, [1, 2, 3]);
f(...[1, 2, 3]);
//1.2计算最大值
console.log(Math.max(...[1, 2, 3, 4]));
const arr = [1, 2, 3];
const arr2 = [4, 5, 6];
//1.3数组的push函数
arr.push(...arr2);
console.log(arr);
//1.5复制数组
//es5 用concat方法拼接两个数组并返回一个新的数组
const arr3 = arr.concat();
//es6 使用扩展运算符
const arr4 = [...arr];
const [...arr5] = arr;
//1.6 数组合并
console.log([...arr, ...arr3, ...arr5]);
console.log(arr.concat(arr3, arr5));
//1.7 与解构赋值结合
const [a, ...b] = arr;
console.log(a);
console.log(b);
//1.8 将字符串转为数组
//凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写
const att6 = [...'123'];
console.log(att6 instanceof Array);
//1.9 任何定义了Iterator接口的对象都可以用扩展运算符转为真正的数组
//扩展运算符内部调用的是数据结构的 Iterator 接口

/*
2.Array.from()
将类似数组的对象（带length属性而且其他属性名为0,1,...的对象），可遍历的对象转为数组
 */
const arrayLikeObj = {
  0: '论持久战',
  1: '伟大抗日战争的一周年纪念,七...',
  length: 2
};

console.log(Array.from(arrayLikeObj));
/*
3.Array.of() 将一组值转为数组
解决Array构造函数参数数量不同的行为不一致问题
 */
console.log(Array.of(1, 2, 3, 4));


/*
4.数组实例的 copyWithin(target,start=0,end=arr.length())
类似java的System.arrayCopyOf()
target为正则正序，从0开始；为负则倒序，从-1开始
 */
let arr6 = [1, 2, 3, 4, 5];
console.log(arr6.copyWithin(-3, 3));
console.log(arr6);

/*
5.数组实例的 find() 和 findIndex()
参数为一个回调函数，回调函数可以接收3个参数：value index arr
 */
let valueGT2 = [1, 2, 3, 4, 5].find(function (value, index, arr) {
  return value > 2;
});
console.log(valueGT2);

let indexGT4 = [1, 2, 3, 4, 5].findIndex(function (value, index, obj) {
  return value > 4;
});
console.log(indexGT4);

/*
6.数组实例的 fill()
fill是浅拷贝，拷贝完后修改引用对象仍会改变生成的数组
 */
const arr7 = new Array(10);
console.log(arr7.fill(0));

const arr8 = new Array(2);
const obj = {
  title: '论持久战',
  author: '毛泽东',
};
arr8.fill(obj);
console.log(arr8);
obj.author = 'Maozedong';
console.log(arr8);

/*
7.数组实例的 entries()，keys() 和 values()
 */
console.log('===========keys============');
for (const key of [1, 2].keys()) {
  console.log(key);
}

console.log('===========values============');
for (const value of [1, 2, 3].values()) {
  console.log(value);
}

console.log('===========keyValue============');
for (const kv of [1, 2, 3].entries()) {
  console.log(kv);
}

/*
8.数组实例的 includes()
判断数组中是否包含指定元素
 */
console.log([1, 2, 34].includes(1));

/*
9.数组实例的 flat()，flatMap()
flat()默认拉平1层，可传入拉平层数，自动跳过空位，也可传入Infinity拉平无穷层
flatMap()只能展开一层，传入一个回调函数，
 */
console.log([1, 2, 3, [1, 2, 3, [1, 2, 3]]].flat(2));
console.log([1, 2, 3].flatMap(ele => ele * 2));

/*
10.数组的空位
给数组一个初始容量，但是没有塞入数据时，数组中存储的是一个空位
会将空位转为undefined的方法：
Array.from(), ...,
遍历时忽略空位的方法：for...of forEach() filter() reduce() every() some()
遍历时不忽略空位的方法：copyWithin() entries() keys() values() find() findIndex()
尽量避免空位
 */
const arr9 = new Array(3);
console.log(arr9);
//es6做了统一，通过Array.from()创建的数组，空位用undefined填充
console.log(Array.from([0, , 1]));

/*
11.Array.prototype.sort() 的排序稳定性
 */
const arr10 = [
  'peach',
  'straw',
  'apple',
  'spork'
];
console.log(arr10.sort((a, b) => a[0] <= b[0] ? -1 : 1));
