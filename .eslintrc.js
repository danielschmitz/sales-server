module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    semi: [2, "never"],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
}
