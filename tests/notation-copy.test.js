const tc = require('test-constructs')
const notCopy = require('../src/notation-copy')

beforeEach(() => {
})

describe('notation copy tests', () => {
  test('simple value copy test', () => {
    let target = {}
    let result = notCopy({}, 'str')
    expect(result).toEqual({})
    target = {}
    result = notCopy(target, 1)
    expect(result).toEqual({})
    expect(result).toBe(target)
    target = {}
    result = notCopy(target, true)
    expect(result).toEqual({})
    expect(result).toBe(target)
    target = {}
    result = notCopy(target, false)
    expect(result).toEqual({})
    expect(result).toBe(target)
    target = {}
    result = notCopy(target, [])
    expect(result).toEqual({})
    expect(result).toBe(target)
    target = {}
    result = notCopy(target, new Date())
    expect(result).toEqual({})
    expect(result).toBe(target)
    target = {}
    result = notCopy(target, new Error())
    expect(typeof result.stack).toBe('string')
    expect(result).toBe(target)
    target = {}
    result = notCopy(target, () => {})
    expect(result).toEqual({})
    expect(result).toBe(target)
    target = {}
    result = notCopy({}, { foo: 'bar' })
    expect(result).toEqual({ foo: 'bar' })
  })
  test('simple object copy test', () => {
    const result = notCopy({}, tc.objects.bySize.small)
    expect(result).toMatchObject(tc.objects.bySize.small)
  })
  test('two simple object merge test', () => {
    const result = notCopy({}, tc.objects.bySize.small, tc.objects.bySize.tiny)
    expect(result).toMatchObject(tc.objects.bySize.small)
    expect(result).toMatchObject(tc.objects.bySize.tiny)
  })
  test('multiple simple object merge test', () => {
    const result = notCopy({a: 1}, {b: 2}, {c: 3}, {d: 4})
    expect(result).toMatchObject({a: 1})
    expect(result).toMatchObject({b: 2})
    expect(result).toMatchObject({c: 3})
    expect(result).toMatchObject({d: 4})
  })
  test('two simple object overwrite test', () => {
    const result = notCopy({}, tc.objects.bySize.small, tc.objects.bySize.medium)
    expect(result).toMatchObject(tc.objects.bySize.medium)
    expect(result.name).toBe(tc.objects.bySize.small.name)
    expect(result.class).toBe(tc.objects.bySize.medium.class)
  })
  test('deep object copy test', () => {
    const result = notCopy({}, tc.objects.special.deep)
    expect(result).toMatchObject(tc.objects.special.deep)
  })
  test('cicular object copy test', () => {
    const tag = '[Circular]'
    const obj = { name: 'obj', foo: 'bar' }
    obj.circ = obj
    obj.arr = [1, 'two', obj, 4, 'five', obj, 'seven', [11, 22, obj]]
    obj.child = obj
    obj.objCirc = { name: 'bar', bar: obj }
    const result = notCopy({}, obj)
    expect(result.foo).toBe('bar')
    expect(result.circ).toBe(tag)
    expect(result.arr[0]).toBe(1)
    expect(result.arr[1]).toBe('two')
    expect(result.arr[2]).toBe(tag)
    expect(result.arr[3]).toBe(4)
    expect(result.arr[4]).toBe('five')
    expect(result.arr[5]).toBe(tag)
    expect(result.arr[6]).toBe('seven')
    expect(result.arr[7][0]).toBe(11)
    expect(result.arr[7][1]).toBe(22)
    expect(result.arr[7][2]).toBe(tag)
    expect(result.child).toBe(tag)
    expect(result.objCirc.bar).toBe(tag)
  })
  test('types object copy test', () => {
    const result = notCopy({}, tc.objects.special.types)
    expect(result.name).toBe('JavaScript Types')
    expect(typeof result.Atomics).toBe('object')
    expect(Array.isArray(result.Array)).toBe(true)
    expect(typeof result.ArrayBuffer).toBe('object')
    expect(result.BooleanTrue).toBe(true)
    expect(result.BooleanFalse).toBe(false)
    expect(typeof result.DataView).toBe('object')
    expect(new Date(result.Date)).toBeInstanceOf(Date)
    expect(typeof result.Error.stack).toBe('string')
    expect(typeof result.Error.message).toBe('string')
    expect(typeof result.Float32Array).toBe('object')
    expect(typeof result.Float64Array).toBe('object')
    expect(typeof result.Generator).toBe('object')
    expect(result.Infinity).toBe(Infinity)
    expect(typeof result.Int16Array).toBe('object')
    expect(typeof result.Int32Array).toBe('object')
    expect(typeof result.Int8Array).toBe('object')
    expect(typeof result.Map).toBe('object')
    expect(result.NaN).toBe(NaN)
    expect(result.null).toBe(null)
    expect(result.Number).toBe(42)
    expect(result.Object.is).toBe(true)
    expect(typeof result.Promise).toBe('object')
    expect(typeof result.RegEx).toBe('object')
    expect(typeof result.Set).toBe('object')
    expect(typeof result.SharedArrayBuffer).toBe('object')
    expect(typeof result.String).toBe('string')
    expect(typeof result.Uint16Array).toBe('object')
    expect(typeof result.Uint32Array).toBe('object')
    expect(typeof result.Uint8Array).toBe('object')
    expect(typeof result.Uint8ClampedArray).toBe('object')
    expect(typeof result.WeakMap).toBe('object')
    expect(typeof result.WeakSet).toBe('object')
  })
  test('object with array copy test', () => {
    const fruit = { name: 'fruit', favourite: 'banana' }
    const drink = { name: 'drink', water: 'often' }
    fruit.array = [1, 2, fruit, fruit, drink, [11, 22, fruit]]
    fruit.array.push(fruit.array)
    fruit.fruitCircular = fruit
    fruit.drinkReference = drink
    drink.drinkCircular = drink
    const result = notCopy({}, fruit)
    expect(result).toBeDefined()
    expect(result.name).toBe('fruit')
    expect(result.favourite).toBe('banana')
    expect(result.array).toEqual([
      1, 2, '[Circular]', '[Circular]',
      { name: 'drink', water: 'often', drinkCircular: '[Circular]' },
      [11, 22, '[Circular]'], '[Circular]'])
    expect(result.fruitCircular).toBe('[Circular]')
    expect(result.drinkReference).toBe('[Circular]')
  })
})
