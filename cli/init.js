import path from 'path'
import fs from 'fs'
import shell from 'shelljs'
import { prompt } from 'enquirer'
import chalk from 'chalk'
import PATHS from '../webpack/paths'

export default async () => {
  const response = await prompt({
    type: 'input',
    name: 'PROJECT_NAME',
    message: `What's the project name?`,
    initial: 'Unnamed Project'
  })

  const configPath = path.resolve(process.cwd(), '.kerbsrc.json')

  if (fs.existsSync(configPath)) {
    console.log(chalk.yellow`Found a .kerbsrc.json file, will be using it.`)
  } else {
    fs.writeFileSync(
      configPath,
      JSON.stringify({ name: response.PROJECT_NAME }, null, 2),
      'utf8'
    )
  }

  if (!fs.existsSync(PATHS.docs)) {
    fs.mkdirSync(PATHS.docs)

    shell.cp(
      '-r',
      path.resolve(__dirname, '../src/templates/default/*'),
      PATHS.docs
    )
    shell.touch('-c', fs.readdirSync(PATHS.docs))
    console.log(
      chalk.green(
        `Done! Check the ${chalk.bold(
          PATHS.docs
        )} folder to start writing your docs.`
      )
    )
  } else {
    console.log(
      chalk.yellow(
        `Looks like it's already initialized. Delete the ${chalk.bold(
          PATHS.docs
        )} folder and try again.`
      )
    )
  }
}
