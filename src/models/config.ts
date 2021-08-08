export enum ReportLevels {
  All = 'all',
  CompletedOnly = 'completed-only',
  None = 'none',
}

export enum ConfirmationType {
  Never = 'never',
  Overwrite = 'overwrite-only',
  Always = 'always',
}

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
  confirmChanges?: ConfirmationType
  reportLevel?: ReportLevels
  component?: TypeScriptComponentTypes
  vuex?: TypeScriptVuexTypes
  module?: TypescriptVuexModuleTypes
}

export type State = {
  logLevel: 'normal' | 'debug' | 'silent'
  debug: boolean
  isTs: boolean
}
