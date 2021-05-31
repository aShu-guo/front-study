/*
1.简介
2.Object.getPrototypeOf()
3.super 关键字
4.类的 prototype 属性和__proto__属性
5.原生构造函数的继承
6.Mixin 模式的实现
 */

/*
1.简介
es5的继承：首先new子类实例，后添加将父类方法添加到子类实例上 Parent.apply(this)
es6的继承：首先实例化父类并加到this上（必须调用super的原因），后在用子类的构造方法修改this
 */
class BaseDto {
  constructor(id, timeRange) {
    this.id = id;
    this.timeRange = timeRange;
    console.log('baseDto instance');
  }
}

class DataCenterDto extends BaseDto {
  constructor(id, timeRange, field, sort) {
    //子类实例化时，需要调用super方法实例化父类；this只能在super()方法后使用
    super(id, timeRange);//等价于    BaseDto.prototype.constructor.call(this);
    this.field = field;
    this.sort = sort;
  }
}

const dto = new DataCenterDto(1, '2020-2021', 'createtime', 'desc');
console.log(dto);

/*
2.Object.getPrototypeOf()
 */
console.log('============Object.getPrototypeOf()=========');
console.log(Object.getPrototypeOf(DataCenterDto) === BaseDto);

/*
3.super 关键字
super时指向父类的原型对象，所以定义在父类实例上的方法或属性是不能通过super调用的
 */
console.log(DataCenterDto.prototype);

//3.1 super()代表父类的构造方法，在子类构造方法中必须调用一次
//3.2 super在子类静态方法中调用时指向父类class，在子类普通方法中指向父类原型对象
//3.2 在子类方法中通过super调用父类方法时，this指向当前子类实例


class StaticParent {
  static staticFun() {
    console.log('父类静态方法');
  }

  fun() {
    console.log('原型方法');
  }
}

class StaticSon extends StaticParent {
  constructor() {
    super();
    super.fun();
  }

  static staticMethod() {
    super.staticFun();
  }

}

const staticSon = new StaticSon();

StaticParent.prototype.fun();

StaticSon.staticMethod();
/*
4.类的 prototype 属性和__proto__属性
es5每个对象都有__proto__属性，指向对应构造函数的prototype属性
es6中class存在__proto__,prototype属性，因此同时存在两条继承链


 */
console.log('============类的 prototype 属性和__proto__属性=========');

class Teacher {

}

class TeachersCollegeGraduate extends Teacher {

}

const teacher = new Teacher();
const gradute = new TeachersCollegeGraduate();

console.log(Object.getPrototypeOf(gradute) === TeachersCollegeGraduate.prototype);
//子类的__proto__属性总是指向父类
console.log(TeachersCollegeGraduate.__proto__ === Teacher);
console.log(Object.getPrototypeOf(TeachersCollegeGraduate) === Teacher);
//子类的prototype属性的__proto__属性指向父类的prototype属性
console.log(TeachersCollegeGraduate.prototype.__proto__ === Teacher.prototype);

//原因是类的继承是通过下面模式继承的
class ParentB {

}

class SonB {

}

Object.setPrototypeOf(SonB, ParentB);//内部是实现是设置SonB的__proto__属性
Object.setPrototypeOf(SonB.prototype, ParentB.prototype);

function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

/*
可以理解为：
作为一个对象，子类的原型是父类(__proto__属性)
作为一个方法，子类的原型对象是父类的原型对象(prototype属性)
 */
//子类原型的原型是父类的原型
console.log(gradute.__proto__.__proto__ === teacher.__proto__);

/*
5.原生构造函数的继承
Boolean()
Number()
String()
Array()
Date()
Function()
RegExp()
Error()
Object()
语言内置的构造函数，之前是不能继承的
在es6中是可以继承的
 */

/*
6.Mixin 模式的实现
将多个对象合成一个新对象
 */
function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

class DistributedEdit extends mix(Teacher, TeachersCollegeGraduate) {
  // ...
}

export let age = 24;
