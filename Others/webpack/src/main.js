// // import a from './test.js'
// // import './main.css'
import img from './logo.png'
const imgEle = document.createElement('img')
imgEle.src = img
console.log(21)
document.body.append(imgEle)


import axios from 'axios'

axios.request('https://api.github.com/users')

console.log(API_BASE_URL)