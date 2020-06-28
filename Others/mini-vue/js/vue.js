class Vue {
  constructor(options) {
    this.$options = options || {};
    this.$data = options.data || {};
    this.$el =
      typeof  this.$options.el === "string" ? document.querySelector(options.el) : options.el;

    // data转换为getter, setter，注入vue实例中
    this._proxyData(this.$data)
    // 注入到data中，与上面有一点不同
    new Observer(this.$data)
  }
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newVal) {
          if (newVal === data[key]) {
            return
          }
          data[key] = newVal
        }
      })
    })
  }
}
