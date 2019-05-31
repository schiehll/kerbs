const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')
const prism = require('@gridsome/remark-prismjs')

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
  ],
  env: {
    production: {
      plugins: [
        resolveNodeModule('babel-plugin-transform-react-remove-prop-types')
      ]
    }
  }
}

require('@babel/register')({
  babelrc: false,
  presets: [path.resolve(__dirname, '../node_modules/@babel/preset-env')],
  plugins: babelLoaderOptions.plugins
})

const PATHS = require('./paths')

const config = {
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
        exclude: /node_modules/,
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
              remarkPlugins: [prism]
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
    modules: [resolve('node_modules'), resolve('src'), 'node_modules'],
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

const kerbsConfig = require(PATHS.config).default

module.exports = merge.smart(config, kerbsConfig.webpackConfig || {})
