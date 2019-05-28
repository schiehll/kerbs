import path from 'path'
import shell from 'shelljs'
import chalk from 'chalk'

export default () => {
  const webpackExec = path.resolve(__dirname, '../node_modules/.bin/webpack')
  const webpackConfig = path.resolve(__dirname, '../webpack/webpack.config.js')

  console.log(chalk.cyan('Building kerbs...\n'))

  shell.rm('-rf', path.resolve(process.cwd(), 'kerbs_public'))
  const code = shell.exec(
    `node ${webpackExec} --mode production --config ${webpackConfig}`
  ).code

  if (code === 0) {
    console.log(
      chalk.green('\nSuccessfully built kerbs! Check kerbs_public folder.')
    )
  }
}
