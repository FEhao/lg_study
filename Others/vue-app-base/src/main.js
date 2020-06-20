import Vue from 'vue';
import App from './App.vue';
import './style.less';

// var a = 1

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
