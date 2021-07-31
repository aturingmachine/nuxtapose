import fs from 'fs/promises'
import path from 'path'
import { Config } from '../models/config'

let config: Config = {}

export async function getConfig(): Promise<Config> {
  if (!Object.keys(config).length) {
    try {
      config = JSON.parse(
        await fs.readFile(path.resolve(process.cwd(), '.nuxtgenrc'), {
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
    path.resolve(process.cwd(), '.nuxtgenrc'),
    JSON.stringify(newConfig, undefined, 2)
  )
  config = newConfig
}

export function getConfigValue(key: string): string {
  console.log('>>>>>>>>>>>>>KEY', key)
  console.log('>>>>>>>>>>>>>CONFIG', config)
  return config[key as keyof Config] || ''
}
