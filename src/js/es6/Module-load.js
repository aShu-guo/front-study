/*
1.浏览器加载
2.ES6 模块与 CommonJS 模块的差异
3.Node.js 的模块加载方法
4.循环加载
 */

/*
1.浏览器加载
传统方法
<script type="application/javascript" src="path/to/myModule.js"></script>
默认情况下是先执行脚本，后继续渲染
因此如果脚本提交较大、执行速度较慢都会给用户造成不好的体验，所以提供异步加载的方法

渲染完再执行
<script type="application/javascript" src="path/to/myModule.js" defer></script>
下载完就执行
<script type="application/javascript" src="path/to/myModule.js" async></script>

如果加载es6模块，需要添加type="module"，异步加载，渲染完再执行
<script type="module" src="./foo.js"></script>


 */

/*
2.ES6 模块与 CommonJS 模块的差异
commonjs 是require加载模块，es6是import加载模块
commonjs 是运行时加载，es6 是静态加载
commonjs 加载模块输出的是值，es6 加载模块输出的是值的引用
 */
