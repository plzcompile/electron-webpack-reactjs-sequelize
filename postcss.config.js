module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-preset-env': {},
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['html', 'body'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },

  }
}
/* eslint global-require: off, import/no-extraneous-dependencies: off */
module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')]
};