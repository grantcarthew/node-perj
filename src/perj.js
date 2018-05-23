const stringify = require('./stringify')
const serializerr = require('./serializerr')
const defaultOptions = require('./options')
const dateTimeFunctions = require('./date-time')

// Symbols for functions and values
const _SplitOptions = Symbol('SplitOptions')
const _Options = Symbol('Options')
const _TopString = Symbol('TopString')
const _TopValues = Symbol('TopValues')
const _HeaderStrings = Symbol('HeaderStrings')
const _HeaderValues = Symbol('HeaderValues')
const _SetLevelHeader = Symbol('SetLevelHeader')
const _SetLevelFunction = Symbol('SetLevelFunction')

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
    this[_TopValues] = {}
    this[_SplitOptions](options)
    this[_HeaderStrings] = {}
    this[_HeaderValues] = {}
    for (const level in this[_Options].levels) {
      this[_SetLevelHeader](level)
      this[_SetLevelFunction](level)
    }
  }

  get level () {
    return this[_Options].level
  }

  set level (level) {
    if (!(this[_Options].levels.hasOwnProperty(level))) {
      throw new Error('The level option must be a valid key in the levels object.')
    }
    if (!this.hasOwnProperty(_Options)) {
      // Attaching the options object to this instance
      this[_Options] = Object.assign({}, this[_Options])
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
      this[_SetLevelHeader](level)
      this[_SetLevelFunction](level)
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
        this[_TopString] += ',"' + key + '":' + (stringify(options[key]) || '""')
        this[_TopValues][key] = options[key]
      }
    }
  }

  [_SetLevelHeader] (level) {
    this[_HeaderStrings][level] = '{"' +
      this[_Options].levelKey + '":"' + level + '","' +
      this[_Options].levelNumberKey + '":' + this[_Options].levels[level] +
      this[_TopString] + ',"' +
      this[_Options].dateTimeKey + '":'
    if (this[_Options].passThrough) {
      this[_HeaderValues][level] = Object.assign({
        [this[_Options].levelKey]: level,
        [this[_Options].levelNumberKey]: this[_Options].levels[level]
      }, this[_TopValues])
    }
  }

  [_SetLevelFunction] (level) {
    this[level] = function (...items) {
      if (this[_Options].levels[this[_Options].level] >
        this[_Options].levels[level]) {
        return
      }
      const time = this[_Options].dateTimeFunction()
      let msg = ''
      let data = []
      let dataJson = ''

      if (items.length === 1) {
        // Single item processing
        const item = items[0]
        if (typeof item === 'string') {
          msg = item
          dataJson = '""'
        } else if (item instanceof Error) {
          msg = item.message
          data = serializerr(item)
          dataJson = stringify(data)
        } else {
          data = item
          dataJson = stringify(item)
        }
      } else {
        // Multiple item processing
        for (const item of items) {
          if (typeof item === 'string') {
            if (msg) {
              data.push(item)
            } else {
              msg = item
            }
            continue
          }
          if (item instanceof Error) {
            data.push(serializerr(item))
            if (!msg) { msg = item.message }
            continue
          }
          data.push(item)
        }

        if (data.length === 1) {
          data = data[0]
        }
        dataJson = stringify(data)
      }

      const json = this[_HeaderStrings][level] + time +
          ',"' + this[_Options].messageKey + '":"' + msg +
          '","' + this[_Options].dataKey + '":' + dataJson + '}\n'

      if (this[_Options].passThrough) {
        const obj = Object.assign(this[_HeaderValues][level], {
          [this[_Options].dateTimeKey]: time,
          [this[_Options].messageKey]: msg,
          [this[_Options].dataKey]: data
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
    newChild[_TopValues] = Object.assign({}, this[_TopValues])
    if (this[_Options].passThrough) {
      newChild[_HeaderValues] = Object.assign({}, this[_HeaderValues])
    }
    for (const key in tops) {
      if (defaultOptions.hasOwnProperty(key) ||
          this[_Options].levelKey === key ||
          this[_Options].levelNumberKey === key ||
          this[_Options].dateTimeKey === key ||
          this[_Options].messageKey === key ||
          this[_Options].dataKey === key) { continue }
      if (this[_TopValues].hasOwnProperty(key) &&
            typeof this[_TopValues][key] === 'string' &&
            typeof tops[key] === 'string') {
        newChild[_TopValues][key] = this[_TopValues][key] + this[_Options].separatorString + tops[key]
      } else {
        newChild[_TopValues][key] = tops[key]
      }
    }
    newChild[_TopString] = ''
    for (const key in newChild[_TopValues]) {
      newChild[_TopString] += ',"' + key + '":' + (stringify(newChild[_TopValues][key]) || '""')
    }
    newChild.parent = this
    newChild[_HeaderStrings] = {}
    for (const level in this[_Options].levels) {
      newChild[_SetLevelHeader](level)
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
