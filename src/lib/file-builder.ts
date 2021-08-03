import fs from 'fs/promises'
import { getConfigValue, state } from '../config/config-holder'
import { FileExtensions, Target } from '../models'
import NuxtGenTemplates from '../templates'
import { normalizeName } from './name-normalizer'

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

    await fs.writeFile(`${newPath}${extension}`, files.impl, {
      encoding: 'utf-8',
    })

    await fs.writeFile(
      `${newPath}.spec${state.isTs ? '.ts' : '.js'}`,
      files.spec,
      {
        encoding: 'utf-8',
      }
    )
  }

  private inject(): { impl: string; spec: string } {
    const template =
      NuxtGenTemplates[this.target][getConfigValue(this.target.toLowerCase())]

    return {
      impl: this.replaceAll(template.implementation),
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

  private replaceAll(contents: string): string {
    return this.replaceMap.reduce((prev, curr) => {
      return prev.replaceAll(curr[0], curr[1])
    }, contents)
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
