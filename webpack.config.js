const path = require('path')
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
  externals: /node_modules/,
  plugins: [
    new MinifyPlugin(minifyOpts)
  ],
  stats: {
    excludeModules: false
  }
}
