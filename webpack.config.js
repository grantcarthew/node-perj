const path = require('path')
const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

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

const config = {
  entry: './src/perj.js',
  stats: {
    excludeModules: false
  }
}

// Unminified, uncompressed, inline source map.
const stdConfig = Object.assign({}, config, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'perj.js',
    library: 'Perj',
    libraryTarget: 'umd',
    globalObject: `typeof self !== 'undefined' ? self : this`
  },
  plugins: [
    new webpack.IgnorePlugin(/node_modules/),
    new webpack.DefinePlugin({ process: 'process' })
  ]
})

// Minify and compress producing a min and min.gz file.
const minConfig = Object.assign({}, config, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'perj.min.js',
    library: 'Perj',
    libraryTarget: 'umd',
    globalObject: `typeof self !== 'undefined' ? self : this`
  },
  plugins: [
    new webpack.IgnorePlugin(/node_modules/),
    new webpack.DefinePlugin({ process: 'process' }),
    new MinifyPlugin({ mangle: true }),
    new CompressionPlugin()
  ]
})

// Return Array of Configurations
module.exports = [
  stdConfig, minConfig
]
