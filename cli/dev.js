import chalk from 'chalk'
import portfinder from 'portfinder'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { prepareUrls, createCompiler } from '../webpack/webpackDevServerUtils'
import config from '../webpack/webpack.dev'

export default async () => {
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
}
