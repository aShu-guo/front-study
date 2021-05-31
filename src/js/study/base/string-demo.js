var str='helloworld';
//一旦声明一个字符串，内容就无法更改
console.log(str[0]);
str[0]='name';
console.log(str);
//每个字符在 JavaScript 内部都是以16位（即2个字节）的 UTF-16 格式储存
//JavaScript 返回的字符串长度可能是不正确的
console.log(str.length);
console.log('𝌆'.length);

