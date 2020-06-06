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
   
4. Grunt

   1. 基本语法

      ```js
      module.exports = grunt => {
        //  yarn grunt task_name(like foo, or ignore it to run default)
        grunt.registerTask('foo', () => {
          console.log(123)
        })
        
        grunt.registerTask('bar', '任务描述', () => {
          console.log(123)
        })
      
        // grunt.registerTask('default', () => {
        //   console.log(123)
        // })
      
        grunt.registerTask('default', ['foo', 'bar'])
      
        grunt.registerTask('async-task', function() {
          const done = this.async()
          setTimeout(() => {
            console.log('async works')
            done()
          }, 2000);
        })
      }
      ```

   2. 如果某个task里返回false，则认为失败，后续任务也会停止，用--force可以强制执行，对于异步任务，done(false)则认为失败

   3. 配置选项方法

      ```js
      grunt.initConfig({
      	foo: 'bar'
      })
      grunt.registerTask('foo', () => {
      	console.log(grunt.config('foo'))
      })
      ```

   4. 多目标任务

      ```js
      grunt.initConfig({
        build: {
          options: {
            foo: 'bar'
          },
          css: {
            options: {
              foo: 'bar'
            }
          },
          js: '2'
        }
      })
      grunt.registerMultiTask('build',  function() {
        console.log(this.options())
        console.log(this.target, this.data)
      })
      // 1. 必须同名，都为build
      // 2. 除了options关键词外，其他都是子任务名
      // 3. 子任务options会覆盖外层options
      ```

5. Grunt插件

   ```js
   grunt.initConfig({
     clean: {
     	temp: 'test/**'
   	}
   })
   grunt.loadNpmTasks('grunt-contrib-clean')
   ```

6. 常用插件

   1. grunt-sass

      ```js
      grunt.initConfig({
        sass: {
          options: {
            sourceMap: true,
            implementation: sass,
          },
          main: {
            files: {
              "dist/css/main.css": "src/scss/main.scss",
            },
          },
        },
      });
      grunt.loadNpmTasks("grunt-sass");
      ```

   2. babel

      ```js
      babel: {
        options: {
          presets: ['@babel/preset-env']
        },
          main: {
            files: {
              'dist/js/app.js': 'src/js/app.js'
            }
          }
      }
      //	避免grunt.loadNpmTasks(xxx)，可用load-grunt-tasks
      ```

   3. watch

      ```js
      //	grunt-contrib-watch
      watch: {
        js: {
          files: ['src/js/*.js'],
          task: ['babel']
        },
        css: {
          files: ['src/scss/*.scss'],
          task: ['sass']
        }
      }
      ```

