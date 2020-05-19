1. 类型安全：强类型，弱类型

   1. 强类型中不允许任意的隐式类型转换
   2. 应该在编译阶段而不是运行阶段报错，例如path.dirname(111) 会报TypeError，但依旧是运行阶段的抛出的异常
   3. 变量类型允许随时改变的特点，不是强弱类型的差异

2. 类型检查：静态类型，动态类型

   1. 静态：一个变量声明时它的类型就是明确的，不可被修改
   2. 动态：在运行阶段才能明确，且可以变换（JS没有编译环节，所以无法作静态检查）

3. Flow通过添加类型注解进行限制，生产环境可以通过babel或官方模块去除注解

4. Flow中mixed类型和any类型区别在于any依旧是弱类型，mixed是强类型

   1. ````js
      function parseMixed(val: mixed) {
      	value.substr(1)
        value * value //	类型不一致，会报错，可以typeof分别处理，如果是any，不会
      }
      ````

5. Flow对不同运行环境内置了API，比如

   1. ````js
      const element: HTMLElement | null = document.getElementById('app') // 参数为string，且可以从HTMLElement查看详细定义
      ````

6. Typescript = Javascript + 类型系统 + ES6+，支持ES6+

7. yarn tsc --init 可以自动生成tsconfig.json文件，另外，直接tsc xxx.js不会使配置文件生效，需要配置文件目录（如src），再进行yarn tsc

8. 配置文件中，如果target为es5，则无法使用es6中的新特性，如Symbol(), Promise，因为没有对应的lib.d.ts文件，解决方法，target改为es2015，或者在lib字段中添加es2015，注意还得加上DOM，因为单独加会覆盖掉这些默认的lib

> "lib": ["ES2015", "DOM"]

9. yarn tsc --locale zh-CN可以将错误提示改为中文，vscode中的提示去preference里搜typescript locale改 （还是建议使用英文）

10. ts作用域问题，一般不会遇到，因为平时都是以模块的方式写不同的文件，demo重复定义一个变量则会报错，因而可都加上export {}避免

11. ````js
    const foo: object = function (){} // [] // {}
    ````

12. ````js
    enum PostStatus = {
      Draft，
      UnpublishedL，
      PublishedL
    } //	枚举功能，可分配不同字符串，或数字，默认是index
    //	注意，枚举不像其他类型一样经过编译后会被移除，枚举会被编译为一个双向的键值对对象（可通过键获取值，可通过值获取键，如：PostStatus[0] 可得到'Draft'，实际开发中不需要此功能可在enum前加上const，则不会被编译成对象）
    ````

13. ````js
    function sum(a: number, b: number, ...rest: number[])
    ````

14. 