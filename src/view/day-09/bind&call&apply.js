/*
手写 bind call apply
 */
Function.prototype.myCall = function (ctx, ...args) {
  if (typeof this != 'function') {
    throw new Error('is not function')
  }
  ctx = ctx || window
  ctx.fn = this
  var result = eval('ctx.fn(...args)')
  delete ctx.fn
  return result
}
Function.prototype.myApply = function (ctx, args) {
  if (typeof this != 'function') {
    throw new Error('is not function')
  }
  ctx = ctx || window
  ctx.fn = this
  var result = eval('ctx.fn(...args)')
  delete ctx.fn
  return result
}

/*
对于普通函数，绑定this指向
对于构造函数，要保证原函数的原型对象上的属性不能丢失
 */
//  Yes, it does work with `new (funcA.bind(thisArg, args))`
if (!Function.prototype.bind) (function () {
  var ArrayPrototypeSlice = Array.prototype.slice;
  Function.prototype.bind = function (otherThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var baseArgs = ArrayPrototypeSlice.call(arguments, 1),
      baseArgsLength = baseArgs.length,
      fToBind = this,
      fNOP = function () {
      },
      fBound = function () {
        baseArgs.length = baseArgsLength; // reset to default base arguments
        baseArgs.push.apply(baseArgs, arguments);
        return fToBind.apply(
          fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
        );
      };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
})();

function fun(text) {
  console.log('我被执行了:' + text)
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return this.x + ',' + this.y;
};

var p = new Point(1, 2);
p.toString(); // '1,2'

var emptyObj = {};
var YAxisPoint = Point.bind(emptyObj, 0/*x*/);

var axisPoint = new YAxisPoint(5);
console.log(axisPoint.toString()); // '0,5'

console.log(axisPoint instanceof Point) // true
console.log(axisPoint instanceof YAxisPoint) // true
console.log(new YAxisPoint(17, 42) instanceof Point) // true

/*
如果是普通函数，bind返回的绑定函数中的this一直指向bind的第一个参数
如果是构造函数，bind会自动忽略第一个参数

 */
