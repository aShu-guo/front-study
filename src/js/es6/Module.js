/*
1.概述
2.严格模式
3.export 命令
4.import 命令
5.模块的整体加载
6.export default 命令
7.export 与 import 的复合写法
8.模块的继承
9.跨模块常量
10.import()
 */

/*
1.概述
由于js缺少模块的导入和导出，虽然可以通过commonjs-require()函数和AMD加载模块
但是两者都是在运行时加载，无法进行静态优化
所以在es6中引入export import进行静态加载

 */

/*
3.export 命令
对外暴露，需要用{}包住
 */
//变量导出的两种方式
export let name = 'gcl';
let age = 24;
export {age};

export {
  //也可通过as设置别名
  age as showTime,
};

//方法导出的两种方式
export function sayHelloWorld() {
  console.log('helloworld');
}

function sayHello() {

}

export {sayHello};

//commonjs加载的模块中的值不是实时的，export导入的值是实时的
export let foo = 'bar';
console.log(foo);

setTimeout(() => foo = 'nono', 500);
console.log(foo);

/*
4.import 命令
导入module
多次导入只导入一次
 */
// import {age} from "./class-extends";
/*
import {age as demo} from "./class-extends";
也可通过as设置别名
 */

/*
5.模块的整体加载
import * as xxx from 'path'
 */

/*
6.export default 命令
为用户提供方便，通过export default指定默认输出
 */

/*
7.export 与 import 的复合写法
先导入一个模块，再导出

export { foo, bar } from 'my_module';//相当于对外转发了这个模块，当前模块不能使用

 */


