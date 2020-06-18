const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const commonConfig = require("./webpack.common.js");

process.env.BASE_URL = "test";

module.exports = merge(commonConfig, {
  devtool: "eval",
  devServer: {
    // contentBase: './dist'
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "lagou exam",
      template: "public/index.html",
    }),
    new BundleAnalyzerPlugin(),
  ],
});
