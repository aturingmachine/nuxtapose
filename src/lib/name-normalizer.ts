import { Target } from '../models'
import { CompatUtils } from '../utils/compat-utils'

type NameRule = {
  suffix: string
  remove: string[]
}

const NameRules: Record<Target, NameRule> = {
  Component: {
    suffix: '',
    remove: ['component'],
  },
  Service: {
    suffix: '-service',
    remove: ['service'],
  },
  Middleware: {
    suffix: '',
    remove: [],
  },
  ServerMiddleware: {
    suffix: '',
    remove: [],
  },
  Page: {
    suffix: '',
    remove: ['page'],
  },
  Layout: {
    suffix: '-layout',
    remove: ['layout'],
  },
  Vuex: {
    suffix: '',
    remove: ['store'],
  },
  Module: {
    suffix: '',
    remove: ['store', 'module'],
  },
}

export function normalizeName(target: Target, name: string): string {
  const rules = NameRules[target]
  rules.remove.forEach((removalWord) =>
    CompatUtils.String.replaceAll(name, removalWord, '')
  )
  return name.concat(rules.suffix)
}

export class Name {
  private static filename: string
  private static rules: NameRule

  static init(name: string, target: Target): void {
    Name.filename = name
    Name.rules = NameRules[target]
  }

  static withSuffix(): string {
    return Name.addSuffix(Name.filename)
  }

  static clean(): string {
    return Name.removeBannedStrings(Name.filename)
  }

  static normalized(): string {
    return Name.addSuffix(Name.clean())
  }

  private static addSuffix(source: string): string {
    return source.concat(Name.rules.suffix)
  }

  private static removeBannedStrings(source: string): string {
    let s = source
    Name.rules.remove.forEach(
      (removalWord) => (s = CompatUtils.String.replaceAll(s, removalWord, ''))
    )

    return s
  }
}
