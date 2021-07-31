const Commands: Record<string, string[]> = {
  Generate: ['generate', 'g'],
}

const Targets: Record<string, string[]> = {
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
  static parseTarget(arg: string): string {
    const target = Object.entries(Targets)
      .filter(([_target, matchers]) => matchers.includes(arg))
      .map(([target, _matchers]) => target)
      .pop()

    if (!target) {
      throw new Error(
        `${arg} is not a valid command for nuxt-gen. Run nuxtgen help to see available commands.`
      )
    }

    return target
  }

  static parseCommand(arg: string): string {
    const command = Object.entries(Commands)
      .filter(([_command, matchers]) => matchers.includes(arg))
      .map(([command, _matchers]) => command)
      .pop()

    if (!command) {
      throw new Error(
        `${arg} is not a valid command for nuxt-gen. Run nuxtgen help to see available commands.`
      )
    }

    return command
  }
}
