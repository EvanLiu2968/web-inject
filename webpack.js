const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');
const webpackConfig = require('./webpack.config.js');

if (process.env.Mode == 'development') {
  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(compiler, webpackConfig.devServer);
  server.listen(webpackConfig.devServer.port, 'localhost', function (err, result) {
    if (err) throw err;
    console.log(`Listening at http://localhost:${webpackConfig.devServer.port}`);
    opn(`http://localhost:${webpackConfig.devServer.port}`)
  })
  compiler.plugin('emit', function (compilation, callback) {
    console.log('  Compilation complete.\n')
    callback();
  })
} else {
  webpack(webpackConfig, function (err, stats) {
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
  })
}