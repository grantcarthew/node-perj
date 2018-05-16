// Note:
// The pino logger is not a dependency of this package.
// Install pino prior to running.
// npm install pino --no-save

const perj = require('../perj')
// const perjd = require('./perj.diff')
const pino = require('pino')
const bench = require('fastbench')
const fs = require('fs')
const hostname = require('os').hostname()
const pid = process.pid
const v = 1
const dest = fs.createWriteStream('/dev/null')
const scifi = require('../data/data-scifi')
const err = []
for (let i = 0; i < 5; i++) {
  err.push(new Error('Error object number: ' + i))
}

// Adding hostname and pid to match pino log string
const jlog = perj.create({v, hostname, pid, write: dest.write.bind(dest)})
// const dlog = perjd.create({v, hostname, pid, write: dest.write.bind(dest)})
const plog = pino(dest)

const run = bench([
  // function perj (done) {
  //   jobWithChild(jlog)
  //   // jlog.info('message')
  //   // jlog.info({ foo: 'bar' })
  //   setImmediate(done)
  // },
  // function perjDiff (done) {
  //   jobWithChild(dlog)
  //   // dlog.info('message')
  //   // jlog.info({ foo: 'bar' })
  //   setImmediate(done)
  // }
  function perjCommonOperations (done) {
    job(jlog)
    setImmediate(done)
  },
  function pinoCommonOperations (done) {
    job(plog)
    setImmediate(done)
  },
  function perjLogErrors (done) {
    multipleErrors(jlog)
    setImmediate(done)
  },
  function pinoLogErrors (done) {
    multipleErrors(plog)
    setImmediate(done)
  },
  function perjCreateChild (done) {
    createChild(jlog)
    setImmediate(done)
  },
  function pinoCreateChild (done) {
    createChild(plog)
    setImmediate(done)
  }
], 10000000)

function multipleErrors (log) {
  for (let i = 0; i < 5; i++) {
    log.error(err[i])
  }
}

function createChild (log) {
  let c1log = log.child({ foo: 'bar' })
  c1log.info(scifi.msg[0])
  let c2log = c1log.child({ foobar: 'baz' })
  c2log.info(scifi.msg[0])
}

function job (log) {
  log.fatal(scifi.msg[0])
  log.warn(scifi.dataLarge)
  log.info(scifi.dataSmall, scifi.msg[0])
  log.debug(scifi.dataMedium, scifi.msg[0])
  log.trace(scifi.dataLarge, scifi.msg[0])
}
// run them two times
run(run)
