import path from 'path'
import fs from 'fs'
import shell from 'shelljs'
import chalk from 'chalk'
import PATHS from '../webpack/paths'

export default () => {
  const webpackExec = path.resolve(__dirname, '../node_modules/.bin/webpack')
  const webpackConfig = path.resolve(__dirname, '../webpack/webpack.config.js')

  console.log(chalk.cyan('Building kerbs...\n'))

  shell.rm('-rf', PATHS.public)
  const code = shell.exec(
    `node ${webpackExec} --mode production --config ${webpackConfig}`
  ).code

  if (code === 0) {
    fs.writeFileSync(`${PATHS.public}/_redirects`, '/* /index.html 200')

    console.log(
      chalk.green(
        `\nSuccessfully built kerbs! Check ${chalk.bold(PATHS.public)} folder.`
      )
    )
  }
}
