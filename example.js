
const jrep = require('./jrep')

// Customise the variables below as needed.
const name = 'QuickStart'
const host = require('os').hostname()
const pid = process.pid
const file = require('path').basename(module.filename)

const log = jrep.create({name, host, pid, file})

log.info('the quick brown fox jumps over the lazy dog')

// require('console-probe').apply()
// const Jrep = require('./jrep')
// const line = '='.repeat(process.stdout.columns)
// const page = '\n'.repeat(process.stdout.rows)
// const arrLen = 2
// const dt = {
//   'name': 'Data Types',
//   'Infinity': Infinity,
//   'NaN': Number.NaN,
//   'Undefined': undefined,
//   'Null': null,
//   'Object': {foo: 'bar'},
//   'Function': (size, toppings) => {},
//   'Boolean': true,
//   'Symbol': Symbol('Name of Symbol'),
//   'Error': new Error('Error message text'),
//   'Number': 42,
//   'Date': new Date(),
//   'String': 'The quick brown fox jumps over the lazy dog.',
//   'RegExp': /a.long.regexp.that.keeps.giving/,
//   'Array': [1, 2, 3],
//   'Int8Array': new Int8Array(arrLen),
//   'Uint8Array': new Uint8Array(arrLen),
//   'Uint8ClampedArray': new Uint8ClampedArray(arrLen),
//   'Int16Array': new Int16Array(arrLen),
//   'Uint16Array': new Uint16Array(arrLen),
//   'Int32Array': new Int32Array(arrLen),
//   'Uint32Array': new Uint32Array(arrLen),
//   'Float32Array': new Float32Array(arrLen),
//   'Float64Array': new Float64Array(arrLen),
//   'Map': new Map([['foo', 'bar']]),
//   'Set': new Set([['foo', 'bar']]),
//   'WeakMap': new WeakMap(),
//   'WeakSet': new WeakSet(),
//   'ArrayBuffer': new ArrayBuffer(arrLen),
//   'SharedArrayBuffer': new SharedArrayBuffer(arrLen),
//   'Atomics': Atomics,
//   'DataView': new DataView(new ArrayBuffer(arrLen)),
//   'Promise': Promise.resolve(),
//   'Generator': (function * () {})(),
//   'GeneratorFunction': function * (foo, bar) {},
//   'AsyncFunction': async function (foo, bar) {}
// }

// // console.log(page)
// // console.log(line)
// // console.log('jrep example.js')
// // console.log(line)
// // console.log('Note: This is the structure of the Jrep module')
// // console.log('Code: const Jrep = require("jrep")')
// // console.log(line)
// // console.probe(Jrep)
// // console.log(line)
// // console.log('Note: This is the struction of a new logger')
// // console.log('Code: const log = Jrep.create()')
// // console.log(line)
// let log = Jrep.create()
// // console.probe(log)
// // console.log(line)
// // console.log('Note: This is a raw JSON log string.')
// // console.log("Code: log.info('This is a raw JSON log string')")
// // console.log(line)
// // log.info('This is a raw JSON log string')
// // console.log(line)
// // console.log('Note: This is logging a message and a complex object.')
// // console.log("Code: log.info('Simple Message', dt)")
// // console.log(line)
// // log.info('Simple Message', dt)
// // console.log(line)
// // console.log('Note: Same complex object is a slightly easier to read format.')
// // console.log("Code: log.info('Simple Message', dt)")
// // console.log(line)
// // log = Jrep.create({
// //   name: 'example',
// //   stream: { write: (s) => { console.json(JSON.parse(s), null, 2) } }
// // })
// // log.info('Simple Message', dt)
// log = Jrep.create({parent: true})
// log.info('this is the parent')
// log = log.child({child: true})
// log.info('this is the child')
// console.log(line)
