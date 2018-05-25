const path = require('path')
const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const minifyOpts = { mangle: true }

module.exports = {
  mode: 'production',
  entry: './src/perj.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'perj.js',
    library: 'perj',
    libraryTarget: 'umd',
    globalObject: `typeof self !== 'undefined' ? self : this`
  },
  plugins: [
    new MinifyPlugin(minifyOpts),
    new webpack.DefinePlugin({ process: 'process' })
  ],
  stats: {
    excludeModules: false
  }
}
