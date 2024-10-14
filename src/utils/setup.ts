import { cp } from 'node:fs/promises'
import { join } from 'node:path'
import { OptionValues } from 'commander'
import { input, select } from '@inquirer/prompts'
import {
  getTemplateDirs,
  jstartConfigPath,
  TemplateOptions
} from './getTemplateDirs.js'
import chalk from 'chalk'
import ora from 'ora'

const setup = async (options: OptionValues) => {
  const spinner = ora('Wait...\n\n')
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

    spinner.start()

    await cp(answer, join(process.cwd(), projectName), {
      recursive: true,
      force: false
    })

    spinner.succeed()
    console.log(answer)

    if (options) {
      if (projectName) return undefined
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'ExitPromptError') {
      return console.log('Bye!')
    }

    console.log(chalk.bold.red('something was wrong! :('))
    spinner.fail()
  } finally {
    spinner.stop()
  }
}

export { setup }
