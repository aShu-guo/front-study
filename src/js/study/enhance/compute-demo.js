//+,-,*,/,%,**,++,--
var print = function (str) {
  console.log(str);
};
//从左向右计算，等价于(1+2+3)+'4'+5+6 output:6456
//除了加法之外，其余运算都是先转为数值，在运算
print(1 + 2 + 3 + '4' + 5 + 6);

//严格相等运算符和相等运算符：=== ==
//===比较的是值，如果值不相等返回false；==是先将两比较的值转换为同意类型
//再调用====比较两值是否相等
print(1 == '1');
print(1 === '1');

//取反运算：!
//undefined,null,0,NaN,'',false这6个值取反为true外，其他取反都为false
print('===============return true============');
print(!undefined);
print(!null);
print(!'');
print(!false);
print(!0);
print(!NaN);
//void 运算符：执行括号内的js代码，返回void
void (console.log('helloworld'));




