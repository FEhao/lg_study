## 简答题

#### 1. 当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么。

```js
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
 
```

**答：**对于新添加的成员，不是响应式的。因为在vue初始化时，data中所有的对象属性都会被遍历，并执行defineReactive操作。在需要绑定数据的地方，调用Watcher，并执行对应数据的get操作，将回调任务push至该属性Dep的sub队列中。当该属性的值发生变化，触发setter，会调用sub中的所有回调任务，完成更新，即响应式。

但对于新添加的属性，由于之前没有对齐进行defineReactive操作，所以不会有对于的getter和setter，如果想使其为响应式数据，可以使用`Vue.set(vm.someObject, 'b', 2)`，重新进行响应式处理，原理同上。



#### 2. 请简述 Diff 算法的执行过程

**答:**

1. patch(oldVnode, vnode)，如果前者不是一个vnode对象，则将其转化为vnode对象，如果二者是sameVnode（指key, sel一样），进行patchVnode操作，如果不一样，则直接将后者的elm替换前者并插入dom中
2. 在patchVnode中，将两个vnode中的text与children分情况进行处理
   1. 如果新节点中没有text属性
      1. 如果两个都含有children，则进行updateChildren处理
      2. 如果只有新节点含有children，则将其添加到节点elm中。老节点中有text属性的话需要在此之前清除
      3. 如果只有老节点含有children，则将children移除
      4. 如果老节点含有text属性，清除
   2. 如果新节点中有text属性且和老节点不相等，则替换掉elm中的text。老节点中如果有children，则在此之前清除
3. updateChildren中，对同层级的节点一次比较
   1. 开始节点与结束节点比较，这两种情况类似
      1. oldStartVnode/newStartVnode
      2. oldEndVnode/newEndVnode
      3. 举例：如果oldStartVnode和newStartVnode是sameVnode(key, sel相等)，调用patchVnode对比和更新节点。把新旧的开始索引都往后移动，oldStartIndex++, oldEndIndex++
      4. end节点同理，index--
   2. 旧开始节点/新结束节点比较（左上角到右下角），如果相同，patchVnode，将旧开始节点移动至最后，oldStartIndex++，newEndIndex--
   3. 反之亦然，右上角到左下角，相同，则旧结束节点移动至第一个位置，oldEndIndex--, newStartIndex++
   4. 以上四种情况都没找到，则在oldVnode中寻找与newStartNode具有相同key值的节点
      1. 没找到，说明是个新节点，创建新的DOM元素，并插入到oldVnode最前面
      2. 找到了
         1. 判断新老节点sel选择器是否相同。不同，说明被修改，重新创建对应的DOM并插入
         2. 相同，把oldVnode中对应的elmToMove移动到最前面
   5. 循环结束
      1. 当老节点遍历完，即oldStartIndex > oldEndIndex；说明新节点还有剩余，把剩余节点批量插入到oldVnode右边
      2. 当新节点遍历完，即newStartIndex > newEndIndex；说明老节点有剩余，把剩余节点批量删除。

## 编程题

#### 1. 模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

**答:**

#### 2. 在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

**答:**

#### 3. 参考 Snabbdom 提供的电影列表的示例，实现类似的效果，如图：

**答:**




