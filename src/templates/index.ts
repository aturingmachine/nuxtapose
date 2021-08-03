import { Target } from '../models'
import ComponentTemplates from './components'
import StoreTemplates from './store'

interface Source {
  implementation: string
  spec: string
}

export interface Templates {
  [key: string]: Source
}

type NuxtGenTemplates = {
  [key in Target]: Templates
}

const NuxtGenTemplates: NuxtGenTemplates = {
  Component: ComponentTemplates,
  Vuex: StoreTemplates,
  Service: StoreTemplates,
  Middleware: StoreTemplates,
  ServerMiddleware: StoreTemplates,
  Page: StoreTemplates,
  Layout: StoreTemplates,
  Module: StoreTemplates,
}

export default NuxtGenTemplates
