const merge = require('webpack-merge')
const config = require('./webpack.config.js')
const path = require('path')

module.exports = merge.strategy({ entry: 'prepend' })(config, {
  mode: 'development',
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: path.resolve(__dirname, '../src/utils/getKerbs.js'),
        use: {
          loader: path.resolve(__dirname, 'addDependencyLoader.js'),
          options: {
            file: path.resolve(process.cwd(), 'kerbs')
          }
        }
      }
    ]
  }
})
