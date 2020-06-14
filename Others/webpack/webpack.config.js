const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /.md$/,
        use: [
          'html-loader',
          './markdown-loader'
        ]
      }
    ]
  }
}