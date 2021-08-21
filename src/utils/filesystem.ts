import { readdir, stat, access } from 'fs/promises'
import path from 'path'

export const pathExists = async (path: string): Promise<boolean> => {
  try {
    await access(path)
    return true
  } catch (error) {
    return false
  }
}

export const getAllFiles = async (
  dirPath: string,
  arrayOfFiles: string[]
): Promise<string[]> => {
  const files = await readdir(dirPath, { withFileTypes: false })
  console.log(files)

  let filesCopy = [...arrayOfFiles]

  await Promise.all(
    files.map(async (file) => {
      if ((await stat(dirPath + '/' + file)).isDirectory()) {
        filesCopy = await getAllFiles(dirPath + '/' + file, arrayOfFiles)
      } else {
        filesCopy.push(path.join(dirPath, '/', file))
      }
    })
  )

  return filesCopy
}
