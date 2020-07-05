import { h, init } from 'snabbdom'

// 参数：数组，模块
// 返回值：patch函数，作用对比两个vnode的差异更新到真实DOM
let patch = init([])
// 第一个参数：标签 + 选择器
// 第二个参数：如果是字符串的话就是标签中的内容
let vnode = h('div#container.cls', {
  hook: {
    init(vnode) {
      console.log(vnode.elm)
    },
    create(emptyVnode, vnode) {
      console.log(vnode.elm)
    }
  }
}, 'test')

let app = document.querySelector('#app')

// 第一个参数：可以使DOM元素，内部会转换成vnode
// 第二个参数：vnode
// 返回值：vnode

let oldValue = patch(app, vnode)

vnode = h('div', 'test2')

patch(oldValue, vnode)