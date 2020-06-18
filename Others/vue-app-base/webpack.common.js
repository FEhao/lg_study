const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
  entry: "./src/main.js",
  resolve: {
    extensions: [".vue", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        loader: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: "url-loader",
        options: {
          limit: 1000,
          esModule: false,
        },
      },
      { test: /\.vue$/, loader: "vue-loader" },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
        jquery: {
          test: (module) => {
            return /jquery/.test(module.context)
          },
          name: "jquery",
          chunks: "all",
          priority: 10,
        },
      },
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new DefinePlugin({
      BASE_URL: '"public/"',
    }),
  ],
};
