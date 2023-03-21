module.exports = {
  root: true,
  extends: ['@react-native-community'],
  env: {
    'jest/globals': true,
  },
  overrides: [
    {
      files: ['*.js', '*.ts', '*.tsx'],
      processor: '@graphql-eslint/graphql',
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
};
