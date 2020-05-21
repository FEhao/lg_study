1. ECMAScript提供了基本的语法，JavaScript实现了该语言标准，并且做了扩展

2. JS@web = ES + Web APIs(BOM, DOM)

3. JS@node = ES + Node APIs(fs, net, .etc)
4. 关于作用域：

```javascript
// 注意与var的区别，循环内部也是闭包机制
var elements = [{}, {}, {}]
for (let i = 0; i < elements.length; i++ ) {
	elements[i].onclick = function() {
    console.log(i)
  }
}
```

````javascript
for (let i = 0; i < 3; i++) {
  let i = 'foo'
  console.log(foo)
}
//	两个i在不同作用域，类似下面
{
  let i = 0
  if (i<3) {
    let i = 'foo'
    console.log(i)
  }
  i++
  if (i<3) {
    let i = 'foo'
    console.log(i)
  }
  i++
  if (i<3) {
    let i = 'foo'
    console.log(i)
  }
}
````

5. 带标签的模板字符串

   1. 更高级的形式的模板字符串是带标签的模板字符串。标签使您可以用函数解析模板字符串。标签函数的第一个参数包含一个字符串值的数组。其余的参数与表达式相关。最后，你的函数可以返回处理好的的字符串（或者它可以返回完全不同的东西 , 如下个例子所述），示例代码

      ```js
      var person = 'Mike';
      var age = 28;
      
      function myTag(strings, personExp, ageExp) {
      
        var str0 = strings[0]; // "that "
        var str1 = strings[1]; // " is a "
      
        // There is technically a string after
        // the final expression (in our example),
        // but it is empty (""), so disregard.
        // var str2 = strings[2];
      
        var ageStr;
        if (ageExp > 99){
          ageStr = 'centenarian';
        } else {
          ageStr = 'youngster';
        }
      
        return str0 + personExp + str1 + ageStr;
      
      }
      
      var output = myTag`that ${ person } is a ${ age }`;
      
      console.log(output);
      // that Mike is a youngster
      ```

   2. 可应用于避免XSS攻击

      ````javascript
      function htmlEscape(literals, ...placeholders) {
        return placeholders.reduce(
          (pre, val, i) => 
          	pre + 
          	literals[i] +
          	val
              .replace(/&/g, '&amp;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;'), ''
        	)
         + literals[literals.length - 1]
      
      ````

   3. 可用于模板引擎

6. ````javascript
   var a = [1,2,3]
   console.log(a) // [1,2,3]
   console.log.apply(null, a) //	1,2,3 -> apply接受数组格式参数，将其中每项当参数传给调用的fn
   ````

7. proxy 与 defineProperty: proxy监听的是整个对象而非属性，可代理更多操作，代理对象范围更广，但兼容较差；Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而Object.defineProperty只能遍历对象属性直接修改；

8. Reflect成员方法就是Proxy处理对象的默认实现，Reflect的意义在于统一提供一套用于操作对象的API

9. ````javascript
   var obj = {
     name: '',
     age: 18
   }
   console.log('name' in obj)
   console.log(delete obj['age'])
   console.log(Object.keys(obj))
   //	统一操作
   console.log(Reflect.has(obj, 'name'))
   console.log(Reflect.deleteProperty(obj, 'age'))
   console.log(Reflect.ownkeys(obj))
   ````

10. obj[xxx] = 'value'，会将xxx的toString结果作为key，如xxx为对象的话，则key为[object, Object]，而es6的Map数据结构中，可以按照xxx本身的值保存键值对：

11. ````javascript
    const m = new Map()
    const tom = { name: 'tom' }
    m.set(tom, 90)
    console.log(m)
    console.log(m.get(tom))
    ````

12. Symbol作为新添加的原始类型，最主要的作用就是为对象添加独一无二的属性名，适合作为对象的私有属性，或者作为常量（如Application.DEV = Symbol('dev')）

    1. ````js
       Symbol("foo") !== Symbol("foo")
       const foo = Symbol()
       const bar = Symbol()
       typeof foo === "symbol"
       typeof bar === "symbol"
       let obj = {}
       obj[foo] = "foo"
       obj[bar] = "bar"
       JSON.stringify(obj) // {}
       Object.keys(obj) // []
       Object.getOwnPropertyNames(obj) // []
       Object.getOwnPropertySymbols(obj) // [Symbol(), Symbol()]
       Reflect.ownKeys(obj) // [Symbol(), Symbol()]
       // Symbol.for 方法可以检测上下文中是否已经存在使用该方法且相同参数创建的 symbol 值，如果存在则返回已经存在的值，如果不存在则新建。
       const s1 = Symbol.for('foo');
       const s2 = Symbol.for('foo');
       console.log(s1 === s2); // true
       ````

13. `Symbol.iterator` is a well-known symbol that’s used to assign a special method to objects, which allows them to be iterated over. The built-in types String, Array, TypedArray, Map and Set all have a default Symbol.iterator method which is called when an instance of one of these types is used in a for … of loop, or with the spread operator. Browsers are also starting to use the Symbol.iterator key to allow DOM structures such as NodeList and HTMLCollection to be iterated over in the same way.

14. for of推荐作为遍历所有数据结构的统一方式，可用break终止循环；for of适用于伪数组(arguments, dom节点列表)

15. ***实现Iterable接口就是for...of的前提，如数组，Set，Map都满足该接口（手动实现一个）***

16. 
    1.  ***迭代器模式Iterator***
    2.  ***生成器应用Generator***
    3.  [参考](https://www.cnblogs.com/xiaohuochai/p/7253466.html)

17. ES2016

    1. Array.prototype.includes（之前的indexOf有缺陷，不能用于查找NaN）
    2. 指数运算符：Math.pow(2, 10) -> 2 ** 10

18. ES2017

    1. Object.values

    2. Object.entries

       1. ````javascript
          for (const [key, value] of Object.entries(obj)) {  
          }
          console.log(new Map(Object.entries(obj)))
          ````

    3. Object.getOwnPropertyDescriptors 用于获得属性完整的描述信息

       1. ````javascript
          const p1 = {
            firstname: 'aaa',
            lastName: 'bbb',
            get fullName() {
              return this.firstName + ' ' + this.lastName
            }
          }
          
          const p2 = Object.assign({}, p1)
          p2.firstName = 'test'
          console.log(p2) // 'aaa bbb' Object.assign无法传递属性的描述信息
          
          const descriptors = Object.getOwnPropertyDescriptors(p1)
          const p2 = Object.defineProperties({}, descriptors) 
          p2.firstName = 'test'
          console.log(p2) // test bbb
          ````

    4. String.prototype.padStart/padEnd

    5. Async/Await

19. 在函数参数中添加尾逗号

