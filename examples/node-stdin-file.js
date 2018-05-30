/*

Description:
Saves standard input to a rotating log file.

Platform:
- Node.js only due to:
  - 'rotating-file-stream' module.

Dependencies:
- rotating-file-stream

Features:
- Pipes 'process.stdin' to a rotating file.
- Logs data out of your application process.

Usage:
- Copy and paste the code into your application as a 'rotate-file.js' file.
- Set the LOGFILEROOTPATH environment variable to the absolute path to store the log files.
- Set the LOGFILEPRIMARYNAME environment variable to something like 'app.log'.
- Customize as needed.
- Pipe your application stdout into this file using something like this:
  node examples/util-log-generator.js | node examples/node-stdin-file.js

Suggestions:
- Consider using logrotate: https://github.com/logrotate/logrotate

Performance:
- Development Environment:
  - Logging is 'out of process' so it will not effect the application process.
- Production Environemnt:
  - Logging is 'out of process' so it will not effect the application process.

*/

const rfs = require('rotating-file-stream')
const logFileRootPath = process.env.LOGFILEROOTPATH // <======= CHANGE THIS ENV NAME
const logFilePrimaryName = process.env.LOGFILEPRIMARYNAME // <======= CHANGE THIS ENV NAME

// Rotate file every day or > 1MB.
const stream = rfs(fileNameGenerator, {
  size: '1M',
  interval: '1d',
  rotationTime: true,
  path: logFileRootPath
})
stream.on('error', (err) => console.error(err))
stream.on('warning', (err) => console.warn(err))

function fileNameGenerator (time, index) {
  const fileId = logFilePrimaryName
  if (!time) { return fileId }

  const ym = time.getFullYear() + '-' + (time.getMonth() + 1).toString().padStart(2, '0')
  const d = time.getDate().toString().padStart(2, '0')
  const h = time.getHours().toString().padStart(2, '0')
  const m = time.getMinutes().toString().padStart(2, '0')
  const s = time.getSeconds().toString().padStart(2, '0')
  const ms = time.getMilliseconds().toString().padStart(3, '0')

  return `${ym}/${ym}-${d}-${h}-${m}-${s}.${ms}-${index}-${fileId}`
}

process.stdin.pipe(stream)
