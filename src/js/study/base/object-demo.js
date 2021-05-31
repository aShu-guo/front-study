var obj = {
  foo: 'hello',
  bar: 'world'
};
console.log(obj);
//属性是可以动态创建的，不必在对象声明时指定
var o1 = {};
var o2 = {bar: 'hello'};
o1.foo = o2;
console.log(o1.foo.bar);
//返回指定对象的所有属性
console.log(Object.keys(o1));
//删除对象的属性
delete o1.foo;
console.log(Object.keys(o1));
//删除对象的属性，不能删除继承的属性
console.log(o2.toString());
delete o2.toString;
console.log(o2.toString());
//in 判断某个属性是否在对象中，包括继承来的属性
console.log('===============in==============');
console.log('foo' in o2);
console.log('bar' in o2);
console.log('toString' in o2);
//hasOwnProperty() 判断是否为自己的属性
console.log('===============hasOwnProperty==============');
console.log(o2.hasOwnProperty('toString'));
console.log(o2.hasOwnProperty('bar'));
//遍历对象可遍历的属性，自动跳过不可遍历的属性
for (var key in o2) {
  console.log(o2[key]);
}
//with 为多赋值操作提供方便；在with块中必须是已经存在的属性，否则会创建一个全局变量
//o2中存在bar但是不存在foo
//不建议使用with块：不能确定with块中赋值的属性是否已经存在，拖慢速度
with (o2) {
  bar = 'blablabla';
  foo = 'helloworld';
}
console.log(o2.bar);
console.log(foo);


//标准库
//1.Object本身的方法和Object实例的方法
console.log('===============Object标准库================');
Object.prototype.print = function (obj) {
  console.log(obj);
}
//Object()函数，如果传入的参数是一个obj，返回这个对象自身；如果传入的是原始类型，返回原始类型的包装对象
console.log(Object(true));

var obj = {}
console.log(Object(obj));

//判断传入的值是否为对象
function isObj(obj) {
  return obj === Object(obj);
}

//构造方法 new Object() 新生成一个对象

//属性描述对象attributes object
var attrObj = {
  'name': 'guochengli',
  'age': 23,
}
// {
//   value: 'guochengli',//属性值
//   writable: true,//是否可写（改变）
//   enumerable: true,//是否可以遍历
//   configurable: true//是否可配置（删除）
// }
//getOwnPropertyDescriptor() 用于对象自身的属性，不可用于继承的属性
console.log(Object.getOwnPropertyDescriptor(attrObj, 'name'));
//getOwnPropertyNames()获取对象所有属性名，包括可遍历和不可遍历的属性名
console.log(Object.getOwnPropertyNames(attrObj));
//keys()只返回可遍历的属性名
console.log(Object.keys(attrObj));
//通过属性描述对象添加或修改一个属性
Object.defineProperty(attrObj, 'sex', {
  value: 'female',
  writable: false,
  configurable: false,
  enumerable: true
});
console.log(attrObj);
//如果配置不可修改，那么便不能删除
delete attrObj.sex;
console.log(attrObj);
//Object.prototype.propertyIsEnumerable() 判断一个对象的属性是否可遍历
console.log(Object.prototype.propertyIsEnumerable(attrObj.sex));
// =============存取器accessor=============================
//存取器accessor，可以实现许多高级特性，比如定制属性的读取和赋值行为。
// Object.defineProperty(attrObj, 'age', {})
// console.log(attrObj.age);
//属性的拷贝
//方法1：会对继承或自定的属性迭代
var extend = function (to, from) {
  for (var property in to) {
    to[property] = from[property];
  }
}
//方法2：
var extend2 = function (to, from) {
  for (var property in from) {
    if (from.hasOwnProperty(property)) {
      Object.defineProperty(to, property, Object.getOwnPropertyDescriptor(from, property));
    }
  }
}

var to = {
  'color': 'red'
}
var from = {
  'field': 'createtime',
  'sort': 'desc'
}
extend2(to, from);
console.log(to);

