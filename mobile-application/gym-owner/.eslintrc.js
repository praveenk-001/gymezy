module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: [require.resolve('@react-native/babel-preset')],
    },
  },
  rules: {
    'react-native/no-inline-styles': 'off',
  },
};
