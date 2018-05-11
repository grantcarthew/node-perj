require('console-probe').apply()

let output = {}
const write = function (text) {
  output = JSON.parse(text)
}

function getType (value) {
  return Object.prototype.toString.call(value).slice(8).slice(0, -1)
}

// const perj = require('./index')
const perj = require('./perj')
const msg1 = 'the quick brown fox'
const msg2 = 'jumped over the lazy dog'
const msg3 = 'and back again.'
const msg4 = 'that crazy dog!'
const levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace']
const data1 = {foo: 'bar', baz: [1, 2, 3, 4]}
const data2 = {bar: 'foo', answer: 42, levels}

beforeEach(() => {
  output = {}
})

describe('logger object tests', () => {
  test('perj member tests', () => {
    expect(getType(perj.create)).toBe('Function')
    expect(getType(perj.dateTimeFunctions)).toBe('Object')
    expect(getType(perj.dateTimeFunctions.epoch)).toBe('Function')
    expect(getType(perj.dateTimeFunctions.epoch())).toBe('Number')
    expect(getType(perj.dateTimeFunctions.unix)).toBe('Function')
    expect(getType(perj.dateTimeFunctions.unix())).toBe('Number')
    expect(getType(perj.dateTimeFunctions.iso)).toBe('Function')
    expect(getType(perj.dateTimeFunctions.iso())).toBe('String')
  })
  test('log member tests', () => {
    const log = perj.create()
    expect(getType(log.level)).toBe('String')
    expect(log.level).toBe('info')
    expect(getType(log.levels)).toBe('Object')
    expect(log.levels.info).toBe(30)
    expect(getType(log.write)).toBe('Function')
    expect(getType(log.child)).toBe('Function')
    expect(getType(log.fatal)).toBe('Function')
    expect(getType(log.error)).toBe('Function')
    expect(getType(log.warn)).toBe('Function')
    expect(getType(log.info)).toBe('Function')
    expect(getType(log.debug)).toBe('Function')
    expect(getType(log.trace)).toBe('Function')
    expect(() => { log.level = 'abc' }).toThrow('The level option must be a valid key in the levels object.')
    log.level = 'debug'
    expect(log.level).toBe('debug')
  })
  test('options tests', () => {
    let log = perj.create()
    let custLevels = Object.assign({}, log.levels)
    custLevels.silly = 42
    log = perj.create({
      levels: custLevels,
      level: 'trace',
      levelKey: 'logLevel',
      levelNumberKey: 'levelNo',
      dateTimeKey: 'datetime',
      messageKey: 'message',
      dataKey: 'objectData',
      write,
      foo: 'bar' })
    expect(log.levels.silly).toBe(42)
    expect(getType(log.silly)).toBe('Function')
    expect(log.level).toBe('trace')
    expect(log.write).toBeDefined()
    log.silly(msg1, data1)
    expect(output.logLevel).toBe('silly')
    expect(output.levelNo).toBe(42)
    expect(getType(output.datetime)).toBe('Number')
    expect(output.message).toBe(msg1)
    expect(output.objectData).toMatchObject(data1)
    expect(data1).toMatchObject(output.objectData)
    custLevels.crazy = 43
    // Only baz: true should be added to child.
    log = log.child({
      levels: custLevels,
      level: 'debug',
      levelKey: 'childLogLevel',
      levelNumberKey: 'childLevelNo',
      dateTimeKey: 'childDatetime',
      messageKey: 'childMessage',
      dataKey: 'childObjectData',
      write,
      baz: true })
    expect(log.levels.silly).toBe(42)
    expect(getType(log.silly)).toBe('Function')
    expect(log.crazy).toBeUndefined()
    expect(log.level).toBe('trace')
    expect(log.write).toBeDefined()
    log.silly(msg1, data1)
    expect(output.logLevel).toBe('silly')
    expect(output.levelNo).toBe(42)
    expect(getType(output.datetime)).toBe('Number')
    expect(output.message).toBe(msg1)
    expect(output.objectData).toMatchObject(data1)
    expect(data1).toMatchObject(output.objectData)
    expect(() => { perj.create({level: 'abc'}) }).toThrow('The level option must be a valid key in the levels object.')
  })
  test('convenience methods', () => {
    const log = perj.create({ level: 'debug', write })
    const foo = { one: [1, 2, 3], two: { inner: true }, three: 3.14 }
    log.stringify(foo)
    expect(output.one[2]).toBe(3)
    expect(output.two.inner).toBeTruthy()
    expect(output.three).toBe(3.14)
    output = {}
    log.json(foo)
    expect(output.one[2]).toBe(3)
    expect(output.two.inner).toBeTruthy()
    expect(output.three).toBe(3.14)
  })
})

