#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _init = _interopRequireDefault(require("./init"));

var _dev = _interopRequireDefault(require("./dev"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.command('init').description('initialize kerbs').action(_init.default);

_commander.default.command('dev').description('start the development server').action(_dev.default);

_commander.default.parse(process.argv);

if (_commander.default.args.length === 0) {
  _commander.default.help();
}