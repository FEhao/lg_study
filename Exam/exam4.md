一、
1、Webpack 的构建流程主要有哪些环境？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

webpack有三中环境，对应配置中的`mode`, 共有三种值，分别是`none`，`development`和`production`（默认），每种都对应不同的具体默认配置，主要区别是

| 模式          | 特点                                                         |
| :------------ | :----------------------------------------------------------- |
| `development` | 将`DefinePlugin`中的`process.env.NODE_ENV`设为`development`。使用`NamedChunksPlugin`，`NamedModulesPlugin` |
| `production`  | 将`DefinePlugin`中的`process.env.NODE_ENV`设为`production`。开启以下插件：`FlagDependencyUsagePlugin` , `FlagIncludedChunksPlugin` , `ModuleConcatenationPlugin` , `NoEmitOnErrorsPlugin` , `OccurrenceOrderPlugin` , `SideEffectsFlagPlugin` 与 `TerserPlugin`。 |
| `none`        | 不会有任何优化配置                                           |

打包过程：

1. 从配置文件与命令行中获取配置参数
2. 初始化Compiler对象，加载所有配置的插件，开始执行编译
3. 从配置中的入口文件出发，调用配置的loader对模块进行处理，对于模块所依赖的其他模块，结合对应的loader进行递归处理
4. 根据chunk配置，会将各个模块组装成Chunk，再把Chunk转换成一个单独的文件加入到输出列表
5. 确定输出内容后，根据配置确定输出的路径和文件名，将文件写入系统
6. 以上过程中，webpack会在特定的时间点广播出特定的事件，插件在监听到注册的事件后会执行特定的逻辑，并且插件可以调用webpack提供的api，改变运行结果

2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

二、
1、使用 Webpack 实现 Vue 项目打包任务
具体任务及说明：

先下载任务的基础代码：https://github.com/lagoufed/fed-e-001/raw/master/tasks/02-02-base-code.zip

这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构

有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）

这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务

尽可能的使用上所有你了解到的功能和特性
