import inquirer from 'inquirer'
import { Config } from '../models/config'

const configConstants = {
  module: 'modules',
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

  return { ...componentType, ...vuexType, ...configConstants } as Config
}
