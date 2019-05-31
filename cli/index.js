#!/usr/bin/env node
import program from 'commander'

program
  .command('init')
  .description('initialize kerbs')
  .action(() => {
    const init = require('./init').default
    init()
  })

program
  .command('dev')
  .description('start the development server')
  .action(() => {
    const dev = require('./dev').default
    dev()
  })

program
  .command('build')
  .description('generate a production ready doc site')
  .action(() => {
    const build = require('./build').default
    build()
  })

program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
}
