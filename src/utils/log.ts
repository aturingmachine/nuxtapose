import chalk from 'chalk'
import { OptState } from '../config/opt-state'

type LogFn = (msg: string) => void

export class Logger {
  static blue(...args: unknown[]): void {
    Logger.log(chalk.blue(`${args}`))
  }

  static green(...args: unknown[]): void {
    Logger.log(chalk.green(`${args}`))
  }

  static yellow(...args: unknown[]): void {
    Logger.log(chalk.yellow(`${args}`))
  }

  static red(...args: unknown[]): void {
    Logger.log(chalk.red(`${args}`))
  }

  static magenta(...args: unknown[]): void {
    Logger.log(chalk.magenta(`${args}`))
  }

  static get debug(): {
    log: LogFn
    blue: LogFn
    green: LogFn
    yellow: LogFn
    red: LogFn
    magenta: LogFn
  } {
    return {
      log: (msg: string) => Logger.debugLog(msg, chalk.white),
      blue: (msg: string) => Logger.debugLog(msg, chalk.blue),
      green: (msg: string) => Logger.debugLog(msg, chalk.green),
      yellow: (msg: string) => Logger.debugLog(msg, chalk.yellow),
      red: (msg: string) => Logger.debugLog(msg, chalk.red),
      magenta: (msg: string) => Logger.debugLog(msg, chalk.magenta),
    }
  }

  private static tag(
    msg: string,
    color: chalk.Chalk = chalk.blue,
    tag = '[nuxtapose] '
  ): string {
    return color(tag).concat(msg)
  }

  private static log(msg: string): void {
    if (!OptState.isSilent) {
      console.log(Logger.tag(msg))
    }
  }

  private static debugLog(msg: string, color: chalk.Chalk): void {
    if (OptState.isDebug) {
      console.log(
        Logger.tag(color(msg), chalk.magentaBright, '[nuxtapose] [DEBUG] ')
      )
    }
  }
}
