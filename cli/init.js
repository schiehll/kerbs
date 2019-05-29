import path from 'path'
import fs from 'fs'
import shell from 'shelljs'
import { Input, Select } from 'enquirer'
import chalk from 'chalk'
import PATHS from '../webpack/paths'

export default async () => {
  const configPath = path.resolve(process.cwd(), '.kerbsrc.json')

  if (fs.existsSync(configPath)) {
    console.log(chalk.yellow`Found a .kerbsrc.json file, will be using it.`)
  } else {
    const namePrompt = new Input({
      message: `What's the project name?`,
      initial: 'Unnamed Project'
    })
    const projectName = await namePrompt.run()

    fs.writeFileSync(
      configPath,
      JSON.stringify({ name: projectName }, null, 2),
      'utf8'
    )
  }

  if (!fs.existsSync(PATHS.docs)) {
    const templatePrompt = new Select({
      message: 'Choose a template',
      choices: ['app', 'lib']
    })
    const template = await templatePrompt.run()

    fs.mkdirSync(PATHS.docs)

    shell.cp(
      '-r',
      path.resolve(__dirname, `../src/templates/${template}/*`),
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
