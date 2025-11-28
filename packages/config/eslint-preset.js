module.exports = {
  extends: ["eslint:recommended"],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "warn",
    "no-restricted-imports": ["error", {
      "patterns": ["**/apps/*", "../apps/*"]
    }]
  },
};