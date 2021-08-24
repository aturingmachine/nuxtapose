import fs from 'fs'
import { OptState } from '../config/opt-state'
import { Logger } from './log'

export async function checkForNuxt(): Promise<void> {
  const dirEnts = fs.readdirSync(process.cwd(), { withFileTypes: true })

  const hasNuxtConfig = dirEnts.some((dirEnt) => {
    if (dirEnt.name === 'nuxt.config.ts') {
      Logger.debug.green('Found nuxt.config.ts!')
      Logger.debug.log('Proceeding with TypeScript')
      OptState.isTs = true
      return true
    }

    if (dirEnt.name === 'nuxt.config.js') {
      Logger.debug.green('Found nuxt.config.js!')
      Logger.debug.log('Proceeding with JavaScript')
      OptState.isTs = false
      return true
    }

    return false
  })

  if (!hasNuxtConfig) {
    Logger.debug.red('Could not find Nuxt Configuration.')
    throw new Error('nuxtapose must be run in a directory with a Nuxt project')
  }
}
