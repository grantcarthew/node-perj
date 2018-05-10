const bench = require('fastbench')
const scifi = require('../data/data-scifi')

const run = bench([
  function objectEntries (done) {
    const res = {}
    for (const prop of Object.entries(scifi.deathStar)) {
      res[prop[0]] = prop[1]
    }
    setImmediate(done)
  },
  function forIn (done) {
    const res = {}
    for (const prop in scifi.deathStar) {
      res[prop] = scifi.deathStar[prop]
    }
    setImmediate(done)
  },
  function objectKeysForeach (done) {
    const res = {}
    Object.keys(scifi.deathStar).forEach(function (prop) {
      res[prop] = scifi.deathStar[prop]
    })
    setImmediate(done)
  },
  function objectKeysFor (done) {
    const res = {}
    for (let i = 0, keys = Object.keys(scifi.deathStar), len = keys.length; i < len; i++) {
      res[keys[i]] = scifi.deathStar[keys[i]]
    }
    setImmediate(done)
  },
  function objectKeysWhileMinus (done) {
    const res = {}
    let i = -1
    const keys = Object.keys(scifi.deathStar)
    const len = keys.length

    while (++i < len) {
      res[keys[i]] = scifi.deathStar[keys[i]]
    }
    setImmediate(done)
  },
  function objectKeysWhilePlus (done) {
    const res = {}
    const keys = Object.keys(scifi.deathStar)
    let i = keys.length

    while (--i) {
      res[keys[i]] = scifi.deathStar[keys[i]]
    }
    setImmediate(done)
  }
], 10000000)

// run them two times
run(run)
