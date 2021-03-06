const Perj = require('../src/perj')
const Tool = require('./tool')
const tool = new Tool()
const data = require('../data')
const write = tool.write.bind(tool)
const passThrough = true
const serializerTardis = { tardis: tardisSerializer }
const serializerSerenity = { serenity: serenitySerializer }
const serializerBoth = { tardis: tardisSerializer, serenity: serenitySerializer }

beforeEach(() => {
  tool.reset()
})

describe('object serialize tests', () => {
  test('first serializer test', () => {
    let log = new Perj({ serializers: serializerTardis, passThrough, write })
    log.info('tardis', { tardis: data.tardis })
    expect(Object.keys(tool.jsonOut.data).length).toBe(1)
    expect(Object.keys(tool.jsonOut.data.tardis).length).toBe(3)
    expect(tool.getType(tool.jsonOut.data.tardis)).toBe('Object')
    expect(tool.getType(tool.objOut.data.tardis)).toBe('Object')
    expect(tool.jsonOut.data.tardis.name).toBe(data.tardis.name)
    expect(tool.objOut.data.tardis.name).toBe(data.tardis.name)
    expect(tool.jsonOut.data.tardis.features).toEqual(data.tardis.features)
    expect(tool.objOut.data.tardis.features).toEqual(data.tardis.features)
    expect(tool.jsonOut.data.tardis.exterior).toEqual(data.tardis.exterior)
    expect(tool.objOut.data.tardis.exterior).toEqual(data.tardis.exterior)
    expect(tool.jsonOut.data.tardis.manufacturer).toBeUndefined()
    expect(tool.objOut.data.tardis.manufacturer).toBeUndefined()
  })
  test('second serializer test', () => {
    let log = new Perj({ serializers: serializerSerenity, passThrough, write })
    log.info('serenity', { serenity: data.serenity })
    expect(Object.keys(tool.jsonOut.data).length).toBe(1)
    expect(Object.keys(tool.jsonOut.data.serenity).length).toBe(3)
    expect(tool.getType(tool.jsonOut.data.serenity)).toBe('Object')
    expect(tool.getType(tool.objOut.data.serenity)).toBe('Object')
    expect(tool.jsonOut.data.serenity.classCode).toBe(data.serenity.classCode)
    expect(tool.objOut.data.serenity.classCode).toBe(data.serenity.classCode)
    expect(tool.jsonOut.data.serenity.engine).toEqual(data.serenity.engine)
    expect(tool.objOut.data.serenity.engine).toEqual(data.serenity.engine)
    expect(tool.jsonOut.data.serenity.upper).toEqual(data.serenity.interior.upperDeck)
    expect(tool.objOut.data.serenity.upper).toEqual(data.serenity.interior.upperDeck)
    expect(tool.jsonOut.data.serenity.url).toBeUndefined()
    expect(tool.objOut.data.serenity.url).toBeUndefined()
  })
  test('two serializers test', () => {
    let log = new Perj({ serializers: serializerBoth, passThrough, write })
    log.info('tardis', { tardis: data.tardis })
    expect(Object.keys(tool.jsonOut.data).length).toBe(1)
    expect(Object.keys(tool.jsonOut.data.tardis).length).toBe(3)
    expect(tool.getType(tool.jsonOut.data.tardis)).toBe('Object')
    expect(tool.getType(tool.objOut.data.tardis)).toBe('Object')
    expect(tool.jsonOut.data.tardis.name).toBe(data.tardis.name)
    expect(tool.objOut.data.tardis.name).toBe(data.tardis.name)
    expect(tool.jsonOut.data.tardis.features).toEqual(data.tardis.features)
    expect(tool.objOut.data.tardis.features).toEqual(data.tardis.features)
    expect(tool.jsonOut.data.tardis.exterior).toEqual(data.tardis.exterior)
    expect(tool.objOut.data.tardis.exterior).toEqual(data.tardis.exterior)
    expect(tool.jsonOut.data.tardis.manufacturer).toBeUndefined()
    expect(tool.objOut.data.tardis.manufacturer).toBeUndefined()
    log.info('serenity', { serenity: data.serenity })
    expect(Object.keys(tool.jsonOut.data).length).toBe(1)
    expect(Object.keys(tool.jsonOut.data.serenity).length).toBe(3)
    expect(tool.getType(tool.jsonOut.data.serenity)).toBe('Object')
    expect(tool.getType(tool.objOut.data.serenity)).toBe('Object')
    expect(tool.jsonOut.data.serenity.classCode).toBe(data.serenity.classCode)
    expect(tool.objOut.data.serenity.classCode).toBe(data.serenity.classCode)
    expect(tool.jsonOut.data.serenity.engine).toEqual(data.serenity.engine)
    expect(tool.objOut.data.serenity.engine).toEqual(data.serenity.engine)
    expect(tool.jsonOut.data.serenity.upper).toEqual(data.serenity.interior.upperDeck)
    expect(tool.objOut.data.serenity.upper).toEqual(data.serenity.interior.upperDeck)
    expect(tool.jsonOut.data.serenity.url).toBeUndefined()
    expect(tool.objOut.data.serenity.url).toBeUndefined()
  })
  test('serializer with other objects test', () => {
    let log = new Perj({ serializers: serializerTardis, passThrough, write })
    log.info('death star', data.deathStar)
    expect(Object.keys(tool.jsonOut.data).length).toBe(5)
    expect(tool.getType(tool.jsonOut.data)).toBe('Object')
    expect(tool.getType(tool.objOut.data)).toBe('Object')
    expect(tool.jsonOut.data.url).toBe(data.deathStar.url)
    expect(tool.objOut.data.url).toBe(data.deathStar.url)
    expect(tool.jsonOut.data.production).toEqual(data.deathStar.production)
    expect(tool.objOut.data.production).toEqual(data.deathStar.production)
    expect(tool.jsonOut.data.specifications).toEqual(data.deathStar.specifications)
    expect(tool.objOut.data.specifications).toEqual(data.deathStar.specifications)
    expect(tool.jsonOut.data.locationInformation).toEqual(data.deathStar.locationInformation)
    expect(tool.objOut.data.locationInformation).toEqual(data.deathStar.locationInformation)
    expect(tool.jsonOut.data.usage).toEqual(data.deathStar.usage)
    expect(tool.objOut.data.usage).toEqual(data.deathStar.usage)
  })
  test('serializer with two objects test', () => {
    let log = new Perj({ serializers: serializerTardis, passThrough, write })
    log.info('tardis', { tardis: data.tardis }, data.deathStar)
    expect(tool.jsonOut.data.length).toBe(2)
    expect(Object.keys(tool.jsonOut.data[0]).length).toBe(1)
    expect(Object.keys(tool.jsonOut.data[0].tardis).length).toBe(3)
    expect(tool.getType(tool.jsonOut.data[0].tardis)).toBe('Object')
    expect(tool.getType(tool.objOut.data[0].tardis)).toBe('Object')
    expect(tool.jsonOut.data[0].tardis.name).toBe(data.tardis.name)
    expect(tool.objOut.data[0].tardis.name).toBe(data.tardis.name)
    expect(tool.jsonOut.data[0].tardis.features).toEqual(data.tardis.features)
    expect(tool.objOut.data[0].tardis.features).toEqual(data.tardis.features)
    expect(tool.jsonOut.data[0].tardis.exterior).toEqual(data.tardis.exterior)
    expect(tool.objOut.data[0].tardis.exterior).toEqual(data.tardis.exterior)
    expect(tool.jsonOut.data[0].tardis.manufacturer).toBeUndefined()
    expect(tool.objOut.data[0].tardis.manufacturer).toBeUndefined()
    expect(Object.keys(tool.jsonOut.data[1]).length).toBe(5)
    expect(tool.getType(tool.jsonOut.data[1])).toBe('Object')
    expect(tool.getType(tool.objOut.data[1])).toBe('Object')
    expect(tool.jsonOut.data[1].url).toBe(data.deathStar.url)
    expect(tool.objOut.data[1].url).toBe(data.deathStar.url)
    expect(tool.jsonOut.data[1].production).toEqual(data.deathStar.production)
    expect(tool.objOut.data[1].production).toEqual(data.deathStar.production)
    expect(tool.jsonOut.data[1].specifications).toEqual(data.deathStar.specifications)
    expect(tool.objOut.data[1].specifications).toEqual(data.deathStar.specifications)
    expect(tool.jsonOut.data[1].locationInformation).toEqual(data.deathStar.locationInformation)
    expect(tool.objOut.data[1].locationInformation).toEqual(data.deathStar.locationInformation)
    expect(tool.jsonOut.data[1].usage).toEqual(data.deathStar.usage)
    expect(tool.objOut.data[1].usage).toEqual(data.deathStar.usage)
  })
  test('serializer with child test', () => {
    let log = new Perj({ serializers: serializerTardis, passThrough, write })
    let child = log.child({ foo: 'bar' })
    child.info('tardis', { tardis: data.tardis })
    expect(Object.keys(tool.jsonOut.data).length).toBe(1)
    expect(Object.keys(tool.jsonOut.data.tardis).length).toBe(3)
    expect(tool.getType(tool.jsonOut.data.tardis)).toBe('Object')
    expect(tool.getType(tool.objOut.data.tardis)).toBe('Object')
    expect(tool.jsonOut.data.tardis.name).toBe(data.tardis.name)
    expect(tool.objOut.data.tardis.name).toBe(data.tardis.name)
    expect(tool.jsonOut.data.tardis.features).toEqual(data.tardis.features)
    expect(tool.objOut.data.tardis.features).toEqual(data.tardis.features)
    expect(tool.jsonOut.data.tardis.exterior).toEqual(data.tardis.exterior)
    expect(tool.objOut.data.tardis.exterior).toEqual(data.tardis.exterior)
    expect(tool.jsonOut.data.tardis.manufacturer).toBeUndefined()
    expect(tool.objOut.data.tardis.manufacturer).toBeUndefined()
  })
  test('serializer type test', () => {
    let log = new Perj({ serializers: serializerTardis, passThrough, write })
    log.info(null)
    expect(tool.getType(tool.jsonOut.data)).toBe('Null')
    expect(tool.getType(tool.objOut.data)).toBe('Null')
    log.info(undefined)
    expect(tool.getType(tool.jsonOut.data)).toBe('Null')
    expect(tool.getType(tool.objOut.data)).toBe('Null')
    log.info(undefined, null)
    expect(tool.getType(tool.jsonOut.data[0])).toBe('Null')
    expect(tool.getType(tool.objOut.data[0])).toBe('Null')
    expect(tool.getType(tool.jsonOut.data[1])).toBe('Null')
    expect(tool.getType(tool.objOut.data[1])).toBe('Null')
    log.info(null, undefined)
    expect(tool.getType(tool.jsonOut.data[0])).toBe('Null')
    expect(tool.getType(tool.objOut.data[0])).toBe('Null')
    expect(tool.getType(tool.jsonOut.data[1])).toBe('Null')
    expect(tool.getType(tool.objOut.data[1])).toBe('Null')
  })
})

function tardisSerializer (value) {
  const { name, features, exterior } = value
  return { name, features, exterior }
}

function serenitySerializer (value) {
  const { classCode, engine } = value
  const upper = value.interior.upperDeck
  return { classCode, engine, upper }
}
