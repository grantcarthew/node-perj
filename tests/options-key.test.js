const { Perj } = require('../src/perj')
const Tool = require('./tool')
const tool = new Tool()
const data = require('../data')
const write = tool.write.bind(tool)
const passThrough = true

beforeEach(() => {
  tool.reset()
})

describe('logger options key tests', () => {
  test('key options tests', () => {
    let log = new Perj({
      levels: { foo: 100, bar: 200 },
      level: 'foo',
      levelKey: 'lk',
      levelKeyEnabled: true,
      levelNumberKey: 'lnk',
      levelNumberKeyEnabled: true,
      dateTimeKey: 'dt',
      dateTimeFunction: () => '"baz"',
      messageKey: 'mk',
      dataKey: 'dk',
      passThrough,
      write,
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
    log.bar(data.msg[0], data.tardis)
    expect(log.levels.foo).toBe(100)
    expect(log.levels.bar).toBe(200)
    expect(log.level).toBe('foo')
    expect(tool.getType(log.write)).toBe('Function')
    expect(tool.jsonOut.lk).toBe('bar')
    expect(tool.objOut.lk).toBe('bar')
    expect(tool.jsonOut.lnk).toBe(200)
    expect(tool.objOut.lnk).toBe(200)
    expect(tool.jsonOut.dt).toBe('baz')
    expect(tool.objOut.dt).toBe('"baz"') // TODO: <==============================
    expect(tool.jsonOut.mk).toBe(data.msg[0])
    expect(tool.objOut.mk).toBe(data.msg[0])
    expect(tool.jsonOut.dk).toMatchObject(data.tardis)
    expect(data.tardis).toMatchObject(tool.jsonOut.dk)
    expect(tool.objOut.dk).toMatchObject(data.tardis)
    expect(data.tardis).toMatchObject(tool.objOut.dk)
    expect(tool.jsonOut.project).toBe('elephant')
    expect(tool.objOut.project).toBe('elephant')
    expect(tool.jsonOut.session).toBe(12345)
    expect(tool.objOut.session).toBe(12345)
    expect(tool.jsonOut.platform.name).toBe('node')
    expect(tool.objOut.platform.name).toBe('node')
    expect(tool.jsonOut.platform.pid).toBe(1234)
    expect(tool.objOut.platform.pid).toBe(1234)
    expect(tool.jsonOut.undef).toBe(null)
    expect(tool.objOut.undef).toBe(null)
    expect(tool.jsonOut.nul).toBe(null)
    expect(tool.objOut.nul).toBe(null)
    expect(tool.jsonOut.empty).toBe('')
    expect(tool.objOut.empty).toBe('')
  })
  test('level key not enabled tests', () => {
    let log = new Perj({ levelKeyEnabled: false, passThrough, write })
    log.info(data.msg[0], data.tardis)
    expect(tool.jsonOut.level).toBeUndefined()
    expect(tool.objOut.level).toBeUndefined()
    expect(tool.jsonOut.lvl).toBe(30)
    expect(tool.objOut.lvl).toBe(30)
    expect(tool.getType(tool.jsonOut.time)).toBe('Number')
    expect(tool.getType(tool.objOut.time)).toBe('Number')
    expect(tool.jsonOut.msg).toBe(data.msg[0])
    expect(tool.objOut.msg).toBe(data.msg[0])
    expect(tool.jsonOut.data).toMatchObject(data.tardis)
    expect(data.tardis).toMatchObject(tool.jsonOut.data)
    expect(tool.objOut.data).toMatchObject(data.tardis)
    expect(data.tardis).toMatchObject(tool.objOut.data)
  })
  test('level number key not enabled tests', () => {
    let log = new Perj({ levelNumberKeyEnabled: false, passThrough, write })
    log.info(data.msg[0], data.tardis)
    expect(tool.jsonOut.level).toBe('info')
    expect(tool.objOut.level).toBe('info')
    expect(tool.jsonOut.lvl).toBeUndefined()
    expect(tool.objOut.lvl).toBeUndefined()
    expect(tool.getType(tool.jsonOut.time)).toBe('Number')
    expect(tool.getType(tool.objOut.time)).toBe('Number')
    expect(tool.jsonOut.msg).toBe(data.msg[0])
    expect(tool.objOut.msg).toBe(data.msg[0])
    expect(tool.jsonOut.data).toMatchObject(data.tardis)
    expect(data.tardis).toMatchObject(tool.jsonOut.data)
    expect(tool.objOut.data).toMatchObject(data.tardis)
    expect(data.tardis).toMatchObject(tool.objOut.data)
  })
  test('level key and level number key not enabled tests', () => {
    let log = new Perj({ levelKeyEnabled: false, levelNumberKeyEnabled: false, passThrough, write })
    log.info(data.msg[0], data.tardis)
    expect(tool.jsonOut.level).toBeUndefined()
    expect(tool.objOut.level).toBeUndefined()
    expect(tool.jsonOut.lvl).toBeUndefined()
    expect(tool.objOut.lvl).toBeUndefined()
    expect(tool.getType(tool.jsonOut.time)).toBe('Number')
    expect(tool.getType(tool.objOut.time)).toBe('Number')
    expect(tool.jsonOut.msg).toBe(data.msg[0])
    expect(tool.objOut.msg).toBe(data.msg[0])
    expect(tool.jsonOut.data).toMatchObject(data.tardis)
    expect(data.tardis).toMatchObject(tool.jsonOut.data)
    expect(tool.objOut.data).toMatchObject(data.tardis)
    expect(data.tardis).toMatchObject(tool.objOut.data)
  })
})
