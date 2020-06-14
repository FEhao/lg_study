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

   4. 







//	todo:

	1.  none打包后分析bundle结构,6
 	2.  入口是css时分析bundle,7
 	3.  图片资源是如何体现在bundle里的 9

