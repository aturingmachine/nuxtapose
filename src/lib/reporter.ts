import { Target } from '../models'
import Table from 'cli-table'
import chalk from 'chalk'
import { Logger } from '../utils/log'
import { OptState } from '../config/opt-state'

export enum NuxtaposeEventType {
  Write = 'write',
  Overwrite = 'overwrite',
}

export class NuxtaposeEvent {
  relativePath!: string
  filename!: string
  templateType!: Target
  status!: 'skipped' | 'completed'
  private _type!: NuxtaposeEventType

  constructor(relativePath: string, filename: string, templateType: Target) {
    this.relativePath = relativePath
    this.filename = filename
    this.templateType = templateType

    Reporter.addEvent(this)
  }

  set type(newType: NuxtaposeEventType) {
    this._type = newType
  }

  get type(): NuxtaposeEventType {
    return this._type
  }

  complete(): void {
    this.status = 'completed'
  }

  skip(): void {
    this.status = 'skipped'
  }

  get asRow(): string[] {
    return [
      this.isComplete ? chalk.green('✓') : chalk.yellow('↷'),
      this._type,
      this.relativePath,
      this.filename,
      this.templateType,
    ]
  }

  get canBeReported(): boolean {
    return this.status === 'completed' || OptState.shouldReportSkips
  }

  private get isComplete(): boolean {
    return this.status === 'completed'
  }
}

export class Reporter {
  private static _events: NuxtaposeEvent[] = []

  static addEvent(newEvent: NuxtaposeEvent): void {
    Reporter._events.push(newEvent)
  }

  static get events(): NuxtaposeEvent[] {
    return [...Reporter._events]
  }

  static report(): void {
    if (OptState.canReport) {
      console.log(chalk.bold('\nnuxtapose run report'))
      console.log(Reporter.table)
    }
  }

  private static get table(): string {
    Logger.debug.blue('Building report table')
    const table = new Table({
      head: ['status', 'type', 'path', 'filename', 'template'],
    })

    Reporter._events
      .filter((event) => event.canBeReported)
      .forEach((event) => table.push(event.asRow))

    return table.toString()
  }
}
