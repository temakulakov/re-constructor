// const mixins = require('postcss-mixins');

// const mixins = {
//   typography: {},
// };

module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'breakpoint-xs': '375px',
        'breakpoint-sm': '576px',
        'breakpoint-md': '768px',
        'breakpoint-lg': '960px',
        'breakpoint-xl': '1200px',
        'breakpoint-xxl': '1400px',
      },
    },
  },
};
