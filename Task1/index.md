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

