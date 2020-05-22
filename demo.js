const a = (...fns) => (...args) => (
  fns.reduce((lastRes, fn, index) => {
    if (index > 0) {
      return fn(lastRes)
    } else {
      return fn(...lastRes)
    }
  }, args)
)

const a1 = e => e+1
const a2 = e => 2*e
const a3 = e => e-100
const a4 = e => e+100

console.log(a(a1, a2, a3, a4)(2)
)