describe('logger option tests', () => {
  let log = perj.create({
    levels: { foo: 100, bar: 200 },
    level: 'foo',
    write,
    messageKey: 'newMessageKey',
    dataKey: 'newDataKey',
    project: 'elephant',
    session: 12345,
    platform: {
      name: 'node',
      pid: 1234
    }
  })
  test('top level properties', () => {
    log.foo(msg1, data1)
    expect(Object.keys(output).length).toBe(8)
    expect(output.level).toBe('foo')
    expect(getType(output.time)).toBe('Number')
    expect(output.newMessageKey).toBe(msg1)
    expect(output.newDataKey).toMatchObject(data1)
    expect(output.project).toBe('elephant')
    expect(output.session).toBe(12345)
    expect(output.platform.name).toBe('node')
    expect(output.platform.pid).toBe(1234)
    expect(data1).toMatchObject(output.newDataKey)
    expect(output.newDataKey).toMatchObject(data1)
  })
  test('child logger properties', () => {
    log = log.child({ env: 'dev' })
    output = {}
    log.bar(msg2, data2)
    expect(Object.keys(output).length).toBe(9)
    expect(getType(output.time)).toBe('Number')
    expect(output.level).toBe('bar')
    expect(output.newMessageKey).toBe(msg2)
    expect(output.newDataKey).toMatchObject(data2)
    expect(data2).toMatchObject(output.newDataKey)
    expect(output.project).toBe('elephant')
    expect(output.env).toBe('dev')
    expect(() => { log.child() }).toThrow('Provide top level arguments to create a child logger.')
  })
})

describe('logging tests', () => {
  for (const level of levels) {
    const log = perj.create({write, level: level})

    test(level + ': one message', () => {
      log[level](msg1)
      expect(Object.keys(output).length).toBe(5)
      expect(getType(output.time)).toBe('Number')
      expect(output.level).toBe(level)
      expect(output.msg).toBe(msg1)
      expect(output.data).toBe('')
    })
    test(level + ': two messages', () => {
      log[level](msg1, msg2)
      expect(Object.keys(output).length).toBe(5)
      expect(getType(output.time)).toBe('Number')
      expect(output.level).toBe(level)
      expect(getType(output.msg)).toBe('String')
      expect(output.msg).toBe(msg1)
      expect(getType(output.data)).toBe('String')
      expect(output.data).toBe(msg2)
    })
    test(level + ': two messages one data', () => {
      log[level](msg1, msg2, data1)
      expect(Object.keys(output).length).toBe(5)
      expect(getType(output.time)).toBe('Number')
      expect(output.level).toBe(level)
      expect(getType(output.msg)).toBe('String')
      expect(output.msg).toBe(msg1)
      expect(getType(output.data)).toBe('Array')
      expect(output.data[0]).toBe(msg2)
      expect(output.data[1]).toMatchObject(data1)
      expect(data1).toMatchObject(output.data[1])
    })
    test(level + ': two messages two data', () => {
      log[level](msg1, msg2, data1, data2)
      expect(Object.keys(output).length).toBe(5)
      expect(getType(output.time)).toBe('Number')
      expect(output.level).toBe(level)
      expect(getType(output.msg)).toBe('String')
      expect(output.msg).toBe(msg1)
      expect(getType(output.data)).toBe('Array')
      expect(output.data.length).toBe(3)
      expect(output.data[0]).toBe(msg2)
      expect(output.data[1]).toMatchObject(data1)
      expect(data1).toMatchObject(output.data[1])
      expect(output.data[2]).toMatchObject(data2)
      expect(data2).toMatchObject(output.data[2])
    })
    test(level + ': two messages two data mixed order', () => {
      log[level](data1, msg2, data2, msg1)
      expect(Object.keys(output).length).toBe(5)
      expect(getType(output.time)).toBe('Number')
      expect(output.level).toBe(level)
      expect(getType(output.msg)).toBe('String')
      expect(output.msg).toBe(msg2)
      expect(getType(output.data)).toBe('Array')
      expect(output.data.length).toBe(3)
      expect(output.data[0]).toMatchObject(data1)
      expect(data1).toMatchObject(output.data[0])
      expect(output.data[1]).toMatchObject(data2)
      expect(data2).toMatchObject(output.data[1])
      expect(output.data[2]).toBe(msg1)
    })
  }
})

