//字符串扩展：模版字符串、模版标签
//加强了对Unicode的支持，采用\uxxxx形式表示一个字符
var str = '\u4e2d\u56fd';
for (let i = 0; i < str.length; i++) {
  console.log(str[i]);
}

for (let s of str) {
  console.log(s);
}

//模板字符串，默认会将字符串转义，导致无法嵌入其他语言
// $('#result').append(`
//   There are <b>${basket.count}</b> items
//    in your basket, <em>${basket.onSale}</em>
//   are on sale!
// `);
let name = 'xiaoming';
let age = 23;
console.log(`my name is ${name}, i am ${age}`);

//标签模版，可以内嵌其他语言。
//它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能
let a = 5;
let b = 10;
console.log(tag`Hello ${a + b} world ${a * b}`);
//等价于
console.log(tag(['hello ', ' world ', ''], 15, 50));

//返回值是将传入的模版拼接起来
function tag(stringArr, ...value) {
  let str = '';
  for (let i = 0; i < stringArr.length; i++) {
    str += stringArr[i];
    if (i < value.length) {
      str += value[i];
    }
  }
  return str;
}

//rest写法，省略要传入的参数
console.log(tagRest(['hello ', ' world ', ''], 15));

function tagRest(stringArr) {
  console.log(arguments);
  let str = '';
  for (let i = 0; i < stringArr.length; i++) {
    str += stringArr[i];
    if (i < arguments.length && arguments[i + 1] !== undefined) {
      str += arguments[i + 1];
    }
  }
  return str;
}

//in:<script>alert("abc")</script>
//out:<p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
function SaferHtml(strings) {
  let str = '';
  for (let i = 1; i < arguments.length; i++) {
    let s = String(arguments[i]);
    str += s.replaceAll('<', '&lt;').replaceAll('>', '&gt;');

  }
  return str;
}

//1.过滤html字符串，防止用户输入恶意内容
let sender = '<script>alert("abc")</script>';
let msg = SaferHtml`<p>${sender} has sent you a message.</p>`;
console.log(msg);

//es6添加的一些方法
let helloWorld = 'helloworld';
//判断是否以指定字符结尾
console.log(helloWorld.endsWith('d'));
//判断是否以指定字符开头
console.log(helloWorld.startsWith('h'));
//判断是否包含指定字符串
console.log(helloWorld.includes('world'));
//[0, 1)
console.log(helloWorld.endsWith('h', 1));
//[4, str.length)
console.log(helloWorld.startsWith('o', 4));
//[4, str.length)
console.log(helloWorld.includes('o', 4));
//重复3次
console.log('a'.repeat(3));
