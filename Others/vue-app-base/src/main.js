import Vue from 'vue'
import App from './App.vue'
import jquery from 'jquery'
import './style.less'

console.log(jquery)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
