// Note:
// The pino logger is not a dependency of this package.
// Install pino prior to running.
// npm install pino

const jrep = require('./jrep')
const pino = require('pino')
const bench = require('fastbench')
const fs = require('fs')
var dest = fs.createWriteStream('/dev/null')

const jlog = jrep.create({stream: dest})
const plog = pino(dest)

const run = bench([
  function jrep (done) {
    jlog.info('hello world')
    jlog.info({foo: 'bar'})
    jlog.info({foo: 'bar'}, 'hello world')
    setImmediate(done)
  },
  function pino (done) {
    plog.info('hello world')
    plog.info({foo: 'bar'})
    plog.info({foo: 'bar'}, 'hello world')
    setImmediate(done)
  }
], 1000000)

// run them two times
run(run)
