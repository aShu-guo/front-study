//除了正常的运行模式，JavaScript 还有第二种运行模式：严格模式（strict mode）
//严格模式必须从代码一开始就生效。 单个函数也需要放在第一行


//严格模式下使用不规则的语法会报错，而正常模式下会默默失败，并不会报错
// 'abc'.length = 3;
//output:TypeError: Cannot assign to read only property 'length' of string 'abc'
var obj = {
  get v() {
    return 1;
  },
  set v(value) {

  }
};
obj.v = 2;
//总结：
/*
只读属性不可写
只设置了取值器的属性的get，没有设置set，并且对属性作赋值操作
对禁止添加属性的对象做了添加属性的操作
函数参数名不能重复
禁止使用八进制
全局变量必须显示声明var a=1
禁止this关键字指向全局对象
函数内部禁止使用fn.callee,fn.caller 意味这不能在函数内部得到调用栈
不能删除变量，除非删除描述对象configurable为true的属性
正常模式下，JavaScript 语言有两种变量作用域（scope）：全局作用域和函数作用域。严格模式创设了第三种作用域：eval作用域。
函数内部改变参数与arguments联系切断

 */
function assignUseStrict(a) {
  'use strict';
  a = 2;
  return [a, arguments[0]];
}

function assign(a) {
  a = 3;
  return [a, arguments[0]];
}

console.log(assignUseStrict(4));
console.log(assign(4));

