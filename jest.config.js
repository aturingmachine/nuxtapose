/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/specs/test-utils/mock-logger.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/(components|layouts|store|pages|.nuxtapose)/*',
  ],
}
