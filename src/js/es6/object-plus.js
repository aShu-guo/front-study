//对象的扩展
/*
2.属性名表达式
3.方法的 name 属性
4.属性的可枚举性和遍历
5.super 关键字
6.对象的扩展运算符
7.链判断运算符
8.Null 判断运算符
 */

/*
1.属性的简洁表示法
 */
function f(x, y) {
  return {x: x, y: y};
}

//省略掉属性名，参数名默认为属性名
function f2(x, y) {
  return {x, y};
}

let obj = f2(1, 2);
console.log(obj);

const o = {
  method: function () {

  }
};
//省略掉function
const o2 = {
  method() {

  }
};

const cart = {
  _wheels: 4,
  get wheels() {
    return this._wheels;
  },
  set wheels(s) {
    this._wheels = s;
  }
};
//打点调用时，实际调用get方法
console.log(cart.wheels);
//赋值时，实际调用set方法
cart.wheels = 5;
console.log(cart.wheels);

/*
2.属性名表达式
 */
//打点调用或用中括号
console.log(cart.wheels);
console.log(cart['wheels']);

/*
3.方法的 name 属性
 */
//返回方法名，如果时get or set方法，name属性在对应方法的属性描述对象上
console.log(cart.wheels.name);
console.log(Object.getOwnPropertyDescriptor(cart, 'wheels').get.name);

/*
4.属性的可枚举性和遍历
 */
console.log(Object.getOwnPropertyDescriptor(cart, 'wheels'));
/*
{
  get: [Function: get wheels],
  set: [Function: set wheels],
  enumerable: true,
  configurable: true
}
 */
/*
目前有4中操作会忽略enumerable为false的属性
for...in 只遍历对象自身和继承来的可枚举属性
Object.keys() 返回对象自身的可枚举属性的名称
JSON.stringify() 只json化对象的可枚举属性
Object.assign() 只拷贝对象的可枚举属性----es6新增
 */

/*
属性的遍历
对象自身的而且是可枚举的 对象自身的 继承来的 Symbol
for ... in 遍历对象和继承来的可枚举属性
Object.keys() 遍历对象自身的可枚举属性
Object.getOwnPropertyNames(obj) 遍历对象自身的所有属性
Object.getOwnPropertySymbols(obj) 遍历对象的所有Symbol属性
Reflect.ownKeys(obj) 返回对象自身的所有键名，
 */

/*
5.super 关键字 指向当前对象的原型对象
 */
//等价于 super.method()     Object.getPrototypeOf(obj).method()
const obj3 = {
  method() {
    console.log('helloworld');
  }
};
const obj4 = {
  method() {
    return super.method();
  }
};
console.log(obj3.method());
Object.setPrototypeOf(obj4, obj3);
console.log(obj4.method());

/*
6.对象的扩展运算符(...) 类似java的不定参数
 */
// 解构赋值
let {x, y, ...z} = {x: 1, y: 2, a: 3, b: 4};
console.log(z);

let obj5 = {
  b: {a: 4},
  x: 1,
};
let {...obj9} = obj5;
console.log(obj5);
console.log(obj9);
//如果解构赋值的后对象，修改了属性值（obj），也会影响之前对象的值
obj9.b.a = 5;
obj9.x = 2;
console.log(obj5);
console.log(obj9);

// 7.链判断运算符：?.
/*
多层取值，需要对每层都判断
const firstName = message.body.user.firstName;
const firstname = (message && message.body && message.body.user && message.body.user.firstName) || 'default';
 */

/*
使用链判断运算符简化流程：如果是继续往下走，反之则返回undefined
const firstName = message?.body?.user?.firstName || 'default';
 */

/*
应用
obj?.attr
obj?.[attr]
func?.()
 */

//8.Null 判断运算符
/*
通过运算符:|| 给默认值时
null undefined false 0 都会给默认值
引入判断运算符：??
null undefined才才会给默认值

如果有多个运算符时，需要用括号包住，否则会报错
console.log(cart ?? 1 === 1 && 2 === 2);
output:SyntaxError: missing ) after argument list
 */

/*
对象新增的一些方法
1.Object.is()
2.Object.assign()
3.Object.getOwnPropertyDescriptors()
4.__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
5.Object.keys()，Object.values()，Object.entries()
6.Object.fromEntries()
 */
/*
1.Object.is()
在js中只有两种相等运算符：==  ====
前者比较时会转换数据类型，后者比较时NaN不等于自身，+0不等于-0
所以缺乏一种运算在所有环境中，只要值相等就应该相等
Object.is(NaN,NaN) 返回true
Object.is(+0,-0) 返回false
 */

/*
2.Object.assign() 浅copy，copy的是对象的引用并且会替换同名属性
用于合并对象可枚举属性
Object.assign(target,...source);
将源对象的可枚举属性复制到target对象上
 */

/*
3.Object.getOwnPropertyDescriptors()
Object.getOwnPropertyDescriptors()的一种实现
 */
function getOwnPropertyDescriptors(obj) {
  const result = {};
  for (const attr of Reflect.ownKeys(obj)) {
    result[attr] = Object.getOwnPropertyDescriptor(obj, attr);
  }
  return result;
}

/*
4.__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
对象的__proto__属性等价于Object.getPrototypeOf()
返回原型对象
 */
console.log(Object.getPrototypeOf(cart) === cart.__proto__);



