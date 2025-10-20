module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['unused-imports'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.js'],
      env: { node: true, browser: false },
      parser: 'espree',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
