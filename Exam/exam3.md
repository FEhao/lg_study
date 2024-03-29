## 简答题

#### 1. 谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决的问题或者带来的价值

**答:** 

工程化本质上就是将前端开发流程，标准化，模块化，工具化，自动化，简单化，通过规范和工具来提搞开发效率及应用质量，让开发者能更加专注于开发。

1. 在业务开发中，为了保证或者约束代码风格，可以在工程化中配置lint检查，在单个项目中保证了代码风格的统一，lint规则也可以定下开发团队内部统一的标准，封装成可引用的lint依赖，跨项目使用。
2. 因为业务需要，h5开发占多数，为了避免重复性开发，可以抽离出通用的组件库，如UI组件库，utils库，提高开发效率。
3. 开发阶段，经常需要等待后端接口开发完才能联调，可以将这个环节配置mock服务，后端写完接口文档后自动生成mock接口，完成开发阶段的调试。
4. 普通的上线流程，手动操作较多，利用工程化中的持续集成，可实现自动编译，测试，发布。



#### 2. 你认为脚手架除了为我们创建项目结构，还有什么更深的意义

**答:**

脚手架本质上是方案的封装，可以用来创建项目结构，那也就意味着里面的项目结构是一套已经定型的，成熟且适用的方案，开发者不用再去从0开始搭建项目，也避免了开发风格不一导致的项目结构差异的问题，大大提高了开发效率，这也是工程化的一部分。



## 编程题

#### 1. 概述脚手架实现的过程，并使用NodeJS完成以个自定义的小型脚手架工具

**答:**

实现过程：

	1. 创建一个node项目，并npm init初始化
 	2. 创建命令行脚本，如cli.js，在文件头部加上`#!/usr/bin/env node`使得其运行环境为node
 	3. 通常，新创建的文件不允许被直接执行，需要通过`>>> chmod +x cli.js`改变文件执行权限
 	4. 在js文件中写入脚手架逻辑
 	5. 在package.json中加入bin字段，用来指定各个内部命令对应的可执行文件的位置
 	6. 使用`npm link`使其在本地能被当做全局命令来使用，或者通过npm publish发布
 	7. 在其他项目中使用

代码：`code/mini-scaffolding`

讲解：`mini-scaffolding.explain.mov`

#### 2. 尝试使用Gulp完成项目的自动化构建

**答:**

代码：`code/gulp`

讲解：`gulp.explain.mov`

#### 3. 使用Grunt完成项目的自动化构建

**答:**

代码：`code/grunt`

讲解：`grunt.explain.mov`




