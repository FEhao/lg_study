1. 一切重复的工作都应该被自动化

   1. 创建项目
      1. 创建项目结构
      2. 创建特定类型文件
   2. 编码
      1. 格式化代码
      2. 校验代码风格
      3. 编译/构建/打包
   3. 预览/测试
      1. Web Server/Mock
      2. Live Reloading/HMR
      3. Source Map
   4. 提交
      1. git hooks
      2. lint-staged
      3. 持续集成
   5. 部署
      1. CI/CD
      2. 自动发布

2. 脚手架（如vue-cli）更多的是工程化的集成，而不单单只是创建项目模板

3. Yeoman

   1. 比vue，react，ag脚手架更为通用，可根据不同的generator创建不同的项目

      1. 全局安装yo
      2. 安装对应的generator，如generator-node
      3. 通过yo运行generator

      ````js
      yo node
      ````

   2. 有时候只需要在已有项目上添加一些特定类型的文件，可以用到sub generator

      1. 比如添加一个cli工具：yo node:cli
      2. 全局使用的话需要yarn link
      3. 生成后可以全局使用，如my-module --help
      4. 不是每个generator都有sub generator，需在官网查看

   3. 使用步骤

      1. 明确需求
      2. 找到合适的generator
      3. 全局范围安装找到generator
      4. 通过yo运行对应的generator
      5. 通过命令行交互填写选项
      6. 生成所需要的项目结构

   4. 自定义generator

      1. 本质上就是一个npm模块
      2. 基本结构
         1. ![avatar](../Images/generator.jpg)
      3. 名字格式为generator-xxx


