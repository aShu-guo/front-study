// 这是一个注释
{
  var a = 1;
}
console.log(a);

a = 2;
if (a === 1) {
  console.log(a);
} else {
  console.log('跳出了if语句');
}

// 为什么优先采用“严格相等运算符”（===），而不是“相等运算符”（==）
a = 1;
if (a) {
  console.log('我进入了if语句');
}

//switch中执行的是严格相等运算符
switch (a) {
  case true:
    console.log('a发生了类型转换');
// eslint-disable-next-line no-fallthrough
  default:
    console.log('a没有发生类型转换');
}

console.log(a == true);
console.log(a === true);
//三元运算符 判断一个值是否为偶数
var isEven = a % 2 === 0;
console.log(isEven);

//if 初、条、递
// for (var b = 1; ; b++) {
//   console.log(b);
// }

//标签
top:
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (j === 1) {
        console.log('我跳出了所有循环');
        break top;
      }
    }
    console.log(i);
  }
//js的六种数据类型:（number string boolean）--原始类型值 null->0 undefined->NaN object--合成类型值
console.log(typeof (1));
console.log(typeof (1.2));
console.log(typeof ('123'));
console.log(typeof (true));
console.log(typeof (null));
console.log(typeof (undefined));

var un=undefined;
var un2=null;
console.log(un==un2);

console.log(0.3/0.1);
console.log(0.3-0.2);
console.log(0.2-0.1);

var c=parseFloat('ns');
console.log(c);

