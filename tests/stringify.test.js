const Perj = require('../src/perj')
const Tool = require('./tool')
const tool = new Tool()
const data = require('../data')
const write = tool.write.bind(tool)
const passThrough = true

beforeEach(() => {
  tool.reset()
})

describe('logger stringify tests', () => {
  test('stringify function tests', () => {
    let log = new Perj({ stringifyFunction, write, passThrough })
    log.info('stringify test', data.tardis)
    expect(tool.jsonOut.data.name).toBe('Not TARDIS')
    expect(tool.objOut.data.name).toBe('TARDIS')
    expect(tool.jsonOut.data.class).toBe(data.tardis.class)
    expect(tool.objOut.data.class).toBe(data.tardis.class)
    expect(tool.jsonOut.msg).toBe('stringify test')
    expect(tool.objOut.msg).toBe('stringify test')
  })
  test('child stringify function tests', () => {
    let log = new Perj({ stringifyFunction, write, passThrough })
    let child = log.child({ foo: 'bar' })
    child.info('stringify test', data.tardis)
    expect(tool.jsonOut.data.name).toBe('Not TARDIS')
    expect(tool.objOut.data.name).toBe('TARDIS')
    expect(tool.jsonOut.data.class).toBe(data.tardis.class)
    expect(tool.objOut.data.class).toBe(data.tardis.class)
    expect(tool.jsonOut.msg).toBe('stringify test')
    expect(tool.objOut.msg).toBe('stringify test')
  })
})

function stringifyFunction (value) {
  const copy = Object.assign({}, value)
  if (copy.name === 'TARDIS') {
    copy.name = 'Not TARDIS'
  }

  return JSON.stringify(copy)
}
