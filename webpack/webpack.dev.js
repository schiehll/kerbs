const merge = require('webpack-merge')
const config = require('./webpack.config.js')
const path = require('path')
const PATHS = require('./paths')

module.exports = merge.smart(config, {
  mode: 'development',
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: path.resolve(__dirname, '../src/utils/getKerbs.js'),
        use: {
          loader: path.resolve(__dirname, 'addDependencyLoader.js'),
          options: {
            file: PATHS.docs
          }
        }
      }
    ]
  }
})
