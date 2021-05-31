/*
1.概述
2.静态方法
3.实例：使用 Proxy 实现观察者模式
 */
/*
1.概述
设计目的：
将Object上明显属于语言内部的方法放到Reflect上;
修改Object返回值，变得更加合理;例如Object.defineProperty(obj, name, desc)无法定义属性时会抛出异常，而Reflect.defineProperty(obj, name, desc)则会返回false。
让Object操作变成函数行为，例如：in 修改为Reflect.has(obj,name);delete 修改为Reflect.deleteProperty(obj,name)
Reflect对象上的方法与Proxy对象的方法一一对应
 */
const cannotExtensiableObj = {};
Object.preventExtensions(cannotExtensiableObj);
//es6之前添加对象
// try {
//   Object.defineProperty(cannotExtensiableObj, 'address', {
//     value: '浙江省杭州市良睦路',
//     configurable: true,
//     writable: true,
//     enumerable: true
//   });
// } catch (e) {
//   console.log(e);
// }
//es6之后
let success = Reflect.defineProperty(cannotExtensiableObj, 'address', {
  value: '浙江省杭州市良睦路',
  configurable: true,
  writable: true,
  enumerable: true
});
if (success) {
  console.log('添加属性成功');
} else {
  console.log('添加属性失败');
}

/*
2.静态方法
Reflect对象一共有 13 个静态方法。

Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)
 */
