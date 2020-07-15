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
5. 分析full版本vue.js
   1. 从**src/platform/web/entry-runtime-with-compiler.js**入口开始
      1. el不能是body或者html标签
      2. 如果没有render，把template转换成render函数
      3. 如果有render方法，直接调用mount挂载DOM
      4. 重写了平台相关的$mount方法
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
      3. 设置了Vue的静态方法，initGlobalAPI(Vue)，设置了set, delete, nexttick等静态方法
   4. **src/core/instance/index.js**
      1. 被上面所引用（import Vue from './instance/index'）
      2. 与平台无关
      3. Vue实例所在文件，定义了构造函数，**调用了this._init(options)方法，是vue的核心入口**
      4. 给Vue中混入了常用的实例成员，通过initMixin(Vue)等方法，混入了$data, $prop等

