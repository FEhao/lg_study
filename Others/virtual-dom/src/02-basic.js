import { h, init } from 'snabbdom'

const patch = init([])

const vnode = h('div#container', [
  h('h1', 'h1, test'),
  h('p', 'p test')
])

const app = document.querySelector('#app')

let oldVnode = patch(app, vnode)

console.log(oldVnode)