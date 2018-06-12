/*

Description:
A full detail console log output including colourful properties
and formatted data.

Platform:
- Node.js only due to:
  - 'os' module.
  - 'path' module.
  - 'process' object.
  - 'chalk' module.
  - 'json-colorizer' module.

Dependencies:
- perj
- chalk
- json-colorizer

Features:
- Logs colourful text to the console if in development.
- Logs to 'process.stdout' if in production.
- Logs ver, time, level, name, host, pid, file, message, and data properties.
- Stringified objects displayed on next line in colour.
- The 'obj' variable has been sanitized so JSON.stringify is safe.

Usage:
- Copy and paste the code into your application to a 'logger.js' file.
- Import the module as 'logger', 'log', or something similar.
- Change the value of the 'name' variable below.
- Customize as needed.
- Replace 'module.exports' with 'exports default' to switch to ES2015 module syntax.
- In production you will need to pipe the process stdout to another process.

Suggestions:
- Extend by sending the 'json' to a local file or database.
- Add your apps session properties or unique id.
- See the 'app' example for a more complete solution.

Performance:
- Development Environment:
  - Logging is 'in process' which will effect application performance.
  - Using colourful output will have a large effect on performance.
  - Using 'toISOString' will have a medium effect on performance.
  - Using 'passThrough' will have a small effect on performance.
- Production Environemnt:
  - Performance will be at maximum.

*/

const Perj = require('perj')
const chalk = require('chalk')
const colorize = require('json-colorizer')
const isProd = process.env.NODE_ENV === 'production'
const ver = 1
const host = require('os').hostname()
const pid = process.pid
const file = require('path').basename(module.filename)
const name = 'Your App Name' // <======= CHANGE THIS NAME
const passThrough = !isProd
const write = envWriter()

module.exports = new Perj({ ver, name, host, pid, file, passThrough, write })

function envWriter () {
  if (isProd) {
    return process.stdout.write.bind(process.stdout)
  }
  return writeToConsole
}

function writeToConsole (json, obj) {
  const dt = chalk.magenta((new Date(obj.time)).toISOString())
  const nameCol = chalk.magenta(obj.name)
  let output = `[${dt}][${levelCol(obj.level)}][${nameCol}](${obj.host}:${obj.pid}:${obj.file}) ${obj.msg}`
  if (obj.data) {
    output += '\n' + colorize(JSON.stringify(obj.data, null, 2)) // <=== Remove if you don't want data logged to the console.
  }
  console.log(output)

  // Extend by sending 'json' to your API or cloud storage.
}

function levelCol (level) {
  switch (level) {
    case 'fatal':
    case 'error':
      return chalk.red(level)
    case 'warn':
      return chalk.yellow(level)
    case 'info':
      return chalk.blue(level)
    case 'debug':
      return chalk.green(level)
    case 'trace':
      return chalk.cyan(level)
  }
  return level
}

/*

Example console output (colour not visible here):

[2018-05-03T05:17:14.935Z][info][full](Dev:7367:node-colourful.js)
{
  "name": "TARDIS",
  "class": "Time and Relative Dimension in Space",
  "modelType": 40,
  "manufacturer": "Gallifrey",
  "features": [
    "Bigger on the inside",
    "Space Transport",
    "Time Travel"
  ],
  "exterior": {
    "policeBox": [
      "1963",
      "1966",
      "1976",
      "1980",
      "1996",
      "2005",
      "2010",
      "2014"
    ],
    "car": "Bessie"
  }
}

*/
