import { FileExtensions, Target } from '../models'
import { normalizeName } from './name-normalizer'
import fs from 'fs/promises'
import path from 'path'
import { state } from '../config/config-holder'

export class PathBuilder {
  private namePath!: string
  private target!: Target
  private outputDir!: string

  private normalizedName!: string

  constructor(namePath: string, target: Target, outputDir: string) {
    this.namePath = namePath
    this.target = target
    this.outputDir = outputDir

    this.normalizedName = normalizeName(
      target,
      namePath
        .split('/')
        .reverse()
        .filter((x) => x.length > 0)[0]
    )
  }

  get path(): string {
    return path.resolve(
      process.cwd(),
      path.join(this.outputDir, this.namePath, this.finalSegment)
    )
  }

  async buildPath(): Promise<void> {
    const bottomDir = this.namePath.split('/').slice(0, -1).join('/')

    await fs.mkdir(
      path.resolve(process.cwd(), `${this.outputDir}/${bottomDir}`),
      { recursive: true }
    )
  }

  get extension(): FileExtensions {
    if ([Target.Component, Target.Page, Target.Layout].includes(this.target)) {
      return FileExtensions.Vue
    }

    return state.isTs ? FileExtensions.Typescript : FileExtensions.Javascript
  }

  private get finalSegment(): string {
    return this.namePath.endsWith('/') ? `/${this.normalizedName}` : ''
  }
}
