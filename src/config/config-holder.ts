import fs from 'fs/promises'
import path from 'path'
import { Config, State } from '../models/config'

const configAliases = {
  layout: 'component',
  page: 'component',
}

let config: Config = {}

export async function getConfig(): Promise<Config> {
  if (!Object.keys(config).length) {
    try {
      config = JSON.parse(
        await fs.readFile(path.resolve(process.cwd(), '.nuxtgenrc.json'), {
          encoding: 'utf-8',
        })
      )
    } catch (error) {
      config = {}
    }
  }

  return config
}

export async function writeConfig(newConfig: Config): Promise<void> {
  await fs.writeFile(
    path.resolve(process.cwd(), '.nuxtgenrc.json'),
    JSON.stringify(newConfig, undefined, 2)
  )
  config = newConfig
}

export function getConfigValue(key: string): string {
  const parsedKey = configAliases[key as keyof typeof configAliases] || key
  return config[parsedKey as keyof Config] || ''
}

export const state: State = {
  isTs: false,
}
