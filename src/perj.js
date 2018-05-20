const stringify = require('./stringify')
const serializerr = require('./serializerr')
const defaultOptions = require('./options')
const dateTimeFunctions = require('./date-time')

const symSplitOptions = Symbol('SplitOptions')
const symOptions = Symbol('Options')
const symTopString = Symbol('TopString')
const symTopCache = Symbol('TopCache')
const symHeaders = Symbol('Headers')
const symHeaderStrings = Symbol('Headers')
const symHeaderObjects = Symbol('Headers')
const symAddLogHeader = Symbol('AddLogHeader')
const symAddLogFunction = Symbol('AddLogFunction')

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
    this[symOptions] = Object.assign({}, defaultOptions)
    this[symTopString] = ''
    this[symTopCache] = {}
    this[symSplitOptions](options)
    this[symHeaders] = {}
    this[symHeaderStrings] = {}
    this[symHeaderObjects] = {}
    for (const level in this[symOptions].levels) {
      this[symAddLogHeader](level)
      this[symAddLogFunction](level)
    }
  }

  get level () {
    return this[symOptions].level
  }

  set level (level) {
    if (!(this[symOptions].levels.hasOwnProperty(level))) {
      throw new Error('The level option must be a valid key in the levels object.')
    }
    this[symOptions].level = level
  }

  get levels () {
    return this[symOptions].levels
  }

  addLevel (newLevels) {
    for (const level in newLevels) {
      if (this[level]) { continue }
      this[symOptions].levels[level] = newLevels[level]
      this[symAddLogHeader](level)
      this[symAddLogFunction](level)
    }
  }

  get write () {
    return this[symOptions].write
  }

  [symSplitOptions] (options) {
    if (!options) { return }
    for (const key in options) {
      if (defaultOptions.hasOwnProperty(key)) {
        if (key === 'level') {
          this.level = options[key]
          continue
        }
        this[symOptions][key] = options[key]
      } else {
        this[symTopString] += ',"' + key + '":' + stringifyTopValue(options[key])
        this[symTopCache][key] = options[key]
        if (this[symOptions].passThrough) {
          this[symTopCache][key] = options[key]
        }
      }
    }
  }

  [symAddLogHeader] (level) {
    this[symHeaderStrings][level] = '{"' +
      this[symOptions].levelKey + '":"' + level + '","' +
      this[symOptions].levelNumberKey + '":' + this[symOptions].levels[level] +
      this[symTopString] + ',"' +
      this[symOptions].dateTimeKey + '":'
    if (this[symOptions].passThrough) {
      this[symHeaderObjects][level] = Object.assign({
        [this[symOptions].levelKey]: level,
        [this[symOptions].levelNumberKey]: this[symOptions].levels[level]
      }, this[symTopCache])
    }
  }

  [symAddLogFunction] (level) {
    this[level] = function (...items) {
      if (this[symOptions].levels[this[symOptions].level] >
        this[symOptions].levels[level]) {
        return
      }
      const time = this[symOptions].dateTimeFunction()
      const splitItems = stringifyLogItems(items)
      const json = this[symHeaderStrings][level] + time +
          ',"' + this[symOptions].messageKey + '":"' + splitItems.msg +
          '","' + this[symOptions].dataKey + '":' + splitItems.dataStr + '}\n'
      if (this[symOptions].passThrough) {
        const obj = Object.assign(this[symHeaderObjects][level], {
          [this[symOptions].dateTimeKey]: time,
          [this[symOptions].messageKey]: splitItems.msg,
          [this[symOptions].dataKey]: splitItems.data
        })
        this[symOptions].write(json, obj)
      } else {
        this[symOptions].write(json)
      }
    }
  }

  child (tops) {
    if (!tops) {
      throw new Error('Provide top level arguments to create a child logger.')
    }
    const newChild = Object.create(this)
    newChild[symTopCache] = Object.assign({}, this[symTopCache])
    for (const key in tops) {
      if (!defaultOptions.hasOwnProperty(key)) {
        if (this[symTopCache].hasOwnProperty(key) &&
            isString(this[symTopCache][key]) &&
            isString(tops[key])) {
          newChild[symTopCache][key] = this[symTopCache][key] + this[symOptions].separator + tops[key]
        } else {
          newChild[symTopCache][key] = tops[key]
        }
      }
    }
    newChild[symTopString] = ''
    for (const key in newChild[symTopCache]) {
      newChild[symTopString] += ',"' + key + '":' + stringifyTopValue(newChild[symTopCache][key])
    }
    newChild.parent = this
    newChild[symOptions] = Object.assign({}, this[symOptions])
    newChild[symHeaderStrings] = Object.assign({}, this[symHeaderStrings])
    if (this[symOptions].passThrough) {
      newChild[symHeaderObjects] = Object.assign({}, this[symHeaderObjects])
    }
    for (const level in this[symOptions].levels) {
      newChild[symAddLogHeader](level)
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
