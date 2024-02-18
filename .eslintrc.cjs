/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      // Enables type checking for typescript files.
      // Src for the overrides from here :
      // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
      files: ["*.ts", "*.tsx", "*.mts", "*.cts"],
      rules: {},
    },
  ],
  root: true,
  env: {
    node: true,
  },
};