describe('logging level tests', () => {
  test('level: fatal', () => {
    const log = perj.create({level: 'fatal', write})
    log.fatal('fatal')
    expect(output.msg).toBe('fatal')
    output = {}
    log.error('error')
    expect(output.msg).toBeUndefined()
    log.warn('warn')
    expect(output.msg).toBeUndefined()
    log.info('info')
    expect(output.msg).toBeUndefined()
    log.debug('debug')
    expect(output.msg).toBeUndefined()
    log.trace('trace')
    expect(output.msg).toBeUndefined()
  })
  test('level: error', () => {
    const log = perj.create({level: 'error', write})
    log.fatal('fatal')
    expect(output.msg).toBe('fatal')
    log.error('error')
    expect(output.msg).toBe('error')
    output = {}
    log.warn('warn')
    expect(output.msg).toBeUndefined()
    log.info('info')
    expect(output.msg).toBeUndefined()
    log.debug('debug')
    expect(output.msg).toBeUndefined()
    log.trace('trace')
    expect(output.msg).toBeUndefined()
  })
  test('level: warn', () => {
    const log = perj.create({level: 'warn', write})
    log.fatal('fatal')
    expect(output.msg).toBe('fatal')
    log.error('error')
    expect(output.msg).toBe('error')
    log.warn('warn')
    expect(output.msg).toBe('warn')
    output = {}
    log.info('info')
    expect(output.msg).toBeUndefined()
    log.debug('debug')
    expect(output.msg).toBeUndefined()
    log.trace('trace')
    expect(output.msg).toBeUndefined()
  })
  test('level: info', () => {
    const log = perj.create({level: 'info', write})
    log.fatal('fatal')
    expect(output.msg).toBe('fatal')
    log.error('error')
    expect(output.msg).toBe('error')
    log.warn('warn')
    expect(output.msg).toBe('warn')
    log.info('info')
    expect(output.msg).toBe('info')
    output = {}
    log.debug('debug')
    expect(output.msg).toBeUndefined()
    log.trace('trace')
    expect(output.msg).toBeUndefined()
  })
  test('level: debug', () => {
    const log = perj.create({level: 'debug', write})
    log.fatal('fatal')
    expect(output.msg).toBe('fatal')
    log.error('error')
    expect(output.msg).toBe('error')
    log.warn('warn')
    expect(output.msg).toBe('warn')
    log.info('info')
    expect(output.msg).toBe('info')
    log.debug('debug')
    expect(output.msg).toBe('debug')
    output = {}
    log.trace('trace')
    expect(output.msg).toBeUndefined()
  })
  test('level: trace', () => {
    const log = perj.create({level: 'trace', write})
    log.fatal('fatal')
    expect(output.msg).toBe('fatal')
    log.error('error')
    expect(output.msg).toBe('error')
    log.warn('warn')
    expect(output.msg).toBe('warn')
    log.info('info')
    expect(output.msg).toBe('info')
    log.debug('debug')
    expect(output.msg).toBe('debug')
    log.trace('trace')
    expect(output.msg).toBe('trace')
  })
  test('change level', () => {
    const log = perj.create({write})
    log.fatal('fatal')
    expect(output.msg).toBe('fatal')
    log.error('error')
    expect(output.msg).toBe('error')
    log.warn('warn')
    expect(output.msg).toBe('warn')
    log.info('info')
    expect(output.msg).toBe('info')
    output = {}
    log.debug('debug')
    expect(output.msg).toBeUndefined()
    log.trace('trace')
    expect(output.msg).toBeUndefined()
    log.level = 'trace'
    log.fatal('fatal')
    expect(output.msg).toBe('fatal')
    log.error('error')
    expect(output.msg).toBe('error')
    log.warn('warn')
    expect(output.msg).toBe('warn')
    log.info('info')
    expect(output.msg).toBe('info')
    log.debug('debug')
    expect(output.msg).toBe('debug')
    log.trace('trace')
    expect(output.msg).toBe('trace')
    log.addLevel({ spiderman: 600, batman: 500 })
    log.spiderman('spiderman')
    expect(output.level).toBe('spiderman')
    expect(output.lvl).toBe(600)
    expect(output.msg).toBe('spiderman')
    log.batman('batman')
    expect(output.level).toBe('batman')
    expect(output.lvl).toBe(500)
    expect(output.msg).toBe('batman')
  })
})

