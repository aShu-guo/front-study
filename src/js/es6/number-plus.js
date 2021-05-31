//数值扩展
//检查传入的参数是否为NaN
console.log(Number.isNaN(NaN));
console.log(Number.isNaN('NaN'));
//传统全局方法，先将传入的参数转为number类型，再判断是否为NaN
console.log(isNaN((NaN)));
console.log(isNaN('NaN'));
//数值存储为64位双精度格式，数值精度最多可达53个二进制位（1个隐藏位，52个有效位）
//十进制位超出小数点后16位会出现误判，原因是转成二进制位时，超出了53位，多余的位置被丢弃
console.log(Number.isInteger(3.0000000000000002));
//幂次等号 右结合
console.log(2 ** 3 ** 2);
console.log(2 ** (3 ** 2));
/*
JavaScript 所有数字都存储为双精度64位浮点数，这给数值的表示带来了两大限制。
一是精度超出53个二进制位无法精确表示
二是 >=2**1024 的值会返回Infinity
 */
//ES2020引入第八种数据类型BigInt，为了与number区分，需要在后面添加n，而且不能与number一起运算
const a = 123123123n;
console.log(a);
console.log(2 ** 1023);
