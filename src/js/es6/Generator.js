/*
1.简介
2.next 方法的参数
3.for...of 循环
4.Generator.prototype.throw()
5.Generator.prototype.return()
6.next()、throw()、return() 的共同点
7.yield* 表达式
8.作为对象属性的 Generator 函数
9.Generator 函数的this
10.含义
11.应用：异步操作的同步化表达、控制流管理、部署 Iterator 接口、作为数据结构
https://es6.ruanyifeng.com/#docs/generator
 */
/*
1.简介
Generator 函数是ES6 提供的一种异步编程解决方案
基本语法：function关键字与函数名之间有一个*；函数体内有yield表达式
 */
let generator = function* () {
  yield 'hello';
  yield 'world';
  return 'ending';
};
let gen = generator();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next().value);
//1.1 yield 表达式:yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
//每调用一次next()，返回一个{value:xxx,done:false}对象，value的值为yield表达式的值

//1.2 与 Iterator 接口的关系
const iter = {};
iter[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
console.log(iter[Symbol.iterator]().next());

/*
2.next 方法的参数
传入的参数会作为上一个yield表达式的值
yield表达式的值会影响下面代码的时候，使用有参next(args)方法更有效
第一次使用next方法传参是无效的，从第二次开始才是有效的
 */
console.log('===========next()===========');
const nextGenerator = function* (x) {
  const y = yield (x + 1);
  const z = yield (y / 3);
  return (x + y + z);
};

let nextGen = nextGenerator(5);
//传入5
console.log(nextGen.next());//x=5,y=6
//由于next无参，传入undefined output：NaN
// console.log(nextGen.next());
//由于next无参，传入undefined output：NaN
// console.log(nextGen.next());

//如果使用有参next方法
console.log(nextGen.next(9));//x=5,y=9,z=3
console.log(nextGen.next(7));//x=5,y=9,z=7

/*
3.for...of 循环
自动遍历 Generator 函数运行时生成的Iterator对象
 */
console.log('======for...of=====');

function* foo() {
  yield 1;//{value:1, done:false}
  yield 2;//{value:2, done:false}
  yield 3;//{value:3, done:false}
  yield 4;//{value:4, done:false}
  yield 5;//{value:5, done:true}
  return 6;//{value:6, done:true}
}

for (let data of foo()) {
  //一旦遇到done:true便停止遍历，所以不会遍历return的值，也就是说for...of只会遍历yield的值
  console.log(data);
}
/*
由于对象没有for...of循环，但是可以通过Generator函数提供
也可通过obj[Symbol.iterator]指定函数
 */
console.log('=============遍历对象属性============');
const objGenerator = function* (obj) {
  for (let key of Reflect.ownKeys(obj)) {
    yield [key, obj[key]];
  }
};
const obj = {
  city: '杭州',
  price: 38972,
};

for (let prop of objGenerator(obj)) {
  console.log(prop);
}

/*
4.Generator.prototype.throw()
generator函数返回的遍历器对象都包含一个throw()方法，可在generator外部抛出错误，在内部处理错误;建议抛出一个Error对象的实例
如果generator内部没有捕获，会抛到generator外部
如果generator内外部没有捕获，会中断执行

throw()抛出的异常希望被generator内部捕获，必须首先执行一次next()，否则不会被捕获；被捕获之后，会默认执行一次next()

 */
console.log('==========throw===========');
const catchErrorGenerator = function* () {
  try {
    yield;
  } catch (e) {
    // console.log(e);
    console.log('在内部捕获了异常');
  }
};
const catchErr = catchErrorGenerator();
catchErr.next();
catchErr.throw(new Error('在外部抛出了异常'));

console.log('=========uncatch=======');
const uncatchErrorGenerator = function* () {
  yield 1;
  yield 2;
  yield 3;

};
const uncatch = uncatchErrorGenerator();
console.log(uncatch.next());
// uncatch.throw(new Error('外部再次抛出了异常'));
console.log(uncatch.next());

/*
5.Generator.prototype.return()
返回传入的参数，并中断generator
如果generator内部有finally块，则会执行完finally块内代码才会中断
 */
console.log('=========return()===========');
const returnGenerator = function* () {
  yield 1;
  yield 2;
  yield 3;
};
const returnGen = returnGenerator();
console.log(returnGen.next());
console.log(returnGen.return('helloworld'));

/*
6.next()、throw()、return() 的共同点
 让Generator 函数恢复执行，并且使用不同的语句替换yield表达式。
 */

/*
7.yield* 表达式
如果在一个generator函数内部调用另外一个generator函数，需要通过for...of遍历

实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历。


 */
console.log('==========yield*===========');
const generatorA = function* () {
  yield 1;
  yield 2;

};
const generatorB = function* () {
  yield 'start...';
  for (let data of generatorA()) {
    console.log(data);
  }
  yield 'end!';
};
const generatorb = generatorB();
console.log(generatorb.next());
console.log(generatorb.next());

//yield* generator()可简化代码
const generatorC = function* () {
  yield 'start...';
  yield* generatorA();
  yield 'end!';
};
/*
等价于
const generatorC = function* () {
  yield 'start...';
  yield 1;
  yield 2;
  yield 'end!';
};
 */
const generatorc = generatorC();
console.log(generatorc.next());
console.log(generatorc.next());
console.log(generatorc.next());
console.log(generatorc.next());

/*
8.作为对象属性的 Generator 函数

 */
const objContainGeneratorProp = {
  * generator() {

  }
};

/*
9.Generator 函数的this
generator函数返回的遍历器对象是是遍历器的实例，并且继承了generator上prototype的所有函数
 */
console.log('===========this===========');
const generatorThis = function* () {
  yield 1;
  yield 2;
  yield 3;
};
generatorThis.prototype.hello = function () {
  console.log('helloworld');
};
const generatorthis = generatorThis();
generatorthis.hello();

function* F() {
  yield this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

const obj2 = {};
const f = F.call(obj2);

console.log(f.next());
console.log(f.next());
console.log(f.next());
console.log(f.next());


console.log(obj2.a);
console.log(obj2.b);
console.log(obj2.c);
/*
另一种方式
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
 */

/*
10.含义
 */
//10.1 Generator 与状态机
console.log('=============Generator 与状态机===============');
let StateMachine = function* () {
  while (true) {
    console.log('tick');
    yield;
    console.log('tock');
    yield;
  }
};
let stateMachine = StateMachine();
stateMachine.next();
stateMachine.next();
stateMachine.next();
stateMachine.next();
/*
10.2 Generator 与协程
协程是一种程序运行方式，既可以是单线程，也可以是多线程；前者是一种特殊的子例程，后者是一种特殊的线程
10.2.1 协程与子例程的差异
传统的子例程采用'后进先出'堆栈式执行，只有当调用的子函数执行完毕后才会去执行父函数
子例程可以并行执行，但是同时只能有一个线程执行，其他线程处于suspended状态；并且线程之前可以交换执行权
10.2.2 协程与普通线程的差异
相同点是都有执行上下文，可以分享全局变量
不同点是协程统一时间可以有多个线程处于运行状态，但是运行的协程只有一个，其他线程处于suspended状态；普通线程是抢占式的，协程是协作式的，执行权可自行分配
es6实现的协程是半协程，程序的执行权只能generator函数的调用者归还。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行
 */

/*
10.3 Generator 与上下文
js代码执行时会产生一个全局的上下文环境，最后产生的上下文环境首先执行退出堆栈，然后再执行完成它下层的上下文，只有所有代码执行完毕，退出堆栈
generator函数不是这样，执行到yield时退出调用栈，但是不会消失；下次调用next()方法时，重新加入调用栈恢复执行
 */


