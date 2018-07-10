(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Perj"] = factory();
	else
		root["Perj"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/perj.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/options.js":
/*!************************!*\
  !*** ./src/options.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const serializeError = __webpack_require__(/*! ./serialize-error */ "./src/serialize-error.js")
const stringifyFunction = __webpack_require__(/*! ./stringify */ "./src/stringify.js")

module.exports = {
  levels: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },
  level: 'info',
  levelKey: 'level',
  levelKeyEnabled: true,
  levelNumberKey: 'lvl',
  levelNumberKeyEnabled: true,
  dateTimeKey: 'time',
  dateTimeFunction,
  messageKey: 'msg',
  dataKey: 'data',
  separatorString: ':',
  serializers: false,
  serializeErrorFunction: serializeError,
  stringifyFunction,
  passThrough: false,
  write: defaultWriter()
}

function dateTimeFunction () {
  // Returns epoch time.
  return Date.now()
}

function defaultWriter () {
  if (typeof process !== 'undefined' &&
      Object.prototype.toString.call(process) === '[object process]') {
    return process.stdout.write.bind(process.stdout)
  }
  return console.log
}


/***/ }),

/***/ "./src/perj.js":
/*!*********************!*\
  !*** ./src/perj.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const defaultOptions = __webpack_require__(/*! ./options */ "./src/options.js")

// Symbols for functions and values
const _SplitOptions = Symbol('SplitOptions')
const _Options = Symbol('Options')
const _TopSnip = Symbol('TopSnip')
const _TopValues = Symbol('TopValues')
const _TopIsPrimitive = Symbol('TopIsPrimitive')
const _HeaderStrings = Symbol('HeaderStrings')
const _HeaderValues = Symbol('HeaderValues')
const _SetLevelHeader = Symbol('SetLevelHeader')
const _SetLevelFunction = Symbol('SetLevelFunction')

/*
Code Summary:
Following are points of interest around the perj code choices.
- Symbols used to hide internal properties and methods.
- Multiple Symbols due to major performance hit if using nested.
- Deeply nested 'if' and 'for' statements due to performance benifits.
- Some minor duplication due to performance benifits.

Symbol Summary:
_SplitOptions: <Function>
  Used to split the user options from top level properties.
  Helps to abstract the split function out of the constructor.

_Options: <Object>
  This holds an Object with the default or custom options.

_TopSnip: <String>
  This holds a JSON snippet of the user supplied top level properties.

_TopValues: <Object>
  This holds the user supplied top level properies.
  It is used to build the _TopSnip string and when
  'passThrough' is enabled.

_TopIsPrimitive: <Boolean>
  Object.assign is a real pig to work with in a high
  performance project. To avoid using Object.assign, this flag
  is used to indicate if the user has assigned a top level property
  with values that are only primitives (string, number, boolean).
  If the user assigned values are all primitive, a simple 'for' loop
  is faster to duplicate an object than using Object.assign.
  This flag is also set to false if the user supplies a custom
  stringify function.

_HeaderStrings: <Object>
  The header for each log level is the same such as:
  {"level":"error","lvl":50,"time":1525643291716
  This caches the level headers.

_HeaderValues: <Object>
  Only used when 'passThrough' is enabled.
  Permits rebuilding the JSON object for output.

_SetLevelHeader: <Function>
  Holds the function used to build the level header.

_SetLevelFunction: <Function>
  This function is used to generate the level functions.
*/

