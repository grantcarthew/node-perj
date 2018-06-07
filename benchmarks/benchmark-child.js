// Note:
// The pino logger is not a dependency of this package.
// Install pino prior to running.
// npm install pino --no-save

require('console-probe').apply()
const { table } = require('table')
const chalk = require('chalk')
const Benchmark = require('benchmark')
const Perj = require('../index')
const pino = require('pino')
const fs = require('fs')
const hostname = require('os').hostname()
const pid = process.pid
const v = 1
const dest = fs.createWriteStream('/dev/null')

// Data
const data = require('../data')

// Adding hostname and pid to match pino log string
const perjLog = new Perj({ v, hostname, pid, write: dest.write.bind(dest) })
const pinoLog = pino(dest)

const suite = new Benchmark.Suite()
const line = '='.repeat(80)

console.log(line)
console.log(' perj vs pino Child Benchmark')
console.log(line)

suite.add('perj Create Single Child', function () {
  createChild(perjLog, 1)
})

suite.add('pino Create Single Child', function () {
  createChild(pinoLog, 1)
})

suite.add('perj Create Two Children', function () {
  createChild(perjLog, 2)
})

suite.add('pino Create Two Children', function () {
  createChild(pinoLog, 2)
})

suite.add('perj Create Three Children', function () {
  createChild(perjLog, 3)
})

suite.add('pino Create Three Children', function () {
  createChild(pinoLog, 3)
})

function createChild (log, total) {
  let clog = log
  for (let i = 0; i < total; i++) {
    let child = 'child' + i
    clog = clog.child({ child })
    clog.info(data.msg[0])
  }
}

suite.on('cycle', function (event) {
  console.log(String(event.target))
})

suite.on('complete', function () {
  const compare = table([
    [chalk.blue('Benchmark Ops/Sec'),
      chalk.green('perj'),
      chalk.yellow('pino'),
      chalk.blue('Result')],
    row('Create Single Child', this[0], this[1]),
    row('Create Two Children', this[2], this[3]),
    row('Create Three Children', this[4], this[5])
  ])
  console.log(compare)
  console.log(line)
})

suite.run({ 'async': true })

function row (name, perj, pino) {
  let perjHz = Number(perj.hz).toFixed(2)
  let pinoHz = Number(pino.hz).toFixed(2)
  let result = ''
  let pc = 0

  if (perj.hz >= pino.hz) {
    pc = Number(100 - (pinoHz / perjHz * 100)).toFixed(2)
    result = chalk.green(`perj: ${pc}% faster`)
  } else {
    pc = Number(100 - (perjHz / pinoHz * 100)).toFixed(2)
    result = chalk.yellow(`pino: ${pc}% faster`)
  }
  return [chalk.blue(name), perjHz, pinoHz, result]
}
