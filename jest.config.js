module.exports = {
  roots: ["<rootDir>/test/client/"],
  transform: {"^.+\\.tsx?$": "ts-jest"},
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupTestFrameworkScriptFile: "<rootDir>/setupEnzyme.ts",
}