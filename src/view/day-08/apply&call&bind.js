var obj = {a: 1, b: 2}
Array.prototype.push.call(obj, '12')
console.log(obj)

function Parent() {
  this.name = 'parent'
}

function Son() {
  this.name = 'son'

}

var par = Parent();
console.log(par)

var par2 = new Parent();
console.log(par2)

var son = new Son();
son.fn = Parent;

console.log(son.name)

var likeArrObj = {0: 0, 1: 1, length: 2}

console.log(Array.from(likeArrObj))
console.log(Array.prototype.concat.apply([], likeArrObj))
console.log([].concat.apply([], likeArrObj))
console.log(Array.prototype.slice.call(likeArrObj))

var arr = [1, 2, 3, 4, {shh: 'collapse'}]
var arr2 = arr.slice()
console.log(arr)

arr2[0] = 12
console.log(arr)

console.log(arr === arr2)

/*
将类数组对象转换给数组方法
Array.from()
apply配合concat
call配合slice

浅拷贝
for循环配合hasOwnProperty方法
Array.from()
Object.assign()
concat()
slice()

深拷贝
JSON.parse(JSON.stringify())
 */
var arr3 = JSON.parse(JSON.stringify(arr))
console.log(arr)
console.log(arr3)

arr3[4].shh = 'garbage'
console.log(arr3)
console.log(arr)



