require('console-probe').apply()
const Jrep = require('./j-rep')
const line = '='.repeat(process.stdout.columns)
const page = '\n'.repeat(process.stdout.rows)
const arrLen = 2
const slang = {
  'name': 'Aussie Slang Words',
  'gday': Infinity,
  'maccas': Number.NaN,
  'arvo': undefined,
  'straya': null,
  'footy': {specky: true},
  'biccy': (size, toppings) => {},
  'servo': true,
  'choccy': Symbol('Mmmmm...'),
  'bottle-o': Error('Cheers mate! My shout next'),
  'tinny': 42,
  'coppa': new Date(),
  'tradie': 'She\'ll be right mate?',
  'postie': /a.long.regexp.that.keeps.giving/,
  'garbo': [1, 2, 3],
  'muso': new Int8Array(arrLen),
  'cabbie': new Uint8Array(arrLen),
  'ambo': new Uint8ClampedArray(arrLen),
  'prezzie': new Int16Array(arrLen),
  'chrissie': new Uint16Array(arrLen),
  'cuppa': new Int32Array(arrLen),
  'mate': new Uint32Array(arrLen),
  'snag': new Float32Array(arrLen),
  'drongo': new Float64Array(arrLen),
  'fairDinkum': new Map([['foo', 'bar']]),
  'bonza': new Set([['foo', 'bar']]),
  'tooRight': new WeakMap(),
  'dunny': new WeakSet(),
  'cobber': new ArrayBuffer(arrLen),
  'barbie': new SharedArrayBuffer(arrLen),
  'stickybeak': Atomics,
  'stoked': new DataView(new ArrayBuffer(arrLen)),
  'ripper': Promise.resolve(),
  'mongrel': (function * () {})(),
  'holyDooley': function * (foo, bar) {},
  'roo': async function (foo, bar) {}
}

console.log(page)
console.log(line)
console.log('j-rep example.js')
console.log(line)
console.log('Note: This is the structure of the Jrep module')
console.log('Code: const Jrep = require("j-rep")')
console.log(line)
console.probe(Jrep)
console.log(line)
console.log('Note: This is the struction of a new logger')
console.log('Code: const log = Jrep.create()')
console.log(line)
console.log(line)
let log = Jrep.create({write: console.log})
class CustomError extends Error {
  constructor (foo = 'bar', ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    // Custom debugging information
    this.foo = foo
    this.date = new Date()
    this.list = ['a', 'b', 'c']
    this.slang = slang
  }
}

let c = new CustomError('I am so unique!')
let e = Error('I feel so lonely')
let e1 = new Error('Top: It is all bad')
let e2 = new Error('Second: Oh, something went wrong')
let e3 = new Error('Bottom: The root of all errors!')
e2.extra = e3
e1.extra = e2
console.probe(e1)
console.log(line)
log.info(e)
console.log(line)
log.info(e1)
console.log(line)
log.info(c)
console.log(line)
