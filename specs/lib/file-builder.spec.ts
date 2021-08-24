import fs, { Stats } from 'fs'
import { mocked } from 'ts-jest/utils'
import { FileBuilder } from '../../src/lib/file-builder'
import { getTemplateOptionFromConfig } from '../../src/config/config-holder'
import { FileExtensions, Target } from '../../src/models'
import { mockTemplate } from '../test-utils/mock-templates'
import { yesNoPrompt } from '../../src/utils/input-utils'
import { NuxtaposeEvent } from '../../src/lib/reporter'

jest.mock('fs')
jest.mock('../../src/config/config-holder', () => ({
  __esModule: true,
  getTemplateOptionFromConfig: jest.fn(),
}))
jest.mock('../../src/utils/input-utils')
jest.mock('../../src/lib/reporter')

const mockFs = mocked(fs)
const mockTemplateGet = mocked(getTemplateOptionFromConfig)
const mockYesNo = mocked(yesNoPrompt)
const mockEvent = mocked(NuxtaposeEvent, true)

const mockEventFns = {
  complete: jest.fn(),
  skip: jest.fn(),
}

mockEvent.mockReturnValue(mockEventFns as unknown as NuxtaposeEvent)

const name = 'my-component'

describe('FileBuilder', () => {
  let fileBuilder: FileBuilder

  beforeEach(() => {
    mockTemplateGet.mockResolvedValue(mockTemplate())
    fileBuilder = new FileBuilder(name, Target.Component)
  })

  it('should write the filled out templates to a path using the provided path and extension', async () => {
    mockFs.statSync.mockReturnValue({} as Stats)
    mockYesNo.mockResolvedValue(true)

    await fileBuilder.writeFiles('new/path', FileExtensions.Vue)
    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      'new/path/my-component-impl.vue',
      'implementation\nmy-component\nMyComponent\nMy Component\nmy-component',
      {
        encoding: 'utf-8',
      }
    )
    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      'new/path/my-component-spec.spec.js',
      'spec\nmy-component\nMyComponent\nMy Component\nmy-component',
      {
        encoding: 'utf-8',
      }
    )

    expect(mockEvent).toHaveBeenCalledWith(
      'new/path/my-component-impl.vue',
      'my-component-impl.vue',
      'Component'
    )

    expect(mockEvent).toHaveBeenCalledWith(
      'new/path/my-component-spec.spec.js',
      'my-component-spec.spec.js',
      'Component'
    )

    expect(mockEventFns.complete).toHaveBeenCalledTimes(2)
  })
})
