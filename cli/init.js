import path from 'path'
import fs from 'fs'
import shell from 'shelljs'
import { prompt } from 'enquirer'
import chalk from 'chalk'

export default async () => {
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
}
