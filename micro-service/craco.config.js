// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [require('autoprefixer')],
    },
  },
  babel: {
    presets: ['@babel/preset-react'],
  },
};
