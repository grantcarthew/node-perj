/*

Description:
Saves standard in to a rotating log file.

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
- Change the names of the environmet variables below if you are not happy with the existing names.
- Customize as needed.
- Pipe your application stdout into this file using something like this:
  node examples/util-log-generator.js | LOGFILEROOTPATH=Logs LOGFILEPRIMARYNAME=app.log node examples/node-stdin-file.js

Suggestions:
- Consider using logrotate: https://github.com/logrotate/logrotate
- Set the environment variables within the environment.

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

  function pad (num) {
    return (num > 9 ? '' : '0') + num
  }
  const ym = time.getFullYear() + '-' + pad(time.getMonth() + 1)
  const d = pad(time.getDate())
  const h = pad(time.getHours())
  const m = pad(time.getMinutes())

  return `${ym}/${ym}-${d}-${h}-${m}-${index}-${fileId}`
}

process.stdin.pipe(stream)
