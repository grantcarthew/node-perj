/*

Description:
Saves 'standard input' to a rotating log file and uploads the completed file to
a Google Cloud Platform Cloud Storage bucket.

Consider using StackDriver logging instead if you wish to fully integrate with Google Cloud Platform.
https://cloud.google.com/stackdriver/

Platform:
- Node.js only due to:
  - 'rotating-file-stream' module.
  - '@google-cloud/Storage/ module.

Dependencies:
- rotating-file-stream
- @google-cloud/storage

Features:
- Pipes 'process.stdin' to a rotating file.
- Uploades log file to Google Cloud Storage bucket (virtually unlimited storage).
- Logs data out of your application process.
- Use GCP to analyse the logs:
  - Google Cloud Platform services that can read directly from Cloud Storage (for log data):
    - BigQuery: SQL like querys to analyse large datasets.
    - Dataflow: Transform the logs to target other storeage or analysis engines.
    - Dataproc: Hadoop/Spark batch processing, querying, streaming, and machine learning.
    - Datalab: Easy to use interactive tool for data exploration, analysis, visualization and machine learning.
    - ML Engine: Cloud Machine Learning Engine - build superior models and deploy them into production.

Usage:
- Create a GCP account: https://cloud.google.com/free/
- Open the GCP Console: https://console.cloud.google.com/
- Enable the Storage API: https://support.google.com/cloud/answer/6158841?hl=en
- Create a Service Account: https://cloud.google.com/compute/docs/access/service-accounts
  - Give the account the 'Storage Object Creator' role.
  - Ensure you generate a JSON key and download it.
- Save the JSON key to a known path.
- Set the GOOGLE_APPLICATION_CREDENTIALS environment variable to point to the JSON key file.
- Set the LOGFILEROOTPATH environment variable to the absolute path to store the log files (/tmp would be fine).
- Set the LOGFILEPRIMARYNAME environment variable to something like 'app.log'.
- Copy and paste the code into your application as a 'file-rotate-gcp.js' file.
- Customize as needed. Change the Project ID and Bucket name.
- Pipe your application stdout into this file using something like this:
  node examples/util-log-generator.js | node examples/node-stdin-gcp.js

Suggestions:
- Consider a solution to remove old log files.
- Consider adding a graceful shutdown option to upload the partial log file.

Performance:
- Development Environment:
  - Logging is 'out of process' so it will not effect the application process.
- Production Environemnt:
  - Logging is 'out of process' so it will not effect the application process.

*/

const rfs = require('rotating-file-stream')
const Storage = require('@google-cloud/storage')
const logFileRootPath = process.env.LOGFILEROOTPATH // <======= CHANGE THIS ENV NAME
const logFilePrimaryName = process.env.LOGFILEPRIMARYNAME // <======= CHANGE THIS ENV NAME
const projectId = 'Your Project Id' // <======= CHANGE GCP PROJECT ID
const bucketName = 'Your Bucket Name' // <======= CHANGE GCP BUCKET NAME
const storage = new Storage({ projectId: projectId })

// Rotate file every day or > 1MB.
const stream = rfs(fileNameGenerator, {
  size: '1M',
  interval: '1d',
  rotationTime: true,
  path: logFileRootPath
})
process.stdin.pipe(stream)
stream.on('error', onError)
stream.on('warning', onWarning)
stream.on('rotated', onRotated)

function fileNameGenerator (time, index) {
  const fileId = logFilePrimaryName
  if (!time) { return fileId }

  const ym = time.getFullYear() + '-' + (time.getMonth() + 1).toString().padStart(2, '0')
  const d = time.getDate().toString().padStart(2, '0')
  const h = time.getHours().toString().padStart(2, '0')
  const m = time.getMinutes().toString().padStart(2, '0')
  const s = time.getSeconds().toString().padStart(2, '0')
  const ms = time.getMilliseconds().toString().padStart(3, '0')

  return `${ym}/${ym}-${d}-${h}-${m}-${s}.${ms}-${fileId}`
}

// Upload log file to Google Cloud Storage
function onRotated (fileName) {
  return storage
    .bucket(bucketName)
    .upload(fileName)
    .then(() => {
      console.log(`GCP: ${fileName} uploaded to ${bucketName}.`)
    })
    .catch(err => {
      console.error(err)
    })
}

function onWarning (err) {
  console.warn(err)
}

function onError (err) {
  console.log(err)
}
