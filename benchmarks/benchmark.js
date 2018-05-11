// Note:
// The pino logger is not a dependency of this package.
// Install pino prior to running.
// npm install pino

const perj = require('../perj')
// const perjd = require('./perj.diff')
const pino = require('pino')
const bench = require('fastbench')
const fs = require('fs')
const hostname = require('os').hostname
const pid = process.pid
const v = 1
const dest = fs.createWriteStream('/dev/null')
const scifi = require('../data/data-scifi')
const err = new Error(scifi.msg[1])

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
  function perjCommonWithError (done) {
    jobWithError(jlog)
    setImmediate(done)
  },
  function pinoCommonWithError (done) {
    jobWithError(plog)
    setImmediate(done)
  },
  function perjCommonWithChild (done) {
    jobWithChild(jlog)
    setImmediate(done)
  },
  function pinoCommonWithChild (done) {
    jobWithChild(plog)
    setImmediate(done)
  }
], 1000000)

function jobWithError (log) {
  log.error(err)
  job(log)
}

function jobWithChild (log) {
  let clog = log.child({ foo: 'bar' })
  job(clog)
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
