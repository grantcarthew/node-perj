const stringify = require('./stringify')
const serializerr = require('./serializerr')
const defaultOptions = require('./options')
const dateTimeFunctions = require('./date-time')

// Symbols for functions and values
const _SplitOptions = Symbol('SplitOptions')
const _Options = Symbol('Options')
const _TopString = Symbol('TopString')
const _TopStringSnip = Symbol('TopStringPart')
const _TopCache = Symbol('TopCache')
const _Headers = Symbol('Headers')
const _HeaderStrings = Symbol('Headers')
const _HeaderObjects = Symbol('Headers')
const _AddLogHeader = Symbol('AddLogHeader')
const _AddLogFunction = Symbol('AddLogFunction')

// TODO: Remove this line.
require('console-probe').apply()

module.exports = Object.freeze({
  create (obj) {
    return new Perj(obj)
  },
  dateTimeFunctions
})

class Perj {
  constructor (options) {
    this[_Options] = Object.assign({}, defaultOptions)
    this[_TopString] = ''
    this[_TopStringSnip] = {}
    this[_TopCache] = {}
    this[_SplitOptions](options)
    this[_Headers] = {}
    this[_HeaderStrings] = {}
    this[_HeaderObjects] = {}
    for (const level in this[_Options].levels) {
      this[_AddLogHeader](level)
      this[_AddLogFunction](level)
    }
  }

  get level () {
    return this[_Options].level
  }

  set level (level) {
    if (!(this[_Options].levels.hasOwnProperty(level))) {
      throw new Error('The level option must be a valid key in the levels object.')
    }
    this[_Options].level = level
  }

  get levels () {
    return this[_Options].levels
  }

  addLevel (newLevels) {
    for (const level in newLevels) {
      if (this[level]) { continue }
      this[_Options].levels[level] = newLevels[level]
      this[_AddLogHeader](level)
      this[_AddLogFunction](level)
    }
  }

  get write () {
    return this[_Options].write
  }

  [_SplitOptions] (options) {
    if (!options) { return }
    for (const key in options) {
      if (defaultOptions.hasOwnProperty(key)) {
        if (key === 'level') {
          this.level = options[key]
          continue
        }
        this[_Options][key] = options[key]
      } else {
        const snip = ',"' + key + '":' + stringifyTopValue(options[key])
        this[_TopString] += snip
        this[_TopStringSnip][key] = snip
        this[_TopCache][key] = options[key]
      }
    }
  }

  [_AddLogHeader] (level) {
    this[_HeaderStrings][level] = '{"' +
      this[_Options].levelKey + '":"' + level + '","' +
      this[_Options].levelNumberKey + '":' + this[_Options].levels[level] +
      this[_TopString] + ',"' +
      this[_Options].dateTimeKey + '":'
    if (this[_Options].passThrough) {
      this[_HeaderObjects][level] = Object.assign({
        [this[_Options].levelKey]: level,
        [this[_Options].levelNumberKey]: this[_Options].levels[level]
      }, this[_TopCache])
    }
  }

  [_AddLogFunction] (level) {
    this[level] = function (...items) {
      if (this[_Options].levels[this[_Options].level] >
        this[_Options].levels[level]) {
        return
      }
      const time = this[_Options].dateTimeFunction()
      const splitItems = stringifyLogItems(items)
      const json = this[_HeaderStrings][level] + time +
          ',"' + this[_Options].messageKey + '":"' + splitItems.msg +
          '","' + this[_Options].dataKey + '":' + splitItems.dataStr + '}\n'
      if (this[_Options].passThrough) {
        const obj = Object.assign(this[_HeaderObjects][level], {
          [this[_Options].dateTimeKey]: time,
          [this[_Options].messageKey]: splitItems.msg,
          [this[_Options].dataKey]: splitItems.data
        })
        this[_Options].write(json, obj)
      } else {
        this[_Options].write(json)
      }
    }
  }

  child (tops) {
    if (!tops) {
      throw new Error('Provide top level arguments to create a child logger.')
    }
    const newChild = Object.create(this)
    newChild[_TopStringSnip] = Object.assign({}, this[_TopStringSnip])
    newChild[_TopCache] = Object.assign({}, this[_TopCache])
    for (const key in tops) {
      if (defaultOptions.hasOwnProperty(key)) { continue }
      if (this[_TopCache].hasOwnProperty(key) &&
            isString(this[_TopCache][key]) &&
            isString(tops[key])) {
        const snip = this[_TopCache][key] + this[_Options].separator + tops[key]
        newChild[_TopCache][key] = snip
        newChild[_TopStringSnip][key] = ',"' + key + '":"' + snip + '"'
      } else {
        newChild[_TopCache][key] = tops[key]
        newChild[_TopStringSnip][key] = ',"' + key + '":' + stringifyTopValue(tops[key])
      }
    }
    newChild[_TopString] = ''
    for (const key in newChild[_TopStringSnip]) {
      newChild[_TopString] += newChild[_TopStringSnip][key]
    }
    newChild.parent = this
    newChild[_Options] = Object.assign({}, this[_Options])
    newChild[_HeaderStrings] = Object.assign({}, this[_HeaderStrings])
    if (this[_Options].passThrough) {
      newChild[_HeaderObjects] = Object.assign({}, this[_HeaderObjects])
    }
    for (const level in this[_Options].levels) {
      newChild[_AddLogHeader](level)
    }
    return newChild
  }

  stringify (obj, replacer, spacer) {
    return stringify(obj, replacer, spacer)
  }

  json (data) {
    console.log(stringify(data, null, 2))
  }
}

function stringifyLogItems (items) {
  let result = { msg: '', data: [], dataStr: '' }

  for (const item of items) {
    if (isString(item)) {
      if (result.msg) {
        result.data.push(item)
      } else {
        result.msg = item
      }
      continue
    }
    if (item instanceof Error) {
      result.data.push(serializerr(item))
      if (!result.msg) { result.msg = item.message }
      continue
    }
    result.data.push(item)
  }

  if (result.data.length < 1) {
    result.data = ''
  } else if (result.data.length === 1) {
    result.data = result.data[0]
  }

  result.dataStr = stringify(result.data)
  return result
}

function stringifyTopValue (value) {
  let str = stringify(value)
  return str === undefined ? '""' : str
}

function isString (value) {
  return Object.prototype.toString.call(value) === '[object String]'
}
