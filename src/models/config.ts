export enum TypeScriptComponentTypes {
  ClassBased = 'class-based',
  OptionsApi = 'options-api',
}

export enum TypeScriptVuexTypes {
  Module = 'module',
  ClassBased = 'class-based',
}

export interface Config {
  component?: TypeScriptComponentTypes
  vuex?: TypeScriptVuexTypes
}

export type State = {
  isTs: boolean
}
