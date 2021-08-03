import fs from 'fs/promises'
import { state } from '../config/config-holder'
import { OutputDirs, Target } from '../models'
import { CommandParser } from './command-parser'
import { FileBuilder } from './file-builder'
import { PathBuilder } from './path-builder'

export class Generator {
  private target!: Target | undefined
  private outputDir!: string
  private pathBuilder!: PathBuilder
  private fileBuilder!: FileBuilder

  constructor(passedCommand: string, rawTarget: string, namePath: string) {
    const name = namePath
      .split('/')
      .reverse()
      .filter((x) => x.length > 0)[0]

    CommandParser.parseCommand(passedCommand)
    this.target = CommandParser.parseTarget(rawTarget)
    this.outputDir = OutputDirs[this.target]
    this.pathBuilder = new PathBuilder(namePath, this.target, this.outputDir)
    this.fileBuilder = new FileBuilder(name, this.target)
  }

  async checkForNuxt(): Promise<void> {
    const dirEnts = await fs.readdir(process.cwd(), { withFileTypes: true })

    const hasNuxtConfig = dirEnts.some((dirEnt) => {
      if (dirEnt.name === 'nuxt.config.ts') {
        state.isTs = true
        return true
      }

      if (dirEnt.name === 'nuxt.config.js') {
        state.isTs = false
        return true
      }

      return false
    })

    if (!hasNuxtConfig) {
      throw new Error('nuxt-gen must be run in a directory with a Nuxt project')
    }
  }

  async generateFiles(): Promise<void> {
    await this.pathBuilder.buildPath()

    await this.fileBuilder.writeFiles(
      this.pathBuilder.path,
      this.pathBuilder.extension
    )
  }
}
