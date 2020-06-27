1. Vue构建版本	
   1. 运行时版：不支持template模板，需要打包的时候提前编译
   2. 完整版：包含运行时和编译器，体积比运行时大10K左右，程序运行的时候把模板转换成render函数
2. 创建Vue实例的时候使用Router，会在Vue实力上新加$route, $router两个变量，前者表示当前路由的信息，后者包含一些方法，如push
3. 通过动态路由获取数据(如:id)，方式1：通过当前路由规则，获取数据$route.params.id，方式2：路由配置中配props: true，通过开启props获取：id
4. Hash模式
   1. 基于锚点，以及**onhashchange**事件
5. History模式
   1. 基于HTML5中的History API，history.pushState，history.replaceState
   2. 使用了上面的API，回退前进这些浏览器操作只会改变地址栏，不会影响页面，因此需要监听**popstate**
   3. 调用history.pushState()或者history.replaceState()不会触发popstate事件. popstate事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法).
   4. 在服务端应该除了静态资源外，都返回单页应用的index.html

----

#### Vue Router

1. 核心代码

   ```js
   // ---router/index.js---
   // 注册组件
   Vue.use(VueRouter)
   // 创建路由对象
   const router = new VueRouter({
     routes: [
       { name: 'home', path: '/', component: home }
     ]
   })
   
   // ---main.js---
   // 创建Vue实例，注册router对象
   new Vue({
     router,
     render: h => h(App)
   }).$mount('#app')
   ```

2. 简单的实现见vue_router_custom下的vue_router