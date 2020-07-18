1. vue2利用Flow的静态类型检查，通过静态类型推断实现（编译阶段）

2. vue源码的打包工具，使用的是rollup，比webpack轻量（Rollup只处理js，更适合在库中使用，也不会生成冗余代码）

3. |                           |        价格        |       CommonJS        |                 ES Module                  |
   | ------------------------- | :----------------: | :-------------------: | :----------------------------------------: |
   | Full                      |       vue.js       |     vue.common.js     |                 vue.esm.js                 |
   | Runtime-only              |   vue.runtime.js   | vue.runtime.common.js | vue.runtime.esm.js （vue cli所使用的版本） |
   | Full (production)         |     vue.min.js     |                       |                                            |
   | Runtime-only (production) | vue.runtime.min.js |                       |                                            |

4. 
   1. 完整版：同时包含编译器和运行时版本
   2. 编译器compiler：用来将模板字符串编译成JS渲染函数的代码，体积大，效率大
   3. 运行时runtime：用来创建Vue实例，渲染并处理虚拟DOM等代码，体积小，效率高
   4. 如果使用了runtime-only版本，却又写的template，vue会报错：either pre compile the templates into render functions, or use the compiler-included build.
   5. UMD：UMD版本通用的模块版本，支持多种模块方式。vue.js默认文件就是运行时+编译器的UMD版本
   6. CJS：CommonJS版本用来配合老的打包工具比如browserify或webpack1
   7. ESM：从2.6开始Vue会提供两个ESM构建文件，为现代打包工具提供的版本

----

1. 分析full版本vue.js
   1. 从**src/platform/web/entry-runtime-with-compiler.js**入口开始
      1. **重写**了平台相关的$mount方法
      2. el不能是body或者html标签
      3. 如果没有render，**把template转换成render函数**，还有一个staticRenderFns，都会挂载到options下
      4. 如果有render方法，直接调用mount挂载DOM（该mount是runtime/index，也就是下面2中定义的mount）
      5. 注册了Vue.compile方法，传递一个HTML字符串返回render函数
   2. **src/platforms/web/runtime/index.js**
      1. 被上面所引用（`import Vue from './runtime/index'`）
         1. entry-runtime入口也是直接引用的该文件 
      2. 注册和平台相关的全局指令：v-model、v-show
      3. 注册和平台相关的全局组件：v-transition、v-transition-group
      4. 全局方法
         1. \__patch__: 把虚拟DOM转换成真实DOM
         2. $mount: 挂载方法
   3. **src/core/index.js**
      1. 被上面所引用（`import Vue from 'core/index'`）
      2. 与平台无关
      3. 设置了Vue的静态方法和属性
         1. initGlobalAPI(Vue)
            1. Vue.options[components/directives/filters] = Object.create(null)
            2. extend(Vue.options.components, builtInComponents)，只是简单的添加属性，添加了keep-alive组件
            3. initUse(Vue)，注册插件。在Vue上添加use方法，接收一个plugin参数，先看Vue的_installedPlugins上有没有缓存过该plugin，没有则加，如果plugin有install属性且为函数，调用，否则如果本身为函数，调用。
            4. initMixin，在Vue上添加mixin方法，主要是用mergeOptions将参数配置混入到Vue的options配置中
            5. initExtend，在Vue上添加extend方法，返回了一个以Vue为原型的构造函数，一般用于函数式/编程式的自定义组件。[参考掘金文章](https://juejin.im/post/5dd0a028e51d4507fc7252f6)，注意文末与Vue.component的区别
            6. initAssetRegisters，注册directive，component，filter方法。
               1. 三个方法参数一致，都是id，definition(非必传)。
               2. 只传id，表示获取，返回this.options[type + 's']\[id]，参考上面的1
               3. 如果type是component，且definition是个plain object，调用5中定义的Vue的extend(definition)，赋值给definition
               4. 如果是type是directive，且definition是个function，definition={bind: defi, update: defi}
               5. 最后，this.options[type+'s']\[id] = definition。注册了全局的指令或者组件
         2. 设置了config, set, delete, nexttick等静态方法与属性
   4. **src/core/instance/index.js**
      1. 被上面所引用（import Vue from './instance/index'）
      2. 与平台无关
      3. Vue实例所在文件，定义了构造函数，**调用了this._init(options)方法，是vue的核心入口**
      4. 给Vue中混入了常用的实例成员
         1. initMixin：添加Vue.prototype._init
         2. stateMixin: 在原型上注册$data，$prop，$set，$delete，$watch
         3. eventsMixin: 注册$on，$once，$off，$emit
         4. lifecycleMixin：注册_update，$forceUpdate，$destroy
         5. renderMixin：$nextTick，_render

----

1. 上面4中在构造函数㕯，调用了this._init方法，该方法在initMixin中定义

   1. merge了传入的option与之前初始化的构造函数（3中）的option
   2. 定义vm._renderProxy，可能将vm或者Proxy对象赋值给它，设置了渲染时的代理对象
   3. initLifecycle：添加到父组件parent的$children数组中。同时初始化该vm的$parent，$root，$children，$ref等
   4. initEvents：定义_events，获取父组件上附加的事件，注册到当前组件
   5. initRender：定义$slots，$scopedSlots，_c用于将template编译为render函数，$createElement用于手动传入render函数中的h，两者都调用了createElement方法(类似snabbdom中的h函数)，最后一个参数不一样。定义了$attrs和$listeners
   6. callHook：触发beforeCreate函数
   7. initInjections：vue的依赖注入功能，找到$option中的inject的key，从vm的_provided中找到对应的结果（找不到则继续往$parent上找）。找到后defineReactive(vm, key, result[key])，添加到vm上
   8. initState：
      1. initProps，将每个prop进行响应式处理后存在vm._props中，且proxy到vm上方便使用
      2. initMethods，vm[key] = bind(methods[key], vm)
      3. initData，将每个data挂到vm上，并响应式处理
      4. initComputed
      5. initWatch
   9. initProvide：vue的依赖注入功能，将$options中的provide取出，加到vm._provided上
   10. callHook：触发created函数
   11. 调用vm.$mount(vm.$options.el)，挂载页面

2. 看渲染过程，继续从上面的vm.$mount入手

   1. $mount显然是entry-runtime-with-compiler.js中重写的那个

   2. 获取render函数，没有的话，将template（没有的话，通过el获取template）转换成render函数，还有一个staticRenderFns，都会挂载到options下

   3. 调用$mount方法，该方法是定义在runtime/index.js中的那个

      1. 重新获取el，因为有可能是运行时模式直接进来的，紧接着调用**mountComponent**

      2. 在mountComponent中

         1. 判断是否有render函数，不管是full模式还是运行时模式，走到这一步应该都有render函数，没有的话会做相应的提示

         2. 触发beforeMount

         3. 定义`updateComponent = () => { vm._update(vm._render(), hydrating) }`，vm.\_render()会调用用户传入的render或者编译器生成的render，返回虚拟DOM，vm.\_update会将其转化为真实DOM

         4. ```js
            new Watcher(vm, updateComponent, noop, {
              before () {
                if (vm._isMounted && !vm._isDestroyed) {
                  callHook(vm, 'beforeUpdate')
                }
              }
            }, true /* isRenderWatcher */)
            ```

         5. 触发mounted

         6. 执行完后，返回vm

   4. entry-runtime-with-compiler.js中的$mount执行完

3. _init执行完，core/instance/index.js中，Vue的构造函数执行完

----

