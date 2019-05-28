#!/usr/bin/env node
"use strict";

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _commander = _interopRequireDefault(require("commander"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _enquirer = require("enquirer");

var _chalk = _interopRequireDefault(require("chalk"));

var _portfinder = _interopRequireDefault(require("portfinder"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _webpackDevServerUtils = require("../webpack/webpackDevServerUtils");

var _webpack2 = _interopRequireDefault(require("../webpack/webpack.dev"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.command('init').description('initialize kerbs').action(async () => {
  const response = await (0, _enquirer.prompt)({
    type: 'input',
    name: 'PROJECT_NAME',
    message: `What's the project name?`,
    initial: 'Unnamed Project'
  });

  const kerbsPath = _path.default.resolve(process.cwd(), '.kerbs');

  const configPath = _path.default.resolve(kerbsPath, '.kerbsrc.json');

  if (!_fs.default.existsSync(kerbsPath)) {
    _fs.default.mkdirSync(kerbsPath);
  }

  if (_fs.default.existsSync(configPath)) {
    console.log(_chalk.default.yellow`Looks like it's already initialized, as .kerbs/.kerbsrc.json already exists.`);
  } else {
    _fs.default.writeFileSync(configPath, JSON.stringify({
      name: response.PROJECT_NAME
    }, null, 2), 'utf8');

    _shelljs.default.cp('-r', _path.default.resolve(__dirname, '../src/templates/default/*'), kerbsPath);

    _shelljs.default.touch('-c', _fs.default.readdirSync(kerbsPath));

    console.log(_chalk.default.green`Done! Check the .kerbs folder to start writing your docs.`);
  }
});

_commander.default.command('dev').description('start dev server').action(async () => {
  const port = await _portfinder.default.getPortPromise();
  const HOST = '0.0.0.0';
  const urls = (0, _webpackDevServerUtils.prepareUrls)('http', HOST, port);
  const devSocket = {
    warnings: warnings => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
    errors: errors => devServer.sockWrite(devServer.sockets, 'errors', errors)
  };
  const compiler = (0, _webpackDevServerUtils.createCompiler)({
    appName: 'kerbs',
    devSocket,
    urls,
    useTypeScript: false,
    webpack: _webpack.default,
    config: _webpack2.default
  });
  const devServer = new _webpackDevServer.default(compiler, {
    compress: true,
    clientLogLevel: 'none',
    hot: true,
    publicPath: '/',
    quiet: true,
    host: HOST
  });
  devServer.listen(port, HOST, err => {
    if (err) {
      return console.log(err);
    }

    console.log(_chalk.default.cyan('Starting the development server...\n'));
  });
  ['SIGINT', 'SIGTERM'].forEach(sig => {
    process.on(sig, () => {
      devServer.close();
      process.exit();
    });
  });
});

_commander.default.parse(process.argv);

if (_commander.default.args.length === 0) {
  _commander.default.help();
}