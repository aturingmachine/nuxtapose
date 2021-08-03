import { Target } from '../models'

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
    remove: ['store'],
  },
}

export function normalizeName(target: Target, name: string): string {
  const rules = NameRules[target]
  rules.remove.forEach((removalWord) => name.replaceAll(removalWord, ''))
  name.concat(rules.suffix)

  return name
}
