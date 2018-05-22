// Note:
// The pino logger is not a dependency of this package.
// Install pino prior to running.
// npm install pino --no-save

require('console-probe').apply()
const { table } = require('table')
const chalk = require('chalk')
const Benchmark = require('benchmark')
const perj = require('../index')
const pino = require('pino')
const fs = require('fs')
const hostname = require('os').hostname()
const pid = process.pid
const v = 1
const dest = fs.createWriteStream('/dev/null')

// Data
const scifi = require('../data/data-scifi')
const err = []
for (let i = 0; i < 5; i++) {
  err.push(new Error('Error object number: ' + i))
}
const longString = scifi.msg[4].repeat(1000)
const deep = Object.assign({}, scifi.deathStar)
deep.deep = Object.assign({}, JSON.parse(JSON.stringify(deep)))
deep.deep.deep = Object.assign({}, JSON.parse(JSON.stringify(deep)))
deep.deep.deep.deep = Object.assign({}, JSON.parse(JSON.stringify(deep)))

// Adding hostname and pid to match pino log string
const perjLog = perj.create({v, hostname, pid, write: (json) => { dest.write(json) }})
const pinoLog = pino(dest)

const suite = new Benchmark.Suite()
const line = '='.repeat(process.stdout.columns)
// const page = '\n'.repeat(process.stdout.rows)

// console.log(page)
console.log(line)
console.log(' perj vs pino Benchmark')
console.log(line)

suite.add('perj Common Log Operations', function () {
  job(perjLog)
})

suite.add('pino Common Log Operations', function () {
  job(pinoLog)
})

suite.add('perj Single String Message', function () {
  perjLog.info('hello world')
})

suite.add('pino Single String Message', function () {
  pinoLog.info('hello world')
})

suite.add('perj Single Long String', function () {
  perjLog.info(longString)
})

suite.add('pino Single Long String', function () {
  pinoLog.info(longString)
})

suite.add('perj Flat Object Data', function () {
  perjLog.info({ foo: 'bar' })
})

suite.add('pino Flat Object Data', function () {
  pinoLog.info({ foo: 'bar' })
})

suite.add('perj Simple Object Data', function () {
  perjLog.info(scifi.tardis)
})

suite.add('pino Simple Object Data', function () {
  pinoLog.info(scifi.tardis)
})

suite.add('perj Complex Object Data', function () {
  perjLog.info(scifi.deathStar)
})

suite.add('pino Complex Object Data', function () {
  pinoLog.info(scifi.deathStar)
})

suite.add('perj Deep Object Data', function () {
  perjLog.info(deep)
})

suite.add('pino Deep Object Data', function () {
  pinoLog.info(deep)
})

suite.add('perj Single String And Object Data', function () {
  perjLog.info('hello world', { foo: 'bar' })
})

suite.add('pino Single String And Object Data', function () {
  pinoLog.info('hello world', { foo: 'bar' })
})

suite.add('perj Logging Error Objects', function () {
  multipleErrors(perjLog)
})

suite.add('pino Logging Error Objects', function () {
  multipleErrors(pinoLog)
})

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

function multipleErrors (log) {
  for (let i = 0; i < 5; i++) {
    log.error(err[i])
  }
}

function createChild (log, total) {
  let clog = log
  for (let i = 0; i < total; i++) {
    let child = 'child' + i
    clog = clog.child({ child })
    clog.info(scifi.msg[0])
  }
}

function job (log) {
  log.fatal(scifi.msg[0])
  log.warn(scifi.dataLarge)
  log.trace(scifi.dataLarge, scifi.msg[0])
}

suite.on('cycle', function (event) {
  console.log(String(event.target))
})

suite.on('complete', function () {
  console.log(chalk.red('NOTE: pino is not using extreme mode.'))
  const compare = table([
    [chalk.blue('Benchmark Ops/Sec'),
      chalk.green('perj'),
      chalk.yellow('pino'),
      chalk.blue('Result')],
    row('Common Log Operations', this[0], this[1]),
    row('Single String Message', this[2], this[3]),
    row('Single Long String', this[4], this[5]),
    row('Flat Object Data', this[6], this[7]),
    row('Simple Object Data', this[8], this[9]),
    row('Complex Object Data', this[10], this[11]),
    row('Deep Object Data', this[12], this[13]),
    row('Single String And Object Data', this[14], this[15]),
    row('Logging Error Objects', this[16], this[17]),
    row('Create Single Child', this[18], this[19]),
    row('Create Two Children', this[20], this[21]),
    row('Create Three Children', this[22], this[23])
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
