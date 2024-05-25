export default {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  transformIgnorePatterns: ["/node_modules/"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^../config$": "<rootDir>/__mocks__/config.js",
  },
};
