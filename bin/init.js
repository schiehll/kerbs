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

var _paths = _interopRequireDefault(require("../webpack/paths"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async () => {
  const configPath = _path.default.resolve(process.cwd(), '.kerbsrc.json');

  if (_fs.default.existsSync(configPath)) {
    console.log(_chalk.default.yellow`Found a .kerbsrc.json file, will be using it.`);
  } else {
    const namePrompt = new _enquirer.Input({
      message: `What's the project name?`,
      initial: 'Unnamed Project'
    });
    const projectName = await namePrompt.run();

    _fs.default.writeFileSync(configPath, JSON.stringify({
      name: projectName
    }, null, 2), 'utf8');
  }

  if (!_fs.default.existsSync(_paths.default.docs)) {
    const templatePrompt = new _enquirer.Select({
      message: 'Choose a template',
      choices: ['app', 'lib']
    });
    const template = await templatePrompt.run();

    _fs.default.mkdirSync(_paths.default.docs);

    _shelljs.default.cp('-r', _path.default.resolve(__dirname, `../src/templates/${template}/*`), _paths.default.docs);

    _shelljs.default.touch('-c', _fs.default.readdirSync(_paths.default.docs));

    console.log(_chalk.default.green(`Done! Check the ${_chalk.default.bold(_paths.default.docs)} folder to start writing your docs.`));
  } else {
    console.log(_chalk.default.yellow(`Looks like it's already initialized. Delete the ${_chalk.default.bold(_paths.default.docs)} folder and try again.`));
  }
};

exports.default = _default;