const symSplitOptions = Symbol('SplitOptions')
const symApplyOptions = Symbol('ApplyOptions')
const symTopString = Symbol('TopString')
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
    this[symTopString] = ''
    this[symSplitOptions](options)
    this[symHeaders] = {}
    this[symLogAssignment]()
  }

  [symSplitOptions] (options) {
    this.options = Object.assign({}, defaultOptions)
    if (!options) { return }
    for (const key in options) {
      if (defaultOptions.hasOwnProperty(key)) {
        this.options[key] = options[key]
      } else {
        this[symTopString] += ',"' + key + '":' + stringify(options[key])
      }
    }
    if (!(this.options.levels.hasOwnProperty(this.options.level))) {
      throw new Error('The level option must be a valid key in the levels object.')
    }
  }

  [symLogAssignment] () {
    Object.keys(this.options.levels).forEach((level) => {
      this[symHeaders][level] = `{"level":"${level}","${this.options.levelNumberKey}":${this.options.levels[level]}${this[symTopString]},"${this.options.dateTimeKey}":`
      if (this.parent) { return }

      this[level] = function (...items) {
        if (this.options.levels[this.options.level] > this.options.levels[level]) { return }
        const splitItems = stringifyLogItems(items)
        const text = this[symHeaders][level] + (new Date()).getTime() +
          ',"' + this.options.messageKey + '":"' + splitItems.msg +
          '","' + this.options.dataKey + '":' + splitItems.data + '}\n'

        this.options.write(text)
      }
    })
  }

  child (tops) {
    if (!tops) {
      throw new Error('Provide top level arguments to create a child logger.')
    }
    const newChild = Object.create(this)
    for (const key in tops) {
      if (!defaultOptions.hasOwnProperty(key)) {
        newChild[symTopString] += ',"' + key + '":' + stringify(tops[key])
      }
    }
    newChild.parent = this
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
