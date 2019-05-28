#!/usr/bin/env node
import program from 'commander'
import init from './init'
import dev from './dev'
import build from './build'

program
  .command('init')
  .description('initialize kerbs')
  .action(init)

program
  .command('dev')
  .description('start the development server')
  .action(dev)

program
  .command('build')
  .description('generate a production ready doc site')
  .action(build)

program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
}
