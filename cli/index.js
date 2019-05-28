#!/usr/bin/env node
import path from 'path'
import fs from 'fs'
import program from 'commander'
import shell from 'shelljs'
import { prompt } from 'enquirer'
import chalk from 'chalk'
import portfinder from 'portfinder'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { prepareUrls, createCompiler } from '../webpack/webpackDevServerUtils'
import config from '../webpack/webpack.dev'

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
      console.log(
        chalk.yellow`Looks like it's already initialized, as .kerbs/.kerbsrc.json already exists.`
      )
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
      console.log(
        chalk.green`Done! Check the .kerbs folder to start writing your docs.`
      )
    }
  })

program
  .command('dev')
  .description('start dev server')
  .action(async () => {
    const port = await portfinder.getPortPromise()
    const HOST = '0.0.0.0'
    const urls = prepareUrls('http', HOST, port)
    const devSocket = {
      warnings: warnings =>
        devServer.sockWrite(devServer.sockets, 'warnings', warnings),
      errors: errors => devServer.sockWrite(devServer.sockets, 'errors', errors)
    }
    const compiler = createCompiler({
      appName: 'kerbs',
      devSocket,
      urls,
      useTypeScript: false,
      webpack,
      config
    })
    const devServer = new WebpackDevServer(compiler, {
      compress: true,
      clientLogLevel: 'none',
      hot: true,
      publicPath: '/',
      quiet: true,
      host: HOST
    })

    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err)
      }

      console.log(chalk.cyan('Starting the development server...\n'))
    })
    ;['SIGINT', 'SIGTERM'].forEach(sig => {
      process.on(sig, () => {
        devServer.close()
        process.exit()
      })
    })
  })

program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
}
