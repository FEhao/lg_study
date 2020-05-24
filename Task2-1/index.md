1. 为什么要学习函数式编程
   1. 函数式编程随着React的流行收到越来越多的关注
   2. Vue 3也开始拥抱函数式编程
   3. 函数式编程可以抛弃this
   4. 打包过程可以更好地利用tree shaking过滤无用代码
   5. 方便测试，方便并行处理
   6. 有很多库可以帮助我们进行函数式开发：lodash、underscore、ramda
   
2. 函数式编程中的函数指的不是程序中的函数（方法），而是数学中的函数即映射关系

3. 闭包的本质：函数在执行的时候会放到一个执行栈上，当执行完毕后会从栈上移除，**但是堆上的作用域成员因为被外部引用不能释放**，因此内部函数依然可以访问外部函数的成员

4. 纯函数：对于相同的输入永远会有相同的输出，且没有任何可观察的副作用（比如依赖外部状态，则无法保证）。副作用来源：全局变量，配置文件，数据库，获取用户的输入等

5. 纯函数的好处：
   1. 可缓存  
   2. 可测试，让测试更方便  
   3. 并行处理
      1. 在多线程环境下并行操作共享的内存数据很可能会出现意外情况
      2. 纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数（Web Worker）
   
6. 科里化：当一个函数有多个参数的时候，先传递一部分参数调用它（这部分参数以后永远不变），然后返回一个新的函数接收剩余的参数，返回结果
   1. 科里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数
   2. 这是一种对函数参数的“缓存”
   3. 让函数变得更灵活，粒度更小
   4. 可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能
   
7. 科里化的实现（function.length）

8. PointFree：我们可以把数据处理的过程定义成与数据无关的合成运算，不需要用到代表数据的那个参数，只要把简单的运算步骤合成到一起，在使用这种模式之前我们需要定义一些辅助的基本运算函数

   1. 不需要指明处理的函数

   2. 只需要合成运算过程

   3. 需要定义一些辅助的基本运算函数

   4. ````js
      //	非PointFree模式
      //	Hello World => hello_world
      function f(word) {
        return word.toLowerCase().replace(/\s+/g, '_')
      }
      
      //	Point Free
      const fp = require('lodash/fp')
      const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)
      ````

9. Functor(函子)

   1. 容器：包含值和值的变形关系（函数）

   2. 函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理（变形关系）

   3. ````js
      class Container {
        constructor(value) {
          this._value = value
        }
        map(fn) {
          return new Container(fn(this._value))
        }
      }
      
      let r = new Container(5).map(x => x+1).map(x => x * x)
      
      //	改进
      class Container {
        static of (value) {
      		return new Container(value)
        }
        constructor(value) {
          this._value = value
        }
        map(fn) {
          return Container.of(fn(this._value))
        }
      }
      
      let r = Container.of(5).map(x => x+1).map(x => x * x)
      
      ````

   4. 总结：

      1. 函数式编程的运算不直接操作值，而是由函子完成
      2. 函子就是一个实现了map契约的对象
      3. 我们可以把函子想象成一个盒子，这个盒子里封装了一个值
      4. 想要处理盒子中的值，我们需要给盒子的map方法传递一个处理值的函数（纯函数），由这个函数来对值进行处理
      5. 最终map方法返回一个包含新值的盒子（函子）

10. Maybe函子

    1. 我们在编程的过程中可能会遇到很多错误，需要对这些错误做相应处理
    2. Maybe函子的作用就是对外部的空值情况做处理（控制副作用在允许的范围）
    3. 原理其实就加了个内部方法去判断值，举个例子：通过则MayBe.of(fn(this._value))，未通过则MayBe.of(null)

11. Either函子

    1. 用于兼容异常

    2. ````js
       class Left {
         static of (value) {
           return new Left(value)
         }
         
         constructor (value) {
       		this._value = value
         }
         
         map(fn) {
           return this
         }
       }
       
       class Right {
         static of (value) {
           return new Right(value)
         }
         
         constructor (value) {
       		this._value = value
         }
         
         map(fn) {
           return Right.of(fn(this._value))
         }
       }
       
       function parseJSON(str) {
         try {
           return Right.of(JSON.parse(str))
         } catch(e) {
           return Left.of({ error: e.message })
         }
       }
       ````

12. IO函子

    1. _value是一个函数，这里是把函数作为值来处理

    2. 可以把不纯的动作存储到_value中，延迟执行这个不纯的操作（惰性执行），包装当前的操作

    3. 把不纯的操作交给调用者来处理

    4. ````js
       const fp = require('lodash/fp')
       class IO {
         static of (value) {
           return new IO(function() {
             return value
           })
         }
         
         constructor (fn) {
           this._value = fn
         }
         
         map(fn) {
           //	把当前的value和传入的fn组合成一个新的函数
           return new IO(fp.flowRight(fn, this._value))
         }
       }
       
       let r = IO.of(process).map(p => p.execPath)
       console.log(r._value())
       ````

13. Task函子：处理异步任务

14. Pointed函子

    1. 是为了实现of静态方法的函子

    2. of方法是为了避免使用new来创建对象，更深层的含义是of方法用来把值放在上下文Context（把值放到容器中，使用map来处理值）

    3. ````js
       class Container {
         static of (value) {
           return new Container(value)
         }
         ...
       }
       Container.of(2)	//获取上下文
         .map(x => x)
       ````

15. Monad函子：

    1. 可以变扁的Pointed函子

    2. 一个函子如果具有join和of两个方法并遵守一些定律就是一个Monad

    3. ````js
       const fs = require('fs')
       const fp = require('lodash/fp')
       
       class IO {
         static of (value) {
           return new IO(function() {
             return value
           })
         }
         
         constructor (fn) {
           this._value = fn
         }
         
         map(fn) {
           return new IO(fp.flowRight(fn, this._value))
         }
       }
       //	不纯的操作，依赖外部文件
       let readFile = function (filename) {
         return new IO(function () {
           return fs.readFileSync(filename, 'utf-8')
         })
       }
       
       let print = function (x) {
         return new IO(function () {
           console.log(x)
           return x
         })
       }
       
       let cat = fp.flowRight(print, readFile)
       let r = cat('package.json')._value()._value()
       //	第一个_value是print IO中的function，第二个是readFile IO中的function
       ````

    4. ````js
       //	上面代码改进：
       const fs = require('fs')
       const fp = require('lodash/fp')
       
       class IO {
         static of (value) {
           return new IO(function() {
             return value
           })
         }
         
         constructor (fn) {
           this._value = fn
         }
         
         map(fn) {
           return new IO(fp.flowRight(fn, this._value))
         }
         join() {
           return this._value()
         }
         
         flatMap(fn) {
           return this.map(fn).join()
         }
       }
       let readFile = function (filename) {
         return new IO(function () {
           return fs.readFileSync(filename, 'utf-8')
         })
       }
       
       let print = function (x) {
         return new IO(function () {
           console.log(x)
           return x
         })
       }
       //	优化了调用方式
       let r = readFile('package.json').flatMap(print).join()
       //let r = readFile('package.json').map(fp.toUpper).flatMap(print).join()
       ````

    5. 