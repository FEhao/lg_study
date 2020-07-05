import { h, init } from 'snabbdom'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

const patch = init([
  style,
  eventlisteners
])

let test = h('p', 'ssssssssss')

let vnode = h('div', {
  style: {
    color: 'red',
  },
  on: {
    click: event
  }
}, test)

const app = document.querySelector('#app')

patch(app, vnode)

function event() {
  console.log(111)
}