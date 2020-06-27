let _Vue = null;
export default class VueRouter {
  static install(Vue) {
    //  判断是否已安装
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    //  将Vue构造函数记录到全局变量
    _Vue = Vue;
    //  把创建Vue实例时候传入的router对象注册到Vue实例上
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
          this.$options.router.init();
        }
      },
    });
  }

  constructor(options) {
    this.options = options;
    this.routeMap = {};
    this.data = _Vue.observable({
      current: "/",
    });
  }

  createRouteMap() {
    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component;
    });
  }

  initComponents(Vue) {
    Vue.component("router-link", {
      props: {
        to: String,
      },
      // template: '<a :href="to"><slot></slot></a>'
      render(h) {
        return h(
          "a",
          {
            attrs: {
              href: this.to,
            },
            on: {
              click: this.clickHandler
            }
          },
          [this.$slots.default]
        );
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault();
        }
      },
    });
    const self = this
    Vue.component("router-view", {
      render(h) {
        const component = self.routeMap[self.data.current]
        return h(component)
      },
    });
  }

  init() {
    this.createRouteMap();
    this.initComponents(_Vue);
    this.initEvent()
  }

  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
