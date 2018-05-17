require('console-probe').apply()

let logJson = {}
let logObj = {}
const write = function (json, obj) {
  logJson = JSON.parse(json)
  logObj = obj
}

function resetLogOutput () {
  logJson = {}
  logObj = {}
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
  resetLogOutput()
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
    expect(log.write.name).not.toMatch(/log/)
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
    expect(logJson.logLevel).toBe('silly')
    expect(logJson.levelNo).toBe(42)
    expect(getType(logJson.datetime)).toBe('Number')
    expect(logJson.message).toBe(msg1)
    expect(logJson.objectData).toMatchObject(data1)
    expect(data1).toMatchObject(logJson.objectData)
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
    expect(logJson.logLevel).toBe('silly')
    expect(logJson.levelNo).toBe(42)
    expect(getType(logJson.datetime)).toBe('Number')
    expect(logJson.message).toBe(msg1)
    expect(logJson.objectData).toMatchObject(data1)
    expect(data1).toMatchObject(logJson.objectData)
    expect(() => { perj.create({level: 'abc'}) }).toThrow('The level option must be a valid key in the levels object.')
  })
  test('options passThrough', () => {
    let log = perj.create({ write, passThrough: true })
    log.info(msg1, data1)
    expect(logObj.level).toBe('info')
    expect(logObj.lvl).toBe(30)
    expect(getType(logObj.time)).toBe('Number')
    expect(logObj.msg).toBe(msg1)
    expect(logObj.data).toMatchObject(data1)
    expect(data1).toMatchObject(logObj.data)
  })
  test('convenience methods', () => {
    const log = perj.create({ level: 'debug', write })
    const foo = { one: [1, 2, 3], two: { inner: true }, three: 3.14 }
    logJson = log.stringify(foo)
    expect(getType(logJson)).toBe('String')
    resetLogOutput()
    const conLog = console.log
    console.log = write
    foo.foo = foo
    log.json(foo)
    expect(logJson.one[0]).toBe(1)
    expect(logJson.foo).toBe('[Circular]')
    console.log = conLog
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
    },
    undef: undefined,
    nul: null,
    empty: ''
  })
  test('top level properties', () => {
    log.foo(msg1, data1)
    expect(Object.keys(logJson).length).toBe(11)
    expect(logJson.level).toBe('foo')
    expect(getType(logJson.time)).toBe('Number')
    expect(logJson.newMessageKey).toBe(msg1)
    expect(logJson.newDataKey).toMatchObject(data1)
    expect(logJson.project).toBe('elephant')
    expect(logJson.session).toBe(12345)
    expect(logJson.platform.name).toBe('node')
    expect(logJson.platform.pid).toBe(1234)
    expect(logJson.undef).toBe('')
    expect(logJson.nul).toBe(null)
    expect(logJson.empty).toBe('')
    expect(data1).toMatchObject(logJson.newDataKey)
    expect(logJson.newDataKey).toMatchObject(data1)
  })
  test('child logger properties', () => {
    const child = log.child({ env: 'dev' })
    resetLogOutput()
    log.foo(msg1)
    expect(logJson.env).toBeUndefined()
    resetLogOutput()
    child.bar(msg2, data2)
    expect(Object.keys(logJson).length).toBe(12)
    expect(getType(logJson.time)).toBe('Number')
    expect(logJson.level).toBe('bar')
    expect(logJson.newMessageKey).toBe(msg2)
    expect(logJson.newDataKey).toMatchObject(data2)
    expect(data2).toMatchObject(logJson.newDataKey)
    expect(logJson.project).toBe('elephant')
    expect(logJson.env).toBe('dev')
    expect(() => { log.child() }).toThrow('Provide top level arguments to create a child logger.')
  })
  test('child logger level', () => {
    log = perj.create({ level: 'fatal', write })
    let child = log.child({ child: true })
    child.level = 'trace'
    resetLogOutput()
    log.info(msg1)
    expect(logJson.msg).toBeUndefined()
    resetLogOutput()
    child.info(msg1)
    expect(logJson.msg).toBe(msg1)
  })
})

