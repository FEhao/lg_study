module.exports = class SyncHook {
  constructor(initParams) {
    this.tasks = {}
    this.initParams = initParams
  }

  tap(str, callback) {
    this.tasks[str] = callback
  }

  call(name) {
    for(let task in this.tasks) {
      this.tasks[task].call(this, name)
    }
  }

}