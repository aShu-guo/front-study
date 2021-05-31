//同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费
function Cat(name, color) {
  this.name = name;
  this.color = color;
  this.meow = function () {
    console.log(this.name + '的的颜色是' + this.color);
  };
}

//一旦在原型上添加了属性或者方法，会立刻作用在所有对象上
Cat.prototype.variety = 'maine cat';
console.log('===========redCat==========');
var redCat = new Cat('huahua', 'red');
console.log(redCat.name);
redCat.meow();
//如果对象中没有这个属性，那么会去原型中找这个属性；反之则会去对象中找。
console.log(redCat.variety);

console.log('===========blueCat==========');
var blueCat = new Cat('ruru', 'blue');
console.log(blueCat.name);
blueCat.meow();
console.log(blueCat.variety);

//JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。
//规定每个函数都有一个prototype属性，指向一个对象
console.log(Cat.prototype);

//原型对象的作用，就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因
Cat.prototype.run = function () {
  console.log(this.name + ' is running');
};
redCat.run();

//原型链
//调用对象属性时，先去对象中找；对象中找不到，去原型中找；原型中没有，则往上追溯到Object.prototype
//原型对象的constructor属性，默认指向对象的构造方法
function P() {

}

console.log(P.prototype.constructor === P);
var p = new P();

//constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。
console.log(p.constructor === P);

//修改原型对象，需要同步修改constructor属性；否则引用会出现错误
console.log('===========modify=============');

function Q() {

}

console.log(Q.prototype.constructor === Q);
Q.prototype = {
  say: function () {
    console.log('helloworld');
  }
};
console.log(Q.prototype.constructor === Q);
console.log(Q.prototype.constructor === Object);
//可以这样写
Q.prototype = {
  constructor: Object,
  say: function () {
    console.log('helloworld');
  }
};

//instanceOf 判断对象是否为构造函数的实例对象
function M() {

}

console.log('===========instanceof===========');
var m = new M();
//两者等价，检查整个原型链
console.log(m instanceof M);
console.log(m instanceof Object);
console.log(M.prototype.isPrototypeOf(m));
//所有对象都是Object的实例，除了null
console.log('null in not instance of object');
console.log(null instanceof Object);

//利用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题。
function Fubar(foo, bar) {
  if (this instanceof Fubar) {
    //有new关键字走这里
    this._foo = foo;
    this._bar = bar;
  } else {
    //无new关键字走这里
    return new Fubar(foo, bar);
  }
}

var fubar = Fubar(1, 2);
console.log(fubar);

//构造方法的继承:让一个构造函数继承另一个构造函数
//第一种方法：分为两个步骤（在子构造方法中调用父构造方法，让子原型对象指向父原型对象）
function Sub() {
  Super.call(this);
}

function Super() {

}

Sub.prototype = Object.create(Super);
Sub.prototype.constructor = Sub;
//第二种：让子构造方法原型对象等于父构造方法的一个实例。但是这样会继承父亲的实例方法

//多重继承 Mixin(混入)
function M1() {
  this.hello = 'hello';
}

function M2() {
  this.workd = 'world';
}

function S() {
  M1.call(this);
  M2.call(this);
}

//继承M1
S.prototype = Object.create(M1.prototype);
//继承链上加入M2
Object.assign(S.prototype, M2.prototype);
//指定构造方法
S.prototype.constructor = S;
var s = new S();
console.log(s.hello);
console.log(s.workd);

//封装私有变量：构造函数的写法
function StringBuilder() {
  var buffer = [];

  this.add = function (str) {
    buffer.push(str);
  };

  this.toString = function () {
    return buffer.join('');
  };
}

//将私有变量封装在构造函数中，导致构造函数与实例对象是一体的，总是存在于内存之中，无法在使用完成后清除
//构造函数有双重作用，既用来塑造实例对象，又用来保存实例对象的数据，违背了构造函数与实例对象在数据上相分离的原则
//耗内存
var strBuilder = new StringBuilder();

//封装私有变量：立即执行函数的写法
var module1 = (
  function () {
    var _count = 0;
    var m1 = function () {

    };
    var m2 = function () {

    };
    return {
      m1: m1,
      m2: m2
    };
  }
)();

//模块的放大模式：为module2
// var module2 = (function (mod) {
//   mod.method = function () {
//
//   };
// })(module2);

//独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。
// var module2 = (function ($, mod) {
//
// })(jQuery,YAHOO);

console.log('============extends 6种方法============');
console.log('============call()============');

function Parent() {
  this.name = 'parent1';
  this.status = [1, 2, 3, 4];
  this.obj = {
    say: 'helloworld',
  };
  this.fun = function () {
    console.log('parent2');
  };
}

Parent.prototype.fun2 = function () {
  console.log('parent3');
};

function Son() {
  Parent.call(this);
}

//通过call方法只能访问父类实例的方法和属性，但是无法访问父类原型对象上的方法和属性
var son = new Son();
son.fun();
// son.fun2();
console.log('============借助原型链============');

function Son2() {

}

//为什么子类原型对象指向父类实例，就可以访问父类原型对象上的方法
Son2.prototype = new Parent();
var son2 = new Son2();
console.log(son2.name);
son2.fun();
son2.fun2();

var son3 = new Son2();
console.log(son3.status);
son2.status.push(5);
console.log(son3.status);
// console.log(son2.name);

//如果子类其中一个实例修改了父类引用数据类型的属性，其他子类实例也会同步改变
console.log(son3.obj);
son2.obj.age = 23;
console.log(son3.obj);

//组合call方法和原型对象
//但是多执行了一次父类的构造方法
console.log('============组合call方法和原型对象============');

function Son4() {
  Parent.call(this);
}

Son4.prototype = new Parent();
var son4 = new Son4();
console.log(son4.status);

var son5 = new Son4();
console.log(son5.status);
son4.status.push(123);
console.log(son5.status);

console.log('============组合继承优化============');

//但是实例化子类的构造方法是父类的，显然不对
function Son5() {
  Parent.call(this);
}

Son5.prototype = Parent.prototype;
var son6 = new Son5();
son6.fun();
son6.fun2();
console.log(son6.__proto__.constructor);

console.log(Object.create(Parent.prototype));

console.log('============寄生组合继承============');

function Son6() {
  Parent.call(this);
}

Son6.prototype = Object.create(Parent.prototype);
//等价于下面代码
// Son6.prototype.__proto__ = Parent.prototype;
Son6.prototype.constructor = Son6;

function Son7() {

}

var son7 = new Son7();
console.log(Son7.__proto__)
console.log(Function.prototype)

console.log(Son7.prototype.__proto__)
console.log(Object.prototype)