describe('logging tests', () => {
  for (const level of levels) {
    const log = perj.create({write, level: level})

    test(level + ': one message', () => {
      log[level](msg1)
      expect(Object.keys(logJson).length).toBe(5)
      expect(getType(logJson.time)).toBe('Number')
      expect(logJson.level).toBe(level)
      expect(logJson.msg).toBe(msg1)
      expect(logJson.data).toBe('')
    })
    test(level + ': two messages', () => {
      log[level](msg1, msg2)
      expect(Object.keys(logJson).length).toBe(5)
      expect(getType(logJson.time)).toBe('Number')
      expect(logJson.level).toBe(level)
      expect(getType(logJson.msg)).toBe('String')
      expect(logJson.msg).toBe(msg1)
      expect(getType(logJson.data)).toBe('String')
      expect(logJson.data).toBe(msg2)
    })
    test(level + ': two messages one data', () => {
      log[level](msg1, msg2, data1)
      expect(Object.keys(logJson).length).toBe(5)
      expect(getType(logJson.time)).toBe('Number')
      expect(logJson.level).toBe(level)
      expect(getType(logJson.msg)).toBe('String')
      expect(logJson.msg).toBe(msg1)
      expect(getType(logJson.data)).toBe('Array')
      expect(logJson.data[0]).toBe(msg2)
      expect(logJson.data[1]).toMatchObject(data1)
      expect(data1).toMatchObject(logJson.data[1])
    })
    test(level + ': two messages two data', () => {
      log[level](msg1, msg2, data1, data2)
      expect(Object.keys(logJson).length).toBe(5)
      expect(getType(logJson.time)).toBe('Number')
      expect(logJson.level).toBe(level)
      expect(getType(logJson.msg)).toBe('String')
      expect(logJson.msg).toBe(msg1)
      expect(getType(logJson.data)).toBe('Array')
      expect(logJson.data.length).toBe(3)
      expect(logJson.data[0]).toBe(msg2)
      expect(logJson.data[1]).toMatchObject(data1)
      expect(data1).toMatchObject(logJson.data[1])
      expect(logJson.data[2]).toMatchObject(data2)
      expect(data2).toMatchObject(logJson.data[2])
    })
    test(level + ': two messages two data mixed order', () => {
      log[level](data1, msg2, data2, msg1)
      expect(Object.keys(logJson).length).toBe(5)
      expect(getType(logJson.time)).toBe('Number')
      expect(logJson.level).toBe(level)
      expect(getType(logJson.msg)).toBe('String')
      expect(logJson.msg).toBe(msg2)
      expect(getType(logJson.data)).toBe('Array')
      expect(logJson.data.length).toBe(3)
      expect(logJson.data[0]).toMatchObject(data1)
      expect(data1).toMatchObject(logJson.data[0])
      expect(logJson.data[1]).toMatchObject(data2)
      expect(data2).toMatchObject(logJson.data[1])
      expect(logJson.data[2]).toBe(msg1)
    })
  }
})

