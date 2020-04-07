import path from 'path'
import fs from 'fs'
import shell from 'shelljs'
import chalk from 'chalk'
import PATHS from '../webpack/paths'
import loadSVGLogos from './loadSVGLogos'

export default async () => {
  await loadSVGLogos()

  const webpackExec = path.resolve(process.cwd(), 'node_modules/.bin/webpack')
  const webpackConfig = path.resolve(__dirname, '../webpack/webpack.config.js')

  console.log(chalk.cyan('Building kerbs...'))

  shell.rm('-rf', PATHS.public)
  const code = shell.exec(
    `node ${webpackExec} --mode production --config ${webpackConfig}`
  ).code

  if (code === 0) {
    fs.writeFileSync(`${PATHS.public}/_redirects`, '/* /index.html 200')

    console.log(
      chalk.green(
        `Successfully built kerbs! Check ${chalk.bold(PATHS.public)} folder.`
      )
    )
  } else {
    console.log(chalk.red(`Sorry! Something went wrong.`))
  }
}
