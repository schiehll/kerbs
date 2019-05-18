import merge from 'webpack-merge'
import config from './webpack.config.js'

export default merge.strategy({ entry: 'prepend' })(config, {
  mode: 'development',
  devtool: 'source-map',

  devServer: {
    compress: true,
    historyApiFallback: true,
    stats: {
      modules: false,
      children: false,
      colors: true
    }
  }
})
