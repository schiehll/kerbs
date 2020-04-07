"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _default = async () => {
  try {
    const response = await (0, _nodeFetch.default)('https://raw.githubusercontent.com/gilbarbara/logos/master/logos.json');
    const svgJson = await response.json();

    _fs.default.writeFileSync(_path.default.resolve(__dirname, '../src/assets/SVGLogos.json'), JSON.stringify(svgJson, null, 2));
  } catch (error) {
    console.log(error);
  }
};

exports.default = _default;