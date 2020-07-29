1. 模拟Vuex

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

   

