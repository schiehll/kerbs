"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = () => {
  const webpackExec = _path.default.resolve(__dirname, '../node_modules/.bin/webpack');

  const webpackConfig = _path.default.resolve(__dirname, '../webpack/webpack.config.js');

  const kerbsPublic = _path.default.resolve(process.cwd(), 'kerbs_public');

  console.log(_chalk.default.cyan('Building kerbs...\n'));

  _shelljs.default.rm('-rf', kerbsPublic);

  const code = _shelljs.default.exec(`node ${webpackExec} --mode production --config ${webpackConfig}`).code;

  if (code === 0) {
    _fs.default.writeFileSync(`${kerbsPublic}/_redirects`, '/* /index.html 200');

    console.log(_chalk.default.green('\nSuccessfully built kerbs! Check kerbs_public folder.'));
  }
};

exports.default = _default;