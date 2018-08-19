module.exports = {
    verbose: true,
    "setupTestFrameworkScriptFile": "<rootDir>/test/renderer/setupTest.js",
    collectCoverage: true,
    collectCoverageFrom: ['renderer/**/*.{js,jsx}'],
    coverageReporters: ['lcov'],
    transform: {
        "^.+.jsx?$": "babel-jest"
    }
  };
