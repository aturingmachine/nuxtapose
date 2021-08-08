import { OutputDirs, Target } from '../models'
import { CommandParser } from './command-parser'
import { FileBuilder } from './file-builder'
import { Name } from './name-normalizer'
import { PathBuilder } from './path-builder'

export class Generator {
  private target!: Target | undefined
  private outputDir!: string
  private pathBuilder!: PathBuilder
  private fileBuilder!: FileBuilder

  constructor(rawTarget: string, namePath: string) {
    const name = namePath
      .split('/')
      .reverse()
      .filter((x) => x.length > 0)[0]

    this.target = CommandParser.parseTarget(rawTarget)
    Name.init(name, this.target)
    this.outputDir = OutputDirs[this.target]
    this.pathBuilder = new PathBuilder(namePath, this.target, this.outputDir)
    this.fileBuilder = new FileBuilder(name, this.target)
  }

  async generateFiles(): Promise<void> {
    await this.pathBuilder.buildPath()

    await this.fileBuilder.writeFiles(
      this.pathBuilder.path,
      this.pathBuilder.extension
    )
  }
}
