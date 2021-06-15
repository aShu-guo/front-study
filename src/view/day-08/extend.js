/*
call
组合继承：call+子类的原型指向父类的实例，但是父类要多实例化一次
寄生组合继承：call+子类原型指向父类原型，并将子类的构造方法指向子类
es6提供的extends，本质也是寄生组合继承
 */
function Parent() {
  this.id = '';
  this.updatetime = '';
  this.createtime = '';
  this.isdelete = 0;
  this.fun = function () {
    console.log('hello world')
  }
}

function Son() {
  Parent.call(this)

  this.repaymoney = 23;
}

Son.prototype = Parent.prototype;
Son.prototype.constructor = Son
var son = new Son();
son.isdelete = 1

console.log(son.constructor)





