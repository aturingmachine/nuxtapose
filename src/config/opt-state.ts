import { ConfirmationType, ReportLevels, Config } from '../models/config'

export class OptState {
  private static _isTs: boolean
  private static _logLevel: 'normal' | 'debug' | 'silent'
  private static _confirm: ConfirmationType
  private static _reportLevel: ReportLevels

  static parseConfig(config: Config): void {
    if (OptState._confirm === undefined) {
      OptState._confirm = config.confirmChanges || ConfirmationType.Overwrite
    }

    if (OptState._reportLevel === undefined) {
      OptState._reportLevel = config.reportLevel || ReportLevels.All
    }
  }

  /* eslint-disable-next-line */
  static set options(opts: any) {
    OptState.validateOptions(opts)

    OptState.logLevel = opts
    OptState.mustConfirm = opts
    OptState.reportLevel = opts
  }

  static set isTs(isTs: boolean) {
    OptState._isTs = isTs
  }

  static get isTs(): boolean {
    return this._isTs
  }

  static get isDebug(): boolean {
    return this._logLevel === 'debug'
  }

  static get isSilent(): boolean {
    return this._logLevel === 'silent'
  }

  static get canRunFreely(): boolean {
    return this._confirm === ConfirmationType.Never
  }

  static get canWrite(): boolean {
    return [ConfirmationType.Never, ConfirmationType.Overwrite].includes(
      this._confirm
    )
  }

  static get canReport(): boolean {
    return this._reportLevel !== ReportLevels.None
  }

  static get shouldReportSkips(): boolean {
    return this._reportLevel === ReportLevels.All
  }

  /* eslint-disable-next-line */
  private static set mustConfirm(opts: any) {
    this._confirm = opts.confirm
  }

  /* eslint-disable-next-line */
  private static set logLevel(opts: any) {
    OptState._logLevel = 'normal'
    if (opts.debug || opts.verbose) {
      OptState._logLevel = 'debug'
    }
    if (opts.quiet) {
      OptState._logLevel = 'silent'
    }
  }

  /* eslint-disable-next-line */
  private static set reportLevel(opts: any) {
    if (opts.quiet) {
      OptState._reportLevel = ReportLevels.None
    }

    if (opts.verbose) {
      OptState._reportLevel = ReportLevels.All
    }
  }

  /* eslint-disable-next-line */
  private static validateOptions(opts: any): void {
    if (opts.quiet && (opts.debug || opts.verbose)) {
      throw new Error(
        '--quiet flag cannot be used in conjunction with --debug or --verbose'
      )
    }
  }
}
