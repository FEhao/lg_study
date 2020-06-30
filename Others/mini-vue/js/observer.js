class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    if (!data || typeof data !== "object") {
      return;
    }

    Object.keys(data).forEach((key) => {
      //  第三个参数，防止下面get的时候，陷入死循环
      this.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(obj, key, val) {
    let that = this
    let dep = new Dep()
    this.walk(val) 
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        that.walk(newVal)
        dep.notify()
      },
    });
  }
}