7. Gulp

   1. 新版本gulp已取消同步模式，需要接受一个参数done，手动调用done()结束任务

      ```js
      exports.foo = done => {
      	console.log(1)
      	done()
      }
      >>> yarn gulp foo
      ```

   2. 组合任务

      ```js
      const { series, parallel } = require('gulp')
      // 并行
      exports.foo = parallel(task1, task2, task3)
      // 串行，得等到done执行才会执行下个任务
      exports.foo = series(task1, task2, task3)
      ```

   3. 异步任务

      ```js
      // 除了done的方式完成任务，还支持Promise, async, stream
      exports.promise = () => {
        return Promise.resolve()
      }
      
      exports.promise_error = () = {
        return Promise.reject(new Error('err'))
      }
      
      const timeout = time => {
        return new Promsie(resolve => {
          setTimeout(resolve, time)
        })
      }
      
      export.async = async () => {
        await timeout(1000)
        cosnole.log(11)
      }
      
      exports.stream = () => {
        const readStream = fs.createReadStream('package.json')
        const writeStream = fs.createWriteStream('temp.txt')
      
        readStream.pipe(writeStream)
        return readStream
        // return这行和下面一样
        // readStream.on('end', () => {
        //  done()
        // })
      }
      ```

   4. 基本构建过程

      ```js
      exports.stream = () => {
        const readStream = fs.createReadStream('index.css')
        const writeStream = fs.createWriteStream('index.min.css')
        //  核心转换过程
        const transform = new Transform({
          transform: (chunk, encoding, callback) => {
            const input = chunk.toString()
            const output =  input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
            callback(null, output)
          }
        })
        readStream.pipe(transform).pipe(writeStream)
        return readStream
      }
      //	读取流 -> 转换流 -> 写入流
      ```

      ```js
      const { src, dest } = require('gulp')
      const cleanCss = require('gulp-clean-css')
      const rename = require('gulp-rename')
      
      exports.default = () => {
      	return src('src/*.css')
      		.pipe(cleanCss())
      		.pipe(rename({ extname: '.min.css' }))
      		.pipe(dest('dist'))
      }
      ```

   5. 实战项目思路（[具体代码](https://github.com/FEhao/zce-gulp-demo/blob/master/gulpfile.js)）

      1. 对于不同类型的文件，方式都是从src路径下pipe到dest路径，中间经过plugins处理

      2. 处理完style，js，html以及图片字体等文件后，可创建一个compile并行任务

         ```js
         const compile = paraller(style, script, page，image, font)
         ```

      3. 对于其他类型的文件如public，直接复制，创建extra任务

         ```js
         const build = paraller(compile, extra)
         ```

      4. 旧目录的清除，创建clean任务（不是gulp插件但支持gulp pipe工作流）

         ```js
         const build = series(clean, paraller(compiler, extra))
         ```

      5. 插件过多可用`gulp-load-plugin`管理，可避免使用前一个个去声明

      6. 热更新`browser-sync`，创建serve任务开启本地服务并监听dist目录下的文件变动

         ```js
         const serve = () => {
           bs.init({
             server: {
               baseDir: 'dist',
               files: 'dist/**',
               routes: {
                 '/node_modules': 'node_modules'
                 // 将html模板中的此类文件代理到本地目录
               }
             }
           })
         }
         ```

      7. 以上只是完成了对dist目录的监听，但开发过程中是对src目录的修改，因此需要加上一步对src目录的监听并自动打包到dist，从而触发完整的更新流程。这里用到gulp自带的watch功能

         ```js
         const serve = () => {
           watch('src/assets/styles/*.scss', style)
           // 省略其他任务
           bs.init(
             ...
           )
         }
         ```

      8. 对于上面加的watch任务，其中有些任务在开发环境是没有必要的，比如图片压缩，为了加快构建速度，可以去掉，并把`init`中的`baseDir`改为`['dist', 'src', 'public']`，意思是如果在dist中找不到，则去它们里找文件

         ```js
         const compile = paraller(style, scripts, page)// 去掉了image，font，extra任务
         
         const develop = series(compile, serve)
         
         const build = series(clean, paraller(compile, image, font , extra))
         ```

         上面去掉了开发环境中没有必要的构建，但也去掉了监听这些文件的功能，因此得加上

         ```js
         watch(
             ["src/assets/images/**", "src/assets/fonts/**", "public/**"], bs.reload
           );
         ```

      9. useref文件引用处理

         上面说到`'/node_modules': 'node_modules'`在开发环境进行了代理，但是在build流程中还没处理，这里会用到useref插件，它会去自动处理html中的构建注释

         ```html
           <!-- build:css assets/styles/vendor.css -->
           <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
           <!-- endbuild -->
           <!-- build:css assets/styles/main.css -->
           <link rel="stylesheet" href="assets/styles/main.css">
           <!-- endbuild -->
         ```

         会将`build`和`endbuild`之间的引用都打包至注释路径中，这个过程中可以进行其他操作，如压缩等

         ```js
         const useref = () => {
           return src("dist/*.html")
             .pipe(
               plugins.useref({
                 searchPath: ["dist", "."],
               })
             )
             .pipe(plugins.if(/\.js$/, plugins.uglify()))
             .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
             .pipe(plugins.if(/\.html$/, plugins.htmlmin()))
             .pipe(dest("dist"));
         };
         
         ```

      10. 上面存在对同一文件读写的问题，为了避免，需要一个temp的dest路径作为中转

      11. 优化构建路径，将普通任务的dest改为temp，image，font，extra因为于ref里的资源无关，仍是dist。useref从temp里取，打包到dist

          ```js
          const compile = paraller(style, scripts, page)// 去掉了image，font，extra任务
          
          const develop = series(compile, serve)
          
          const build = series(clean, paraller(series(compile, useref), image, font, extra))
          ```

      12. 最后暴露出去的方法有`clean`, 'build', 'develop'

   6. 封装自动化构建工作流

      1. 目前上面有了一个可以正常工作的项目，现在把它封装并测试

      2. 新建一个将用于发布的脚手架项目，将原项目的gulpfile.js复制到脚手架项目（后称cli）的index.js，将原项目的dev依赖复制到cli的dependencies，删除原项目中的gulpfiles和dev依赖

      3. 目前还未将脚手架项目上线，在cli中yarn link，再在原项目中yarn link cli-proj-name，此时cli项目会被链接到老项目的node_modules中，老项目中的gulpfile之前已经被删除，现在可以替换成cli中的内容，也就是复制过来的gulpfile。

         ```js
         module.exports = require('cli-proj-name')
         ```

      4. 此时，在老项目中执行gulp build，但gulp，gulp-cli暂时还得当成一个dev依赖安装下，另外，原gulpfile里的data应该以配置文件的形式也提取出来，如提取到应用项目的pages.config.js

         ```js
         let config = {} //	default config
         try {
           const loadConfig = require(`${process.cwd}/page.config.js`)
           config = Object.assign({}, config, loadConfig)
         } catch() {}
         ```

         注意，原项目里的`presets: ['@babel/preset-env']`需要改成``presets: [require('@babel/preset-env')]``，这样会从cli的node_modules中找该模块，否则会报错（原项目已经删除了该依赖）

      5. 原gulpfile中，文件路径较为固定，为了满足开发者需求，可以设为可配置的，加载config里

         ```js
         let config = {
           build: [
             src: 'src',
             dist: 'dist',
             ...
             paths: {
         	  	styles: 'assets/styles/*.scss',
             	scripts: 'assets/scripts/*.js'
             	...
             }
           ]
         }
         //	其他位置涉及到路径都修改。如
         const style = () => {
           return src(config.build.paths.styles, {base: config.build, cwd: config.build.src })
           ...
         }
         ```

      6. 应用到新项目里，目前还必须要配个gulpfile引用，这部分可以优化为

         `yarn gulp build --gulpfile ./node_modules/zce-pages/lib/index.js --cwd .`

         进一步优化，在cli中封装这个命令

         ```js
         // zce-page/bin/zce-pages.js
         #!/usr/bin/env node
         process.argv.push('--cwd')
         process.argv.push(process.cwd())
         process.argv.push('--gulpfile')
         process.argv.push(require.resolve('..'))
         
         require('gulp/bin/gulp')
         
         // 在package.json中需要配置bin
         ```

      7. 发布并使用模块

8. FIS

