import { OptionValues } from 'commander'
import { input, select } from '@inquirer/prompts'
import {
  getTemplateDirs,
  jstartConfigPath,
  TemplateOptions
} from './getTemplateDirs'

const setup = async (options: OptionValues) => {
  const projectName = await input({
    message: 'project name: ',
    required: true
  })

  const op = await getTemplateDirs(jstartConfigPath)

  let answer: TemplateOptions[] | string = op

  while (Array.isArray(answer)) {
    answer = await select({
      message: 'Select a template',
      choices: answer
    })
  }

  console.log(answer)

  if (options) {
    if (projectName) return undefined
  }
}

export { setup }
