module.exports = {
  'extends': 'eslint-config-airbnb',
  'env': {
    'browser': true
  },
  'rules': {
    'max-len': [2, 120, 2, {ignoreComments: true}],
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { 'aspects': ['invalidHref'] }],
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'comma-dangle': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'arrow-parens': 0,
    'import/extensions': 0,
    'no-unused-vars': 1,
    'no-new': 0,
    'no-underscore-dangle': 0,
    'prefer-template': 0,
    'keyword-spacing': 0,
    'no-plusplus': 0,
    'prefer-const': 0,
    'new-cap': ['error', { "properties": false }],
    'quote-props': ["error", "consistent"],
    'import/prefer-default-export': 0,
    'no-return-await': 0,
    'no-prototype-builtins': 0
  },
  'plugins': [
    'react', 'import'
  ],
  'globals': {
    'web3': true,
    'chrome': false,
    'Web3': false,
    'fetch': false,
    '$': false,
    'lightwallet': false,
    'prompt': false
  }
};
