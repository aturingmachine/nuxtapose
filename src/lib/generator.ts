import fs from 'fs/promises'
import path from 'path'
import { CommandParser } from './command-parser'
import { FileBuilder } from './file-builder'

const OutputDirs: Record<string, string> = {
  Component: 'components',
  Service: 'services',
  Middleware: 'middleware',
  ServerMiddleware: 'server-middleware',
  Page: 'pages',
  Layout: 'layouts',
  Vuex: 'store',
  Module: 'store/modules',
}

export class Generator {
  private isTs!: boolean
  private currentDir!: string
  private target!: string | undefined
  private command!: string | undefined
  private name!: string
  private namePath!: string
  private outputDir!: string
  private fileBuilder!: FileBuilder

  constructor(passedCommand: string, target: string, namePath: string) {
    this.name = namePath
      .split('/')
      .reverse()
      .filter((x) => x.length > 0)[0]

    console.log('name', this.name)
    this.namePath = namePath
    this.currentDir = process.cwd()
    this.command = CommandParser.parseCommand(passedCommand)
    this.target = CommandParser.parseTarget(target)
    this.outputDir = OutputDirs[this.target]

    this.fileBuilder = new FileBuilder(this.name)

    console.table({
      command: this.command,
      target: this.target,
      outputDir: this.outputDir,
      namePath,
      name: this.name,
    })
  }

  async checkForNuxt(): Promise<void> {
    const dirEnts = await fs.readdir(this.currentDir, { withFileTypes: true })

    const hasNuxtConfig = dirEnts.some((dirEnt) => {
      if (dirEnt.name === 'nuxt.config.ts') {
        this.isTs = true
        return true
      }

      if (dirEnt.name === 'nuxt.config.ts') {
        this.isTs = false
        return true
      }

      return false
    })

    console.log(hasNuxtConfig, this.isTs)

    if (!hasNuxtConfig) {
      throw new Error('nuxt-gen must be run in a directory with a Nuxt project')
    }
  }

  async getFileContents(): Promise<{ impl: string; spec: string }> {
    const files = await this.fileBuilder.inject(
      true, // TODO use real ts val, or come up with override somehow
      this.outputDir,
      this.target || ''
    )

    return files
  }

  async generateFiles(): Promise<void> {
    const extenstion = ['Component', 'Page', 'Layout'].includes(
      this.target || ''
    )
      ? // TODO make this more robust
        '.vue'
      : '.ts'

    const shouldMakeBottomDir = this.namePath.endsWith('/')

    const newPath = path.resolve(
      process.cwd(),
      path.join(
        this.outputDir,
        this.namePath,
        shouldMakeBottomDir ? `/${this.name}` : ''
      )
    )

    const files = await this.getFileContents()

    await this.buildPath()

    await fs.writeFile(newPath + extenstion, files.impl, { encoding: 'utf-8' })
    await fs.writeFile(newPath + '.spec.ts', files.spec, { encoding: 'utf-8' })
  }

  private async buildPath(): Promise<void> {
    // make final dir if namepath ends in / ?
    const bottomDir = this.namePath.split('/').slice(0, -1).join('/')
    console.log(bottomDir)

    await fs.mkdir(
      path.resolve(process.cwd(), `${this.outputDir}/${bottomDir}`),
      { recursive: true }
    )
  }
}
