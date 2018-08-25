module.exports = {
    "extends": ["eslint:recommended", 'plugin:react/recommended', 'google'],
    env: {
      es6: true,
      browser: true,
      node: true,
      jest: true
    },
    parserOptions: {
      ecmaVersion: 6,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
        modules: true
      }
    },
}
