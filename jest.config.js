/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/constant.ts',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
  coverageReporters: ['json', 'html'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
