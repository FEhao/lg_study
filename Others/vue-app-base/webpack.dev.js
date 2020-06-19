const merge = require("webpack-merge");
const { HotModuleReplacementPlugin } = require('webpack')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const commonConfig = require("./webpack.common.js");


module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: "cheap-module-eval-source-map",
  devServer: {
    hot: true,
    open: true,
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin(),
  ],
});
