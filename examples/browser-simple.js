/*

Description:
A full detail console log output including formatted data.

Platform:
- Browser only due to 'location.hostname'.

Dependencies:
- perj

Features:
- Logs to the console only.
- Logs ver, time, level, name, host, message, and data properties.
- Stringified objects displayed on next line.
- The 'obj' variable has been sanitized so JSON.stringify is safe.

Usage:
- Copy and paste the code into your application to a 'logger.js' file.
- Import the module as 'logger', 'log', or something similar.
- Change the value of the 'name' variable below.
- Customize as needed.
- Replace 'module.exports' with 'exports default' to switch to ES2015 module syntax.

Suggestions:
- If your browser supports it, log object data using console.dir().
- Extend by sending the 'json' to a storage endpoint.
- Add your apps session properties or unique id.

Performance:
- Using 'toISOString' will have a medium effect on performance.
- Using 'passThrough' will have a small effect on performance.

Comment:
To test on Node.js, add these lines.
const location = {}
location.hostname = 'http://abc.net'

*/

import Perj from "https://unpkg.com/perj/dist/perj.js"
const ver = 1;
const name = "Your App Name"; // <======= CHANGE THIS NAME
const host = location.hostname;
const passThrough = true;

export const log = new Perj({ ver, name, host, passThrough, write });

function write(json, obj) {
  const dt = new Date(obj.time);
  let output = `[${dt.toISOString()}][${obj.level}][${obj.name}](${obj.host}) ${obj.msg}`;
  if (obj.data) {
    output += "\n" + JSON.stringify(obj.data, null, 2); // <=== Remove if you don't want data logged to the console.
  }
  console.log(output);

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
