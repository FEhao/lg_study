1. 界定内存问题的标准

   1. 内存泄露：内存使用持续升高
   2. 内存膨胀：在多数设备上都存在性能问题
   3. 频繁垃圾回收：通过内存变化图进行分析

2. 监控内存的几种方式

   1. 浏览器任务管理器
   2. Timeline时序图记录
   3. 堆快照查找分离DOM
      1. 界面元素存活在DOM树上
      2. 垃圾对象时的DOM节点（从DOM树上脱离且没被引用）
      3. 分离状态的DOM节点（脱离但有引用，detached html element）
   4. 判断是否存在频繁的垃圾回收

3. 代码优化

   1. 慎用全局变量

      1. 全局变量定义在全局执行上下文，是所有作用域的顶端
      2. 全局执行上下文一直存在于上下文执行栈，直到程序退出
      3. 如果某个局部作用域出现了同名变量则会遮蔽或污染全局

   2. 缓存全局变量

      1. 将使用中无法避免的全局变量缓存到局部

   3. 通过原型新增方法

      1. 在原型对象上新增实例对象需要的方法

      2. ````js
         var fn1 = function() {
           this.foo = function() {
             console.log(1)
           }
         }
         var f1 = new fn1()
         
         var fn2 = function() {}
         fn2.prototype.foo = function() {
           console.log(1)
         }
         
         var f2 = new fn2() // 更快
         ````

   4. 避开闭包陷阱

      1. 闭包使用不当可能造成内存泄漏，不要为了闭包而闭包

   5. 避免属性访问方法使用

      1. JS不需属性的访问方法，所有属性都是外部可见的

      2. 使用属性访问方法只会增加一层重定义，没有访问的控制力

      3. ````js
         function Person() {
           this.name = 'name'
           this.getName = function() {
         		return this.name
           }
         }
         
         const p1 = new Person()
         const a = p1.getName()
         const b = p1.age // 更快
         ````

   6. For循环优化

      1. ````js
         for (var i = 0; i < arr.length; i ++) {}
         for (var i = arr.length; i; i--) {} // 更快
         ````

   7. 选择最优的循环方式

      1. forEach，for循环，for...in...遍历，速度逐渐降低

   8. 文档碎片优化节点添加

      1. 节点的添加操作必然会有回流和重绘

      2. ````js
         for (var i = 0; i < 10; i++) {
           var oP = document.createElement('p')
           oP.innerHTML = i
           document.body.appendChild(oP)
         }
         
         const fragFile = document.createDocumentFragment()
         for (var i = 0; i < 10; i++) {
           var oP = document.createElement('p')
           oP.innerHTML = i
           fragFile.appendChild(oP)
         }
         document.body.appendChild(fragFile)
         ````

   9. 克隆优化节点操作

      1. 对于dom中，和需要创建的节点类似的已有的节点，可以用cloneNode的方式，再进行编辑，这样会比直接重头开始创建快

   10. 直接量替换Object操作

       1. ```js
          var a1 = new Array(3)
          a1[0] = 1; a1[1] = 2; a1[2] = 3
          
          var a2 = [1, 2, 3] // 更快
          ```

 