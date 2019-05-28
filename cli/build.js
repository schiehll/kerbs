import path from 'path'
import fs from 'fs'
import shell from 'shelljs'
import chalk from 'chalk'

export default () => {
  const webpackExec = path.resolve(__dirname, '../node_modules/.bin/webpack')
  const webpackConfig = path.resolve(__dirname, '../webpack/webpack.config.js')
  const kerbsPublic = path.resolve(process.cwd(), 'kerbs_public')

  console.log(chalk.cyan('Building kerbs...\n'))

  shell.rm('-rf', kerbsPublic)
  const code = shell.exec(
    `node ${webpackExec} --mode production --config ${webpackConfig}`
  ).code

  if (code === 0) {
    fs.writeFileSync(`${kerbsPublic}/_redirects`, '/* /index.html 200')

    console.log(
      chalk.green('\nSuccessfully built kerbs! Check kerbs_public folder.')
    )
  }
}
