const perj = require('../src/perj')
const Tool = require('./tool')
const tool = new Tool()
const write = tool.write.bind(tool)

beforeEach(() => {
  tool.reset()
})

describe('log level tests', () => {
  test('level: fatal', () => {
    const log = perj.create({level: 'fatal', write})
    log.fatal('fatal')
    expect(tool.jsonOut.msg).toBe('fatal')
    tool.reset()
    log.error('error')
    expect(tool.jsonOut.msg).toBeUndefined()
    log.warn('warn')
    expect(tool.jsonOut.msg).toBeUndefined()
    log.info('info')
    expect(tool.jsonOut.msg).toBeUndefined()
    log.debug('debug')
    expect(tool.jsonOut.msg).toBeUndefined()
    log.trace('trace')
    expect(tool.jsonOut.msg).toBeUndefined()
  })
  test('level: error', () => {
    const log = perj.create({level: 'error', write})
    log.fatal('fatal')
    expect(tool.jsonOut.msg).toBe('fatal')
    log.error('error')
    expect(tool.jsonOut.msg).toBe('error')
    tool.reset()
    log.warn('warn')
    expect(tool.jsonOut.msg).toBeUndefined()
    log.info('info')
    expect(tool.jsonOut.msg).toBeUndefined()
    log.debug('debug')
    expect(tool.jsonOut.msg).toBeUndefined()
    log.trace('trace')
    expect(tool.jsonOut.msg).toBeUndefined()
  })
  test('level: warn', () => {
    const log = perj.create({level: 'warn', write})
    log.fatal('fatal')
    expect(tool.jsonOut.msg).toBe('fatal')
    log.error('error')
    expect(tool.jsonOut.msg).toBe('error')
    log.warn('warn')
    expect(tool.jsonOut.msg).toBe('warn')
    tool.reset()
    log.info('info')
    expect(tool.jsonOut.msg).toBeUndefined()
    log.debug('debug')
    expect(tool.jsonOut.msg).toBeUndefined()
    log.trace('trace')
    expect(tool.jsonOut.msg).toBeUndefined()
  })
  test('level: info', () => {
    const log = perj.create({level: 'info', write})
    log.fatal('fatal')
    expect(tool.jsonOut.msg).toBe('fatal')
    log.error('error')
    expect(tool.jsonOut.msg).toBe('error')
    log.warn('warn')
    expect(tool.jsonOut.msg).toBe('warn')
    log.info('info')
    expect(tool.jsonOut.msg).toBe('info')
    tool.reset()
    log.debug('debug')
    expect(tool.jsonOut.msg).toBeUndefined()
    log.trace('trace')
    expect(tool.jsonOut.msg).toBeUndefined()
  })
  test('level: debug', () => {
    const log = perj.create({level: 'debug', write})
    log.fatal('fatal')
    expect(tool.jsonOut.msg).toBe('fatal')
    log.error('error')
    expect(tool.jsonOut.msg).toBe('error')
    log.warn('warn')
    expect(tool.jsonOut.msg).toBe('warn')
    log.info('info')
    expect(tool.jsonOut.msg).toBe('info')
    log.debug('debug')
    expect(tool.jsonOut.msg).toBe('debug')
    tool.reset()
    log.trace('trace')
    expect(tool.jsonOut.msg).toBeUndefined()
  })
  test('level: trace', () => {
    const log = perj.create({level: 'trace', write})
    log.fatal('fatal')
    expect(tool.jsonOut.msg).toBe('fatal')
    log.error('error')
    expect(tool.jsonOut.msg).toBe('error')
    log.warn('warn')
    expect(tool.jsonOut.msg).toBe('warn')
    log.info('info')
    expect(tool.jsonOut.msg).toBe('info')
    log.debug('debug')
    expect(tool.jsonOut.msg).toBe('debug')
    log.trace('trace')
    expect(tool.jsonOut.msg).toBe('trace')
  })
  test('change level', () => {
    const log = perj.create({write})
    log.fatal('fatal')
    expect(tool.jsonOut.msg).toBe('fatal')
    log.error('error')
    expect(tool.jsonOut.msg).toBe('error')
    log.warn('warn')
    expect(tool.jsonOut.msg).toBe('warn')
    log.info('info')
    expect(tool.jsonOut.msg).toBe('info')
    tool.reset()
    log.debug('debug')
    expect(tool.jsonOut.msg).toBeUndefined()
    log.trace('trace')
    expect(tool.jsonOut.msg).toBeUndefined()
    log.level = 'trace'
    log.fatal('fatal')
    expect(tool.jsonOut.msg).toBe('fatal')
    log.error('error')
    expect(tool.jsonOut.msg).toBe('error')
    log.warn('warn')
    expect(tool.jsonOut.msg).toBe('warn')
    log.info('info')
    expect(tool.jsonOut.msg).toBe('info')
    log.debug('debug')
    expect(tool.jsonOut.msg).toBe('debug')
    log.trace('trace')
    expect(tool.jsonOut.msg).toBe('trace')
    log.addLevel({ spiderman: 600, batman: 500 })
    expect(Object.keys(log).length).toBe(8)
    log.addLevel({ spiderman: 3 })
    expect(Object.keys(log).length).toBe(8)
    log.spiderman('spiderman')
    expect(tool.jsonOut.level).toBe('spiderman')
    expect(tool.jsonOut.lvl).toBe(600)
    expect(tool.jsonOut.msg).toBe('spiderman')
    log.batman('batman')
    expect(tool.jsonOut.level).toBe('batman')
    expect(tool.jsonOut.lvl).toBe(500)
    expect(tool.jsonOut.msg).toBe('batman')
  })
})