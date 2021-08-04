export enum Target {
  Component = 'Component',
  Service = 'Service',
  Middleware = 'Middleware',
  ServerMiddleware = 'ServerMiddleware',
  Page = 'Page',
  Layout = 'Layout',
  Vuex = 'Vuex',
  Module = 'Module',
}

export enum FileExtensions {
  Vue = '.vue',
  Typescript = '.ts',
  Javascript = '.js',
}

export const OutputDirs: Record<Target, string> = {
  Component: 'components',
  Service: 'services',
  Middleware: 'middleware',
  ServerMiddleware: 'server-middleware',
  Page: 'pages',
  Layout: 'layouts',
  Vuex: 'store',
  Module: 'store',
}
