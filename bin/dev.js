"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _portfinder = _interopRequireDefault(require("portfinder"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _webpackDevServerUtils = require("../webpack/webpackDevServerUtils");

var _webpack2 = _interopRequireDefault(require("../webpack/webpack.dev"));

var _loadSVGLogos = _interopRequireDefault(require("./loadSVGLogos"));

var _default = async () => {
  await (0, _loadSVGLogos.default)();
  const port = await _portfinder.default.getPortPromise();
  const HOST = '0.0.0.0';
  const urls = (0, _webpackDevServerUtils.prepareUrls)('http', HOST, port);
  const devSocket = {
    warnings: warnings => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
    errors: errors => devServer.sockWrite(devServer.sockets, 'errors', errors)
  };
  const compiler = (0, _webpackDevServerUtils.createCompiler)({
    config: _webpack2.default,
    devSocket,
    urls,
    webpack: _webpack.default
  });
  const devServer = new _webpackDevServer.default(compiler, {
    compress: true,
    clientLogLevel: 'none',
    hot: true,
    publicPath: '/',
    quiet: true,
    host: HOST,
    historyApiFallback: true
  });
  devServer.listen(port, HOST, err => {
    if (err) {
      return console.log(err);
    }

    console.log(_chalk.default.cyan('Starting kerbs development server...\n'));
  });
  ['SIGINT', 'SIGTERM'].forEach(sig => {
    process.on(sig, () => {
      devServer.close();
      process.exit();
    });
  });
};

exports.default = _default;