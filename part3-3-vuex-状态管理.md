1. 组件间通信方式

   1. 父组件给子组件传值
      1. 子组件中通过props接收数据
      2. 父组件中给子组件通过相应属性传值
   2. 子组件给父组件传值
      1. 自定义事件
   3. 不相关组件之间传值
      1. event bus
   4. 其他常见方式
      1. $root
      2. $parent
      3. $children
      4. $refs
         1. 在普通HTML标签上使用ref，获取到的是DOM
         2. 在组件标签上使用ref，获取到的是组件实例

2. vuex集成到了devtools，提供了time-travel功能

3. vuex核心概念

   1. Store

   2. State

      ```js
      import { mapState } from 'vuex'
      export default: {
        ...mapState(['count', 'msg'])
      }
      ```

   3. Getter

      ```js
      // 在new Vues.Store中
      getters: {
        reverseMsg(state) {
          return state.msg.split('').reverse().join('')
        }
      }
      // vue文件中
      import { mapGetters } from 'vuex'
      export default: {
        ...mapGetters(['reverseMsg'])
      }
      ```

   4. Mutation

      ```js
      // 在new Vues.Store中
      mutations: {
        increase(state, payload) {
          state.count += payload
        }
      }
      // Vue文件中
      @click="$store.commit('increase', 2)"
      // 或
      methods: {
        ...mapMutations('increase')
      }
      ```

   5. Action

      ```js
      // 在new Vues.Store中
      actions: {
      	increaseAsync(context, payload) {
      		setTimeout(() => {
      			context.commit('increase', payload)
      		}, 1000)
      	}
      }
      // Vue文件中
      methods: {
        ...mapActions('increaseAsync')
      }
      ```

   6. Module

      ```js
      // 每个单独的module
      export default {
        state,
        getters,
        mutations.
        actions
      }
      // 在new Vues.Store中
      modules: {
        moduleA,
        moduleB,
      }
      ```

4. 基本结构

   ```js
   Vue.use(Vuex)
   export default new Vuex.Store({
     state: {},
     mutations: {},
     actions: {},
     modules: {}
   })
   ```

   ```js
   import store from './store'
   new Vue({
     router,
     store,
     render: h => h(App)
   }).$mount('#app')
   ```

5. 模拟Vuex

   ```js
   let _Vue = null
   class Store{
     constructor(options) {
       const {
         state = {},
         getters = {},
         mutations = {},
         actions = {}
       } = options
       this.state = _Vue.observable(state)
       this.getters = Object.create(null)
       Object.keys(getters).forEach(key => {
         Object.defineProperty(this.getters, key, {
           get: () => getters[key](state)
         })
       })
       this._mutations = mutations
       this._actions = actions
     }
     commit(type, payload) {
       this._mutations[type](this.state, payload)
     }
     dispatch(type, payload) {
       this._actions[type](this.state, payload)
     }
   }
   
   function install (Vue) {
     _Vue = Vue
     _Vue.mixin({
       beforeCreate() {
         if (this.$options.store) { // 如果是组件实例，没有store，不需要做这个
           _Vue.prototype.$store = this.$options.store
         }
       }
     })
   }
   ```

   ```js
   // 在Vue中
   @click="$store.commit('increase', 2)"
   ```

   
