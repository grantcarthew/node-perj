const path = require('path')
const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const minifyOpts = { mangle: true }

/*
WebPack Configuration Notes:

output.library:
  Defines the output as a library rather than a script.

output.libraryTarget:
  Defines the output to support modules.

output.globalObject:
  Required to prevent "window is not defined" when used in Node.js.

plugins.minifyPlubin:
  Mangles the file to reduce size.

plugins.webpack.IgnorePlugin:
  Ignores any modules that match the regex.

plugins.webpack.DefinePlugin:
  This is a fix because webpack tries to import a ./node_modules/process/browser.js module.

stats.excludeModules:
  Forces all build modules to be displayed on the console during building.

*/

module.exports = {
  mode: 'production',
  entry: './src/perj.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'perj.js',
    library: 'Perj',
    libraryTarget: 'umd',
    globalObject: `typeof self !== 'undefined' ? self : this`
  },
  plugins: [
    new MinifyPlugin(minifyOpts),
    new webpack.IgnorePlugin(/node_modules/),
    new webpack.DefinePlugin({ process: 'process' })
  ],
  stats: {
    excludeModules: false
  }
}
