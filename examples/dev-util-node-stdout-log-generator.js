const perj = require('../perj')
const host = require('os').hostname()
const pid = process.pid
const file = require('path').basename(module.filename)
const name = 'Log Generator'
const scifi = require('../data/data-scifi')
const log = perj.create({ host, pid, file, name })
const levels = Object.keys(log.levels)

/*
Description:
This is a utility module to generate log data.

When to use:
For testing out different transports.

Platform:
- Node.js

Dependencies:
- None

Features:
- Generates a log entry every half a second.
*/

function genLog () {
  const level = getLevel()
  log[level](scifi.rndMsg(), scifi.rndData())
  setTimeout(genLog, 100)
}

function getLevel () {
  return levels[Math.floor(Math.random() * levels.length)]
}

genLog()
