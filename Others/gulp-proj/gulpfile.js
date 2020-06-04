const { series, parallel } = require('gulp')
const { Transform } = require('stream')
const fs = require('fs')
exports.stream = () => {
  const readStream = fs.createReadStream('index.css')
  const writeStream = fs.createWriteStream('index.min.css')
  //  核心转换过程
  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      const input = chunk.toString()
      const output =  input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
      callback(null, output)
    }
  })
  readStream.pipe(transform).pipe(writeStream)
  return readStream
}