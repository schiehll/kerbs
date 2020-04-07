const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')
const prism = require('@gridsome/remark-prismjs')
const PATHS = require('./paths')

const resolve = filePath => path.resolve(__dirname, '../', filePath)

const babelLoaderOptions = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          esmodules: true
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    'babel-plugin-preval',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import'
  ],
  env: {
    production: {
      plugins: ['babel-plugin-transform-react-remove-prop-types']
    }
  }
}

require('@babel/register')({
  babelrc: false,
  presets: ['@babel/preset-env'],
  plugins: babelLoaderOptions.plugins
})

const kerbsConfig = require(PATHS.config).default

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
        exclude: [/node_modules\/(?!@schiehll\/kerbs)/],
        use: {
          loader: 'babel-loader',
          options: babelLoaderOptions
        }
      },
      {
        test: /\.mdx$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelLoaderOptions
          },
          {
            loader: '@mdx-js/loader',
            options: {
              remarkPlugins: [prism]
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
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
      title: `${kerbsConfig.name} - Kerbs`,
      template: resolve('src/index.html'),
      chunksSortMode: 'none'
    })
  ],

  stats: 'errors-only'
}

module.exports = merge.smart(config, kerbsConfig.webpackConfig || {})
