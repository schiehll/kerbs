#!/usr/bin/env node

import path from 'path'
import fs from 'fs'
import program from 'commander'
import shell from 'shelljs'
import { prompt } from 'enquirer'

const rootPath = path.resolve(__dirname, '../')

program
  .command('init')
  .description('initialize kerbs')
  .action(async () => {
    const response = await prompt({
      type: 'input',
      name: 'PROJECT_NAME',
      message: `What's the project name?`,
      initial: 'Unnamed Project'
    })

    const kerbsPath = path.resolve(process.cwd(), '.kerbs')
    const configPath = path.resolve(kerbsPath, '.kerbsrc.json')

    if (!fs.existsSync(kerbsPath)) {
      fs.mkdirSync(kerbsPath)
    }

    if (fs.existsSync(configPath)) {
      console.log('.kerbs/.kerbsrc.json already exists')
    } else {
      fs.writeFileSync(
        configPath,
        JSON.stringify({ name: response.PROJECT_NAME }, null, 2),
        'utf8'
      )

      shell.cp(
        '-r',
        path.resolve(__dirname, '../src/templates/default/*'),
        kerbsPath
      )
      shell.touch('-c', fs.readdirSync(kerbsPath))
    }
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

if (program.args.length === 0) {
  program.help()
}
