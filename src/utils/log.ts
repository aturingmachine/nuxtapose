import chalk from 'chalk'

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

  private static tag(msg: string): string {
    return chalk.blue('[nuxt-gen] ').concat(msg)
  }

  private static log(msg: string): void {
    console.log(Logger.tag(msg))
  }
}