//冻结对象状态，防止对象被改变
//Object.preventExtensions > Object.seal > Object.freeze
//1.Object.preventExtensions()无法添加新属性，但可删除，可修改值
//如果添加新属性，抛出错误：TypeError: Cannot define property name, object is not extensible
var notExtensionObj = {
  'age': 23
};
Object.preventExtensions(notExtensionObj);
// Object.defineProperty(notExtensionObj,'name',{
//   value:'guochengli',
// })
//检查对象是否可扩展
// delete notExtensionObj.age;
console.log(Object.isExtensible(notExtensionObj));
//2.Object.seal() 不可添加or删除属性，但可修改值 实质是将属性描述对象的configurable修改为false
var sealObj = {
  'name': 'guochengli'
}
//修改之前的属性描述对象
console.log(Object.getOwnPropertyDescriptor(sealObj, 'name'));
Object.seal(sealObj);
//修改之后的属性描述对象
console.log(Object.getOwnPropertyDescriptor(sealObj, 'name'));
//删除失效
delete sealObj.name;

console.log(sealObj);
//判断对象是否是封闭的seal
console.log(Object.isSealed(sealObj));
// 3.Object.freeze() 对象不能添加、修改属性，也不能修改属性值
var freezeObj = {
  'name': 'guochengli'
}
Object.freeze(freezeObj);
freezeObj.name = 'tom';
console.log(freezeObj);
//判断对象是否被冻结了
console.log(Object.isFrozen(freezeObj));

//这三种方法有局限性，可以通过改变原型对象为对象增加属性，而且对象还可以读到
var freezeObj2 = {
  'name': 'guochengli'
}
Object.freeze(freezeObj2);
var protoFreezeObje2 = Object.getPrototypeOf(freezeObj2);
protoFreezeObje2.age = '23';
console.log(freezeObj2.age);
//解决方法：冻结原型对象


//原始类型的包装类：Boolean Number String
//原始类型与实例对象的自动转换，JavaScript 引擎会自动将原始类型的值转为包装对象实例，并在使用后立刻销毁实例
console.log('123'.length);

//Date
var date = new Date();
console.log(date.toTimeString())

//RegExp对象 提供正则表达式的功能

//JSON对象 JSON.stringify() JSON.parse()
//JSON对象会忽略对象不可遍历的属性 console.log()也会忽略不可遍历的属性
console.log('=============notEnumerableObj===========');
var notEnumerableObj = {
  'age': 23
}
console.log(notEnumerableObj);
Object.defineProperties(notEnumerableObj, {
  'name': {
    value: 'guochengli',
    enumerable: true,
  },
  'sex': {
    value: 'male',
    enumerable: false
  }
})
console.log(notEnumerableObj);
console.log(JSON.stringify(notEnumerableObj));
//传入第二个参数 只格式化选中的属性名
var selectedProperties = ['name'];
console.log(JSON.stringify(notEnumerableObj, selectedProperties))
//传入第三个参数，并且将每个属性前面添加指定的前缀
console.log(JSON.stringify(notEnumerableObj, null, '\t'));

//JSON.stringify()方法本质是调用对象的toJSON()方法
var waitJsonObj = {
  name: 'guochengli',
  age: 23,
  sex: 'male',
  toJSON: function () {
    return this.name + ',今年' + this.age + ',性别:' + this.sex
  }
}
console.log(JSON.stringify(waitJsonObj));

//JSON.parse() 将JSON字符串转换为对应的值，如果传入非JSON格式的数据，抛出异常
try {
  var parseJson = JSON('string');
  console.log(parseJson);
} catch (e) {
  // console.log(e.stack);
}

//OOP
//Java是基于类class的，Js是基于构造函数和原型链(prototype)的

//js的new原理
/*
1.首先构造一个空对象
2.空对象的prototype指向构造函数的prototype属性
3.将空对象赋值给this
4.执行构造方法中的代码
 */

//this关键字 可以动态切换
var thisObj = {
  foo: function () {
    console.log(this);
  }
}

var printProperty = function (obj) {
  console.log(obj);
}

var needPrintObj = {
  name: 'guochengli',
  print: printProperty(this)
}
console.log('================this================');
var name = 'gcl';
function a() {
  console.log(this.name);
}
a();

var user={
  name:'xiaoming',
  a:a
}
user.a();

var f = function () {
  console.log(this.x);
}

//Object的一些方
Object.getPrototypeOf()
Object.setPrototypeOf()