class Perj {
  constructor (options) {
    if (options != null && options.constructor !== Object) {
      throw new Error('Provide options object to create a logger.')
    }
    this[_Options] = Object.assign({}, defaultOptions)
    this[_TopSnip] = ''
    this[_TopValues] = {}
    this[_TopIsPrimitive] = true
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
        if (key === 'stringifyFunction') {
          this[_TopIsPrimitive] = false
        }
        this[_Options][key] = options[key]
      } else {
        const type = typeof options[key]
        if (type === 'string') {
          this[_TopSnip] += '"' + key + '":"' + options[key] + '",'
          this[_TopValues][key] = options[key]
        } else if (type === 'number' || type === 'boolean') {
          this[_TopSnip] += '"' + key + '":' + options[key] + ','
          this[_TopValues][key] = options[key]
        } else if (type === 'undefined') {
          this[_TopSnip] += '"' + key + '":null,'
          this[_TopValues][key] = null
        } else {
          this[_TopSnip] += '"' + key + '":' + this[_Options].stringifyFunction(options[key]) + ','
          this[_TopValues][key] = options[key]
          this[_TopIsPrimitive] = false
        }
      }
    }
  }

  [_SetLevelHeader] (level) {
    this[_HeaderStrings][level] = '{'
    this[_Options].levelKeyEnabled && (this[_HeaderStrings][level] += '"' + this[_Options].levelKey + '":"' + level + '",')
    this[_Options].levelNumberKeyEnabled && (this[_HeaderStrings][level] += '"' + this[_Options].levelNumberKey + '":' + this[_Options].levels[level] + ',')
    this[_TopSnip] !== '' && (this[_HeaderStrings][level] += this[_TopSnip])
    this[_HeaderStrings][level] += '"' + this[_Options].dateTimeKey + '":'

    if (this[_Options].passThrough) {
      const levelObj = {}
      this[_Options].levelKeyEnabled && (levelObj[this[_Options].levelKey] = level)
      this[_Options].levelNumberKeyEnabled && (levelObj[this[_Options].levelNumberKey] = this[_Options].levels[level])
      this[_HeaderValues][level] = Object.assign(levelObj, this[_TopValues])
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
      let data = null
      let dataJson = 'null'

      const serialize = (item) => {
        if (!this[_Options].serializers) { return item }
        if (item == null) { return null }
        const graded = {}
        for (const key in item) {
          let value = item[key]
          if (item.hasOwnProperty && item.hasOwnProperty(key) && this[_Options].serializers[key]) {
            value = this[_Options].serializers[key](value)
          }
          if (value !== undefined) {
            graded[key] = value
          }
        }
        return graded
      }

      if (items.length === 1) {
        // Single item processing
        const item = items[0]
        const type = typeof item
        if (type === 'string') {
          msg = item
        } else if (item == null) {
          // Undefined or null, keep defaults.
        } else if (type === 'number' || type === 'boolean') {
          data = item
          dataJson = '' + item
        } else if (item instanceof Error) {
          msg = item.message
          data = this[_Options].serializeErrorFunction(item)
          dataJson = this[_Options].stringifyFunction(data)
        } else {
          data = serialize(item)
          dataJson = this[_Options].stringifyFunction(data)
        }
      } else if (items.length > 1) {
        // Multiple item processing
        data = []
        for (const item of items) {
          const type = typeof item
          if (type === 'string') {
            if (msg) { data.push(item) } else { msg = item }
            continue
          }
          if (type === 'undefined') {
            data.push(null)
            continue
          }
          if (item instanceof Error) {
            data.push(this[_Options].serializeErrorFunction(item))
            if (!msg) { msg = item.message }
            continue
          }

          data.push(serialize(item))
        }

        if (data.length === 1) {
          data = data[0]
        }
        dataJson = this[_Options].stringifyFunction(data)
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
    if (tops == null || tops.constructor !== Object) {
      throw new Error('Provide top level arguments object to create a child logger.')
    }
    const newChild = Object.create(this)
    if (this[_TopIsPrimitive]) {
      // Avoiding Object.assign which is not needed
      newChild[_TopValues] = {}
      newChild[_TopIsPrimitive] = true
      for (const key in this[_TopValues]) {
        newChild[_TopValues][key] = this[_TopValues][key]
      }
    } else {
      // Top value is an object. Take the Object.assign hit like a man.
      newChild[_TopValues] = Object.assign({}, this[_TopValues])
      newChild[_TopIsPrimitive] = false
    }
    for (const key in tops) {
      // Options and key names are not valid, skipping.
      if (defaultOptions.hasOwnProperty(key) ||
          this[_Options].levelKey === key ||
          this[_Options].levelNumberKey === key ||
          this[_Options].dateTimeKey === key ||
          this[_Options].messageKey === key ||
          this[_Options].dataKey === key) { continue }
      const type = typeof tops[key]
      if (type === 'string' &&
          this[_TopValues].hasOwnProperty(key) &&
          typeof this[_TopValues][key] === 'string') {
        // New top key is the same as parent and is a string. Appending separator string and new value.
        newChild[_TopValues][key] = this[_TopValues][key] + this[_Options].separatorString + tops[key]
      } else if (type === 'undefined') {
        newChild[_TopValues][key] = null
      } else {
        newChild[_TopValues][key] = tops[key]
        // Not using && so we can exit early
        if (!(type === 'string' || type === 'number' || type === 'boolean')) {
          this[_TopIsPrimitive] = false
        }
      }
    }
    newChild[_TopSnip] = ''
    for (const key in newChild[_TopValues]) {
      if (newChild[_TopIsPrimitive]) {
        // Privitive JSON.stringify. Cheap.
        const type = typeof newChild[_TopValues][key]
        if (type === 'string') {
          newChild[_TopSnip] += '"' + key + '":"' + newChild[_TopValues][key] + '",'
        } else {
          newChild[_TopSnip] += '"' + key + '":' + newChild[_TopValues][key] + ','
        }
        continue
      }
      newChild[_TopSnip] += '"' + key + '":' + (this[_Options].stringifyFunction(newChild[_TopValues][key])) + ','
    }
    newChild.parent = this
    newChild[_HeaderStrings] = {}
    newChild[_HeaderValues] = {}
    for (const level in this[_Options].levels) {
      newChild[_SetLevelHeader](level)
    }
    return newChild
  }

  stringify (obj, replacer, spacer) {
    return this[_Options].stringifyFunction(obj, replacer, spacer)
  }

  json (data) {
    console.log(this[_Options].stringifyFunction(data, null, 2))
  }
}

module.exports = Perj


/***/ }),

/***/ "./src/serialize-error.js":
/*!********************************!*\
  !*** ./src/serialize-error.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = serializeError

function serializeError (obj) {
  if (obj == null) { return {} }

  const seen = new WeakSet([obj])
  let tree = null
  let currentNode = {}

  for (;obj != null; obj = Object.getPrototypeOf(obj)) {
    const constructor = obj.constructor.name || ''
    const name = obj.name || ''
    const node = { constructor, name }
    const nodeName = node.constructor || node.name || ((new Date()).getTime().toString())
    const propNames = Object.getOwnPropertyNames(obj)

    for (let i = 0; i < propNames.length; i++) {
      const value = obj[propNames[i]]
      const type = typeCheck(value)
      if (type === 'object') {
        if (seen.has(value)) {
          node[propNames[i]] = '[Circular]'
        } else {
          seen.add(value)
          node[propNames[i]] = serializeError(value)
        }
      } else if (type) {
        node[propNames[i]] = value
      }
    }

    tree = tree || node
    currentNode[nodeName] = node
    currentNode = node
  }

  return tree
}

function typeCheck (value) {
  try {
    const type = typeof value
    if (type === 'string' ||
        type === 'number' ||
        type === 'boolean' ||
        Array.isArray(value) ||
        value === null) {
      return true
    }
    if (type === 'object') {
      return 'object'
    }
  } catch (err) { }

  return false
}


/***/ }),

/***/ "./src/stringify.js":
/*!**************************!*\
  !*** ./src/stringify.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*

Following code is from the fast-safe-stringify package.
https://www.npmjs.com/package/fast-safe-stringify

See the LICENSE file for license details.

*/

