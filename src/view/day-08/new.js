function Son() {
  this.name = 'xiaoming'
}

var son = new Son()
console.log(son)

/*
1-创建一个空对象
2-将空对象的原型指向构造函数的原型
3-绑定构造函数中的this
4-如果函数没有返回对象，那么返回this
 */
function newInstance(construct, ...args) {

}

var arr = [1, 2, 3, 4]
arr.find(function (v) {
  if (v === 1) {
    console.log(v)
  }
})
