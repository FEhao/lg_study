1. #### 请说出下列最终的执行结果，并解释为什么

   ````js
   var a = [];
   for (var i = 0; i < 10; i ++) {
     a[i] = function() {
       console.log(i)
     }
   }
   a[6]()
   ````

   答：结果为10，因为for循环中的i在全局作用域中，10次循环后，i经过累加，为10，a数组中任何一个function的调用结果都是这个i

   

2. #### 请说出下列最终的执行结果，并解释为什么

   ````js
   var tmp = 123;
   if (true) {
     console.log(tmp);
     let tmp
   }
   ````

   答：会报错，if代码块中使用到了let，由于let的特性，会造成暂时性死区，即let声明前调用变量，都会报错

   

3. #### 结合ES6新语法，用最简单的方式找出数组中的最小值

   ````js
   var arr = [12, 34, 32, 89, 4]
   ````

   答：Math.min接受任意数量value作为参数并返回最小值，可用扩展运算符将数组解构为多个参数

   ````js
   Math.min(...arr)
   ````


4. #### 请详细说明var，let，const三种声明变量的方式之间的具体差别

   答：

   1. var存在变量提升，会被提至作用域顶部，let和const不存在变量提升
   2. var在浏览器环境全局作用域中进行声明会自动成为window对象上的一个属性，let与const不会
   3. var只有全局作用域和函数作用域概念，没有块级作用域概念
   4. let和const不允许重复声明变量，且存在暂时性死区，必须在声明后使用
   5. const定义的变量不可修改，var和let可以

5. #### 请说出下列最终的执行结果，并解释为什么

   ````js
   var a = 10;
   var obj = {
     a: 20,
     fn() {
       setTimeout(() => {
         console.log(this.a)
       })
     }
   }
   
   obj.fn()
   ````

   答：结果为10，函数的this取决于在被调用的上下文对象，也就是obj，因此this.a即为obj内部的a

6. #### 简述Symbol类型的用途

   答：
   
   
      1. 为对象添加独一无二的属性名
      2. 作为私有属性进行访问限制
      3. 作为常量进行枚举
   
7. #### 说说什么是浅拷贝，什么是深拷贝？

   答：对于基本类型，浅拷贝是对值的复制，而对于引用对象，浅拷贝是对其引用的复制，复制的结果与原对象指向同一个地址，修改其中一个，另一个也会改变。而深拷贝创建了新的对象，对应两个不同的地址。另外，浅拷贝只复制了一层属性，而深拷贝则递归复制了所有的层级

   

8. #### 谈谈你是如何理解JS异步编程的，Event Loop是做什么的，什么是宏任务，什么是微任务？

   答：Javascript语言的执行环境是"单线程"，坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，常见的浏览器无响应（假死），往往就是因为某一段代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。为了解决这个问题，Javascript语言引入异步编程。

   Event Loop即事件循环，是指浏览器或Node的一种解决javaScript单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。 所有同步任务都在主线程上执行，也可以理解为存在一个“执行栈”。主线程外，还有一个“任务队列”，任务队列的作用，就在等待异步任务的结果，只要异步任务有了运行结果，就会加入到“任务队列”中。一旦执行栈中所有同步任务执行完毕，就从 任务队列中读取“任务”加入到“执行栈”中。主线程不断的在循环上面的步骤。

   宏任务: 在事件循环下一轮的最开始执行，  `script`全部代码、`setTimeout`、`setInterval`、`setImmediate`（浏览器暂时不支持，只有IE10支持，具体可见`MDN`）、`I/O`、`UI Rendering`。

   微任务：在主线程空闲时批量执行， `Process.nextTick`（Node独有）`、`Promise`、`Object.observe(废弃)`、`MutationObserver`

   

9. #### 将下面异步代码使用Promise改进？

   ```js
   setTimeout(function() {
     var a = 'hello'
     setTimeout(function() {
       var b = 'lagou'
       setTimeout(function() {
         var c = 'I ❤ U'
         console.log(a + b + c)
       }, 10)
     }, 10)
   }, 10)
   ```

   答：

   ````js
   const task = (...str) =>
     new Promise(resolve => {
       setTimeout(() => {
         resolve(str);
       }, 10);
     });
   
   task('hello')
   .then(
     str => task(...str, 'lagou')
   ).then(
     str => task(...str, 'I ❤ U')
   ).then(
     str => {
     console.log(str.join(' '))
   })
   
   ````

10. #### 请简述TypeScript与JavaScript之间的关系？

    答：

    ​	Typescript = Javascript + 类型系统 + ES6及以上特性支持；

    ​	TypeScript是ECMAScript 2015的语法超集，是JavaScript的语法糖。JavaScript程序可以直接移植到TypeScript，TypeScript需要编译（语法转换）生成JavaScript才能被浏览器执行

11. #### 请谈谈你所认为的TypeScript优缺点

    答：

    1. 优点
        1. TypeScript 增加了代码的可读性和可维护性
        2. 拥抱ES6规范，可编译到低版本
        3. 社区支持，如成熟的IDE插件及主流库的ts类型声明
     2. 缺点
         1. 一定的学习成本，尤其是高级用法
         2. 部分第三方库/模块可能没有类型声明支持
         3. 开发过程需要额外的时间精力，对于要求快速的中小型项目不友好