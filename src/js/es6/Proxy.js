/*
1.概述
2.Proxy 实例的方法
3.Proxy.revocable()
4.this 问题
5.实例：Web 服务的客户端 or 实现数据库的ORM层
 */
/*
1.概述
元编程，对编程语言编程
在target前加了一层拦截，如果直接调用target，则不会拦截；
调用proxy对象才会拦截
 */
var obj = new Proxy({}, {
  get(target, p, receiver) {
    console.log('call getter');
    return Reflect.get(target, p);
  },
  set(target, p, value, receiver) {
    console.log('call setter');
    Reflect.set(target, p, value);
  }
});
obj.count = 1;
console.log('---------------');
console.log(obj.count);
obj.count++;
// obj.count = obj.count + 1;
/*
2.Proxy 实例的方法
get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
 */
/*
2.1 get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
 */
let target = {
  [Symbol('city')]: 'hangzhou',
  price: 38000,
  increase: 0.1,
  nextYearPrice() {
    return this.price * (this.increase + 1);
  }
};
let getHandler = {
  //一般情况下receiver指向proxy1
  get(target, p, receiver) {
    if (p in target) {
      return target[p];
    } else {
      throw new ReferenceError('property not exist');
    }
  },

  //如果不是number类型，则抛出异常
  //数据验证的一种实现方法
  set(target, p, value, receiver) {
    if (Number.isInteger(value)) {
      target[p] = value;
    } else {
      throw new Error('is not number');
    }
  }
};
let proxy1 = new Proxy(target, getHandler);
// console.log(proxy1.name);
//如果拦截器定义在Prototype对象上，拦截器也会生效？
let obj2 = Object.create(proxy1);
console.log(obj2.increase);
//如果属性描述对象中configureable、writable为false，用proxy对象读取时会报错：TypeError: Invariant check failed

// proxy1.price = 'ab'; //output:Error: is not number
/*
一个例子
receiver指向原始的操作行为所在的那个对象，一般情况下时proxy实例本身
 */
const setHandler = {
  set(target, key, value, receiver) {
    target[key] = receiver;
    return true;
  }
};
const proxy2 = new Proxy({}, setHandler);
const obj3 = {};
Object.setPrototypeOf(obj3, proxy2);
obj3.from = 'henan';
console.log(obj3.from === obj3);

/*
2.3 apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
target只能是function对象？
调用apply方法时会被拦截
 */
const applyHandler = {
  apply(target, object, args) {
    console.log('apply is called');
  }
};
let applyFrom = {
  fun(name, age) {
    return 'helloworld:' + name + age;
  }
};
let applyTo = {};
let applyProxy = new Proxy(applyFrom.fun, applyHandler);
console.log(applyProxy.apply(applyTo, ['hangzhou:', 12]));

/*
2.4 has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
判断对象是否具有某个属性
拦截的是HasProperty()，不是HasOwnProperty()，即不能判断属性是继承来的还是自己的
不能拦截for...in
 */
const hasObj = {
  name: '千岛湖',
  budget: 800
};
let hasHandler = {
  has(target, propKey) {
    let isExist = false;
    if (target[propKey] !== undefined) {
      isExist = true;
    }
    return isExist;
  }
};
let hasProxy = new Proxy(hasObj, hasHandler);
console.log('name' in hasProxy);

/*
2.5 construct(target, args, newTarget)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
target-目标对象 由于拦截的是构造函数，所以target只能是函数
args-构造函数参数
newTarget-new命令作用的构造函数
必须返回一个object，否则报错
 */
console.log('===========construct==========');
const NewObj = function (name, budget) {
  name = this.name;
  budget = this.budget;
};
let newHandler = {
  construct(target, args) {
    console.log('call construct');
    return new target(...args);
  }
};
let newProxy = new Proxy(NewObj, newHandler);
console.log(new newProxy('千岛湖', 800));

/*
2.6 deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
如果目标对象的属性描述对象中configurable为false，则不能拦截
 */
