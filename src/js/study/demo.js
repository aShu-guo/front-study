let obj = {
  value: 0,
  [Symbol.toPrimitive]() {
    this.value++;
    console.log(this.value);
    return this.value;
  },
  valueOf() {
    return 6;
  },
  toString() {
    return 7;
  }
};

console.log(obj == 1 && obj == 2);

console.log('--------------------------')

function Person() {

  function sayHello() {
    console.log('HelloWorld')
  }

}

console.log(Person.__proto__ === Function.prototype)
// console.log(Person.prototype === )
console.log(Object.getPrototypeOf(Person))
var fn = new Function('a', 'b', 'return a+b');
console.log(fn(1, 2))
Person.prototype.fun = fn;
// console.log(Person.fun(1, 2));
// Person.sayHello()
var person = new Person();
console.log(person.fun(1, 2))
Object.defineProperty(person, 'fun', {
  value: function () {
    console.log('我是实例方法')
  }
})
person.fun();
// Object.getOwnPropertyDescriptor(person,)
/*
实例
对象
实例先去找当前实例方法，如果找不到，去构造构造函数的prototype中找
子实例->子实例的__proto__->父实例->父实例__proto__
子实例->构造方法prototype->Function
call:没有返回值，第一个参数是this绑定的对象，参数传递时用逗号隔开
apply:没有返回值，第一个参数是this绑定的对象，传入一个数组
bind:返回一个函数，第一个参数是this绑定的对象，参数传递时用逗号隔开
 */
Object.setPrototypeOf(person, Math)
console.log(person.max(1, 2))
console.log(person.__proto__ === Math)
console.log(Math.__proto__ === Object.prototype)
