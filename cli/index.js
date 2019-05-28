#!/usr/bin/env node
import program from 'commander'
import init from './init'
import dev from './dev'

program
  .command('init')
  .description('initialize kerbs')
  .action(init)

program
  .command('dev')
  .description('start the development server')
  .action(dev)

program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
}
