import fs from 'fs'
import { getTemplateOptionFromConfig } from '../config/config-holder'
import { FileExtensions, Target } from '../models'
import NuxtGenTemplates, { Source, SourceFiles } from '../templates'
import { normalizeName } from './name-normalizer'
import path from 'path'
import { Logger } from '../utils/log'
import { yesNoPrompt } from '../utils/input-utils'
import chalk from 'chalk'
import { NuxtaposeEvent, NuxtaposeEventType } from './reporter'
import { OptState } from '../config/opt-state'
import { CompatUtils } from '../utils/compat-utils'

interface NameCases {
  pascal: string
  kebab: string
  sentence: string
  raw: string
}

const NameMatchers = {
  pascal: 'NP_PASCAL_CASE',
  kebab: 'NP_KEBAB_CASE',
  sentence: 'NP_SENTENCE_CASE',
  raw: 'NP_RAW_NAME',
}

export class FileBuilder {
  private names!: NameCases
  private target!: Target

  constructor(name: string, target: Target) {
    const normalizedName = normalizeName(target, name)

    this.target = target

    this.names = {
      pascal: getPascalCase(normalizedName),
      kebab: normalizedName, // TODO need to turn other cases into kebab
      sentence: getSentenceCase(normalizedName),
      raw: normalizedName,
    }

    Logger.debug.blue(`FileBuilder initialized with name ${this.names.raw}`)
  }

  async writeFiles(newPath: string, extension: FileExtensions): Promise<void> {
    Logger.debug.magenta('Preparing to Write Files!')
    const files = await this.inject()

    Logger.yellow('Creating Implementation Files:')
    const relativePath = path.relative(process.cwd(), newPath)
    await Promise.all(
      Object.entries(files.implementation).map(async ([fileName, source]) => {
        const fullName = `${
          this.target === Target.Page && newPath.includes(fileName)
            ? 'index'
            : fileName
        }${extension}`
        const path = `${newPath}/${fullName}`
        const friendlyPath = `${relativePath}/${fullName}`

        return await this.writeFile(path, friendlyPath, source, fullName)
      })
    )
    Logger.green('Implementation Files Generated\n')

    Logger.yellow('Creating Spec Files:')
    await Promise.all(
      Object.entries(files.spec).map(async ([fileName, source]) => {
        const fullFilename = `${fileName}.spec${OptState.isTs ? '.ts' : '.js'}`
        const path = `${newPath}/${fullFilename}`
        const friendlyPath = `${relativePath}/${fullFilename}`

        return await this.writeFile(path, friendlyPath, source, fullFilename)
      })
    )
    Logger.green('Spec Files Generated.')
  }

  private async inject(): Promise<Source> {
    const v = await getTemplateOptionFromConfig(this.target.toLowerCase())
    Logger.debug.green('Config Read')

    const template =
      typeof v === 'string'
        ? NuxtGenTemplates[this.target][OptState.isTs ? 'ts' : 'js'][v]
        : v

    return {
      implementation: this.replaceAll(template.implementation),
      spec: this.replaceAll(template.spec),
    }
  }

  private get replaceMap(): string[][] {
    return [
      [NameMatchers.pascal, this.names.pascal],
      [NameMatchers.kebab, this.names.kebab],
      [NameMatchers.sentence, this.names.sentence],
      [NameMatchers.raw, this.names.raw],
    ]
  }

  private replaceAll(contents: SourceFiles): SourceFiles {
    return CompatUtils.Object.fromEntries(
      Object.entries(contents).map(([fileName, sourceCode]) => {
        return [
          CompatUtils.String.replaceAll(
            fileName,
            NameMatchers.kebab,
            this.names.kebab
          ),
          this.replaceMap.reduce((prev, curr) => {
            return CompatUtils.String.replaceAll(prev, curr[0], curr[1])
          }, sourceCode),
        ]
      })
    )
  }

  private async writeFile(
    fullPath: string,
    friendlyPath: string,
    source: string,
    filename: string
  ): Promise<void> {
    const event = new NuxtaposeEvent(friendlyPath, filename, this.target)
    Logger.blue(chalk.bold(` > ${friendlyPath}`))

    try {
      fs.statSync(fullPath)
      event.type = NuxtaposeEventType.Overwrite

      const overwrite =
        OptState.canRunFreely ||
        (await yesNoPrompt(`Overwrite existing file ${friendlyPath}?`))

      if (overwrite) {
        event.complete()

        fs.writeFileSync(fullPath, source, {
          encoding: 'utf-8',
        })
      } else {
        event.skip()
        Logger.yellow(`Skipping ${friendlyPath}.`)
      }
    } catch (error) {
      event.type = NuxtaposeEventType.Write
      if (
        OptState.canWrite ||
        (await yesNoPrompt(`Write file ${friendlyPath}?`))
      ) {
        event.complete()
        fs.writeFileSync(fullPath, source, {
          encoding: 'utf-8',
        })
      } else {
        event.skip()
        Logger.yellow(`Skipping ${friendlyPath}.`)
      }
    }
  }
}

const getPascalCase = (name: string): string =>
  name
    .split('-')
    .map((b) => b.charAt(0).toUpperCase() + b.slice(1))
    .join('')

const getSentenceCase = (name: string): string =>
  name
    .split('-')
    .map((b) => b.charAt(0).toUpperCase() + b.slice(1))
    .join(' ')
