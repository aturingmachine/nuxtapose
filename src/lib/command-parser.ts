import { Target } from '../models'

const Commands: Record<string, string[]> = {
  Generate: ['generate', 'g'],
}

const TargetOptions: Record<Target, string[]> = {
  Component: ['component', 'c'],
  Service: ['service', 's'],
  Middleware: ['middleware', 'm'],
  ServerMiddleware: ['server-middleware', 'sm'],
  Page: ['page', 'p'],
  Layout: ['layout', 'l'],
  Vuex: ['vuex', 'v'],
  Module: ['module', 'mod'],
}

export class CommandParser {
  static parseTarget(arg: string): Target {
    const target = Object.entries(TargetOptions)
      .filter(([_target, matchers]) => matchers.includes(arg))
      .map(([target, _matchers]) => target)
      .pop()

    if (!target) {
      throw new Error(
        `${arg} is not a valid command for nuxt-gen. Run nuxtgen help to see available commands.`
      )
    }

    return target as Target
  }

  static parseCommand(arg: string): void {
    const command = Object.entries(Commands)
      .filter(([_command, matchers]) => matchers.includes(arg))
      .map(([command, _matchers]) => command)
      .pop()

    if (!command) {
      throw new Error(
        `${arg} is not a valid command for nuxt-gen. Run nuxtgen help to see available commands.`
      )
    }
  }
}
