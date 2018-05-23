const perj = require('../src/perj')
const Tool = require('./tool')
const tool = new Tool()
const write = tool.write.bind(tool)

beforeEach(() => {
  tool.reset()
})

describe.only('logger object tests', () => {
  test('perj member tests', () => {
    expect(tool.getType(perj.create)).toBe('Function')
    expect(tool.getType(perj.dateTimeFunctions)).toBe('Object')
    expect(tool.getType(perj.dateTimeFunctions.epoch)).toBe('Function')
    expect(tool.getType(perj.dateTimeFunctions.epoch())).toBe('Number')
    expect(tool.getType(perj.dateTimeFunctions.unix)).toBe('Function')
    expect(tool.getType(perj.dateTimeFunctions.unix())).toBe('Number')
    expect(tool.getType(perj.dateTimeFunctions.iso)).toBe('Function')
    expect(tool.getType(perj.dateTimeFunctions.iso())).toBe('String')
  })
  test('log member tests', () => {
    const log = perj.create()
    expect(tool.getType(log.level)).toBe('String')
    expect(log.level).toBe('info')
    expect(tool.getType(log.levels)).toBe('Object')
    expect(log.levels.info).toBe(30)
    expect(tool.getType(log.write)).toBe('Function')
    expect(log.write.name).not.toMatch(/log/)
    expect(tool.getType(log.child)).toBe('Function')
    expect(tool.getType(log.fatal)).toBe('Function')
    expect(tool.getType(log.error)).toBe('Function')
    expect(tool.getType(log.warn)).toBe('Function')
    expect(tool.getType(log.info)).toBe('Function')
    expect(tool.getType(log.debug)).toBe('Function')
    expect(tool.getType(log.trace)).toBe('Function')
    expect(() => { log.level = 'abc' }).toThrow('The level option must be a valid key in the levels object.')
    log.level = 'debug'
    expect(log.level).toBe('debug')
  })
  test('convenience methods', () => {
    const log = perj.create({ level: 'debug', write })
    const foo = { one: [1, 2, 3], two: { inner: true }, three: 3.14 }
    tool.jsonOut = log.stringify(foo)
    expect(tool.getType(tool.jsonOut)).toBe('String')
    tool.reset()
    const conLog = console.log
    console.log = write
    foo.foo = foo
    log.json(foo)
    expect(tool.jsonOut.one[0]).toBe(1)
    expect(tool.jsonOut.foo).toBe('[Circular]')
    console.log = conLog
  })
})
