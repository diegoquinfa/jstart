#!/usr/bin/env node

import { Command } from 'commander'
import { setup } from './utils'
const cli = new Command()

cli
  .name('jstart')
  .description(
    'A CLI application for automating the setup of new JavaScript projects.'
  )
  .version('0.0.1')

// program
//   .command('split')
//   .description('Split a string into substrings and display as an array')
//   .argument('<string>', 'string to split')
//   .option('--first', 'display just the first substring')
//   .option('-s, --separator <char>', 'separator character', ',')
//   .action((str, options) => {
//     const limit = options.first ? 1 : undefined
//     console.log(str.split(options.separator, limit))
//   })

cli.parse()

setup(cli.opts())
