import fs from 'fs/promises'
import path from 'path'
import { getConfigValue } from '../config/config-holder'

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

  constructor(name: string) {
    this.names = {
      pascal: getPascalCase(name),
      kebab: name,
      sentence: getSentenceCase(name),
      raw: name,
    }
    // console.log(this.names)
  }

  async inject(
    isTs: boolean,
    outputDir: string,
    target: string
  ): Promise<{ impl: string; spec: string }> {
    console.log(target)
    // console.log('>>>>>>>', getConfigValue(target.toLowerCase()))
    const basePath = path.resolve(
      __dirname,
      '../templates/',
      isTs ? 'ts' : 'js',
      outputDir,
      `${getConfigValue(target.toLowerCase())}.json`
    )
    const values = JSON.parse(
      await fs.readFile(basePath, { encoding: 'utf-8' })
    )
    // const baseFile = await fs.readFile(
    //   path.resolve(
    //     __dirname,
    //     `../docs/${outputDir}/${getConfigValue(target.toLowerCase())}/impl.txt`
    //   ),
    //   { encoding: 'utf-8' }
    // )
    // const specBaseFile = await fs.readFile(
    //   path.resolve(
    //     __dirname,
    //     `../docs/${outputDir}/${getConfigValue(target.toLowerCase())}/spec.txt`
    //   ),
    //   { encoding: 'utf-8' }
    // )

    const impl = values.impl
      .replaceAll(NameMatchers.pascal, this.names.pascal)
      .replaceAll(NameMatchers.kebab, this.names.kebab)
      .replaceAll(NameMatchers.sentence, this.names.sentence)
      .replaceAll(NameMatchers.raw, this.names.raw)
    const spec = values.spec
      .replaceAll(NameMatchers.pascal, this.names.pascal)
      .replaceAll(NameMatchers.kebab, this.names.kebab)
      .replaceAll(NameMatchers.sentence, this.names.sentence)
      .replaceAll(NameMatchers.raw, this.names.raw)

    // console.log(impl, spec)
    return { impl, spec }
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
