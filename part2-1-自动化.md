1. npm scripts是实现自动化构建工作流的最简方式

2. 如果不想被npm scripts中的钩子函数阻塞，可以用npm-run-all模块，再用run-p同时跑任务

   ```
   "build": "sass scss/main.scss css/style.css --watch",
   "serve": "browser-sync . --files \"css/*.css\"\",
   "start": "run-p build serve"
   ```

3. 对于复杂的应用，常用的自动化构建工具

   1. Grunt：插件生态完善，工作过程基于临时文件实现，文件读写操作较多，因此比较慢
   2. Gulp：基于内存去实现，相对于磁盘读写，快了很多，使用方式更为直观易懂
   3. FIS：相对于前两个这种微内核的特点，更像是捆绑套餐，将功能集成在内部

