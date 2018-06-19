const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    index: process.env.MODE == 'development' ? './test/index' : './src/index',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: process.env.MODE == 'development' ? 'webInject.js' : 'webInject.min.js',
    chunkFilename: '[name].js',
    library: 'webInject',
    libraryTarget: 'umd'
  },
  mode: process.env.MODE ? process.env.MODE : 'production',
  target: 'web', // web || node, default node
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ],
  },
  devtool: process.env.MODE == 'development' ? 'inline-source-map' : 'source-map',
  resolve: {
    alias: {
      'web-inject': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    historyApiFallback: true,
    clientLogLevel: "info",
    stats: { colors: true },
    port: 9080,
    open: true,
    // contentBase: path.join(__dirname, "./"),
    index: 'index.html',
    inline: true,
    hot: true,
    overlay: true,
    compress: false
  }
};

if(process.env.MODE == 'development'){
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, 'test/index.html'),
    env: process.env.MODE == 'development' ? 'development' : 'production',
    // inject:'body', // true|body|head|false，default true
  }))
}

module.exports = config