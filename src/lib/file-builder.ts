import fs from 'fs/promises'
import path from 'path'
import { getConfigValue, state } from '../config/config-holder'
import { FileExtensions, OutputDirs, Target } from '../models'
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
  private outputDir!: string

  constructor(name: string, target: Target, outputDir: string) {
    const normalizedName = normalizeName(target, name)

    this.outputDir = outputDir
    this.target = target

    this.names = {
      pascal: getPascalCase(normalizedName),
      kebab: normalizedName, // TODO need to turn other cases into kebab
      sentence: getSentenceCase(normalizedName),
      raw: normalizedName,
    }
  }

  async writeFiles(newPath: string, extension: FileExtensions): Promise<void> {
    const files = await this.inject()

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

  private async inject(): Promise<{ impl: string; spec: string }> {
    const basePath = path.resolve(
      __dirname,
      '../templates/',
      state.isTs ? 'ts' : 'js',
      this.outputDir,
      `${getConfigValue(this.target.toLowerCase())}.json`
    )
    const values = JSON.parse(
      await fs.readFile(basePath, { encoding: 'utf-8' })
    )

    return {
      impl: this.replaceAll(values.impl),
      spec: this.replaceAll(values.spec),
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
