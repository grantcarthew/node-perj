/*

Description:
A full detail console log output including formatted data.

Platform:
- Browser only due to location.hostname

Dependencies:
- perj

Features:
- Logs to the console only.
- Logs time, level, name, host, and message properties.
- Stringified objects displayed on next line.

Usage:
- Copy and paste the code into your application.
- Replace 'module.exports' with 'exports default' to switch to ES2015 module syntax.

Comment:
To test on Node.js, add these lines.
const location = {}
location.hostname = 'http://abc.net'

*/

const perj = require('perj')
const ver = 1
const name = 'Your App Name' // <======= CHANGE THIS NAME
const host = location.hostname
const passThrough = true

module.exports = perj.create({ ver, name, host, passThrough, write })

function write (json, obj) {
  const dt = new Date(obj.time)
  let output = `[${dt.toISOString()}][${obj.level}][${obj.name}](${obj.host}) ${obj.msg}\n`
  output += JSON.stringify(obj.data, null, 2)
  console.log(output)

  // Extend by sending 'json' to your API or cloud storage.
}

/*
Example console output:

[2018-05-03T02:46:54.611Z][info][full](Dev:7094:console-full.js) Speak Friend and Enter.
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
