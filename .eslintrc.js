module.exports = {
  extends: ['./node_modules/poetic/config/eslint/eslint-config.js'],
  // Add custom rules here
  env: {
    browser: true,
    es2021: true,
    es6: true,
    jquery: true,
    webextensions: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'import/no-extraneous-dependencies': 'off',
  },
};
