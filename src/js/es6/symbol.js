/*
1.概述
2.Symbol.prototype.description
3.作为属性名的 Symbol
4.实例：消除魔术字符串
5.属性名的遍历
6.Symbol.for()，Symbol.keyFor()
7.实例：模块的 Singleton 模式
8.内置的 Symbol 值
 */
/*
1.概述
由于属性名是以字符串存储，所以容易造成冲突。引入Symbol提供一个独一无二的属性名，
防止属性名被覆盖或改写
 */
//声明
let s = Symbol();
console.log(s);
console.log(typeof (s));
/*
2.Symbol.prototype.description
也可接收一个字符串参数，作为symbol变量的描述
 */
let s2 = Symbol('helloworld');
console.log(s2);
//参数为对象时，对调用对象的toString方法之后生成一个Symbol值
const obj = {
  name: 'guochengli',
  age: 24,
  toString() {
    return this.name + ':' + this.age;
  }
};
console.log(obj.toString());
console.log(Symbol(obj));
//Symbol值不能与其他类型运算，但可以显式转为字符串
let str = String(Symbol('helloworld'));
console.log(str);

/*
3.作为属性名的 Symbol
声明时用[]
调用时用[]，不能打点调用Symbol作为属性名的属性
 */
let mySymbol = Symbol();
let obj2 = {name: 'guochenlgi'};
let age = 'age';
obj2[mySymbol] = 'hello';
obj2.symbol = mySymbol;
obj2[age] = 25;
console.log(obj2);
//调用属性名为Symbel类型的属性时需要用到中括号
console.log(obj2[mySymbol]);

/*
5.属性名的遍历
用Symbol值做属性名的属性，通过for...in, for...of循环时不会被遍历
也不会被Object.keys() Object.getOwnPropertyNames()、JSON.stringify()返回
但是提供了Object.getOwnPropertySymbols(obj3) 返回obj3的数组
 */
console.log('=============test for...of=========');
let symbolAttr = Symbol('title');
let obj3 = {
  [symbolAttr]: '论持久战',
  [Symbol('author')]: '毛泽东',
  publishingHouse: '中国人民出版社'
};
for (let ele2 of Object.keys(obj3)) {
  console.log(obj3[ele2]);
}
console.log(obj3[symbolAttr]);
console.log(obj3);
console.log(Object.getOwnPropertySymbols(obj3));

/*
6.Symbol.for()，Symbol.keyFor()
Symbol.for(desc)在全局中登记一个Symbol值
Symbol.keyFor(Symbol)在全局中返回一个指Symbol值的描述
 */

/*
Symbol.for() 与 Symbol()区别
Symbol.for()有登记机制
Symbol()没有登记机制
前者在生成Symbol值的时候首先判断全局环境中是否存在相同描述的Symbol值，如果没则生成一个新的Symbol值，反之则取旧值；
后者每次都是生成一个新的Symbol值
 */
console.log(Symbol.for('abc') === Symbol.for('abc'));
console.log(Symbol('abcd') === Symbol('abcd'));

//内置Symbol
// Symbol.hasInstance属性，使用instanceof判断对象类型时会调用这个方法
//通过自定义instanceof用于判断基本数据类型
class PriNumber {
  static [Symbol.hasInstance](foo) {
    return typeof (foo) === 'number';
  }
}

console.log(1 instanceof PriNumber);

// Symbol.species
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const a = new MyArray();
const b = a.map(ele => ele * 2);
const c = a.filter(ele => ele > 2);
console.log(b instanceof MyArray);
console.log(c instanceof MyArray);

