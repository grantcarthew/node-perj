require('console-probe').apply()
const jrep = require('./jrep')
const scifi = require('./data-scifi')
const line = '='.repeat(process.stdout.columns)
const page = '\n'.repeat(process.stdout.rows)

// Customise the variables below as needed.
const name = 'QuickStart'
const host = require('os').hostname()
const pid = process.pid
const file = require('path').basename(module.filename)

let log = jrep.create({name, host, pid, file})

console.log(page)
console.log(line)
console.log('jrep example.js')
console.log(line)
console.log('Note: This is the structure of the Jrep module')
console.log('Code: const Jrep = require("jrep")')
console.log(line)
console.probe(jrep)
console.log(line)
console.log('Note: This is the structure of a new logger')
console.log('Code: const log = Jrep.create({name, host, pid, file})')
console.log(line)
console.probe(log)
console.log(line)
console.log('Note: This is a raw JSON log string.')
console.log("Code: log.info('This is a raw JSON log string')")
console.log(line)
log.info('This is a raw JSON log string')
console.log(line)
console.log('Note: This is logging a message and a complex object.')
console.log("Code: log.info('Simple Message', scifi.serenity)")
console.log(line)
log.info('Simple Message and Complex Object', scifi.rndMsg(), scifi.serenity)
console.log(line)
console.log('Note: Same complex object in a slightly easier to read format.')
console.log("Code: log.info('Complex Object', scifi.serenity)")
console.log(line)
log = jrep.create({
  name,
  host,
  pid,
  file,
  write: (s) => { console.json(JSON.parse(s), null, 2) }
})
log.info('Complex Object', scifi.serenity)
console.log(line)
