1. 请简述 Vue 首次渲染的过程。

   1. 首次渲染发生在\_init函数中，调用了`updateComponent = () => { vm._update(vm._render(), hydrating) }`
   2. \_render函数生成了虚拟DOM，主要是通过调用createElement方法创建了一个VNode对象
   3. 在\_update中，通过patch方法把虚拟DOM进行更新并渲染成真实DOM。在第一次渲染中，将vm.$el与render生成的Vnode进行patch处理
   4. patch处理的过程中，由于首次渲染，需要把挂载的真实DOM转换成VNode再进行比对
   5. 比对的过程在patchVNode中，每一层级对应的节点进行比对，从头和尾开始依次找到相同的子节点进行比较，总共有四种比较方式
   6. 没有匹配到的话，在老节点的子节点中查找newStartVnode，并进行处理。比对完毕，如果新节点剩余多，把新增节点插入到DOM中，如果老节点多，删除
   7. 如果

2. 请简述 Vue 响应式原理。

   1. 对data进行observe处理，该函数中实例化了一个Observe对象，并将该对象添加到data上
   2. 对data的属性进行遍历，每个value都进行defineReactive处理
   3. 每个属性的处理中，都会有自己对应的实例化的Dep对象，同时重新定义该属性的getter和setter，在getter中，dep会记录触发getter时的Watcher对象，在setter中，dep会去派发更新通知，监听的所有的Watcher对象会去执行各自的回调
   4. 如果属性不是对象而是数组，对数组中每个值进行observe处理，对数组的原生方法进行拦截与改写，每次改变数组后，会调用该属性的dep.notify去派发更新通知
   5. 需要用到响应式数据的地方，都会新建一个Watcher，该Watcher会在实例化时，去获取需要的数据，这时将全局的target设置为自身，触发数据的getter，该数据的dep将全局的target，也就是Watcher对象，进行保存。完成了响应式绑定

3. 请简述虚拟 DOM 中 Key 的作用和好处。

   答：如果没有key，在进行patch时，两个VNode因为key都为undefined，从而容易被判为sameVNode，这种情况下，diff算法会继续去比较两个VNode的children，而当有key时，避免了误判为sameVNode的情况，会改为去查找拥有相同key的节点，从而可以更高效地处理比对过程。

4. 请简述 Vue 中模板编译的过程。

   1. 先从缓存中加载编译好的render函数，没有的话调用`compile(template, options)`生成
   2. compile中合并了options，核心内容还是调用的baseCompile
   3. baseCompile中核心的三步
      1. parse，将template字符串转换为ast tree
      2. optimize，将上一步生成的AST进行遍历，标记一些静态节点，避免在每次重新渲染的时候重新生成
      3. generate，将ast tree生成js的创建代码
   4. compileToFunctions，继续把上一步中生成的字符串js代码转换为函数，render和staticRenderFns初始化完毕，挂载到Vue实例中