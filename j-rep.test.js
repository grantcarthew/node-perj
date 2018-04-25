require('console-probe').apply()

const Jrep = require('./j-rep')
const log = Jrep.create()

test('first', () => {
  expect(Jrep).toBeDefined()
})
// console.probe(jrep)
console.log('=====')
log.info('hello')
log.error('foo', 'bar')
log.debug('foo', 'bar', log)
log.debug('foo', 'bar', log, console)
console.log('=====')
