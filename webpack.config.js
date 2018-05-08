const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: process.env.MODE == 'production' ? './src/index' : './demo/index',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    // libraryTarget: 'var',
    publicPath: '/dist/'
  },
  mode: process.env.MODE ? process.env.MODE : 'production',
  target: 'web', // web || node, default node
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
              "es2015",
              "stage-1",
              ["env",  { "modules": false }]
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
  devtool: process.env.MODE == 'production' ? 'source-map' : 'inline-source-map',
  resolve: {
    alias: {
      'web-inject': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './demo/index.html',
      // inject:'body', // true|body|head|false，default true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 9080,
    open: true,
    contentBase: path.join(__dirname, "./dist"),
    index: 'index.html',
    inline: true,
    hot: true,
    compress: false
  }
};