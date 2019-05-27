#!/usr/bin/env node
"use strict";

var _path = _interopRequireDefault(require("path"));

var _commander = _interopRequireDefault(require("commander"));

var _shelljs = _interopRequireDefault(require("shelljs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rootPath = _path.default.resolve(__dirname, '../');

_commander.default.command('init').description('initialize kerbs').action(() => {
  console.log('init!');
});

_commander.default.command('dev').description('start dev server').action(() => {
  const devServerPath = _path.default.resolve(rootPath, 'node_modules/.bin/webpack-dev-server');

  const esmPath = _path.default.resolve(rootPath, './node_modules/esm');

  const webpackPath = _path.default.resolve(rootPath, 'webpack');

  _shelljs.default.exec(`node -r ${esmPath} ${devServerPath} --hot --config ${webpackPath}/webpack.dev.js`);
});

_commander.default.parse(process.argv);