#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.command('init').description('initialize kerbs').action(() => {
  const init = require('./init').default;

  init();
});

_commander.default.command('dev').description('start the development server').action(() => {
  const dev = require('./dev').default;

  dev();
});

_commander.default.command('build').description('generate a production ready doc site').action(() => {
  const build = require('./build').default;

  build();
});

_commander.default.parse(process.argv);

if (_commander.default.args.length === 0) {
  _commander.default.help();
}