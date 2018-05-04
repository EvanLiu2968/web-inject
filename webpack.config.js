const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './demo/index',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['es2015', { modules: false }],
              // 'react',
            ],
            plugins: [
              'transform-object-rest-spread',
              'transform-class-properties',
              'transform-object-assign'
            ],
          }
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'chain-injector': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './demo/index.html',
      inject:'body', // true|body|head|false，default true
    })
  ],
  devServer: {
    port: 8080,
    open: true,
    // contentBase: path.join(__dirname, "./dist"),
    // index: 'index.html',
    // inline: true,
    // hot: true,
    compress: false
  },
  target: 'web' // web || node, default node
};