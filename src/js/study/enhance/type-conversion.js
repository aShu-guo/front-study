//类型转换
function print(obj)  {
  console.log(obj);
}
//Number() Boolean() String()

//Number() 较parseInt()严格一些，遇到不能转换为数值的字符输出直接输出NaN，整体转换
//parseInt()遇到不能转换为数值的字符会输出可以转换的字符，逐个转换
print(Number('123a123'));
print(parseInt('123a123'));
var b = Boolean(false);
console.log(b);
print(Number.toString());

