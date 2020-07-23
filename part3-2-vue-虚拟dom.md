1. 虚拟DOM(virtual DOM)是使用JS对象描述真是DOM
2. 借鉴了Snabbdom，添加了vue的特性，比如指令和组件
3. 为什么使用虚拟DOM
   1. 避免直接操作DOM，提高开发效率
   2. 作为一个中间层可以跨平台
   3. 虚拟DOM不一定可以提高性能
      1. 首次渲染的时候，需要额外维护，会增加开销
      2. 复杂视图情况下提升渲染性能
4. h函数
   1. vm.$createElement(tag, data, children, normalizeChildren)
      1. tag：标签名称或者组件对象
      2. data：描述tag，可以设置DOM的属性或者标签的属性
      3. children：tag中的文本内容或者子节点
   2. 返回VNode
      1. tag
      2. data
      3. children
      4. text
      5. elm
      6. key
5. 渲染入口是`updateComponent = () => { vm._update(vm._render(), hydrating) }`
   1. vm.\_render生成虚拟DOM，里面执行了`vnode = render.call(vm._renderProxy, vm.$createElement)`
   2. render的第一个参数是h，也就是$createElement

