const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const CommonCssLoader = [
  isProd ? MiniCssExtractPlugin.loader : "style-loader",
  "css-loader",
];

module.exports = {
  mode: process.env.NODE_ENV || "production",
  entry: "./src/main.js",
  output: {
    filename: `js/[name]${isProd ? ".[chunkhash:8]" : ""}.js`,
  },
  stats: {
    entrypoints: false,
    children: false,
    modules: false,
  },
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
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        loader: CommonCssLoader,
      },
      {
        test: /\.less$/,
        loader: [...CommonCssLoader, "less-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: "url-loader",
        options: {
          limit: 10 * 1024,
          name: `img/[name]${isProd ? ".[hash:8]" : ""}.[ext]`,
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
            return /jquery/.test(module.context);
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
    new HtmlWebpackPlugin({
      title: "lagou exam",
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
  ],
};
