const os = require('os')
const path = require('path')
const symOptions = Symbol('Jrep Options')
const symAssignLogLevels = Symbol('Assign Log Levels')

const levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace']

module.exports = Object.freeze({
  create (options) {
    return new Jrep(options)
  }
})

class Jrep {
  constructor (options) {
    this[symOptions] = options
    this.levels = levels
    this[symAssignLogLevels]()
  }

  [symAssignLogLevels] () {
    this.levels.forEach((level) => {
      this[level] = function (...items) {
        let logJson = '{"ver":"1","host":"' + os.hostname
        logJson += '","time":"' + (new Date()).getTime()
        logJson += '","level":"' + level + '","msg":'
        const objects = []
        const messages = []
        items.forEach((item) => { isString(item) ? messages.push(item) : objects.push(item) })
        logJson += stringifyLogMessages(messages) + '"data":'
        logJson += stringifyLogObjects(objects) + '}'

        // console.log(JSON.stringify(this, null, 2))
        console.log(logJson)
        console.json(JSON.parse(logJson))
      }
    })
  }

  child (options) {
    const newOptions = Object.assign(this[symOptions], options)
    return new Jrep(newOptions)
  }
}

function stringifyLogMessages (messages) {
  if (messages.length < 1) {
    return '"",'
  } else if (messages.length === 1) {
    return '"' + messages[0] + '",'
  } else {
    let result = '['
    messages.forEach((value) => { result += '"' + value + '",' })
    return result.slice(0, -1) + '],'
  }
}

function stringifyLogObjects (objects) {
  if (objects.length < 1) {
    return '""'
  } else if (objects.length === 1) {
    return stringify(objects[0])
  } else {
    let result = '['
    objects.forEach((value) => { result += stringify(value) + ',' })
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

// Note: the code below this line is subject to the following license.
// It is a portion of the code from the fast-safe-stringify package.
// https://github.com/davidmarkclements/fast-safe-stringify

/*
The MIT License (MIT)

Copyright (c) 2016 David Mark Clements
Copyright (c) 2017 David Mark Clements & Matteo Collina
Copyright (c) 2018 David Mark Clements, Matteo Collina & Ruben Bridgewater

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var arr = []

// Regular stringify
function stringify (obj, replacer, spacer) {
  decirc(obj, '', [], undefined)
  var res = JSON.stringify(obj, replacer, spacer)
  while (arr.length !== 0) {
    var part = arr.pop()
    part[0][part[1]] = part[2]
  }
  return res
}
function decirc (val, k, stack, parent) {
  var i
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
      var keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        decirc(val[key], key, stack, val)
      }
    }
    stack.pop()
  }
}
