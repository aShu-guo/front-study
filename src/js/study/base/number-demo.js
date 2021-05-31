//JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此
var a = 1;
var b = 1.0;
console.log(a == b);
console.log(a === b);
//由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心
console.log((0.3 - 0.2) === (0.2 - 0.1));
//两种情况自动转换为科学计数法：
//小数点前的数字大于等于21位 or 小数点后0大于等于6位
console.log(1234567890123456789012);
console.log(0.0000005);
//进制：0o或者0O开始的数值为八进制；0x或者0X开始的数值为16进制；0b 0B为二进制

//特殊数值
//1.+0 -0
console.log('比较+0和-0');
console.log(+0 === -0);
console.log(+0 == -0);
//2.NaN not a number
//转为boolean是为false；不等于任何值，包括自身；与任何数的运算得到的都是NaN
console.log('NaN:');
console.log(5 - 'x');
//3.Infinity +∞ -∞
//Infinity与NaN比较总是返回false
console.log(-Infinity < NaN);
console.log(+Infinity < NaN);

//一些全局方法
//1.parseInt(); 只有两种结果：数值orNaN
//依次按每个字符转换，如果遇到不能转换的字符，则输出已经转换到的数值
console.log(parseInt('1.23'));
console.log(parseInt('1'));
console.log(parseInt('1123**123'));//output:1123
//指定进制，按二进制解析10000
console.log(parseInt('10000', 2));
console.log(parseInt(''));//转换空字符串为NaN

//2.parseFloat();
console.log('========================parseFloat()===========');
console.log(parseFloat('1.23'));
console.log(parseFloat('1'));
console.log(parseFloat('1123**123'));//output:1123
console.log(parseFloat(''));//转换空字符串为NaN
//3.isNaN(); 判断传入的值是否为NaN
//true的情况：字符串 NaN
//如果传入的是Number类型，判断是否为NaN；如果传入的是其他类型，会先转成数值
console.log('=====================isNaN()================');
console.log(isNaN(false));
console.log(isNaN('helloworld'));//'helloworld'先转成数值为isNaN，所以输出true
//自定义判断isNaN func (利用NaN不等于自身)
//true-是isNaN false-是NaN
function myIsNaN(value) {
  return value !== value;
}
//4.isFinite(); 判断传入的值是否为正常的数值
//除了Infinity、-Infinity、NaN和undefined这几个值会返回false，isFinite对于其他的数值都会返回true。
console.log('=============isFinite()==========');
console.log(isFinite(NaN));
console.log(isFinite(undefined));

