require('console-probe').apply()
const perj = require('../src/perj')
const log = perj.create()
const child = log.child({ child: true })
console.probe(child)
