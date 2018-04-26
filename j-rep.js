const os = require('os')
const path = require('path')
const symAssignLogLevels = Symbol('Assign Log Levels')
const symWrite = Symbol('Log Writing Function')

const levels = {
  fatal: 60,
  error: 50,
  warn: 40,
  info: 30,
  debug: 20,
  trace: 10
}
const optionKeys = ['logLevel', 'write']
const defaultOptions = {
  logLevel: 'info'
}

module.exports = Object.freeze({
  create (obj) {
    return new Jrep(obj)
  }
})

class Jrep {
  constructor (obj) {
    const split = splitOptions(obj)
    this.options = split.options
    this.top = split.top
    this.levels = levels
    if (this.options.write) { this[symWrite] = this.options.write } else { this[symWrite] = process.stdout.write }
    this[symAssignLogLevels]()
  }

  [symAssignLogLevels] () {
    Object.keys(this.levels).forEach((level) => {
      this[level] = function (...items) {
        if (level === 'trace') {
          console.log(this.options.logLevel)
          console.log(level)
          console.log(this.levels[this.options.logLevel])
          console.log(this.levels[level])
        }
        if (this.levels[this.options.logLevel] >= this.levels[level]) { return }
        let text = '{"ver":"1","host":"' + os.hostname()
        text += '","time":' + (new Date()).getTime()
        text += ',"level":"' + level
        text += '","lvl":' + this.levels[level] + ',"msg":'
        const objects = []
        const messages = []
        for (const item of items) { isString(item) ? messages.push(item) : objects.push(item) }
        text += stringifyLogMessages(messages)
        if (this.top) { text += getTopProperties(this.top) }
        text += ',"data":' + stringifyLogObjects(objects) + '}'

        this[symWrite](text)
      }
    })
  }

  child (options) {
    return new Jrep(Object.assign(this.options, this.top, options))
  }
}

function splitOptions (parent, child) {
  let result = { options: defaultOptions, top: {} }
  if (!parent && !child) { return result }
  if (!parent) { result.options = Object.assign(defaultOptions, child) }
  if (!child) { result.options = Object.assign(defaultOptions, parent) }
  if (isModule(parent)) {
    result.top.name = path.basename(parent.filename)
    return result
  }
  let topKeys = []
  for (const key in result.options) {
    if (!optionKeys.includes(key)) {
      topKeys.push(key)
    }
  }
  if (topKeys.length < 1) { return result }
  for (const topKey of topKeys) {
    result.top[topKey] = result.options[topKey]
    delete result.options[topKey]
  }
  return result
}

function getTopProperties (top) {
  let tops = ''
  for (const key in top) {
    tops += ',"' + key + '":"' + top[key] + '"'
  }
  return tops
}

function stringifyLogMessages (messages) {
  if (messages.length < 1) {
    return '""'
  } else if (messages.length === 1) {
    return '"' + messages[0] + '"'
  } else {
    let result = '['
    for (const message of messages) { result += '"' + message + '",' }
    return result.slice(0, -1) + ']'
  }
}

function stringifyLogObjects (objects) {
  if (objects.length < 1) {
    return '""'
  } else if (objects.length === 1) {
    return stringify(objects[0])
  } else {
    let result = '['
    for (const obj of objects) { result += stringify(obj) + ',' }
    return result.slice(0, -1) + ']'
  }
}

function isObject (value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function isString (value) {
  return Object.prototype.toString.call(value) === '[object String]'
}

function isModule (value) {
  return !!value.filename && !!value.id && !!value.parent && !!value.children
}

function getModuleName (value) {
  return path.basename(value.filename)
}

const arr = []

// Regular stringify
function stringify (obj, replacer, spacer) {
  decirc(obj, '', [], undefined)
  const res = JSON.stringify(obj, replacer, spacer)
  while (arr.length !== 0) {
    const part = arr.pop()
    part[0][part[1]] = part[2]
  }
  return res
}
function decirc (val, k, stack, parent) {
  let i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        parent[k] = '[Circular]'
        arr.push([parent, k, val])
        return
      }
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, stack, val)
      }
    } else {
      const keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        const key = keys[i]
        decirc(val[key], key, stack, val)
      }
    }
    stack.pop()
  }
}
