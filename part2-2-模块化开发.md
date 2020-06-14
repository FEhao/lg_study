1. 模块化演变过程

   1. 文件划分方式
      1. 污染全局作用域
      2. 命名冲突问题
      3. 无法管理模块依赖关系
   2. 命名空间方式
      1. 没有私有空间，模块成员在外部可被修改
      2. 无法管理模块依赖关系
   3. IIFE
   4. CommonJS
      1. 一个文件就是一个模块
      2. 每个模块都有单独的作用域
      3. 通过module.exports导出成员
      4. 通过require函数
   5. AMD（require.js）
      1. 使用起来相对复杂
      2. 模块js文件请求频繁

2. 模块化标准规范

   1. ES Modules + CommonJS

   2. ES Modules

      1. 对于支持的环境，可以在script中加入type="module"直接使用
      2. module模式下，自动采用use strict，如this为undefined而不是window
      3. 每个ES Module都是运行在单独的私有作用域中
      4. ESM是通过CORS的方式请求外部JS模块的
      5. ESM的script标签会延迟执行脚本，等同于defer属性
      6. 导入模块时，必须使用完整路径（除非用打包工具），也可用绝对路径

   3. export { name, age }，这里{}是固定写法，并不是对象字面量；export default { name, age }是对象字面量。import { xxx, xxx } from 'xxx'中的{}也是固定写法，而非对象

   4. export导出的是引用，如果a中引用了b的变量xxx，相当于在a里const xxx = xxx，在b里修改会更新a中的xxx，但在a中修改，不会影响到b（除非是对象之类的引用）

   5. 动态加载模块

      ```js
      import('./module.js').then(module => {
      	console.log(module)
      })
      ```

   6. 同时import普通成员和默认成员

      ```js
      import {name, age, default as title} from 'xxx'
      import title, {name, age} from 'xxx'
      ```

   7. 对于不支持es6的，可直接引入相关polyfill的script，需要加上nomodule属性，否则module脚本会执行两次（通常还是不直接使用polyfill，效率低）

   8. nodejs8.5后开始支持ESM，需要.js改为.mjs，运行时会提示

      `(node:9379) ExperimentalWarning: The ESM module loader is experimental.`

   9. node中同样也支持对原生模块，第三方npm模块的import引用，如：

      `import fs from 'fs'`

      但对第三方npm暂不支持命名导出（named exports），因为导出的都是默认成员，如

      `import { camelCase } from lodash`

   10. ESM可以import CMJ，反之不可被require，注意CMJ模块始终只会导出一个默认成员，所以在ESM里import时无法直接提取成员，仍注意，import不是解构导出对象

   11. CMJ的内置全局变量，如require, module, exports,  \__filename, __dirname在ESM中无效。可替换为import, export, 

       ```js
       import { fileURLToPath } from 'url'
       import { dirname } from 'path'
       const __filename = fileURLToPath(import.meta.url)
       const __dirname = dirname(__filename)
       ```

       实际上CMJ中的这几个也不是全局变量，而是node对所有的CMJ都包裹一层函数，传入了这几个变量

   12. 新版本Node中可在package.json里设置type: "module"，那么目录下的js都会被当做mjs处理，会影响到CJS的使用，如无法识别require，需要设置成.cjs

   13. 老版本的node可以用babel使得ESM正常使用

