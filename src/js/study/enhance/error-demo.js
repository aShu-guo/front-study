//错误处理机制
//实例化Error时需要指定msg
//两个属性：name（错误名） stack（错误堆栈信息）
var err = new Error('error');
console.log(err);
console.log(err.name);
console.log(err.stack);
console.log('==================派生对象============');
//Error的6个派生对象 SRRTUE
//1.SyntaxError 语法错误
// console.log(abc);

//2.ReferenceError 引用一个未声明的变量

//3.RangeError 越界异常

//4.TypeError 变量或参数不是预期类型时发生错误；例如：调用不存在的方法

//5.URIError URI相关函数参数不正确时抛出

//6.EvalError eval()没被正确执行时，该错误不再使用，目的时向前兼容

//自定义异常
function MyError(msg) {
  this.name = 'userError';
  this.msg = msg;
}
MyError.prototype=new Error();
MyError.prototype.constructor=MyError;
var myError=new MyError('自定义错误');
console.log(myError);
