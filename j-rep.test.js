require('console-probe').apply()
const os = require('os')

let output = ''
const write = function (text) {
  output = JSON.parse(text)
  // console.log(text)
}

function getType (value) {
  return Object.prototype.toString.call(value).slice(8).slice(0, -1)
}

const Jrep = require('./j-rep')
const msg1 = 'the quick brown fox'
const msg2 = 'jumped over the lazy dog'
const levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace']
const data1 = {foo: 'bar', levels}
const data2 = {bar: 'foo', answer: 42, levels}

// beforeAll(() => {
//   output = {}
// })

describe('logger object tests', () => {
  test('member tests', () => {
    expect(getType(Jrep.create)).toBe('Function')
    const log = Jrep.create()
    expect(getType(log.options)).toBe('Object')
    expect(getType(log.child)).toBe('Function')
    expect(getType(log.fatal)).toBe('Function')
    expect(getType(log.error)).toBe('Function')
    expect(getType(log.warn)).toBe('Function')
    expect(getType(log.info)).toBe('Function')
    expect(getType(log.debug)).toBe('Function')
    expect(getType(log.trace)).toBe('Function')
    expect(getType(log.levels)).toBe('Object')
  })
})

describe('logger option tests', () => {
  let log = Jrep.create({ level: 'debug', write, project: 'xyz', session: 12345 })
  test('top level properties', () => {
    log.info(msg1, data1)
    expect(Object.keys(output).length).toBe(9)
    expect(output.ver).toBe('1')
    expect(output.host).toBe(os.hostname())
    expect(getType(output.time)).toBe('Number')
    expect(output.level).toBe('debug')
    expect(output.msg).toBe(msg1)
    expect(output.data).toMatchObject(data1)
    expect(data1).toMatchObject(output.data)
    expect(output.project).toBe('xyz')
  })
  test('child logger properties', () => {
    log = log.child({ env: 'dev' })
    log.debug(msg2, data2)
    expect(Object.keys(output).length).toBe(10)
    expect(output.ver).toBe('1')
    expect(output.host).toBe(os.hostname())
    expect(getType(output.time)).toBe('Number')
    expect(output.level).toBe('debug')
    expect(output.msg).toBe(msg2)
    expect(output.data).toMatchObject(data2)
    expect(data2).toMatchObject(output.data)
    expect(output.project).toBe('xyz')
    expect(output.env).toBe('dev')
  })
})

describe('logging tests', () => {
  for (const level of levels) {
    const log = Jrep.create({write, logLevel: level})

    test(level + ': one message', () => {
      log[level](msg1)
      expect(Object.keys(output).length).toBe(7)
      expect(output.ver).toBe('1')
      expect(output.host).toBe(os.hostname())
      expect(getType(output.time)).toBe('Number')
      expect(output.level).toBe(level)
      expect(output.msg).toBe(msg1)
      expect(output.data).toBe('')
    })
    test(level + ': two messages', () => {
      log[level](msg1, msg2)
      expect(Object.keys(output).length).toBe(7)
      expect(output.ver).toBe('1')
      expect(output.host).toBe(os.hostname())
      expect(getType(output.time)).toBe('Number')
      expect(output.level).toBe(level)
      expect(getType(output.msg)).toBe('Array')
      expect(output.msg[0]).toBe(msg1)
      expect(output.msg[1]).toBe(msg2)
      expect(output.data).toBe('')
    })
    test(level + ': two messages one data', () => {
      log[level](msg1, msg2, data1)
      expect(Object.keys(output).length).toBe(7)
      expect(output.ver).toBe('1')
      expect(output.host).toBe(os.hostname())
      expect(getType(output.time)).toBe('Number')
      expect(output.level).toBe(level)
      expect(getType(output.msg)).toBe('Array')
      expect(output.msg[0]).toBe(msg1)
      expect(output.msg[1]).toBe(msg2)
      expect(output.data).toMatchObject(data1)
      expect(data1).toMatchObject(output.data)
    })
    test(level + ': two messages two data', () => {
      log[level](msg1, msg2, data1, data2)
      expect(Object.keys(output).length).toBe(7)
      expect(output.ver).toBe('1')
      expect(output.host).toBe(os.hostname())
      expect(getType(output.time)).toBe('Number')
      expect(output.level).toBe(level)
      expect(getType(output.msg)).toBe('Array')
      expect(output.msg[0]).toBe(msg1)
      expect(output.msg[1]).toBe(msg2)
      expect(getType(output.data)).toBe('Array')
      expect(output.data.length).toBe(2)
      expect(output.data[0]).toMatchObject(data1)
      expect(data1).toMatchObject(output.data[0])
      expect(output.data[1]).toMatchObject(data2)
      expect(data2).toMatchObject(output.data[1])
    })
    test(level + ': two messages two data mixed order', () => {
      log[level](data1, msg2, data2, msg1)
      expect(Object.keys(output).length).toBe(7)
      expect(output.ver).toBe('1')
      expect(output.host).toBe(os.hostname())
      expect(getType(output.time)).toBe('Number')
      expect(output.level).toBe(level)
      expect(getType(output.msg)).toBe('Array')
      expect(output.msg[0]).toBe(msg2)
      expect(output.msg[1]).toBe(msg1)
      expect(getType(output.data)).toBe('Array')
      expect(output.data.length).toBe(2)
      expect(output.data[0]).toMatchObject(data1)
      expect(data1).toMatchObject(output.data[0])
      expect(output.data[1]).toMatchObject(data2)
      expect(data2).toMatchObject(output.data[1])
    })
  }
})

// describe('logging level tests', () => {
//   test('level: fatal', () => {
//     const log = Jrep.create({logLevel: 'fatal', write})
//     log.fatal('fatal')
//     expect(output.msg).toBe('fatal')
//     output = {}
//     log.error('error')
//     expect(output.msg).toBe('error')
//     output = {}
//     log.warn('warn')
//     expect(output.msg).toBe('warn')
//     output = {}
//     log.info('info')
//     expect(output.msg).toBe('info')
//     output = {}
//     log.debug('debug')
//     expect(output.msg).toBe('debug')
//     output = {}
//     log.trace('trace')
//     expect(output.msg).toBe('trace')
//   })
//   test('level: error', () => {
//     const log = Jrep.create({logLevel: 'error', write})
//     log.fatal('fatal')
//     expect(output.msg).toBe('fatal')
//     output = {}
//     log.error('error')
//     expect(output.msg).toBe('error')
//     output = {}
//     log.warn('warn')
//     expect(output.msg).toBe('warn')
//     output = {}
//     log.info('info')
//     expect(output.msg).toBe('info')
//     output = {}
//     log.debug('debug')
//     expect(output.msg).toBe('debug')
//     output = {}
//     log.trace('trace')
//     expect(output.msg).toBe('trace')
//   })
//   test('level: warn', () => {
//     const log = Jrep.create({logLevel: 'warn', write})
//     log.fatal('fatal')
//     expect(output.msg).toBe('fatal')
//     output = {}
//     log.error('error')
//     expect(output.msg).toBe('error')
//     output = {}
//     log.warn('warn')
//     expect(output.msg).toBe('warn')
//     output = {}
//     log.info('info')
//     expect(output.msg).toBe('info')
//     output = {}
//     log.debug('debug')
//     expect(output.msg).toBe('debug')
//     output = {}
//     log.trace('trace')
//     expect(output.msg).toBe('trace')
//     console.json(log)
//   })
// })

// let log = Jrep.create()
// console.probe(log)
