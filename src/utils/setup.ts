import { OptionValues } from 'commander'
import { input, select } from '@inquirer/prompts'
import {
  getTemplateDirs,
  jstartConfigPath,
  TemplateOptions
} from './getTemplateDirs.js'
import chalk from 'chalk'

const setup = async (options: OptionValues) => {
  try {
    const projectName = await input({
      message: 'project name:',
      required: true
    })

    const op = await getTemplateDirs(jstartConfigPath)

    let answer: TemplateOptions[] | string = op

    for (let i = 0; Array.isArray(answer); i++) {
      const message = (num: number): string => {
        if (num === 0) return 'Select environment'
        else if (num === 1) return 'Select framework'
        else return 'Select variant'
      }

      answer = await select({
        theme: {
          prefix: chalk.bold.blue('-')
        },
        message: message(i),
        choices: answer
      })
    }

    console.log(answer)

    if (options) {
      if (projectName) return undefined
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'ExitPromptError') {
      return console.log('Bye!')
    }

    console.log(chalk.bold.red('something was wrong! :('))
    console.log(err)
  }
}

export { setup }
