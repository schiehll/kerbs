#!/usr/bin/env node

import path from 'path'
import program from 'commander'
import shell from 'shelljs'

const rootPath = path.resolve(__dirname, '../')

program
  .command('init')
  .description('initialize kerbs')
  .action(() => {
    console.log('init!')
  })

program
  .command('dev')
  .description('start dev server')
  .action(() => {
    const devServerPath = path.resolve(
      rootPath,
      'node_modules/.bin/webpack-dev-server'
    )

    const esmPath = path.resolve(rootPath, './node_modules/esm')
    const webpackPath = path.resolve(rootPath, 'webpack')

    shell.exec(
      `node -r ${esmPath} ${devServerPath} --hot --config ${webpackPath}/webpack.dev.js`
    )
  })

program.parse(process.argv)
