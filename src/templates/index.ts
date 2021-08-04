import { Target } from '../models'
import ComponentTemplates from './components'
import LayoutTemplates from './layouts'
import StoreTemplates from './store'
import StoreModulesTemplate from './store-modules'

export type SourceFiles = {
  [key: string]: string
}

export interface Source {
  implementation: SourceFiles
  spec: SourceFiles
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
  Layout: LayoutTemplates,
  Module: StoreModulesTemplate,
}

export default NuxtGenTemplates
