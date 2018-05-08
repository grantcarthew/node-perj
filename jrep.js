const symApplyOptions = Symbol('ApplyOptions')
const symTopAsString = Symbol('TopAsString')
const symHeaders = Symbol('Headers')
const symLogAssignment = Symbol('LogAssignment')

const defaultOptions = {
  levels: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },
  level: 'info',
  levelNumberKey: 'lvl',
  dateTimeKey: 'time',
  messageKey: 'msg',
  dataKey: 'data',
  write: defaultWriter()
}

function defaultWriter () {
  const isBrowser = typeof window !== 'undefined' &&
    Object.prototype.toString.call(window) === '[object Window]'
  return isBrowser ? console.log : process.stdout.write.bind(process.stdout)
}

module.exports = Object.freeze({
  create (obj) {
    return new Jrep(obj)
  }
})

class Jrep {
  constructor (options) {
    this[symApplyOptions](options)
  }

  [symApplyOptions] (options) {
    const split = splitOptions(options)
    this.options = Object.freeze(split.options)
    this.top = Object.freeze(split.top)
    this[symTopAsString] = genTopString(this.top)
    this[symHeaders] = {}
    this[symLogAssignment]()
  }

  [symLogAssignment] () {
    Object.keys(this.options.levels).forEach((level) => {
      this[symHeaders][level] = `{"level":"${level}","${this.options.levelNumberKey}":${this.options.levels[level]}${this[symTopAsString]},"${this.options.dateTimeKey}":`
      if (this.parent) { return }
      this[level] = function (...items) {
        if (this.options.levels[this.options.level] > this.options.levels[level]) { return }
        let text = this[symHeaders][level] + (new Date()).getTime()
        const splitItems = stringifyLogItems(items)
        text += ',"' + this.options.messageKey + '":' + splitItems.msg
        text += ',"' + this.options.dataKey + '":' + splitItems.data + '}\n'

        this.options.write(text)
      }
    })
  }

  child (tops) {
    if (!tops) {
      throw new Error('Provide top level arguments to create a child logger.')
    }
    const defaultKeys = Object.keys(defaultOptions)
    let newTops = {}
    for (const key in tops) {
      if (!defaultKeys.includes(key)) {
        newTops[key] = tops[key]
      }
    }
    const newChild = Object.create(this)
    newChild.parent = this
    newChild.top = Object.freeze(Object.assign({}, this.top, newTops))
    newChild[symTopAsString] = genTopString(newChild.top)
    newChild[symLogAssignment]()
    return newChild
  }

  stringify (obj, replacer, spacer) {
    this.options.write(stringify(obj, replacer, spacer))
  }

  json (data) {
    this.options.write(stringify(data, null, 2))
  }
}

function splitOptions (options) {
  const result = {
    options: Object.assign({}, defaultOptions),
    top: {}
  }
  if (!options) { return result }
  const defaultKeys = Object.keys(defaultOptions)
  for (const key in options) {
    if (defaultKeys.includes(key)) {
      result.options[key] = options[key]
    } else {
      result.top[key] = options[key]
    }
  }
  if (!(Object.keys(result.options.levels).includes(result.options.level))) {
    throw new Error('The level option must be a valid key in the levels object.')
  }
  return result
}

function genTopString (tops) {
  let topAsString = ''
  for (const key in tops) {
    topAsString += ',"' + key + '":' + stringify(tops[key])
  }
  return topAsString
}

function stringifyLogItems (items) {
  let result = {msg: '', data: []}

  for (const item of items) {
    if (Object.prototype.toString.call(item) === '[object String]') {
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

  result.msg = stringify(result.msg)
  result.data = stringify(result.data)
  return result
}

// =================================================================
// Following code is from the fast-safe-stringify package.
// =================================================================

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

// =================================================================
// Following code is from the serializerr package.
// =================================================================

function serializerr (obj = {}) {
  const chain = protochain(obj)
    .filter(obj => obj !== Object.prototype)
  return [obj]
    .concat(chain)
    .map(item => Object.getOwnPropertyNames(item))
    .reduce((result, names) => {
      names.forEach(name => {
        result[name] = obj[name]
      })
      return result
    }, {})
}

// =================================================================
// Following code is from the protochain package.
// =================================================================

function protochain (obj) {
  const chain = []
  let target = getPrototypeOf(obj)
  while (target) {
    chain.push(target)
    target = getPrototypeOf(target)
  }

  return chain
}

function getPrototypeOf (obj) {
  if (obj == null) return null
  return Object.getPrototypeOf(Object(obj))
}
