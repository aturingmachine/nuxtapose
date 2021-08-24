import { FileExtensions, Target } from '../models'
import fs from 'fs'
import path from 'path'
import { OptState } from '../config/opt-state'
import { Logger } from '../utils/log'

export class PathBuilder {
  private namePath!: string
  private target!: Target
  private outputDir!: string

  constructor(namePath: string, target: Target, outputDir: string) {
    this.namePath = namePath
    this.target = target
    this.outputDir = outputDir
  }

  get path(): string {
    return path.resolve(
      process.cwd(),
      path.join(this.outputDir, this.bottomDir)
    )
  }

  buildPath(): void {
    Logger.debug.blue(`Running mkdir ${this.outputDir}/${this.bottomDir}`)
    fs.mkdirSync(
      path.resolve(process.cwd(), `${this.outputDir}/${this.bottomDir}`),
      { recursive: true }
    )
    Logger.debug.blue(`Directory Created!`)
  }

  get extension(): FileExtensions {
    if ([Target.Component, Target.Page, Target.Layout].includes(this.target)) {
      return FileExtensions.Vue
    }

    return OptState.isTs ? FileExtensions.Typescript : FileExtensions.Javascript
  }

  private get bottomDir(): string {
    if (this.forceBottomDir) {
      return path.normalize(this.namePath + '/')
    }

    return this.namePath.split('/').slice(0, -1).join('/')
  }

  private get forceBottomDir(): boolean {
    return [Target.Module].includes(this.target)
  }
}
