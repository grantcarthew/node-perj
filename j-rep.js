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
  },
  stringify
})

class Jrep {
  constructor (obj) {
    const split = splitOptions(obj)
    this.options = split.options
    this.top = split.top
    this.levels = levels
    if (this.options.write) {
      this[symWrite] = this.options.write
    } else {
      this[symWrite] = process.stdout.write.bind(process.stdout)
    }
    this[symAssignLogLevels]()
  }

  [symAssignLogLevels] () {
    Object.keys(this.levels).forEach((level) => {
      this[level] = function (...items) {
        if (this.levels[this.options.logLevel] > this.levels[level]) { return }
        let text = '{"ver":"1","time":' + (new Date()).getTime()
        text += ',"level":"' + level
        text += '","lvl":' + this.levels[level] + ',"msg":'
        const objects = []
        const messages = []
        for (const item of items) { isString(item) ? messages.push(item) : objects.push(item) }
        text += stringifyLogMessages(messages)
        if (this.top) { text += getTopProperties(this.top) }
        text += ',"data":' + stringifyLogObjects(objects) + '}'

        text = JSON.stringify(JSON.parse(text), null, 2)
        this[symWrite](text)
      }
    })
  }

  child (options) {
    return new Jrep(Object.assign(this.options, this.top, options))
  }

  stringify (obj, replacer, spacer) {
    this[symWrite](stringify(obj, replacer, spacer))
  }

  json (data) {
    this[symWrite](stringify(data, null, 2))
  }
}

function splitOptions (parent, child) {
  let result = { options: defaultOptions, top: {} }
  if (!parent && !child) { return result }
  if (!parent) { result.options = Object.assign(defaultOptions, child) }
  if (!child) { result.options = Object.assign(defaultOptions, parent) }
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
    let sObj = smartStringify(objects[0])
    return sObj || '""'
  } else {
    let result = '['
    for (const obj of objects) {
      let sObj = smartStringify(obj) || '""'
      result += sObj + ','
    }
    return result.slice(0, -1) + ']'
  }
}

function smartStringify (obj) {
  if (!(obj instanceof Error)) {
    return stringify(obj, replacer)
  }
  return stringify(planify(obj), replacer)
}

function planify (obj) {
  let tree = null
  let current = {}
  for (;obj != null; obj = Object.getPrototypeOf(obj)) {
    const names = Object.getOwnPropertyNames(obj)
    let inner = {}
    let attach = false
    for (let i = 0; i < names.length; i++) {
      let name = names[i]
      if (obj[name]) {
        const type = getType(obj[name])
        if (type !== '[object Function]') {
          if (type === '[object Error]') {
            inner[name] = planify(obj[name])
          } else {
            inner[name] = obj[name]
          }
          attach = true
        }
      }
    }
    if (attach) {
      current.innerPrototype = inner
    }
    tree = tree || inner
    current = inner
  }
  return tree
}

function getType (value) {
  return Object.prototype.toString.call(value)
}

// function isObject (value) {
//   return Object.prototype.toString.call(value) === '[object Object]'
// }

function isString (value) {
  return Object.prototype.toString.call(value) === '[object String]'
}

function replacer (key, value) {
  if (value instanceof RegExp) {
    return (value.toString())
  } else {
    return value
  }
}

// Following code is from fast-safe-stringify

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
