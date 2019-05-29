const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const highlight = require('remark-highlight.js')
const PATHS = require('./paths')

const resolve = filePath => path.resolve(__dirname, '../', filePath)
const resolveNodeModule = filePath => {
  return path.resolve(__dirname, '../node_modules', filePath)
}

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
    path: PATHS.public,
    publicPath: '/',
    filename: 'static/[name].[hash].js',
    chunkFilename: 'static/[name].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('src'), PATHS.docs],
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
          {
            loader: resolveNodeModule('@mdx-js/loader'),
            options: {
              remarkPlugins: [highlight]
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          resolveNodeModule('style-loader'),
          resolveNodeModule('css-loader')
        ]
      }
    ]
  },

  resolve: {
    modules: [resolve('node_modules'), resolve('src')],
    alias: {
      kerbs: PATHS.docs
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
      chunksSortMode: 'none'
    })
  ],

  stats: 'errors-only'
}
