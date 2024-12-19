module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.eslintrc.js',
    '.prettierrc.js',
    '**/*.css',
  ],
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/static-property-placement': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'global-require': 'off',
    'no-await-in-loop': 'off',
    'react/no-unknown-property': [
      'error',
      {
        ignore: ['crossorigin'],
      },
    ],
    'import/no-named-as-default': 'off',
    'react/state-in-constructor': 'off',
    'react/prop-types': 'off',
    'arrow-parens': 'off',
    'func-names': 'off',
    'object-curly-newline': 'off',
    curly: [2, 'all'],
    'no-mixed-operators': 'off',
    'no-param-reassign': 'off',
    'function-paren-newline': 'off',
    'no-irregular-whitespace': 'off',
    'space-before-function-paren': 0,
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignorePattern: '^(im|ex)port .*',
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-alert': 'error',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-cycle': [0, { ignoreExternal: true }],
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          every: ['id'],
        },
      },
    ],
    'prettier/prettier': ['error'],
    'no-unused-expressions': 'off',
    'react/no-array-index-key': 'off',
    'react/sort-comp': [
      1,
      {
        order: ['static-methods', 'lifecycle', 'everything-else', 'rendering'],
      },
    ],
    'react/require-default-props': 'off',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/ban-types': ['warn'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        typedefs: false,
        ignoreTypeReferences: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        ignoreRestArgs: true,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
