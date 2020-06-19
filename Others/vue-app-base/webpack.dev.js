const merge = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const commonConfig = require("./webpack.common.js");


module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: "eval",
  devServer: {
    // contentBase: './dist'
    open: true,
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});
