import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

const resolve = filePath => path.resolve(__dirname, '../', filePath)

export default {
  entry: [resolve('src/index')],

  output: {
    path: resolve('public'),
    publicPath: '/',
    filename: 'static/[name].[hash].js',
    chunkFilename: 'static/[name].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('src')],
        loader: 'babel-loader'
      },
      {
        test: /\.mdx$/,
        use: ['babel-loader', '@mdx-js/loader']
      }
    ]
  },

  resolve: {
    modules: ['node_modules', resolve('src')]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
      chunksSortMode: 'none'
    })
  ],

  stats: {
    modules: false,
    children: false,
    colors: true
  }
}