describe('logging level tests', () => {
  test('level: fatal', () => {
    const log = perj.create({level: 'fatal', write})
    log.fatal('fatal')
    expect(logJson.msg).toBe('fatal')
    resetLogOutput()
    log.error('error')
    expect(logJson.msg).toBeUndefined()
    log.warn('warn')
    expect(logJson.msg).toBeUndefined()
    log.info('info')
    expect(logJson.msg).toBeUndefined()
    log.debug('debug')
    expect(logJson.msg).toBeUndefined()
    log.trace('trace')
    expect(logJson.msg).toBeUndefined()
  })
  test('level: error', () => {
    const log = perj.create({level: 'error', write})
    log.fatal('fatal')
    expect(logJson.msg).toBe('fatal')
    log.error('error')
    expect(logJson.msg).toBe('error')
    resetLogOutput()
    log.warn('warn')
    expect(logJson.msg).toBeUndefined()
    log.info('info')
    expect(logJson.msg).toBeUndefined()
    log.debug('debug')
    expect(logJson.msg).toBeUndefined()
    log.trace('trace')
    expect(logJson.msg).toBeUndefined()
  })
  test('level: warn', () => {
    const log = perj.create({level: 'warn', write})
    log.fatal('fatal')
    expect(logJson.msg).toBe('fatal')
    log.error('error')
    expect(logJson.msg).toBe('error')
    log.warn('warn')
    expect(logJson.msg).toBe('warn')
    resetLogOutput()
    log.info('info')
    expect(logJson.msg).toBeUndefined()
    log.debug('debug')
    expect(logJson.msg).toBeUndefined()
    log.trace('trace')
    expect(logJson.msg).toBeUndefined()
  })
  test('level: info', () => {
    const log = perj.create({level: 'info', write})
    log.fatal('fatal')
    expect(logJson.msg).toBe('fatal')
    log.error('error')
    expect(logJson.msg).toBe('error')
    log.warn('warn')
    expect(logJson.msg).toBe('warn')
    log.info('info')
    expect(logJson.msg).toBe('info')
    resetLogOutput()
    log.debug('debug')
    expect(logJson.msg).toBeUndefined()
    log.trace('trace')
    expect(logJson.msg).toBeUndefined()
  })
  test('level: debug', () => {
    const log = perj.create({level: 'debug', write})
    log.fatal('fatal')
    expect(logJson.msg).toBe('fatal')
    log.error('error')
    expect(logJson.msg).toBe('error')
    log.warn('warn')
    expect(logJson.msg).toBe('warn')
    log.info('info')
    expect(logJson.msg).toBe('info')
    log.debug('debug')
    expect(logJson.msg).toBe('debug')
    resetLogOutput()
    log.trace('trace')
    expect(logJson.msg).toBeUndefined()
  })
  test('level: trace', () => {
    const log = perj.create({level: 'trace', write})
    log.fatal('fatal')
    expect(logJson.msg).toBe('fatal')
    log.error('error')
    expect(logJson.msg).toBe('error')
    log.warn('warn')
    expect(logJson.msg).toBe('warn')
    log.info('info')
    expect(logJson.msg).toBe('info')
    log.debug('debug')
    expect(logJson.msg).toBe('debug')
    log.trace('trace')
    expect(logJson.msg).toBe('trace')
  })
  test('change level', () => {
    const log = perj.create({write})
    log.fatal('fatal')
    expect(logJson.msg).toBe('fatal')
    log.error('error')
    expect(logJson.msg).toBe('error')
    log.warn('warn')
    expect(logJson.msg).toBe('warn')
    log.info('info')
    expect(logJson.msg).toBe('info')
    resetLogOutput()
    log.debug('debug')
    expect(logJson.msg).toBeUndefined()
    log.trace('trace')
    expect(logJson.msg).toBeUndefined()
    log.level = 'trace'
    log.fatal('fatal')
    expect(logJson.msg).toBe('fatal')
    log.error('error')
    expect(logJson.msg).toBe('error')
    log.warn('warn')
    expect(logJson.msg).toBe('warn')
    log.info('info')
    expect(logJson.msg).toBe('info')
    log.debug('debug')
    expect(logJson.msg).toBe('debug')
    log.trace('trace')
    expect(logJson.msg).toBe('trace')
    log.addLevel({ spiderman: 600, batman: 500 })
    expect(Object.keys(log).length).toBe(8)
    log.addLevel({ spiderman: 3 })
    expect(Object.keys(log).length).toBe(8)
    log.spiderman('spiderman')
    expect(logJson.level).toBe('spiderman')
    expect(logJson.lvl).toBe(600)
    expect(logJson.msg).toBe('spiderman')
    log.batman('batman')
    expect(logJson.level).toBe('batman')
    expect(logJson.lvl).toBe(500)
    expect(logJson.msg).toBe('batman')
  })
})

describe('logging error tests', () => {
  const log = perj.create({level: 'trace', write, name: 'error tests'})
  let err1 = new Error(msg1)
  let err2 = new Error(msg2)

  test('error level test', () => {
    log.error(err1)
    expect(logJson.msg).toBe(err1.message)
    expect(logJson.data.message).toBe(err1.message)
    expect(logJson.data.name).toBe('Error')
    expect(logJson.data.stack).toBeDefined()
    log.error(err1, err2)
    expect(logJson.msg).toBe(err1.message)
    expect(logJson.data.length).toBe(2)
    expect(logJson.data[0].message).toBe(msg1)
    expect(logJson.data[1].message).toBe(msg2)
    expect(logJson.data[0].name).toBe('Error')
    expect(logJson.data[1].name).toBe('Error')
    expect(logJson.data[0].stack).toBeDefined()
    expect(logJson.data[1].stack).toBeDefined()
  })
  test('info level test', () => {
    log.info(err1)
    expect(logJson.msg).toBe(err1.message)
    expect(logJson.data.message).toBe(err1.message)
    expect(logJson.data.name).toBe('Error')
    expect(logJson.data.stack).toBeDefined()
    log.info(err1, err2)
    expect(logJson.msg).toBe(err1.message)
    expect(logJson.data.length).toBe(2)
    expect(logJson.data[0].message).toBe(err1.message)
    expect(logJson.data[1].message).toBe(err2.message)
    expect(logJson.data[0].name).toBe('Error')
    expect(logJson.data[1].name).toBe('Error')
    expect(logJson.data[0].stack).toBeDefined()
    expect(logJson.data[1].stack).toBeDefined()
    log.info(msg3, err1, msg4, err2)
    expect(logJson.msg).toBe(msg3)
    expect(logJson.data.length).toBe(3)
    expect(logJson.data[0].message).toBe(err1.message)
    expect(logJson.data[1]).toBe(msg4)
    expect(logJson.data[2].message).toBe(err2.message)
    expect(logJson.data[0].name).toBe('Error')
    expect(logJson.data[2].name).toBe('Error')
    expect(logJson.data[0].stack).toBeDefined()
    expect(logJson.data[2].stack).toBeDefined()
    // console.json(logJson)
  })
})
