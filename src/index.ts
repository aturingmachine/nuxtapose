#!/usr/bin/env node

import figlet from 'figlet'
import { Generator } from './lib/generator'
import { getConfig, writeConfig } from './config/config-holder'
import { configMenu } from './config/config-menu'
import chalk from 'chalk'
import { Command } from 'commander'
import { checkForNuxt } from './utils/env-utils'
import { Logger } from './utils/log'
import { Reporter } from './lib/reporter'
import { OptState } from './config/opt-state'

const banner = chalk.blueBright(figlet.textSync('nuxtapose', 'Sub-Zero'), '\n')

const program = new Command()

program
  .name('nuxtapose')
  .version('0.0.1-beta.0.1.2')
  .addHelpText('beforeAll', banner)
  .hook('preAction', () => console.log(banner))
  .option('-d, --debug', 'Increase logging verbosity')
  .option('-q, --quiet', 'Suppress all logs')
  .option('-v, --verbose', 'Increase logging and reporting levels')
  .hook('preAction', async () => {
    OptState.options = program.opts()

    Logger.debug.log('Checking for Nuxt...')
    await checkForNuxt()
  })
  .hook('preAction', async (_thisCommand, actionCommand) => {
    Logger.debug.log('Reading nuxtapose Configuration')
    const config = await getConfig()
    OptState.parseConfig(config)

    if (
      !Object.keys(config).length &&
      !actionCommand.parent?.args.includes('init')
    ) {
      Logger.debug.yellow('No config loaded! Running setup wizard...')
      const newConfig = await configMenu()
      await writeConfig(newConfig)
    }
  })
/**
 * Generate Command
 */
program
  .command('generate')
  .alias('g')
  .option('-c, --confirm', 'Ask for confirmation before writing any files.')
  .argument('<template>', 'The type of template to generate')
  .argument(
    '<output-path>',
    'Where the generated template should be output under the default output directory. Paths ending in a / will generate a sub-directory for the output'
  )
  .description(
    `Generate a template for your nuxt application. Currently supported templates:

  component|c:    Generate a component output to /components
  vuex|v:         Generate a Vuex store module output to /store
  page|p:         Generate a Vue component output to /pages
  layout|l:       Generate a Vue component output to /layouts
  module|mod:     Generate a directory with state, getter, mutation, and action   files output to /store
  `
  )
  .action(async (template: string, output: string) => {
    Logger.debug.yellow(
      `Building Generator with template: ${chalk.bold.cyan(
        template
      )} writing to ${chalk.bold.cyan(output)}`
    )
    const generator = new Generator(template, output)
    Logger.debug.green('Generating Files!')
    await generator.generateFiles()
  })
  .hook('postAction', () => {
    Reporter.report()
  })
/**
 * Config Wizard Init Command
 */
program
  .command('init')
  .alias('i')
  .description('Run the Configuration Wizard')
  .action(async () => {
    const newConfig = await configMenu()
    await writeConfig(newConfig)
  })

program.parseAsync()
