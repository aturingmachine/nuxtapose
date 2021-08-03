import fs from 'fs/promises'
import { getConfigValue, state } from '../config/config-holder'
import { FileExtensions, Target } from '../models'
import NuxtGenTemplates, { Source, SourceFiles } from '../templates'
import { normalizeName } from './name-normalizer'
import chalk from 'chalk'
import path from 'path'
import { Logger } from '../utils/log'

interface NameCases {
  pascal: string
  kebab: string
  sentence: string
  raw: string
}

const NameMatchers = {
  pascal: '#[PASCAL_CASE]',
  kebab: '#[KEBAB_CASE]',
  sentence: '#[SENTENCE_CASE]',
  raw: '#[RAW_NAME]',
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
  }

  async writeFiles(newPath: string, extension: FileExtensions): Promise<void> {
    const files = this.inject()

    Logger.yellow('Creating Implementation Files:')
    const relativePath = path.relative(process.cwd(), newPath)
    await Promise.all(
      Object.entries(files.implementation).map(([fileName, source]) => {
        Logger.yellow(` > ${relativePath}/${fileName}${extension}`)
        return fs.writeFile(`${newPath}/${fileName}${extension}`, source, {
          encoding: 'utf-8',
        })
      })
    )
    Logger.green('Implementation Files Generated\n')

    Logger.yellow('Creating Spec Files:')
    await Promise.all(
      Object.entries(files.spec).map(([fileName, source]) => {
        Logger.yellow(
          ` > ${relativePath}/${fileName}.spec${state.isTs ? '.ts' : '.js'}`
        )

        fs.writeFile(
          `${newPath}/${fileName}.spec${state.isTs ? '.ts' : '.js'}`,
          source,
          {
            encoding: 'utf-8',
          }
        )
      })
    )
    Logger.green('Spec Files Generated.')
  }

  private inject(): Source {
    const template =
      NuxtGenTemplates[this.target][getConfigValue(this.target.toLowerCase())]

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
    return Object.fromEntries(
      Object.entries(contents).map(([fileName, sourceCode]) => {
        return [
          fileName.replaceAll(NameMatchers.kebab, this.names.kebab),
          this.replaceMap.reduce((prev, curr) => {
            return prev.replaceAll(curr[0], curr[1])
          }, sourceCode),
        ]
      })
    )
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
