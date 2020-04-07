"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var _default = async () => {
  if (_fs.default.existsSync(_paths.default.config)) {
    console.log(_chalk.default.yellow`Found a .kerbsrc.js file, will be using it.`);
  } else {
    const namePrompt = new _enquirer.Input({
      message: `What's the project name?`,
      initial: 'Unnamed Project'
    });
    const projectName = await namePrompt.run();

    _fs.default.writeFileSync(_paths.default.config, `export default { name: "${projectName}" }`, 'utf8');
  }

  if (!_fs.default.existsSync(_paths.default.docs)) {
    const templatesFolder = _path.default.resolve(__dirname, '../src/templates');

    const templates = _fs.default.readdirSync(templatesFolder);

    let template = templates[0];

    if (templates.length > 1) {
      const templatePrompt = new _enquirer.Select({
        message: 'Choose a template',
        choices: templates
      });
      template = await templatePrompt.run();
    }

    _fs.default.mkdirSync(_paths.default.docs);

    _shelljs.default.cp('-r', _path.default.resolve(templatesFolder, `${template}/*`), _paths.default.docs);

    _shelljs.default.touch('-c', _fs.default.readdirSync(_paths.default.docs));

    console.log(_chalk.default.green(`Done! Check the ${_chalk.default.bold(_paths.default.docs)} folder to start writing your docs.`));
  } else {
    console.log(_chalk.default.yellow(`Looks like it's already initialized. Delete the ${_chalk.default.bold(_paths.default.docs)} folder and try again.`));
  }
};

exports.default = _default;