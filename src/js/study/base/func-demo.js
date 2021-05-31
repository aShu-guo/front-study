//function命令
function print(str) {
  console.log(str);
}

//function函数表达式
var printFunc = function print2(str) {
  console.log(str);
};
printFunc('helloworld');
print('helloworld');
//Function构造函数
//格式：new Function(args,args,...,func body)
var add = new Function(
  'x',
  'y',
  'console.log(x+y)'
);
add(1, 2);

//函数名提升，同名函数后面的会覆盖前面的，前一次的声明无效
function f() {
  console.log(1);
}

f();

function f() {
  console.log(2);
}

f();

//递归
function fib(num) {
  if (num === 0) {
    return 0;
  }
  if (num === 1) {
    return 1;
  }
  return fib(num - 2) + fib(num - 1);
}

printFunc(fib(6));

//在js中，任何可以使用值的地方都可以使用function
function addNum(x, y) {
  return x + y;
}

var operation = addNum;

function operate(operate) {
  return operate;
}

var b = operate(operation(1, 2));
print(b);
//函数名提升
console.log('=================multi=============');
var result = multi(2, 3);
print(result);

function multi(x, y) {
  //x乘以y
  return x * y;
}

//函数的一些是属性和方法
//name属性 返回函数名
print(multi.name);
//length 返回函数参数个数
print(multi.length);
//toString()返回方法的源码，包括注释；如果是native函数，返回[native code]
print(multi.toString());
print(Math.sqrt.toString());

//函数作用域：全局作用域 局部作用域
//如果在函数内部var声明一个变量，这个变量会提升到函数body的头部
print('=================abc===========');

function abs(x) {
  print(c);
  if (x < 0) {
    var c = 12;
    x = -x;
  }
  return x;
}

print(abs(-12));

//函数的作用域与变量一样，是声明时所在的作用域

function check(x, y, z) {

}

check(undefined, null, printFunc);
//如果参数是原始类型，传参为值传递，函数体内对参数修改无影响；
// 如果参数是复合类型，传参为引用传递（地址传递），在函数体内对参数修改有影响

print('===========同名参数==============');

//同名参数去最后一个值
function position(a, a) {
  print(a);
}

position(1, 2);

//如果想取第一个值，需要使用arguments对象
function position2(a, a) {
  print(arguments[0]);
}

position2(1, 2);

//arguments包含函数运行时的参数，也可在运行时修改参数值
//参数数量不定
print('============参数数量不定==========');

function argsNum(a) {
  print(arguments[0]);
  print(arguments[1]);
  print(arguments[2]);
}

argsNum(1, 2, 3,);

//正常模式下，运行时修改参数值
print('============正常模式=========');

function argsNum2(x, y) {
  arguments[0] = 1;
  arguments[1] = 2;
  return x + y;
}

print(argsNum2(3, 4));
//严格模式下，arguments修改参数值失效
print('============use strict=========');

function argsNum3(x, y) {
  'use strict'
  arguments[0] = 1;
  arguments[1] = 2;
  return x + y;
}

print(argsNum3(3, 4));

//!!!!重点：闭包 记录诞生时的环境，对属性封装
function incr(start) {
  return function () {
    return start++;
  }
}

var inc = incr(5);
print(inc());
print(inc());

//立即调用的函数表达式
var sayHelloWorld = function () {
  console.log('hello');
}();

//立即调用的表达式写法--用于声明式表达式
//(function (args) {} (args))
//(funtion (args) {})(args)


//eval()传入的必须是合格的jscode，否则报错
eval('print(123)');
// eval('3x');
