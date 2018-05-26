/*
Description:
Send logs to Google Cloud Storage.

Concider using StackDriver logging instead if you wish to fully integrate with Google Cloud Platform.
https://cloud.google.com/stackdriver/

When to use:
Great for development or production.

Platform:
- Node.js

Dependencies:
- @google-cloud/storage npm package.

Features:
- Logs to Google Cloud Storage bucket (virtually unlimited storage).
- Use GCP to analyse the logs:
  - Google Cloud Platform services that can read directly from Cloud Storage (for log data):
    - BigQuery: SQL like querys to analyse large datasets.
    - Dataflow: Transform the logs to target other storeage or analysis engines.
    - Dataproc: Hadoop/Spark batch processing, querying, streaming, and machine learning.
    - Datalab: Easy to use interactive tool for data exploration, analysis, visualization and machine learning.
    - ML Engine: Cloud Machine Learning Engine - build superior models and deploy them into production.
*/

// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage')

// Your Google Cloud Platform project ID
// const projectId = 'YOUR_PROJECT_ID'
const projectId = 'perj-logs'

// Creates a client
const storage = new Storage({
  projectId: projectId
})

// The name for the new bucket
const bucketName = 'perj-json'

// Creates the new bucket
storage
  .createBucket(bucketName)
  .then(() => {
    console.log(`Bucket ${bucketName} created.`)
  })
  .catch(err => {
    console.error('ERROR:', err)
  })
