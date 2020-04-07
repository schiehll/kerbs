"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _paths = _interopRequireDefault(require("../webpack/paths"));

var _loadSVGLogos = _interopRequireDefault(require("./loadSVGLogos"));

var _default = async () => {
  await (0, _loadSVGLogos.default)();

  const webpackExec = _path.default.resolve(process.cwd(), 'node_modules/.bin/webpack');

  const webpackConfig = _path.default.resolve(__dirname, '../webpack/webpack.config.js');

  console.log(_chalk.default.cyan('Building kerbs...'));

  _shelljs.default.rm('-rf', _paths.default.public);

  const code = _shelljs.default.exec(`node ${webpackExec} --mode production --config ${webpackConfig}`).code;

  if (code === 0) {
    _fs.default.writeFileSync(`${_paths.default.public}/_redirects`, '/* /index.html 200');

    console.log(_chalk.default.green(`Successfully built kerbs! Check ${_chalk.default.bold(_paths.default.public)} folder.`));
  } else {
    console.log(_chalk.default.red(`Sorry! Something went wrong.`));
  }
};

exports.default = _default;