let test = {
  *[Symbol.iterator]() {
    for (let i in this) {
      console.log(this)
      yield i
    }
  }
}

test.a = 1
test.b = 1
test.c = 1

for (let x of test) {
  // console.log(x)
}