module.exports = stringify

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


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QZXJqL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9QZXJqL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1BlcmovLi9zcmMvb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9QZXJqLy4vc3JjL3BlcmouanMiLCJ3ZWJwYWNrOi8vUGVyai8uL3NyYy9zZXJpYWxpemUtZXJyb3IuanMiLCJ3ZWJwYWNrOi8vUGVyai8uL3NyYy9zdHJpbmdpZnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isa0JBQWtCLE9BQU87QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0RBQStEOztBQUUvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3BVQTs7QUFFQTtBQUNBLG9CQUFvQixVQUFVOztBQUU5QjtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxZQUFZO0FBQ3BCO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxjQUFjOztBQUVqQjtBQUNBOzs7Ozs7Ozs7Ozs7QUN2REE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoicGVyai5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlBlcmpcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiUGVyalwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wZXJqLmpzXCIpO1xuIiwiY29uc3Qgc2VyaWFsaXplRXJyb3IgPSByZXF1aXJlKCcuL3NlcmlhbGl6ZS1lcnJvcicpXHJcbmNvbnN0IHN0cmluZ2lmeUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9zdHJpbmdpZnknKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgbGV2ZWxzOiB7XHJcbiAgICBmYXRhbDogNjAsXHJcbiAgICBlcnJvcjogNTAsXHJcbiAgICB3YXJuOiA0MCxcclxuICAgIGluZm86IDMwLFxyXG4gICAgZGVidWc6IDIwLFxyXG4gICAgdHJhY2U6IDEwXHJcbiAgfSxcclxuICBsZXZlbDogJ2luZm8nLFxyXG4gIGxldmVsS2V5OiAnbGV2ZWwnLFxyXG4gIGxldmVsS2V5RW5hYmxlZDogdHJ1ZSxcclxuICBsZXZlbE51bWJlcktleTogJ2x2bCcsXHJcbiAgbGV2ZWxOdW1iZXJLZXlFbmFibGVkOiB0cnVlLFxyXG4gIGRhdGVUaW1lS2V5OiAndGltZScsXHJcbiAgZGF0ZVRpbWVGdW5jdGlvbixcclxuICBtZXNzYWdlS2V5OiAnbXNnJyxcclxuICBkYXRhS2V5OiAnZGF0YScsXHJcbiAgc2VwYXJhdG9yU3RyaW5nOiAnOicsXHJcbiAgc2VyaWFsaXplcnM6IGZhbHNlLFxyXG4gIHNlcmlhbGl6ZUVycm9yRnVuY3Rpb246IHNlcmlhbGl6ZUVycm9yLFxyXG4gIHN0cmluZ2lmeUZ1bmN0aW9uLFxyXG4gIHBhc3NUaHJvdWdoOiBmYWxzZSxcclxuICB3cml0ZTogZGVmYXVsdFdyaXRlcigpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRhdGVUaW1lRnVuY3Rpb24gKCkge1xyXG4gIC8vIFJldHVybnMgZXBvY2ggdGltZS5cclxuICByZXR1cm4gRGF0ZS5ub3coKVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyICgpIHtcclxuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmXHJcbiAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XHJcbiAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUuYmluZChwcm9jZXNzLnN0ZG91dClcclxuICB9XHJcbiAgcmV0dXJuIGNvbnNvbGUubG9nXHJcbn1cclxuIiwiY29uc3QgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKVxyXG5cclxuLy8gU3ltYm9scyBmb3IgZnVuY3Rpb25zIGFuZCB2YWx1ZXNcclxuY29uc3QgX1NwbGl0T3B0aW9ucyA9IFN5bWJvbCgnU3BsaXRPcHRpb25zJylcclxuY29uc3QgX09wdGlvbnMgPSBTeW1ib2woJ09wdGlvbnMnKVxyXG5jb25zdCBfVG9wU25pcCA9IFN5bWJvbCgnVG9wU25pcCcpXHJcbmNvbnN0IF9Ub3BWYWx1ZXMgPSBTeW1ib2woJ1RvcFZhbHVlcycpXHJcbmNvbnN0IF9Ub3BJc1ByaW1pdGl2ZSA9IFN5bWJvbCgnVG9wSXNQcmltaXRpdmUnKVxyXG5jb25zdCBfSGVhZGVyU3RyaW5ncyA9IFN5bWJvbCgnSGVhZGVyU3RyaW5ncycpXHJcbmNvbnN0IF9IZWFkZXJWYWx1ZXMgPSBTeW1ib2woJ0hlYWRlclZhbHVlcycpXHJcbmNvbnN0IF9TZXRMZXZlbEhlYWRlciA9IFN5bWJvbCgnU2V0TGV2ZWxIZWFkZXInKVxyXG5jb25zdCBfU2V0TGV2ZWxGdW5jdGlvbiA9IFN5bWJvbCgnU2V0TGV2ZWxGdW5jdGlvbicpXHJcblxyXG4vKlxyXG5Db2RlIFN1bW1hcnk6XHJcbkZvbGxvd2luZyBhcmUgcG9pbnRzIG9mIGludGVyZXN0IGFyb3VuZCB0aGUgcGVyaiBjb2RlIGNob2ljZXMuXHJcbi0gU3ltYm9scyB1c2VkIHRvIGhpZGUgaW50ZXJuYWwgcHJvcGVydGllcyBhbmQgbWV0aG9kcy5cclxuLSBNdWx0aXBsZSBTeW1ib2xzIGR1ZSB0byBtYWpvciBwZXJmb3JtYW5jZSBoaXQgaWYgdXNpbmcgbmVzdGVkLlxyXG4tIERlZXBseSBuZXN0ZWQgJ2lmJyBhbmQgJ2Zvcicgc3RhdGVtZW50cyBkdWUgdG8gcGVyZm9ybWFuY2UgYmVuaWZpdHMuXHJcbi0gU29tZSBtaW5vciBkdXBsaWNhdGlvbiBkdWUgdG8gcGVyZm9ybWFuY2UgYmVuaWZpdHMuXHJcblxyXG5TeW1ib2wgU3VtbWFyeTpcclxuX1NwbGl0T3B0aW9uczogPEZ1bmN0aW9uPlxyXG4gIFVzZWQgdG8gc3BsaXQgdGhlIHVzZXIgb3B0aW9ucyBmcm9tIHRvcCBsZXZlbCBwcm9wZXJ0aWVzLlxyXG4gIEhlbHBzIHRvIGFic3RyYWN0IHRoZSBzcGxpdCBmdW5jdGlvbiBvdXQgb2YgdGhlIGNvbnN0cnVjdG9yLlxyXG5cclxuX09wdGlvbnM6IDxPYmplY3Q+XHJcbiAgVGhpcyBob2xkcyBhbiBPYmplY3Qgd2l0aCB0aGUgZGVmYXVsdCBvciBjdXN0b20gb3B0aW9ucy5cclxuXHJcbl9Ub3BTbmlwOiA8U3RyaW5nPlxyXG4gIFRoaXMgaG9sZHMgYSBKU09OIHNuaXBwZXQgb2YgdGhlIHVzZXIgc3VwcGxpZWQgdG9wIGxldmVsIHByb3BlcnRpZXMuXHJcblxyXG5fVG9wVmFsdWVzOiA8T2JqZWN0PlxyXG4gIFRoaXMgaG9sZHMgdGhlIHVzZXIgc3VwcGxpZWQgdG9wIGxldmVsIHByb3Blcmllcy5cclxuICBJdCBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBfVG9wU25pcCBzdHJpbmcgYW5kIHdoZW5cclxuICAncGFzc1Rocm91Z2gnIGlzIGVuYWJsZWQuXHJcblxyXG5fVG9wSXNQcmltaXRpdmU6IDxCb29sZWFuPlxyXG4gIE9iamVjdC5hc3NpZ24gaXMgYSByZWFsIHBpZyB0byB3b3JrIHdpdGggaW4gYSBoaWdoXHJcbiAgcGVyZm9ybWFuY2UgcHJvamVjdC4gVG8gYXZvaWQgdXNpbmcgT2JqZWN0LmFzc2lnbiwgdGhpcyBmbGFnXHJcbiAgaXMgdXNlZCB0byBpbmRpY2F0ZSBpZiB0aGUgdXNlciBoYXMgYXNzaWduZWQgYSB0b3AgbGV2ZWwgcHJvcGVydHlcclxuICB3aXRoIHZhbHVlcyB0aGF0IGFyZSBvbmx5IHByaW1pdGl2ZXMgKHN0cmluZywgbnVtYmVyLCBib29sZWFuKS5cclxuICBJZiB0aGUgdXNlciBhc3NpZ25lZCB2YWx1ZXMgYXJlIGFsbCBwcmltaXRpdmUsIGEgc2ltcGxlICdmb3InIGxvb3BcclxuICBpcyBmYXN0ZXIgdG8gZHVwbGljYXRlIGFuIG9iamVjdCB0aGFuIHVzaW5nIE9iamVjdC5hc3NpZ24uXHJcbiAgVGhpcyBmbGFnIGlzIGFsc28gc2V0IHRvIGZhbHNlIGlmIHRoZSB1c2VyIHN1cHBsaWVzIGEgY3VzdG9tXHJcbiAgc3RyaW5naWZ5IGZ1bmN0aW9uLlxyXG5cclxuX0hlYWRlclN0cmluZ3M6IDxPYmplY3Q+XHJcbiAgVGhlIGhlYWRlciBmb3IgZWFjaCBsb2cgbGV2ZWwgaXMgdGhlIHNhbWUgc3VjaCBhczpcclxuICB7XCJsZXZlbFwiOlwiZXJyb3JcIixcImx2bFwiOjUwLFwidGltZVwiOjE1MjU2NDMyOTE3MTZcclxuICBUaGlzIGNhY2hlcyB0aGUgbGV2ZWwgaGVhZGVycy5cclxuXHJcbl9IZWFkZXJWYWx1ZXM6IDxPYmplY3Q+XHJcbiAgT25seSB1c2VkIHdoZW4gJ3Bhc3NUaHJvdWdoJyBpcyBlbmFibGVkLlxyXG4gIFBlcm1pdHMgcmVidWlsZGluZyB0aGUgSlNPTiBvYmplY3QgZm9yIG91dHB1dC5cclxuXHJcbl9TZXRMZXZlbEhlYWRlcjogPEZ1bmN0aW9uPlxyXG4gIEhvbGRzIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGJ1aWxkIHRoZSBsZXZlbCBoZWFkZXIuXHJcblxyXG5fU2V0TGV2ZWxGdW5jdGlvbjogPEZ1bmN0aW9uPlxyXG4gIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBnZW5lcmF0ZSB0aGUgbGV2ZWwgZnVuY3Rpb25zLlxyXG4qL1xyXG5cclxuY2xhc3MgUGVyaiB7XHJcbiAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zICE9IG51bGwgJiYgb3B0aW9ucy5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignUHJvdmlkZSBvcHRpb25zIG9iamVjdCB0byBjcmVhdGUgYSBsb2dnZXIuJylcclxuICAgIH1cclxuICAgIHRoaXNbX09wdGlvbnNdID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMpXHJcbiAgICB0aGlzW19Ub3BTbmlwXSA9ICcnXHJcbiAgICB0aGlzW19Ub3BWYWx1ZXNdID0ge31cclxuICAgIHRoaXNbX1RvcElzUHJpbWl0aXZlXSA9IHRydWVcclxuICAgIHRoaXNbX1NwbGl0T3B0aW9uc10ob3B0aW9ucylcclxuICAgIHRoaXNbX0hlYWRlclN0cmluZ3NdID0ge31cclxuICAgIHRoaXNbX0hlYWRlclZhbHVlc10gPSB7fVxyXG4gICAgZm9yIChjb25zdCBsZXZlbCBpbiB0aGlzW19PcHRpb25zXS5sZXZlbHMpIHtcclxuICAgICAgdGhpc1tfU2V0TGV2ZWxIZWFkZXJdKGxldmVsKVxyXG4gICAgICB0aGlzW19TZXRMZXZlbEZ1bmN0aW9uXShsZXZlbClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBsZXZlbCAoKSB7XHJcbiAgICByZXR1cm4gdGhpc1tfT3B0aW9uc10ubGV2ZWxcclxuICB9XHJcblxyXG4gIHNldCBsZXZlbCAobGV2ZWwpIHtcclxuICAgIGlmICghKHRoaXNbX09wdGlvbnNdLmxldmVscy5oYXNPd25Qcm9wZXJ0eShsZXZlbCkpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGxldmVsIG9wdGlvbiBtdXN0IGJlIGEgdmFsaWQga2V5IGluIHRoZSBsZXZlbHMgb2JqZWN0LicpXHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoX09wdGlvbnMpKSB7XHJcbiAgICAgIC8vIEF0dGFjaGluZyB0aGUgb3B0aW9ucyBvYmplY3QgdG8gdGhpcyBpbnN0YW5jZVxyXG4gICAgICB0aGlzW19PcHRpb25zXSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXNbX09wdGlvbnNdKVxyXG4gICAgfVxyXG4gICAgdGhpc1tfT3B0aW9uc10ubGV2ZWwgPSBsZXZlbFxyXG4gIH1cclxuXHJcbiAgZ2V0IGxldmVscyAoKSB7XHJcbiAgICByZXR1cm4gdGhpc1tfT3B0aW9uc10ubGV2ZWxzXHJcbiAgfVxyXG5cclxuICBhZGRMZXZlbCAobmV3TGV2ZWxzKSB7XHJcbiAgICBmb3IgKGNvbnN0IGxldmVsIGluIG5ld0xldmVscykge1xyXG4gICAgICBpZiAodGhpc1tsZXZlbF0pIHsgY29udGludWUgfVxyXG4gICAgICB0aGlzW19PcHRpb25zXS5sZXZlbHNbbGV2ZWxdID0gbmV3TGV2ZWxzW2xldmVsXVxyXG4gICAgICB0aGlzW19TZXRMZXZlbEhlYWRlcl0obGV2ZWwpXHJcbiAgICAgIHRoaXNbX1NldExldmVsRnVuY3Rpb25dKGxldmVsKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IHdyaXRlICgpIHtcclxuICAgIHJldHVybiB0aGlzW19PcHRpb25zXS53cml0ZVxyXG4gIH1cclxuXHJcbiAgW19TcGxpdE9wdGlvbnNdIChvcHRpb25zKSB7XHJcbiAgICBpZiAoIW9wdGlvbnMpIHsgcmV0dXJuIH1cclxuICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMpIHtcclxuICAgICAgaWYgKGRlZmF1bHRPcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBpZiAoa2V5ID09PSAnbGV2ZWwnKSB7XHJcbiAgICAgICAgICB0aGlzLmxldmVsID0gb3B0aW9uc1trZXldXHJcbiAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoa2V5ID09PSAnc3RyaW5naWZ5RnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICB0aGlzW19Ub3BJc1ByaW1pdGl2ZV0gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzW19PcHRpb25zXVtrZXldID0gb3B0aW9uc1trZXldXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBvcHRpb25zW2tleV1cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIHRoaXNbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6XCInICsgb3B0aW9uc1trZXldICsgJ1wiLCdcclxuICAgICAgICAgIHRoaXNbX1RvcFZhbHVlc11ba2V5XSA9IG9wdGlvbnNba2V5XVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICB0aGlzW19Ub3BTbmlwXSArPSAnXCInICsga2V5ICsgJ1wiOicgKyBvcHRpb25zW2tleV0gKyAnLCdcclxuICAgICAgICAgIHRoaXNbX1RvcFZhbHVlc11ba2V5XSA9IG9wdGlvbnNba2V5XVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIHRoaXNbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6bnVsbCwnXHJcbiAgICAgICAgICB0aGlzW19Ub3BWYWx1ZXNdW2tleV0gPSBudWxsXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXNbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6JyArIHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKG9wdGlvbnNba2V5XSkgKyAnLCdcclxuICAgICAgICAgIHRoaXNbX1RvcFZhbHVlc11ba2V5XSA9IG9wdGlvbnNba2V5XVxyXG4gICAgICAgICAgdGhpc1tfVG9wSXNQcmltaXRpdmVdID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIFtfU2V0TGV2ZWxIZWFkZXJdIChsZXZlbCkge1xyXG4gICAgdGhpc1tfSGVhZGVyU3RyaW5nc11bbGV2ZWxdID0gJ3snXHJcbiAgICB0aGlzW19PcHRpb25zXS5sZXZlbEtleUVuYWJsZWQgJiYgKHRoaXNbX0hlYWRlclN0cmluZ3NdW2xldmVsXSArPSAnXCInICsgdGhpc1tfT3B0aW9uc10ubGV2ZWxLZXkgKyAnXCI6XCInICsgbGV2ZWwgKyAnXCIsJylcclxuICAgIHRoaXNbX09wdGlvbnNdLmxldmVsTnVtYmVyS2V5RW5hYmxlZCAmJiAodGhpc1tfSGVhZGVyU3RyaW5nc11bbGV2ZWxdICs9ICdcIicgKyB0aGlzW19PcHRpb25zXS5sZXZlbE51bWJlcktleSArICdcIjonICsgdGhpc1tfT3B0aW9uc10ubGV2ZWxzW2xldmVsXSArICcsJylcclxuICAgIHRoaXNbX1RvcFNuaXBdICE9PSAnJyAmJiAodGhpc1tfSGVhZGVyU3RyaW5nc11bbGV2ZWxdICs9IHRoaXNbX1RvcFNuaXBdKVxyXG4gICAgdGhpc1tfSGVhZGVyU3RyaW5nc11bbGV2ZWxdICs9ICdcIicgKyB0aGlzW19PcHRpb25zXS5kYXRlVGltZUtleSArICdcIjonXHJcblxyXG4gICAgaWYgKHRoaXNbX09wdGlvbnNdLnBhc3NUaHJvdWdoKSB7XHJcbiAgICAgIGNvbnN0IGxldmVsT2JqID0ge31cclxuICAgICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxLZXlFbmFibGVkICYmIChsZXZlbE9ialt0aGlzW19PcHRpb25zXS5sZXZlbEtleV0gPSBsZXZlbClcclxuICAgICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxOdW1iZXJLZXlFbmFibGVkICYmIChsZXZlbE9ialt0aGlzW19PcHRpb25zXS5sZXZlbE51bWJlcktleV0gPSB0aGlzW19PcHRpb25zXS5sZXZlbHNbbGV2ZWxdKVxyXG4gICAgICB0aGlzW19IZWFkZXJWYWx1ZXNdW2xldmVsXSA9IE9iamVjdC5hc3NpZ24obGV2ZWxPYmosIHRoaXNbX1RvcFZhbHVlc10pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBbX1NldExldmVsRnVuY3Rpb25dIChsZXZlbCkge1xyXG4gICAgdGhpc1tsZXZlbF0gPSBmdW5jdGlvbiAoLi4uaXRlbXMpIHtcclxuICAgICAgaWYgKHRoaXNbX09wdGlvbnNdLmxldmVsc1t0aGlzW19PcHRpb25zXS5sZXZlbF0gPlxyXG4gICAgICAgIHRoaXNbX09wdGlvbnNdLmxldmVsc1tsZXZlbF0pIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBjb25zdCB0aW1lID0gdGhpc1tfT3B0aW9uc10uZGF0ZVRpbWVGdW5jdGlvbigpXHJcbiAgICAgIGxldCBtc2cgPSAnJ1xyXG4gICAgICBsZXQgZGF0YSA9IG51bGxcclxuICAgICAgbGV0IGRhdGFKc29uID0gJ251bGwnXHJcblxyXG4gICAgICBjb25zdCBzZXJpYWxpemUgPSAoaXRlbSkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpc1tfT3B0aW9uc10uc2VyaWFsaXplcnMpIHsgcmV0dXJuIGl0ZW0gfVxyXG4gICAgICAgIGlmIChpdGVtID09IG51bGwpIHsgcmV0dXJuIG51bGwgfVxyXG4gICAgICAgIGNvbnN0IGdyYWRlZCA9IHt9XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gaXRlbSkge1xyXG4gICAgICAgICAgbGV0IHZhbHVlID0gaXRlbVtrZXldXHJcbiAgICAgICAgICBpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eSAmJiBpdGVtLmhhc093blByb3BlcnR5KGtleSkgJiYgdGhpc1tfT3B0aW9uc10uc2VyaWFsaXplcnNba2V5XSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXNbX09wdGlvbnNdLnNlcmlhbGl6ZXJzW2tleV0odmFsdWUpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBncmFkZWRba2V5XSA9IHZhbHVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBncmFkZWRcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIC8vIFNpbmdsZSBpdGVtIHByb2Nlc3NpbmdcclxuICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNbMF1cclxuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGl0ZW1cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIG1zZyA9IGl0ZW1cclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgLy8gVW5kZWZpbmVkIG9yIG51bGwsIGtlZXAgZGVmYXVsdHMuXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgIGRhdGEgPSBpdGVtXHJcbiAgICAgICAgICBkYXRhSnNvbiA9ICcnICsgaXRlbVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICBtc2cgPSBpdGVtLm1lc3NhZ2VcclxuICAgICAgICAgIGRhdGEgPSB0aGlzW19PcHRpb25zXS5zZXJpYWxpemVFcnJvckZ1bmN0aW9uKGl0ZW0pXHJcbiAgICAgICAgICBkYXRhSnNvbiA9IHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKGRhdGEpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRhdGEgPSBzZXJpYWxpemUoaXRlbSlcclxuICAgICAgICAgIGRhdGFKc29uID0gdGhpc1tfT3B0aW9uc10uc3RyaW5naWZ5RnVuY3Rpb24oZGF0YSlcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIC8vIE11bHRpcGxlIGl0ZW0gcHJvY2Vzc2luZ1xyXG4gICAgICAgIGRhdGEgPSBbXVxyXG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBpdGVtXHJcbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgaWYgKG1zZykgeyBkYXRhLnB1c2goaXRlbSkgfSBlbHNlIHsgbXNnID0gaXRlbSB9XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgZGF0YS5wdXNoKG51bGwpXHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICAgIGRhdGEucHVzaCh0aGlzW19PcHRpb25zXS5zZXJpYWxpemVFcnJvckZ1bmN0aW9uKGl0ZW0pKVxyXG4gICAgICAgICAgICBpZiAoIW1zZykgeyBtc2cgPSBpdGVtLm1lc3NhZ2UgfVxyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRhdGEucHVzaChzZXJpYWxpemUoaXRlbSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgIGRhdGEgPSBkYXRhWzBdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGFKc29uID0gdGhpc1tfT3B0aW9uc10uc3RyaW5naWZ5RnVuY3Rpb24oZGF0YSlcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QganNvbiA9IHRoaXNbX0hlYWRlclN0cmluZ3NdW2xldmVsXSArIHRpbWUgK1xyXG4gICAgICAgICAgJyxcIicgKyB0aGlzW19PcHRpb25zXS5tZXNzYWdlS2V5ICsgJ1wiOlwiJyArIG1zZyArXHJcbiAgICAgICAgICAnXCIsXCInICsgdGhpc1tfT3B0aW9uc10uZGF0YUtleSArICdcIjonICsgZGF0YUpzb24gKyAnfVxcbidcclxuXHJcbiAgICAgIGlmICh0aGlzW19PcHRpb25zXS5wYXNzVGhyb3VnaCkge1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IE9iamVjdC5hc3NpZ24odGhpc1tfSGVhZGVyVmFsdWVzXVtsZXZlbF0sIHtcclxuICAgICAgICAgIFt0aGlzW19PcHRpb25zXS5kYXRlVGltZUtleV06IHRpbWUsXHJcbiAgICAgICAgICBbdGhpc1tfT3B0aW9uc10ubWVzc2FnZUtleV06IG1zZyxcclxuICAgICAgICAgIFt0aGlzW19PcHRpb25zXS5kYXRhS2V5XTogZGF0YVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpc1tfT3B0aW9uc10ud3JpdGUoanNvbiwgb2JqKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXNbX09wdGlvbnNdLndyaXRlKGpzb24pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoaWxkICh0b3BzKSB7XHJcbiAgICBpZiAodG9wcyA9PSBudWxsIHx8IHRvcHMuY29uc3RydWN0b3IgIT09IE9iamVjdCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGUgdG9wIGxldmVsIGFyZ3VtZW50cyBvYmplY3QgdG8gY3JlYXRlIGEgY2hpbGQgbG9nZ2VyLicpXHJcbiAgICB9XHJcbiAgICBjb25zdCBuZXdDaGlsZCA9IE9iamVjdC5jcmVhdGUodGhpcylcclxuICAgIGlmICh0aGlzW19Ub3BJc1ByaW1pdGl2ZV0pIHtcclxuICAgICAgLy8gQXZvaWRpbmcgT2JqZWN0LmFzc2lnbiB3aGljaCBpcyBub3QgbmVlZGVkXHJcbiAgICAgIG5ld0NoaWxkW19Ub3BWYWx1ZXNdID0ge31cclxuICAgICAgbmV3Q2hpbGRbX1RvcElzUHJpbWl0aXZlXSA9IHRydWVcclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpc1tfVG9wVmFsdWVzXSkge1xyXG4gICAgICAgIG5ld0NoaWxkW19Ub3BWYWx1ZXNdW2tleV0gPSB0aGlzW19Ub3BWYWx1ZXNdW2tleV1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gVG9wIHZhbHVlIGlzIGFuIG9iamVjdC4gVGFrZSB0aGUgT2JqZWN0LmFzc2lnbiBoaXQgbGlrZSBhIG1hbi5cclxuICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc10gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzW19Ub3BWYWx1ZXNdKVxyXG4gICAgICBuZXdDaGlsZFtfVG9wSXNQcmltaXRpdmVdID0gZmFsc2VcclxuICAgIH1cclxuICAgIGZvciAoY29uc3Qga2V5IGluIHRvcHMpIHtcclxuICAgICAgLy8gT3B0aW9ucyBhbmQga2V5IG5hbWVzIGFyZSBub3QgdmFsaWQsIHNraXBwaW5nLlxyXG4gICAgICBpZiAoZGVmYXVsdE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSB8fFxyXG4gICAgICAgICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxLZXkgPT09IGtleSB8fFxyXG4gICAgICAgICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxOdW1iZXJLZXkgPT09IGtleSB8fFxyXG4gICAgICAgICAgdGhpc1tfT3B0aW9uc10uZGF0ZVRpbWVLZXkgPT09IGtleSB8fFxyXG4gICAgICAgICAgdGhpc1tfT3B0aW9uc10ubWVzc2FnZUtleSA9PT0ga2V5IHx8XHJcbiAgICAgICAgICB0aGlzW19PcHRpb25zXS5kYXRhS2V5ID09PSBrZXkpIHsgY29udGludWUgfVxyXG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIHRvcHNba2V5XVxyXG4gICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgIHRoaXNbX1RvcFZhbHVlc10uaGFzT3duUHJvcGVydHkoa2V5KSAmJlxyXG4gICAgICAgICAgdHlwZW9mIHRoaXNbX1RvcFZhbHVlc11ba2V5XSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAvLyBOZXcgdG9wIGtleSBpcyB0aGUgc2FtZSBhcyBwYXJlbnQgYW5kIGlzIGEgc3RyaW5nLiBBcHBlbmRpbmcgc2VwYXJhdG9yIHN0cmluZyBhbmQgbmV3IHZhbHVlLlxyXG4gICAgICAgIG5ld0NoaWxkW19Ub3BWYWx1ZXNdW2tleV0gPSB0aGlzW19Ub3BWYWx1ZXNdW2tleV0gKyB0aGlzW19PcHRpb25zXS5zZXBhcmF0b3JTdHJpbmcgKyB0b3BzW2tleV1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIG5ld0NoaWxkW19Ub3BWYWx1ZXNdW2tleV0gPSBudWxsXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XSA9IHRvcHNba2V5XVxyXG4gICAgICAgIC8vIE5vdCB1c2luZyAmJiBzbyB3ZSBjYW4gZXhpdCBlYXJseVxyXG4gICAgICAgIGlmICghKHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8IHR5cGUgPT09ICdib29sZWFuJykpIHtcclxuICAgICAgICAgIHRoaXNbX1RvcElzUHJpbWl0aXZlXSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXdDaGlsZFtfVG9wU25pcF0gPSAnJ1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gbmV3Q2hpbGRbX1RvcFZhbHVlc10pIHtcclxuICAgICAgaWYgKG5ld0NoaWxkW19Ub3BJc1ByaW1pdGl2ZV0pIHtcclxuICAgICAgICAvLyBQcml2aXRpdmUgSlNPTi5zdHJpbmdpZnkuIENoZWFwLlxyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XVxyXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgbmV3Q2hpbGRbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6XCInICsgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XSArICdcIiwnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld0NoaWxkW19Ub3BTbmlwXSArPSAnXCInICsga2V5ICsgJ1wiOicgKyBuZXdDaGlsZFtfVG9wVmFsdWVzXVtrZXldICsgJywnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRpbnVlXHJcbiAgICAgIH1cclxuICAgICAgbmV3Q2hpbGRbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6JyArICh0aGlzW19PcHRpb25zXS5zdHJpbmdpZnlGdW5jdGlvbihuZXdDaGlsZFtfVG9wVmFsdWVzXVtrZXldKSkgKyAnLCdcclxuICAgIH1cclxuICAgIG5ld0NoaWxkLnBhcmVudCA9IHRoaXNcclxuICAgIG5ld0NoaWxkW19IZWFkZXJTdHJpbmdzXSA9IHt9XHJcbiAgICBuZXdDaGlsZFtfSGVhZGVyVmFsdWVzXSA9IHt9XHJcbiAgICBmb3IgKGNvbnN0IGxldmVsIGluIHRoaXNbX09wdGlvbnNdLmxldmVscykge1xyXG4gICAgICBuZXdDaGlsZFtfU2V0TGV2ZWxIZWFkZXJdKGxldmVsKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld0NoaWxkXHJcbiAgfVxyXG5cclxuICBzdHJpbmdpZnkgKG9iaiwgcmVwbGFjZXIsIHNwYWNlcikge1xyXG4gICAgcmV0dXJuIHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKG9iaiwgcmVwbGFjZXIsIHNwYWNlcilcclxuICB9XHJcblxyXG4gIGpzb24gKGRhdGEpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKGRhdGEsIG51bGwsIDIpKVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQZXJqXHJcbiIsIm1vZHVsZS5leHBvcnRzID0gc2VyaWFsaXplRXJyb3JcclxuXHJcbmZ1bmN0aW9uIHNlcmlhbGl6ZUVycm9yIChvYmopIHtcclxuICBpZiAob2JqID09IG51bGwpIHsgcmV0dXJuIHt9IH1cclxuXHJcbiAgY29uc3Qgc2VlbiA9IG5ldyBXZWFrU2V0KFtvYmpdKVxyXG4gIGxldCB0cmVlID0gbnVsbFxyXG4gIGxldCBjdXJyZW50Tm9kZSA9IHt9XHJcblxyXG4gIGZvciAoO29iaiAhPSBudWxsOyBvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkge1xyXG4gICAgY29uc3QgY29uc3RydWN0b3IgPSBvYmouY29uc3RydWN0b3IubmFtZSB8fCAnJ1xyXG4gICAgY29uc3QgbmFtZSA9IG9iai5uYW1lIHx8ICcnXHJcbiAgICBjb25zdCBub2RlID0geyBjb25zdHJ1Y3RvciwgbmFtZSB9XHJcbiAgICBjb25zdCBub2RlTmFtZSA9IG5vZGUuY29uc3RydWN0b3IgfHwgbm9kZS5uYW1lIHx8ICgobmV3IERhdGUoKSkuZ2V0VGltZSgpLnRvU3RyaW5nKCkpXHJcbiAgICBjb25zdCBwcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wTmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBvYmpbcHJvcE5hbWVzW2ldXVxyXG4gICAgICBjb25zdCB0eXBlID0gdHlwZUNoZWNrKHZhbHVlKVxyXG4gICAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBpZiAoc2Vlbi5oYXModmFsdWUpKSB7XHJcbiAgICAgICAgICBub2RlW3Byb3BOYW1lc1tpXV0gPSAnW0NpcmN1bGFyXSdcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2Vlbi5hZGQodmFsdWUpXHJcbiAgICAgICAgICBub2RlW3Byb3BOYW1lc1tpXV0gPSBzZXJpYWxpemVFcnJvcih2YWx1ZSlcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZSkge1xyXG4gICAgICAgIG5vZGVbcHJvcE5hbWVzW2ldXSA9IHZhbHVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0cmVlID0gdHJlZSB8fCBub2RlXHJcbiAgICBjdXJyZW50Tm9kZVtub2RlTmFtZV0gPSBub2RlXHJcbiAgICBjdXJyZW50Tm9kZSA9IG5vZGVcclxuICB9XHJcblxyXG4gIHJldHVybiB0cmVlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHR5cGVDaGVjayAodmFsdWUpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZVxyXG4gICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnIHx8XHJcbiAgICAgICAgdHlwZSA9PT0gJ251bWJlcicgfHxcclxuICAgICAgICB0eXBlID09PSAnYm9vbGVhbicgfHxcclxuICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKSB8fFxyXG4gICAgICAgIHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgcmV0dXJuICdvYmplY3QnXHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyKSB7IH1cclxuXHJcbiAgcmV0dXJuIGZhbHNlXHJcbn1cclxuIiwiLypcclxuXHJcbkZvbGxvd2luZyBjb2RlIGlzIGZyb20gdGhlIGZhc3Qtc2FmZS1zdHJpbmdpZnkgcGFja2FnZS5cclxuaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZmFzdC1zYWZlLXN0cmluZ2lmeVxyXG5cclxuU2VlIHRoZSBMSUNFTlNFIGZpbGUgZm9yIGxpY2Vuc2UgZGV0YWlscy5cclxuXHJcbiovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeVxyXG5cclxuY29uc3QgYXJyID0gW11cclxuXHJcbi8vIFJlZ3VsYXIgc3RyaW5naWZ5XHJcbmZ1bmN0aW9uIHN0cmluZ2lmeSAob2JqLCByZXBsYWNlciwgc3BhY2VyKSB7XHJcbiAgZGVjaXJjKG9iaiwgJycsIFtdLCB1bmRlZmluZWQpXHJcbiAgY29uc3QgcmVzID0gSlNPTi5zdHJpbmdpZnkob2JqLCByZXBsYWNlciwgc3BhY2VyKVxyXG4gIHdoaWxlIChhcnIubGVuZ3RoICE9PSAwKSB7XHJcbiAgICBjb25zdCBwYXJ0ID0gYXJyLnBvcCgpXHJcbiAgICBwYXJ0WzBdW3BhcnRbMV1dID0gcGFydFsyXVxyXG4gIH1cclxuICByZXR1cm4gcmVzXHJcbn1cclxuZnVuY3Rpb24gZGVjaXJjICh2YWwsIGssIHN0YWNrLCBwYXJlbnQpIHtcclxuICBsZXQgaVxyXG4gIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwpIHtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoc3RhY2tbaV0gPT09IHZhbCkge1xyXG4gICAgICAgIHBhcmVudFtrXSA9ICdbQ2lyY3VsYXJdJ1xyXG4gICAgICAgIGFyci5wdXNoKFtwYXJlbnQsIGssIHZhbF0pXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YWNrLnB1c2godmFsKVxyXG4gICAgLy8gT3B0aW1pemUgZm9yIEFycmF5cy4gQmlnIGFycmF5cyBjb3VsZCBraWxsIHRoZSBwZXJmb3JtYW5jZSBvdGhlcndpc2UhXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBkZWNpcmModmFsW2ldLCBpLCBzdGFjaywgdmFsKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsKVxyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGtleXNbaV1cclxuICAgICAgICBkZWNpcmModmFsW2tleV0sIGtleSwgc3RhY2ssIHZhbClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhY2sucG9wKClcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==