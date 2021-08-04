export enum TypeScriptComponentTypes {
  ClassBased = 'class-based',
  OptionsApi = 'options-api',
}

export enum TypeScriptVuexTypes {
  Module = 'modules',
  ClassBased = 'class-based',
}

export enum TypescriptVuexModuleTypes {
  Module = 'modules',
}

export interface Config {
  component?: TypeScriptComponentTypes
  vuex?: TypeScriptVuexTypes
  module?: TypescriptVuexModuleTypes
}

export type State = {
  isTs: boolean
}
