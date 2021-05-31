//参数变量时默认声明的，在函数体内不能用let const再次声明
// function fun(a) {
//   let a = 1;
// }
//output:SyntaxError: Identifier 'a' has already been declared

function fetch(url, {body = '', method = 'GET', headers = {}} = {}) {
  console.log(method);
}

//如果指定参数的默认值，则调用函数时参数可以省略；反之则不可省略
fetch('http://www.baidu.com');

//练习
//给属性默认值
/*
给解构参数默认值
 */
function move({x = 1, y = 2} = {}) {
  return [x, y];
}

var obj = {};
console.log(move(obj));
console.log(move.length);


//给参数一个默认值
/*
没有给解构参数默认值
 */
function move2({x, y} = {x: 1, y: 1}) {
  return [x, y];
}

console.log(move2({}));
console.log(move2.length);

let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f();
