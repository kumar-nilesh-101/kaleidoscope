/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './',
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/**/constant.ts',
        '!<rootDir>/src/**/*.types.ts',
        '!<rootDir>/src/**/*.interface.ts',
        '!<rootDir>/src/**/*.base.ts',
    ],
    moduleDirectories: ['node_modules', 'src'],
    modulePaths: ['<rootDir>'],
    testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
    coverageReporters: ['json', 'html'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: {
        'src/(.*)': '<rootDir>/src/$1',
        'tests/(.*)': '<rootDir>/__tests__/$1',
        '@design/(.*)': '<rootDir>/src/design/$1',
    },
    testRegex: '.spec.ts$',
    moduleFileExtensions: ['ts', 'js', 'json'],
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
