#!/usr/bin/env node
"use strict";

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _commander = _interopRequireDefault(require("commander"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _enquirer = require("enquirer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rootPath = _path.default.resolve(__dirname, '../');

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
    console.log('.kerbs/.kerbsrc.json already exists');
  } else {
    _fs.default.writeFileSync(configPath, JSON.stringify({
      name: response.PROJECT_NAME
    }, null, 2), 'utf8');

    _shelljs.default.cp('-r', _path.default.resolve(__dirname, '../src/templates/default/*'), kerbsPath);

    _shelljs.default.touch('-c', _fs.default.readdirSync(kerbsPath));
  }
});

_commander.default.command('dev').description('start dev server').action(() => {
  const devServerPath = _path.default.resolve(rootPath, 'node_modules/.bin/webpack-dev-server');

  const esmPath = _path.default.resolve(rootPath, './node_modules/esm');

  const webpackPath = _path.default.resolve(rootPath, 'webpack');

  _shelljs.default.exec(`node -r ${esmPath} ${devServerPath} --hot --config ${webpackPath}/webpack.dev.js`);
});

_commander.default.parse(process.argv);

if (_commander.default.args.length === 0) {
  _commander.default.help();
}