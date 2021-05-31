//DOM最小的组成单位是节点node
//node有7中类型:
/*
Document 文档树的顶层节点
DocumentType doctype标签
Element 各种html标签
Attr 标签的属性
Text 标签包含的文本
Comment 注释
DocumentFragment 文档的片段？
 */
//除了根结点，每个node都有三种层级关系：直接父节点、直接子节点、兄弟节点
console.log(document.nodeType);
