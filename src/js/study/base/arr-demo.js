//数组也是object，只不过键是对应的索引
var arr = [1, 2, 3, 4];
print(typeof (arr));
print(Object.keys(arr));

function print(obj) {
  console.log(obj);
}

//length属性返回的不是元素数量，而是数组中最大的数字键+1
print(arr);
print(arr.length);
arr[10000] = 5;
print(arr);
print(arr.length);

//如果指定数字键位置没有元素，那么返回undefined
print(arr[4]);

//in 判断索引位置是否有元素
print(500 in arr);
//for...in...遍历非数字键和数字键
print('=============for...in...遍历==========');
arr['foo'] = 123;
print(arr);
for (var i in arr) {
  print(arr[i]);
}
//for 循环遍历数组
print('============for循环遍历==========');
for (var j = 0; j < arr.length; j++) {
  if (typeof (arr[j]) === 'undefined') {
    continue;
  }
  print(arr[j]);
}
//forEach遍历
print('==================forEach遍历==================');
arr.forEach(a => print(a));

//delete删除数组中一个元素对length没有影响
print('=============delete========');
print(arr.length);
delete arr[0];
print(arr.length);
//类似数组的对象，包含lenght属性，但不是动态改变的
//典型的“类似数组的对象”是函数的arguments对象，以及大多数 DOM 元素集，还有字符串。
print('=============array-like object============');
var objLikeArr = {
  'name': 'gcl',
  'age': 23,
  'length': 2
};
print(objLikeArr.length);
delete objLikeArr.name;
print(objLikeArr);
//slice将类似数组的对象转换为真正的数组，但是要求对象的键是'0','1',....
var arr2 = Array.prototype.slice.call(objLikeArr);
print(arr2);

//清空数组
print('=================end=================');
arr.length = 0;
print(arr);

//
var arr3 = new Array(3);
print(arr3.join().toString());
