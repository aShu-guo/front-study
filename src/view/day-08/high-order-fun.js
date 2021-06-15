var arr = [1, 2, 3, 4]
var mapArr = arr.map(function (value, index, array) {
  return 1
})
console.log(mapArr)

var reduceArr = arr.reduce(function (all, nowValue, arr) {
  return all + nowValue
}, 100)
console.log(reduceArr)

var filterArr = arr.filter(function (nowValue) {
  return nowValue === 3
})
console.log(filterArr)

var sortArr = arr.sort(function (a, b) {
  return a > b
})
console.log(sortArr)
