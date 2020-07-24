1. 模板编译的作用

   1. vue2.x使用VNode描述视图以及各种交互，用户自己编写VNode比较复杂
   2. 用户只需要编写类似HTML的代码-vue.js模板，通过编译器将模板转换为返回VNode的render函数
   3. .vue文件会被webpack在构建的过程中转换成render函数

2. 生成的的render函数，大概是这样

   ```html
   <div id="app">
     <h1>Vue<span>123</span></h1>
     <p>{{msg}}</p>
     <comp @myclick="handler"></comp>
   </div>
   ```

   对应的：

   ```js
   (function anonymous() {
     with(this) {
       return _c(
       	"div",
         { attrs: {id: 'app'}}, // 属性
         [ // 子元素
           _m(0),
           _v(" "),
           _c("p", [_v(_s(msg))]),
           _v(" "),
           _c("comp", {on: { myclick: handler }})
         ],
         1 // 将children拍平
       )
     }
   })
   ```

   \_c在src/core/instance/render.js中，就是_createElement（vm.$createElement是用户自己写的render函数，和vm.\_c的区别在于最后一个参数，一个为true一个false）

   \_m, \_v, \_s在src/core/instance/render-helpers/index.js中

   _m: renderStatic

   _v: createTextVNode

   _s: toString

   