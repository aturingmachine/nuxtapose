import inquirer from 'inquirer'
import { Config } from '../models/config'
import { pathExists } from '../utils/filesystem'
import path from 'path'
import { readFileSync } from 'fs'
import { Logger } from '../utils/log'

const configConstants = {
  module: 'modules',
}

function extractSrcDir(rawContents: string): string | undefined {
  return rawContents
    .split('\n')
    .filter((x: string) => x.includes('srcDir'))[0]
    ?.split(': ')[1]
    ?.replace(',', '')
    .replace(/['"]*/g, '')
}

async function readNuxtConfig(): Promise<string | undefined> {
  Logger.debug.blue('Attempting to determine srcDir...')
  if (pathExists(path.resolve(__dirname, '../../nuxt.config.ts'))) {
    Logger.debug.green('Found TypeScript config file')
    const raw = readFileSync(path.resolve(__dirname, '../../nuxt.config.ts'), {
      encoding: 'utf-8',
    })

    return extractSrcDir(raw)
  } else if (pathExists(path.resolve(__dirname, '../../nuxt.config.js'))) {
    Logger.debug.green('Found JavaScript config file')
    const raw = readFileSync(path.resolve(__dirname, '../../nuxt.config.js'), {
      encoding: 'utf-8',
    })

    return extractSrcDir(raw)
  } else {
    Logger.debug.magenta('No config file found...')
    return undefined
  }
}

export async function configMenu(): Promise<Config> {
  const componentType = await inquirer.prompt({
    type: 'list',
    name: 'component',
    message: 'What kind of components do you use?',
    choices: [
      {
        name: 'Class Based',
        value: 'class-based',
      },
      {
        name: 'Options API',
        value: 'options-api',
      },
    ],
  })

  const vuexType = await inquirer.prompt({
    type: 'list',
    name: 'vuex',
    message: 'How do you write your Vuex modules?',
    choices: [
      {
        name: 'Modules',
        value: 'modules',
      },
      {
        name: 'Class Based',
        value: 'class-based',
      },
    ],
  })

  const srcDir =
    (await readNuxtConfig()) ||
    (await inquirer.prompt({
      type: 'input',
      name: 'srcDir',
      message:
        "Do you use a srcDir property in your Nuxt configuration?\n(it seems you don't but we want to be sure)\n",
    }))

  return { ...componentType, ...vuexType, ...configConstants, srcDir } as Config
}
