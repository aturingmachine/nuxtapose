#!/usr/bin/env node

import figlet from 'figlet'
import { Generator } from './lib/generator'
import { getConfig, writeConfig } from './config/config-holder'
import { configMenu } from './config/config-menu'
import chalk from 'chalk'

async function main(): Promise<void> {
  console.log(chalk.blueBright(figlet.textSync('nuxt-gen', 'Rounded')), '\n')

  const config = await getConfig()

  if (!config.component || !config.vuex) {
    const newConfig = await configMenu()
    await writeConfig(newConfig)
  }

  const args = process.argv.slice(2)
  const passedCommand = args[0]
  const target = args[1]
  const name = args[2]

  const generator = new Generator(passedCommand, target, name)
  await generator.checkForNuxt()

  await generator.generateFiles()
}

main()
