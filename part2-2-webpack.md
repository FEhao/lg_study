1. 模块打包工具的由来

   1. ESM存在环境兼容问题
   2. 模块文件过多，网络请求频繁
   3. 所有前端资源都需要模块化

2. webpack有个none模式，没有任何优化操作

3. 图片资源既可以用file-loader进行单独处理，也可以用url-loader当做url资源处理

4. 小文件使用Data URLs，减少请求次数；大文件单独提取存放，提高加载速度

5. 常用加载器分类：

   1. 编译转换类：css-loader
   2. 文件操作类：file-loader
   3. 代码检查类：eslint-loader

6. webpack模块加载方式

   1. 遵循ESM标准的import声明
   2. 遵循CJS标准的require函数
   3. 遵循AMD标准的define函数和require函数；
   4. *loader加载的非JS也会触发资源加载，如样式代码中的@import指令和url函数
   5. *html代码中图片标签的src属性

7. loader

   1. 自定义loader时，如果返回的不是js代码，会提示`You may need an additional loader to handle the result of these loaders`，所以，要么这个loader返回一段js代码，要么再去pipe其他的loader再做进一步的转换

   2. 返回js:

      ```js
      const marked = require("marked");
      
      module.exports = (source) => {
        const html = marked(source);
      
        return `module.exports = ${JSON.stringify(html)}`;	可
      }; 
      
      //	bundle.js
      (function(module, exports) {
      
      module.exports = "<h1 id=\"markdown\">markdown</h1>\n<p>texttext</p>\n"
      
      /***/ })
      
      // 改为export default也可
       (function(module, __webpack_exports__, __webpack_require__) {
      
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony default export */ __webpack_exports__["default"] = ("<h1 id=\"markdown\">markdown</h1>\n<p>texttext</p>\n");
      
      /***/ })
      
      ```

   3. 交给下个loader: 

      ```js
      rules: [
            {
              test: /.md$/,
              use: [
                'html-loader',
                './markdown-loader'
              ]
            }
          ]
      //	结果
      /***/ (function(module, exports) {
      
      // Module
      var code = "<h1 id=\"markdown\">markdown</h1>\n<p>texttext</p>\n";
      // Exports
      module.exports = code;
      
      /***/ })
      
      ```

8. 

9. Plugins通过钩子机制实现

   1. 插件会获取一个compiler传参，里面包含了配置信息以及多个钩子
   
   2. 插件必须得是我一个函数或者包含apply方法的对象
   
   3. 默认打包出来的js会有很多*号，这里写个插件去掉它们
   
      ```js
      class MyPlugin {
        apply(compiler) {
          console.log("plugin start");
          compiler.hooks.emit.tap("MyPlugin", (compilation) => {
            //  compilation => 可以理解为此次打包的上下文
            for (const name in compilation.assets) {
              if (name.endsWith(".js")) {
                const contents = compilation.assets[name].source()
                const withoutCommnets = contents.replace(/\/\*\*+\*\//g, '')
                compilation.assets[name] = {
                  source: () => withoutCommnets,
                  size: () => withoutCommnets.length
                }
              }
            }
          });
        }
      }
      ```
   
   4. --watch，webpack自带监视功能，即可以更新dist目录，再搭配类似browser sync这样的插件，监听dist目录，即可完成常规的实时更新功能。但这里涉及到两次I/O读写，效率低
   
   5. dev server集成了自动编译与自动刷新浏览器等功能，提供了cli直接使用。直接`yarn webpack-dev-server`时，会自动打包并监听，打包结果存放在内存中。在开发阶段，静态资源一般都不需要copy插件复制到dist目录下，避免每次更新频繁重复执行打包任务（生产环境需要），所以这里需要单独配置下devServer中的contentBase去额外为开发服务器指定查找资源目录
   
   6. 一般项目都是同源部署，所以不需要开CORS，但本地存在开发阶段接口跨域问题
   
      ```js
      devServer: {
        proxy: {
          '/api': {
            target: 'https://api.github.com',
              pathRewrite: {
                '^/api': ''
              },
              changeOrigin: true
          }
        }
      }
      ```
   
   7. #### 问题：为什么cors，本地通过changeorigin就可以绕过限制
   
   8. 
