import { mocked } from 'ts-jest/utils'
import { Logger } from '../../src/utils/log'

jest.mock('../../src/utils/log')

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
const NoOp = () => {}

const mockLogger = mocked(Logger, true)

mockLogger.blue.mockImplementation(NoOp)
mockLogger.green.mockImplementation(NoOp)
mockLogger.yellow.mockImplementation(NoOp)
mockLogger.red.mockImplementation(NoOp)
mockLogger.magenta.mockImplementation(NoOp)
mockLogger.debug = {
  log: jest.fn(),
  blue: jest.fn(),
  green: jest.fn(),
  yellow: jest.fn(),
  red: jest.fn(),
  magenta: jest.fn(),
}
mockLogger.debug.log.mockImplementation(NoOp)
mockLogger.debug.blue.mockImplementation(NoOp)
mockLogger.debug.green.mockImplementation(NoOp)
mockLogger.debug.yellow.mockImplementation(NoOp)
mockLogger.debug.red.mockImplementation(NoOp)
mockLogger.debug.magenta.mockImplementation(NoOp)
