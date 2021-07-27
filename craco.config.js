module.exports = {
  babel: {
    presets: ['@emotion/babel-preset-css-prop'],
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:8200',
    },
  },
}