console.log('===========deleteProperty==========');
const deleteObj = {
  name: '千岛湖',
  budget: 800
};
let deleteHandler = {
  deleteProperty(target, propKey) {
    if (propKey in target) {
      delete target[propKey];
    } else {
      throw new Error(propKey + ' not exist');
    }
  }
};
let deleteProxy = new Proxy(deleteObj, deleteHandler);
// delete deleteProxy.age;//output:Error: age not exist
console.log(deleteProxy);
delete deleteProxy.name;
console.log(deleteProxy);

/*
2.7 defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
如果目标对象不可扩展，defineProperty()只能修改属性，不能增加属性
如果属性描述对象writable configurable为false，defineProperty()不能改变这两个值
 */
console.log('===========defineProperty==========');
const definePropertyObj = {
  name: '东极岛',
  budget: 1000,
};
let definePropertyHandler = {
  defineProperty(target, propKey, propDesc) {
    //拦截重复定义属性
    if (!(propKey in target)) {
      Object.defineProperty(target, propKey, propDesc);
    } else {
      throw new Error(propKey + ' exists');
    }
  }
};
let definePropertyProxy = new Proxy(definePropertyObj, definePropertyHandler);
// definePropertyProxy.name = 23;//output:Error: name exists

/*
2.8 getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

 */
console.log('===========getOwnPropertyDescriptor==========');
const ownPropertyDescObj = {
  name: '家',
  budget: 0,
};
let ownPropertyDescHandler = {
  getOwnPropertyDescriptor(tareget, propKey) {
    if (propKey in target) {
      return Object.getOwnPropertyDescriptor(tareget, propKey);
    }
    return undefined;
  }
};
let ownPropertyDescProxy = new Proxy(ownPropertyDescObj, ownPropertyDescHandler);
console.log(Object.getOwnPropertyDescriptor(ownPropertyDescProxy, 'budget'));

/*
2.9 getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
拦截以下操作：
Object.prototype.__proto__
Object.prototype.isPrototypeOf()
Object.getPrototypeOf()
Reflect.getPrototypeOf()
instanceof
 */
console.log('===========getPrototypeOf==========');
const prototypeObj = {
  name: '公司',
  budget: -8000,
};

let getPrototypeHandler = {
  getPrototypeOf(target) {
    return target;
  }
};
let prototypeProxy = new Proxy(prototypeObj, getPrototypeHandler);
console.log(Object.getPrototypeOf(prototypeProxy));

/*
2.10 setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

 */
let setPropertyHandler = {
  setPrototypeOf(target, proto) {
    let success = false;
    if (null !== proto) {
      console.log('setPrototypeOf success');
      success = true;
    }
    return success;
  }
};
let setPropertyProxy = new Proxy(prototypeProxy, setPropertyHandler);
console.log(Object.setPrototypeOf(setPropertyProxy, {}));

/*
2.11 isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。
 */
const isExtensibleObj = {
  name: '公司',
  budget: -8000,
};
let isExtensibleHandler = {
  isExtensible(target) {
    console.log('intercept obj success');
    return Object.isExtensible(target);
  }
};
let isExtensibleProxy = new Proxy(isExtensibleObj, isExtensibleHandler);
console.log('isExtensible:' + Object.isExtensible(isExtensibleProxy));
Object.preventExtensions(isExtensibleObj);
console.log('isExtensible:' + Object.isExtensible(isExtensibleProxy));

/*
2.12 preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。

 */

/*
2.13 ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
拦截以下操作：
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Object.keys() 自动过滤：不可枚举属性，Symbol做属性名的属性，不存在的属性
for...in循环

 */

/*
3.Proxy.revocable()
返回一个可取消的Proxy实例
使用场景：目标对象不允许直接访问，必须通过代理访问，一旦访问结束就收回代理权，不允许再次访问
 */
let {proxy: revocableProxy, revoke} = Proxy.revocable({}, {});
revocableProxy.foo = '1234';
console.log(revocableProxy.foo);
//取消revocableProxy
revoke();
console.log(revocableProxy.foo);//output:TypeError: Cannot perform 'get' on a proxy that has been revoked


