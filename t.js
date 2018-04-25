require('console-probe').apply()

const Jrep = require('./j-rep')
const jrep = new Jrep()

console.log('=====')
jrep.info(1, 2, 3)
jrep.emerg(1, 2, 3)
console.log('=====')
