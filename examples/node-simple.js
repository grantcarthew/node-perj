/*

Description:
A full detail console log output including formatted data.

Platform:
- Node.js only due to:
  - 'os' module.
  - 'process' object.

Dependencies:
- perj

Features:
- Logs to the console if in development.
- Logs to 'process.stdout' if in production.
- Logs ver, time, level, name, host, pid, message, and data properties.
- Stringified objects displayed on next line.
- The 'obj' variable has been sanitized so JSON.stringify is safe.

Usage:
- Copy and paste the code into your application to a 'logger.js' file.
- Import the module as 'logger', 'log', or something similar.
- Change the value of the 'name' variable below.
- Customize as needed.
- In production you will need to pipe the process stdout to another process.

Suggestions:
- Extend by sending the 'json' to a local file or database.
- Add your apps session properties or unique id.
- See the 'app' example for a more complete solution.

Performance:
- Development Environment:
  - Logging is 'in process' which will effect application performance.
  - Using 'toISOString' will have a medium effect on performance.
  - Using 'passThrough' will have a small effect on performance.
- Production Environemnt:
  - Performance will be at maximum.

*/

import { Perj } from "../dist/perj.js";
import { hostname } from "os";
const isProd = process.env.NODE_ENV === "production";
const ver = 1;
const host = hostname();
const pid = process.pid;
const name = "Your App Name"; // <======= CHANGE THIS NAME
const passThrough = !isProd;
const write = envWriter();

export const log = new Perj({ ver, name, host, pid, passThrough, write });

function envWriter() {
  if (isProd) {
    return process.stdout.write.bind(process.stdout);
  }
  return writeToConsole;
}

function writeToConsole(json, obj) {
  const dt = new Date(obj.time);
  let output = `[${dt.toISOString()}][${obj.level}][${obj.name}](${obj.host}:${obj.pid}) ${obj.msg}`;
  if (obj.data) {
    output += "\n" + JSON.stringify(obj.data, null, 2); // <=== Remove if you don't want data logged to the console.
  }
  console.log(output);

  // Extend by sending 'json' to your API or cloud storage.
}

/*

Example console output:

[2018-05-03T02:46:54.611Z][info][app](Dev:7094)
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
