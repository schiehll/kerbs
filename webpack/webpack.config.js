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
        test: resolve('src/utils/getKerbs.js'),
        use: {
          loader: path.resolve(__dirname, 'addDependencyLoader.js'),
          options: {
            file: resolve(path.resolve(process.cwd(), '.docs'))
          }
        }
      },
      {
        test: /\.js$/,
        include: [resolve('src'), path.resolve(process.cwd(), '.docs')],
        use: 'babel-loader'
      },
      {
        test: /\.mdx$/,
        use: ['babel-loader', '@mdx-js/loader']
      }
    ]
  },

  resolve: {
    modules: ['node_modules', resolve('src')],
    alias: {
      docs: path.resolve(process.cwd(), '.docs')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
      chunksSortMode: 'none'
    })
  ],

  node: {
    fs: 'empty'
  },

  stats: {
    modules: false,
    children: false,
    colors: true
  }
}
