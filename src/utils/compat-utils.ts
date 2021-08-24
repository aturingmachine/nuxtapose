import { Logger } from './log'

export class CompatUtils {
  static String = {
    replaceAll(source: string, find: string, replace: string): string {
      Logger.debug.red(`Replacing, ${find} with ${replace}`)
      let sourceCopy = source
      while (sourceCopy.indexOf(find) > -1) {
        sourceCopy = sourceCopy.replace(find, replace)
      }

      return sourceCopy
    },
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  static Object = {
    fromEntries(entries: any[][]): Record<any, any> {
      const obj: Record<any, any> = {}

      entries.forEach(([key, val]) => {
        obj[key] = val
      })

      return obj
    },
  }
}
