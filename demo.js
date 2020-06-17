// setTimeout(() => {
//   console.log('A')
// }, 0);

// setTimeout(() => {
//   console.log('B')
// }, 1000);

// Promise.resolve().then(() => {
//   setTimeout(() => {
//     console.log('C')
//   }, 0);

//   setTimeout(() => {
//     console.log('D')
//   }, 1000);

//   console.log('E')
//   Promise.resolve().then(() => {
//     console.log('F')
//   })
// }).then(() => {
//   console.log('G')
// })

// setTimeout(() => {
//   console.log('H')
// }, 0);

// setTimeout(() => {
//   console.log('I')
// }, 1000);

// //  注意微任务的顺序在最后的setTimeout之后

// var i, str = ''
// for (i = 0; i < 10; i++) {
//   str += i
// }

// console.log(str)

// for(let i = 0; i< 10; i++) {
//   let str = ''
//   str += i
//   console.log(str)
// }

function Foo() {
  t = function () {
    console.log(1);
  };
  return this
}

Foo.t = function () {
  console.log(2);
};


Foo.prototype.t = function () {
  console.log(3);
};

var t = function() {
  console.log(4)
}

function t() {
  console.log(5)
}

Foo.t() // 2
Foo().t()
t() // 4
new Foo.t() // 2
new Foo().t() // 
new new Foo().t()