"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _enquirer = require("enquirer");

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async () => {
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
};

exports.default = _default;