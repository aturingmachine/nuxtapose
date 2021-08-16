import fs from 'fs/promises'
import path from 'path'
import { Config, TemplateMap } from '../models/config'
import { Source } from '../templates'
import { nuxtapose } from '../utils/constants'
import { Logger } from '../utils/log'

const configAliases = {
  layout: 'component',
  page: 'component',
}

let config: Config = {}

export async function getConfig(): Promise<Config> {
  if (!Object.keys(config).length) {
    Logger.debug.yellow('No config loaded!')
    try {
      const configPath = path.resolve(process.cwd(), nuxtapose.configFilename)

      Logger.debug.yellow(`Reading configuration from ${configPath}`)

      config = JSON.parse(
        await fs.readFile(configPath, {
          encoding: 'utf-8',
        })
      )

      Logger.debug.blue(`Loaded Config: ${JSON.stringify(config)}`)
    } catch (error) {
      Logger.debug.red(
        `No ${nuxtapose.configFilename} found, initializing empty configuration.`
      )
      config = {}
    }
  }

  return config
}

export async function writeConfig(newConfig: Config): Promise<void> {
  Logger.debug.blue(`Writing configuration ${JSON.stringify(newConfig)}`)

  await fs.writeFile(
    path.resolve(process.cwd(), nuxtapose.configFilename),
    JSON.stringify(newConfig, undefined, 2)
  )
  config = newConfig
}

function getConfigValue(key: string): string {
  const parsedKey = configAliases[key as keyof typeof configAliases] || key
  return config[parsedKey as keyof Config] || ''
}

export async function getTemplateOptionFromConfig(
  key: string
): Promise<string | Source> {
  const value = config[key as keyof Config] || ''
  if (
    !Object.values(TemplateMap[key as keyof typeof TemplateMap]).includes(value)
  ) {
    const customTemplate: Source = await import(
      path.resolve(__dirname, '../../.nuxtapose', value)
    )

    return customTemplate
  } else {
    return getConfigValue(key)
  }
}
