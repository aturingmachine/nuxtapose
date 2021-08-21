import fs from 'fs/promises'
import path from 'path'
import { Config, TemplateMap } from '../models/config'
import { Source, SourceFiles } from '../templates'
import { nuxtapose } from '../utils/constants'
import { getAllFiles, pathExists } from '../utils/filesystem'
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
    const customTemplate: Source = await readCustomTemplate(value)

    return customTemplate
  } else {
    return getConfigValue(key)
  }
}

async function readCustomTemplate(key: string): Promise<Source> {
  const customTemplatePath = path.resolve(__dirname, '../../.nuxtapose', key)
  const resolvedTemplatePath = (await pathExists(customTemplatePath))
    ? customTemplatePath
    : customTemplatePath + '.js'

  const isDir = (await fs.stat(resolvedTemplatePath)).isDirectory()

  let customTemplate: Source

  if (isDir) {
    const i = await buildSourceFiles(
      path.join(resolvedTemplatePath, 'implementation')
    )
    const s = await buildSourceFiles(path.join(resolvedTemplatePath, 'spec'))
    customTemplate = {
      implementation: i,
      spec: s,
    }
  } else {
    customTemplate = await import(resolvedTemplatePath)
  }

  return customTemplate
}

async function buildSourceFiles(path: string): Promise<SourceFiles> {
  const filePaths = await getAllFiles(path, [])

  const a = await Promise.all(
    filePaths.map(async (filePath) => {
      const name = filePath.split('/').pop()

      const contents = await fs.readFile(filePath, { encoding: 'utf-8' })

      return [name?.substring(0, name.indexOf('.')), contents]
    })
  )

  const parsed: SourceFiles = Object.fromEntries(a)

  return parsed
}
