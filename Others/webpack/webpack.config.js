const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPLugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

class MyPlugin {
  apply(compiler) {
    console.log("111111111111111");
    console.log("plugin start");
    compiler.hooks.emit.tap("MyPlugin", (compilation) => {
      //  compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        if (name.endsWith(".js")) {
          const contents = compilation.assets[name].source()
          const withoutCommnets = contents.replace(/\/\*\*+\*\//g, '')
          compilation.assets[name] = {
            source: () => withoutCommnets,
            size: () => withoutCommnets.length
          }
        }
      }
    });
  }
}

module.exports = {
  mode: "none",
  entry: "./src/main.js",
  output: {
    // publicPath: 'dist/',
  },
  devServer: {
    contentBase: 'public'
  },
  module: {
    rules: [
      {
        test: /.md$/,
        use: ["html-loader", "./markdown-loader"],
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.png$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPLugin({
      title: "demo",
      template: "./src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
        },
      ],
    }),
    // new MyPlugin(),
  ],
};
