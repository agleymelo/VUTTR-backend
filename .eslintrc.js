module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['standard', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier/@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    camelcase: 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never'
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
}
