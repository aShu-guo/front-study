/*
1.简介
2.静态方法
3.实例属性的新写法
4.静态属性
5.私有方法和私有属性
6.new.target 属性
 */

/*
1.简介
在js中生成实例对象的方法是通过构造函数
 */
function Apple(weight, price) {
  this.weight = weight;
  this.price = price;
}

const apple = new Apple(1, 8.76);
console.log(apple);

//
/*
1.1 在es6中提供了class语法糖，通过typeof返回的是function
如果没有constructor函数，则默认添加一个无参constructor函数，new对象时调用的就是该方法；
class内部定义的属性都是不可枚举的，而且都属于原型对象
 */
class Banana {
  constructor(weight, price) {
    this.weight = weight;
    this.price = price;
  }

  toString() {

  }
}

const banana = new Banana(1, 3.00);
console.log(banana);
console.log(typeof Banana);
//实例调用的方法都是调用原型的方法，所以如果在原型对象上添加属性，所有实例都可访问
Banana.prototype.dance = function () {
  console.log('i am dancing');
};

banana.dance();
console.log(banana.hasOwnProperty('weight'));
console.log(banana.hasOwnProperty('price'));
//定义在class内部的属性没有指明this的都是原型对象的
console.log(banana.hasOwnProperty('toString'));
console.log(Banana.prototype.hasOwnProperty('toString'));

//1.2 取值函数（getter）和存值函数（setter）
//使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
class Student {
  constructor(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
  }

  get getAge() {
    return this.age;
  }

  set setAge(age) {
    this.age = age;
  }
}

const student = new Student('xiaohou', 24, 'female');
console.log(typeof student.getAge);

//1.3 Class表达式
const computer = class MacbookPro {
  constructor(price, type) {
    this.price = price;
    this.type = type;
  }

  show() {
    return this.type + ':' + this.price;
  }
};
const com = new computer(18000, 'mc2020');
console.log(com.show());

//立即执行类的实例
const vegetables = new class {
  constructor(name) {
    this.name = name;
  }
}('西红柿');
console.log(vegetables);

//1.4 注意事项：class不存在提升
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  printName(name = 'there') {
    this.print(`hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const {printName} = logger;
printName();

/*
2.静态方法
加上static方法变成静态方法
静态方法可以被子类继承
 */
class Plant {

  constructor(name) {
    this.name = name;
  }

  static say() {
    console.log('我是一个静态方法！只能被Plant调用');
  }
}

class CherryTree extends Plant {
  constructor(name) {
    this.name = name;
  }

}

// CherryTree.prototype = new Plant();

CherryTree.say();

/*
3.实例属性的新写法
实例属性不仅可以写在constructor方法中，也可写在class顶部
优点是实例属性一眼就可以看出来是哪些
 */
class Counter {
  count = 0;

  get value() {
    return this.count;
  }

  increment() {
    this.count++;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.value);

/*
4.静态属性
 */

//目前只有这种写法为class绑定静态属性
class Foo {

}

Foo.name = '我是静态属性';
console.log(Foo.name);

//一个提案：在静态属性前添加static
class Foo2 {
  static prop = '我是静态属性';
}

console.log(Foo2.prop);

/*
5.私有方法和私有属性
 */

//5.1 在名称上区分
class Target {
  foo(arg) {
    console.log('public method')
  }

  _foo(arg) {
    console.log('private method')
  }

//5.2 将私有方法移出class内部
  publicMethod(args) {
    privateMethod.call(this, args)
  }


}

function privateMethod(args) {

}

//私有属性的提案 用符号'#'标注属性或方法
console.log('==========私有属性的提案==========');

class Obj {
  #count = 1;

  fun() {
    console.log(this.#count);
    this.#fun2();
  }

  #fun2() {
    console.log('我是私有方法');
  }
}

const obj = new Obj();
obj.fun();

/*
6.new.target 属性
用于检查没有使用new生成对象操作
new.target指向调用的那个构造方法
子类继承父类，new.target返回子类
class内部调用new.target返回当前class
 */
class Handler {
  constructor(name) {
    if (new.target !== undefined) {
      this.name = name;
    } else {
      throw new Error('必须使用 new 命令生成实例');
    }
  }
}


const handler = new Handler('ParamsHandler');



