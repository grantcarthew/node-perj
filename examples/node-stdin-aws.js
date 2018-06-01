/*

Description:
Sends 'standard input' to an AWS CloudWatch Logs store.

Platform:
- Node.js only due to:
  - process.stdin
  - 'util' module.
  - 'split2' module.
  - 'better-queue' module.
  - 'aws-sdk' module.

Dependencies:
- split2
- better-queue
- azure-storage

Features:
- Pipes 'process.stdin' an AWS CloudWatch Logs.
- Creates the log group name and log stream name if they don't exist.
- Works in batches.
- Logs data out of your application process.

Usage:
- Create a AWS account: https://aws.amazon.com/free/
- Open the AWS portal: https://console.aws.amazon.com
- Create an IAM account: https://console.aws.amazon.com/iam
- Assign the new IAM account the 'CloudWatchLogsFullAccess' permission.
- Set the AWS_ACCESS_KEY_ID environment variable to the new IAM user access key id.
- Set the AWS_SECRET_ACCESS_KEY environment variable to the new IAM user secret access key.
- Set the AWS_CLOUDWATCHLOG_GROUPNAME environment variable to any valid group name.
- Set the AWS_CLOUDWATCHLOG_STREAMNAME environment variable to any valid stream name.
- Set the AWS_REGION environment variable to your reagion.
- Copy and paste the code into your application as a 'aws-cloudwatchlogs.js' file.
- Customize as needed. Change the queue properties.
- Pipe your application stdout into this file using something like this:
  node examples/util-log-generator.js | node examples/node-stdin-aws.js

Suggestions:
- Consider a graceful shutdown to upload remaining items in the queue.
- Consider catching the InvalidSequenceTokenException and refreshing if needed.

Performance:
- Development Environment:
  - Logging is 'out of process' so it will not effect the application process.
- Production Environemnt:
  - Logging is 'out of process' so it will not effect the application process.

*/

const util = require('util')
const split = require('split2')
const Queue = require('better-queue')
const AWS = require('aws-sdk')
const logGroupName = process.env.AWS_CLOUDWATCHLOG_GROUPNAME
const logStreamName = process.env.AWS_CLOUDWATCHLOG_STREAMNAME
const cwLogs = new AWS.CloudWatchLogs()
const describeLogGroups = util.promisify(cwLogs.describeLogGroups.bind(cwLogs))
const describeLogStreams = util.promisify(cwLogs.describeLogStreams.bind(cwLogs))
const putLogEvents = util.promisify(cwLogs.putLogEvents.bind(cwLogs))
const createLogGroup = util.promisify(cwLogs.createLogGroup.bind(cwLogs))
const createLogStream = util.promisify(cwLogs.createLogStream.bind(cwLogs))
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})
const queue = new Queue(uploadBatch, {
  maxRetries: 2,
  batchSize: 1000, // how many do we process at a time
  batchDelay: 2000,
  batchDelayTimeout: 5000,
  failTaskOnProcessException: false
})

let sequenceToken = null

process.stdin.setEncoding('utf8')
const writable = process.stdin.pipe(split(JSON.parse))
writable.on('finish', onFinish)
writable.on('error', onError)

// main is called at the bottom of this file.
async function main () {
  await checkGroup()
  await checkStream()
  writable.on('data', onData)
}

async function checkGroup () {
  try {
    const { logGroups } = await describeLogGroups()
    const groupExists = logGroups.some((group) => group.logGroupName === logGroupName)
    groupExists || await createLogGroup({ logGroupName })
  } catch (err) {
    console.error(err)
  }
}

async function checkStream () {
  try {
    sequenceToken = await refreshSequenceToken()
    if (!sequenceToken) {
      await createLogStream({ logGroupName, logStreamName })
      sequenceToken = await refreshSequenceToken()
    }
  } catch (err) {
    console.error(err)
  }
}

async function refreshSequenceToken () {
  const { logStreams } = await describeLogStreams({ logGroupName })
  const logStream = logStreams.filter((s) => s.logStreamName === logStreamName)[0]
  return logStream.uploadSequenceToken || null
}

async function onData (chunk) {
  const logEvent = {
    message: JSON.stringify(chunk),
    timestamp: chunk.time
  }
  queue.push(logEvent)
}

async function uploadBatch (logEvents, cb) {
  const payloadBody = {
    logEvents,
    logGroupName,
    logStreamName,
    sequenceToken
  }
  try {
    const data = await putLogEvents(payloadBody)
    sequenceToken = data.nextSequenceToken
    cb(null)
  } catch (err) {
    console.error(err)
    cb(err)
  }
}

function onFinish () {
  console.log('Data stream terminated.')
}

function onError (err) {
  console.log(err)
}

main()
