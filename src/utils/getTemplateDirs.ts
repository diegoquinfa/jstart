import { readdir } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'

const regexOptionsDir = /^\[\w+\]$/

type TemplateOptions = {
  name: string
  value: TemplateOptions[] | string
}

const jstartConfigPath = join(homedir(), '.config', 'jstart', 'templates')

const getTemplateDirs = async (
  path: string,
  result: TemplateOptions[] = [],
  firstLevel: boolean = true
): Promise<TemplateOptions[]> => {
  const dirs = await readdir(path)

  for (const dir of dirs) {
    if (regexOptionsDir.test(dir)) {
      const option = {
        name: dir,
        value: await getTemplateDirs(join(path, dir), [], false)
      }

      if (option.value.length === 0) continue
      result.push(option)
    } else if (!firstLevel) {
      const option = {
        name: dir,
        value: join(path, dir)
      }
      result.push(option)
    }
  }

  return result
}

// ;(async () => {
//   const a = await getTemplateDirs(jstartConfigPath)
//   console.log(JSON.stringify(a, undefined, 2))
// })()

export { getTemplateDirs, jstartConfigPath, TemplateOptions }
