/*

Description:
This is a utility module to generate log data.

Platform:
- Node.js

Dependencies:
- perj
- data/index.js

Features:
- Generates a log entry every 'ms' in miliseconds.

*/

const Perj = require('../src/perj')
const host = require('os').hostname()
const pid = process.pid
const file = require('path').basename(module.filename)
const name = 'Log Generator'
const data = require('../data')
const log = new Perj({ host, pid, file, name })
const levels = Object.keys(log.levels)
const ms = 100

function genLog () {
  const level = getLevel()
  log[level](data.rndMsg(), data.rndData())
  setTimeout(genLog, ms)
}

function getLevel () {
  return levels[Math.floor(Math.random() * levels.length)]
}

genLog()
