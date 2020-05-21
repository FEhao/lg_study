1. this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

2. 当一个函数被调用时，会创建一个活动记录(有时候也称为执行上下文)。这个记录会包 含函数在哪里被调用(调用栈)、函数的调用方法、传入的参数等信息。this 就是记录的 其中一个属性，会在函数执行的过程中用到。

3. 隐式绑定

   1. 对象属性引用链中只有最顶层或者说最后一层会影响调用位置：

   2. ````js
      function foo() {
        console.log(this.a)
      }
      
      var obj2 = {a: 42, foo: foo}
      var obj1 = {a: 2, obj2: obj2}
      
      obj1.ojb2.foo() // 42
      ````

   3. ````js
      // 隐式丢失
      // 虽然bar是obj.foo的一个引用，但实际上它引用的是foo函数本身，因此bar()其实是一个不带任何修饰的函数调用，因此应用了默认绑定
      function foo() {
        console.log( this.a );
      }
      var obj = { a: 2, foo: foo };
      var bar = obj.foo;
      var a = "oops, global"; // a 是全局对象的属性 bar(); // "oops, global"
      ````

4. 显式绑定

   1. ````js
      function foo() {
      	console.log(this.a)
      }
      var obj = {
        a: 2
      }
      foo.call(obj) //	2
      // 如果传入一个原始值（字符串类型，布尔类型或数字类型）来当做this的绑定对象，这个原始值会被转换成它的对象形式
      ````

   2. 由于硬绑定是一种非常常用的模式，所以在 ES5 中提供了内置的方法 Function.prototype. bind

   3. ````js
      // API调用的“上下文”
      // 第三方库的许多函数，以及 JavaScript 语言和宿主环境中许多新的内置函数，都提供了一 个可选的参数，通常被称为“上下文”(context)，其作用和 bind(..) 一样，确保你的回调 函数使用指定的 this
      function foo(el) {
      	console.log( el, this.id );
      }
      var obj = {
      	id: "awesome"
      };
      // 调用 foo(..) 时把 this 绑定到 obj [1, 2, 3].forEach( foo, obj );
      // 1 awesome 2 awesome 3 awesome 实际上就是通过 call(..) 或者 apply(..) 实现了显式绑定
      ````

5. new绑定

   1. ````js
      function foo(a) {
        this.a = a
      }
      var bar = new foo(2)
      console.log(bar.a) // 2
      ````

6. 判断this

   1. 函数是否在new中调用(new绑定)?如果是的话this绑定的是新创建的对象。 var bar = new foo()

   2. 函数是否通过call、apply(显式绑定)或者硬绑定调用?如果是的话，this绑定的是 指定的对象。var bar = foo.call(obj2)

   3. 函数是否在某个上下文对象中调用(隐式绑定)?如果是的话，this 绑定的是那个上 下文对象。

      var bar = obj1.foo()

   4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定到 全局对象。var bar = foo()
   
7. ES6 中的箭头函数并不会使用四条标准的绑定规则，而是根据当前的词法作用域来决定 this，具体来说，箭头函数会继承外层函数调用的 this 绑定(无论 this 绑定到什么)。这 其实和 ES6 之前代码中的 self = this 机制一样。

