/*

Description:
Sends 'standard input' to an Azure Storage Account Table.

Platform:
- Node.js only due to:
  - process.stdin
  - 'split2' module.
  - 'azure-storage' module.

Dependencies:
- split2
- azure-storage

Features:
- Pipes 'process.stdin' an Azure Storage Account Table.
- Maps log perperties to table columns.
- Logs data out of your application process.
- Use Azure to analyse table contents: https://docs.microsoft.com/en-us/rest/api/storageservices/querying-tables-and-entities
- Use Azure Storage Explorer to analyze table contents: https://azure.microsoft.com/features/storage-explorer/

Usage:
- Create a Microsoft account: https://outlook.com/
- Create an Azure account: https://azure.microsoft.com/free/
- Open the Azure portal: https://portal.azure.com/
- Create a Storage account: https://docs.microsoft.com/en-us/azure/storage/common/storage-introduction
- Create a Table Store in the Storage Account: https://docs.microsoft.com/en-au/azure/cosmos-db/table-storage-how-to-use-nodejs
- Set the AZURE_STORAGE_ACCOUNT environment variable to name of the storage account.
- Set the AZURE_STORAGE_TABLE_NAME environment variable to name of the storage account table.
- Set the AZURE_STORAGE_PARTITION_NAME environment variable to name of the storage account table partition.
- Set the AZURE_STORAGE_ACCESS_KEY environment variable to one of the storage account access keys.
- Copy and paste the code into your application as a 'azure-table-insert.js' file.
- Customize as needed. Change the mapped properties.
- Pipe your application stdout into this file using something like this:
  node examples/util-log-generator.js | node examples/node-stdin-azure.js

Suggestions:
- Consider using Cosmos DB rather than a Table: https://docs.microsoft.com/en-us/azure/cosmos-db/introduction
- Consider using Shared Access Signatures: https://docs.microsoft.com/en-us/azure/storage/common/storage-dotnet-shared-access-signature-part-1

Performance:
- Development Environment:
  - Logging is 'out of process' so it will not effect the application process.
- Production Environemnt:
  - Logging is 'out of process' so it will not effect the application process.

*/

const azure = require('azure-storage')
const split = require('split2')
const tableService = azure.createTableService()
const entGen = azure.TableUtilities.entityGenerator
const tableName = process.env.AZURE_STORAGE_TABLE_NAME
const partitionName = process.env.AZURE_STORAGE_PARTITION_NAME

process.stdin.setEncoding('utf8')
const writable = process.stdin.pipe(split(JSON.parse))
writable.on('data', onData)
writable.on('finish', onFinish)
writable.on('error', onError)

function onData (chunk) {
  // Match the below properties to your log output <======= CHANGE MAPPING
  const logEntity = {
    PartitionKey: entGen.String(partitionName),
    RowKey: entGen.String(chunk.time.toString()),
    level: entGen.String(chunk.level),
    lvl: entGen.Int32(chunk.lvl),
    host: entGen.String(chunk.host),
    pid: entGen.Int32(chunk.pid),
    file: entGen.String(chunk.file),
    name: entGen.String(chunk.name),
    msg: entGen.String(chunk.msg),
    data: entGen.String(JSON.stringify(chunk.data))
  }
  tableService.insertEntity(tableName, logEntity, function (err, result, response) {
    if (err) { console.error(err) }
  })
}

function onFinish () {
  console.log('Data stream terminated.')
}

function onError (err) {
  console.log(err)
}
