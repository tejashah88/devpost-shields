const glob = require('glob-all');
const path = require('path');

const PurgecssPlugin = require('purgecss-webpack-plugin');

module.exports = {
  assetsDir: undefined,
  productionSourceMap: false,
  baseUrl: process.env.NODE_ENV === 'production' ? '/devpost-shields/' : '/',
  outputDir: undefined,
  runtimeCompiler: undefined,
  parallel: undefined,
  css: undefined,
  configureWebpack: {
    plugins: [
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './src/index.html'),
          path.join(__dirname, './**/*.vue'),
          path.join(__dirname, './src/**/*.js')
        ])
      })
    ]
  }
};