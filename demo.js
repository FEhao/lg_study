a = {a: 1}
b = [a, 2, 3]
b.slice(0,1)[0].a = 234
console.log(a)