describe('logging error tests', () => {
  const log = perj.create({level: 'trace', write, name: 'error tests'})
  let err1 = new Error(msg1)
  let err2 = new Error(msg2)

  test('error level test', () => {
    log.error(err1)
    expect(output.msg).toBe(err1.message)
    expect(output.data.message).toBe(err1.message)
    expect(output.data.name).toBe('Error')
    expect(output.data.stack).toBeDefined()
    log.error(err1, err2)
    expect(output.msg).toBe(err1.message)
    expect(output.data.length).toBe(2)
    expect(output.data[0].message).toBe(msg1)
    expect(output.data[1].message).toBe(msg2)
    expect(output.data[0].name).toBe('Error')
    expect(output.data[1].name).toBe('Error')
    expect(output.data[0].stack).toBeDefined()
    expect(output.data[1].stack).toBeDefined()
  })
  test('info level test', () => {
    log.info(err1)
    expect(output.msg).toBe(err1.message)
    expect(output.data.message).toBe(err1.message)
    expect(output.data.name).toBe('Error')
    expect(output.data.stack).toBeDefined()
    log.info(err1, err2)
    expect(output.msg).toBe(err1.message)
    expect(output.data.length).toBe(2)
    expect(output.data[0].message).toBe(err1.message)
    expect(output.data[1].message).toBe(err2.message)
    expect(output.data[0].name).toBe('Error')
    expect(output.data[1].name).toBe('Error')
    expect(output.data[0].stack).toBeDefined()
    expect(output.data[1].stack).toBeDefined()
    log.info(msg3, err1, msg4, err2)
    expect(output.msg).toBe(msg3)
    expect(output.data.length).toBe(3)
    expect(output.data[0].message).toBe(err1.message)
    expect(output.data[1]).toBe(msg4)
    expect(output.data[2].message).toBe(err2.message)
    expect(output.data[0].name).toBe('Error')
    expect(output.data[2].name).toBe('Error')
    expect(output.data[0].stack).toBeDefined()
    expect(output.data[2].stack).toBeDefined()
    // console.json(output)
  })
})
