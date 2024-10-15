/*

Description:
A full detail console log output including formatted data.
Raw JSON log data sent to file.

Platform:
- Node.js only due to:
  - 'os' module.
  - 'path' module.
  - 'process' object.
  - 'rotating-file-stream' module.

Dependencies:
- perj
- rotating-file-stream

Features:
- Logs to the console and file in development.
- Logs raw JSON objects to a file only in production.
- Logs ver, time, level, name, host, pid, file, message, and data properties.
- Stringified objects displayed on next line.
- The 'obj' variable has been sanitized so JSON.stringify is safe.

Usage:
- Copy and paste the code into your application to a 'logger.js' file.
- Import the module as 'logger', 'log', or something similar.
- Change the names of the environmet variables below if you are not happy with the existing names.
- Change the value of the 'name' variable below.
- Customize as needed.
- Replace 'module.exports' with 'exports default' to switch to ES2015 module syntax.
- In production you will need to pipe the process stdout to another process.

Suggestions:
- Consider using logrotate: https://github.com/logrotate/logrotate
- Add your apps session properties or unique id.
- Set the environment variables within the environment.
- See the 'app' example for a more complete solution.

Performance:
- Development Environment:
  - Logging is 'in process' which will effect application performance.
  - Using 'toISOString' will have a medium effect on performance.
  - Using 'passThrough' will have a small effect on performance.
- Production Environemnt:
  - File logging is 'in process' which will effect application performance.

*/

const Perj = require("perj");
const rfs = require("rotating-file-stream");
const isProd = process.env.NODE_ENV === "production";
const logFileRootPath = process.env.LOGFILEROOTPATH; // <======= CHANGE THIS ENV NAME
const logFilePrimaryName = process.env.LOGFILEPRIMARYNAME; // <======= CHANGE THIS ENV NAME
const ver = 1;
const host = require("os").hostname();
const pid = process.pid;
const file = require("path").basename(module.filename);
const name = "Your App Name"; // <======= CHANGE THIS NAME
const passThrough = !isProd;
const write = envWriter();

// Rotate file every day or > 1MB.
const stream = rfs(fileNameGenerator, {
  size: "1M",
  interval: "1d",
  rotationTime: true,
  path: logFileRootPath,
});
stream.on("error", (err) => console.error(err));
stream.on("warning", (err) => console.warn(err));

function fileNameGenerator(time, index) {
  const fileId = logFilePrimaryName;
  if (!time) {
    return fileId;
  }

  function pad(num) {
    return (num > 9 ? "" : "0") + num;
  }
  const ym = time.getFullYear() + "-" + pad(time.getMonth() + 1);
  const d = pad(time.getDate());
  const h = pad(time.getHours());
  const m = pad(time.getMinutes());

  return `${ym}/${ym}-${d}-${h}-${m}-${index}-${fileId}`;
}

module.exports = new Perj({ ver, name, host, pid, file, passThrough, write });

function envWriter() {
  if (isProd) {
    return process.stdout.write.bind(process.stdout);
  }
  return writeToConsole;
}

function writeToConsole(json, obj) {
  stream.write(json);
  const dt = new Date(obj.time);
  let output = `[${dt.toISOString()}][${obj.level}][${obj.name}](${obj.host}:${obj.pid}:${obj.file}) ${obj.msg}`;
  if (obj.data) {
    output += "\n" + JSON.stringify(obj.data, null, 2);
  }
  console.log(output);
}

/*

Example console output:

[2018-05-03T02:46:54.611Z][info][app](Dev:7094:node-file.js)
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
