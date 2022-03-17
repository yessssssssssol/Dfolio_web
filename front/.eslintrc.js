module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/prop-types': [
      'enabled',
      {
        ignore: 'ignore',
        customValidators: 'customValidator',
        skipUndeclared: 'skipUndeclared',
      },
    ],
    'no-console': 0,
  },
};
