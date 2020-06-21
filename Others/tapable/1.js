// let { SyncHook } = require("tapable");

const SyncHook = require('./2')

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncHook(["name"]),
    };
  }

  tap() {
    this.hooks.arch.tap("node", function (name) {
      console.log(1, name);
    });
    this.hooks.arch.tap("react", function (name) {
      console.log(2, name);
    });
  }

  start() {
    this.hooks.arch.call('arch')
  }
}

var a = new Lesson()

a.tap()

a.start()
