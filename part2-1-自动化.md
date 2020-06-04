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

      
