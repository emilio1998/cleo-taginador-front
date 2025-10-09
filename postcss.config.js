module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
    require('postcss-focus-visible')({
      replaceWith: '[data-focus-visible-added]',
    }),
    require('autoprefixer'),
  ],
};
