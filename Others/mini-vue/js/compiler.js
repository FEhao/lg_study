class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compile(this.el);
  }
  // 编译模板，处理文本节点和元素节点
  compile(el) {
    let childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      if (this.isTextNode(node)) {
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        this.compileElement(node);
      }
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }
  // 编译元素节点，处理指令
  compileElement(node) {
    Array.from(node.attributes).forEach((attr) => {
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        attrName = attrName.substr(2);
        let key = attr.value;
        this.update(node, key, attrName)
      }
    });
  }

  update(node, key, attrName) {
    let updateFn = this[attrName + 'Updater']
    updateFn && updateFn(node, this.vm[key])
  }

  textUpdater(node, val) {
    node.textContent = val;
  }

  modelUpdater(node, val) {
    node.value = val
  }

  // 编译文本节点，处理插值表达式
  compileText(node) {
    const reg = /\{\{(.+?)\}\}/;
    const value = node.textContent;
    if (reg.test(value)) {
      let key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key]);
    }
  }
  // 判断元素属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
