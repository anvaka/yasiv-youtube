module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],

  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-use-before-define': 0,
    'no-console': 0,
    'no-bitwise': 0,
    'no-shadow': 0,
    'no-multi-assign': 0,
    'no-plusplus': 0,
    'no-mixed-operators': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'prefer-template': 0,
    'consistent-return': 0,
    'arrow-body-style': 0,
    'object-curly-spacing ': 0,

    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'import/extensions': 0,
    'prefer-rest-params': 0,
    'import/prefer-default-export': 0,
    'no-unused-vars': 1,
    'semi': 1
  },
  globals: {
    gapi: true
  }
}
