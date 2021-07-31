import { Generator } from './lib/generator'
import { getConfig, writeConfig } from './config/config-holder'
import { configMenu } from './config/config-menu'
import chalk from 'chalk'

async function main(): Promise<void> {
  const config = await getConfig()
  console.log(config)

  if (!config.component || !config.vuex) {
    console.log(chalk.blue('No config found. Opening Config Wizard...'))
    const newConfig = await configMenu()
    await writeConfig(newConfig)
  }

  const args = process.argv.slice(2)
  const passedCommand = args[0]
  const target = args[1]
  const name = args[2]

  // console.log(passedCommand, target)
  const generator = new Generator(passedCommand, target, name)
  generator.checkForNuxt()

  await generator.generateFiles()
}

main()
