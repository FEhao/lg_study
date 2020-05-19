## Proxy ##

> const  p = new Proxy(target, handler)

target: 要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

handler: 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为。

> Proxy


| handler                  | trap                                        |
| ------------------------ | ------------------------------------------- |
| getPrototypeOf           | Object.getPrototypeOf                       |
| setPrototypeOf           | setPrototypeOf                              |
| isExtensible             | isExtensible                                |
| preventExtensions        | preventExtensions                           |
| getOwnPropertyDescriptor | getOwnPropertyDescriptor                    |
| defineProperty           | defineProperty                              |
| has                      | in                                          |
| get                      | defineProperty                              |
| set                      | defineProperty                              |
| deleteProperty           | delete                                      |
| ownKeys                  | getOwnPropertyNames / getOwnPropertySymbols |
| apply                    |                                             |
| construct                | new                                         |

**无操作转发代理**

```js
// 在以下例子中，我们使用了一个原生 JavaScript 对象，代理会将所有应用到它的操作转发到这个对象上。
let target = {};
let p = new Proxy(target, {});

p.a = 37;   // 操作转发到目标

console.log(target.a);    // 37. 操作已经被正确地转发
```

