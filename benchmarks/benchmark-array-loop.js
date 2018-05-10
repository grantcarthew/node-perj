const bench = require('fastbench')
const scifi = require('../data/data-scifi')
const keys = Object.keys(scifi.deathStar)

const run = bench([
  function forEach (done) {
    const res = []
    keys.forEach((v) => {
      res.push(v)
    })
    setImmediate(done)
  },
  function forLoop (done) {
    const res = []
    for (let i = 0; i < keys.length; i++) {
      res.push(keys[i])
    }
    setImmediate(done)
  },
  function forOf (done) {
    const res = []
    for (const key of keys) {
      res.push(key)
    }
    setImmediate(done)
  },
  function whileMinus (done) {
    const res = []
    let i = -1
    while (++i < keys.length) {
      res.push(keys[i])
    }
    setImmediate(done)
  },
  function whilePlus (done) {
    const res = []
    let i = keys.length

    while (--i) {
      res.push(keys[i])
    }
    setImmediate(done)
  }
], 10000000)

// run them two times
run(run)
