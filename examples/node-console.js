/*

Description:
A full detail console log output including formatted data.

Platform:
- Node.js only due to 'os' and 'path' module usage.

Dependencies:
- perj

Features:
- Logs to the console only.
- Logs ver, time, level, name, host, pid, file, message, and data properties.
- Stringified objects displayed on next line.
- The 'obj' variable has been sanitized so JSON.stringify is safe.

Usage:
- Copy and paste the code into your application to a 'logger.js' file.
- Import the module as 'logger', 'log', or something similar.
- Change the value of the 'name' variable below.
- Customize as needed.
- Replace 'module.exports' with 'exports default' to switch to ES2015 module syntax.

*/

const perj = require('../perj')
const ver = 1
const host = require('os').hostname()
const pid = process.pid
const file = require('path').basename(module.filename)
const name = 'Your App Name' // <======= CHANGE THIS NAME
const passThrough = true

module.exports = perj.create({ ver, name, host, pid, file, passThrough, write })

function write (json, obj) {
  const dt = new Date(obj.time)
  let output = `[${dt.toISOString()}][${obj.level}][${obj.name}](${obj.host}:${obj.pid}:${obj.file}) ${obj.msg}\n`
  output += JSON.stringify(obj.data, null, 2)
  console.log(output)

  // Extend by sending 'json' to your API or cloud storage.
}

/*
Example console output:

[2018-05-03T02:46:54.611Z][info][full](Dev:7094:console-full.js)
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
