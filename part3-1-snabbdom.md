1. h函数

   1. ```js
      var vnode = h('div#container.two.classes', 
                    { on: { click: someFn } }, 
                    [
        h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
        ' and this is just normal text',
        h('a', { props: { href: '/foo' } }, 'I\'ll take you places!')
      ])
      ```

   2. 使用了"重载"，即支持不同数量/类型的参数

   3. 对第二、三个参数进行类型判断，内部赋值了data，即module配置，children，text，子节点，返回`vnode(sel, data, children, text, elm)`

2. vnode函数

   1. ```js
      export interface VNode {
        sel: string | undefined //选择器
        data: VNodeData | undefined //节点数据：属性/样式/事件等
        children: Array<VNode | string> | undefined //子节点，和text只能互斥
        elm: Node | undefined //记录vnode对应的真实dom
        text: string | undefined //节点内容，和children只能互斥
        key: Key | undefined // 优化用
      }
      
      
      export function vnode 
      (
      	sel: string | undefined,
        data: any | undefined,
        children: Array<VNode | string> | undefined, 
        text: string | undefined, 
        elm: Element | Text | undefined 
      ): VNode {
        const key = data === undefined ? undefined : data.key
        return { sel, data, children, text, elm, key }
      }
      
      ```

3. patch函数

   1. vnode函数只是返回了一个对象，patch才是核心内容
   2. patch(oldVnode, newVnode)，把新节点中变化的内容渲染到真实DOM，最后返回新节点作为下一次处理的旧节点
   3. 对比新旧vnode是否相同节点（key, sel相同）
   4. 不同，则删除之前的内容，重新渲染
   5. 相同，再判断vnode是否有text，如果有并且和oldVnode的text不同，直接更新文本内容
   6. 如果新的vnode有children，判断子节点是否有变化，这个过程用到diff算法
   7. diff过程只进行同层级的比较

   ```js
   export function init (modules: Array<Partial<Module>>, domApi?: DOMAPI) {
      const cbs: ModuleHooks = {
       create: [],
       update: [],
       remove: [],
       destroy: [],
       pre: [],
       post: []
     } // 每个module其实就是一个对象，里面包含若干个上面的hook，这里会将modules遍历，将每个里面各个hook，push到cbs对应hook的数组中
     ...
     function emptyNodeAt (elm: Element) {}
     function createRmCb (childElm: Node, listeners: number) {}
     function createElm (vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {}
     function addVnodes{}
     function invokeDestroyHook (vnode: VNode){}
     function removeVnodes (...) {}
     function updateChildren(...) {}
     function patchVnode(...) {}
     return  function patch (oldVnode: VNode | Element, vnode: VNode): VNode {
      	// 现将pre hook中的函数遍历执行
       let i: number, elm: Node, parent: Node
       const insertedVnodeQueue: VNodeQueue = []
       for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]()
       // 如果oldVnode不是vnode(无sel)，有可能是真实dom节点，创建vnode并设置elm
       if (!isVnode(oldVnode)) {
         oldVnode = emptyNodeAt(oldVnode)
       }
       if (sameVnode(oldVnode, vnode)) {
         //找差异，更新dom
         patchVnode(oldVnode, vnode, insertedVnodeQueue)
       } else {
         elm = oldVnode.elm!
         parent = api.parentNode(elm) as Node
         createElm(vnode, insertedVnodeQueue)
         if (parent !== null) {
           api.insertBefore(parent, vnode.elm!, api.nextSibling(elm))
           removeVnodes(parent, [oldVnode], 0, 0)
         }
       }
   
     }
   }
   ```

   1. 