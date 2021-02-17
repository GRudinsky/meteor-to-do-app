// const { defaults } = require('jest-config');
module.exports = {
  testURL: 'http://localhost:9999',
  // testPathIgnorePatterns: [
  //   '__mocks__/*'
  // ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx'
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  modulePaths: [
    '<rootDir>'
  ],
  setupFiles: [
    '<rootDir>/enzyme.config.js'
  ],
  name: 'to-do-app',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  }
};