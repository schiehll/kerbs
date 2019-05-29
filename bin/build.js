"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _paths = _interopRequireDefault(require("../webpack/paths"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = () => {
  const webpackExec = _path.default.resolve(__dirname, '../node_modules/.bin/webpack');

  const webpackConfig = _path.default.resolve(__dirname, '../webpack/webpack.config.js');

  console.log(_chalk.default.cyan('Building kerbs...\n'));

  _shelljs.default.rm('-rf', _paths.default.public);

  const code = _shelljs.default.exec(`node ${webpackExec} --mode production --config ${webpackConfig}`).code;

  if (code === 0) {
    _fs.default.writeFileSync(`${_paths.default.public}/_redirects`, '/* /index.html 200');

    console.log(_chalk.default.green(`\nSuccessfully built kerbs! Check ${_chalk.default.bold(_paths.default.public)} folder.`));
  }
};

exports.default = _default;