const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const resolve = filePath => path.resolve(__dirname, '../', filePath)
const resolveNodeModule = filePath => {
  return path.resolve(__dirname, '../node_modules', filePath)
}
const kerbsPath = path.resolve(process.cwd(), 'kerbs')

const babelLoaderOptions = {
  babelrc: false,
  presets: [
    [
      resolveNodeModule('@babel/preset-env'),
      {
        modules: false
      }
    ],
    resolveNodeModule('@babel/preset-react')
  ],
  plugins: [
    resolveNodeModule('babel-plugin-preval'),
    resolveNodeModule('@babel/plugin-transform-runtime'),
    resolveNodeModule('@babel/plugin-proposal-optional-chaining'),
    resolveNodeModule('@babel/plugin-syntax-dynamic-import')
  ]
}

module.exports = {
  entry: [resolve('src/index')],

  output: {
    path: path.resolve(process.cwd(), 'kerbs_public'),
    publicPath: '/',
    filename: 'static/[name].[hash].js',
    chunkFilename: 'static/[name].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('src'), kerbsPath],
        use: {
          loader: resolveNodeModule('babel-loader'),
          options: babelLoaderOptions
        }
      },
      {
        test: /\.mdx$/,
        use: [
          {
            loader: resolveNodeModule('babel-loader'),
            options: babelLoaderOptions
          },
          resolveNodeModule('@mdx-js/loader')
        ]
      }
    ]
  },

  resolve: {
    modules: [resolve('node_modules'), resolve('src')],
    alias: {
      kerbs: kerbsPath
    }
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
