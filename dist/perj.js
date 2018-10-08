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

/***/ "./src/notation-copy.js":
/*!******************************!*\
  !*** ./src/notation-copy.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = notationCopy

function notationCopy (target, ...sources) {
  let convertBuffer = false
  if (typeof Buffer !== 'undefined') { convertBuffer = true }
  const maxCalls = 2000
  let calls
  const seen = new WeakSet()
  for (const source of sources) {
    calls = 0
    notationCopyRecursive(target, source)
    if (calls > maxCalls) {
      console.warn(`[Perj] Maximum of ${maxCalls} recursive calls has been reached.`)
    }
  }
  return target

  function notationCopyRecursive (tgt, src) {
    if (calls++ > maxCalls) { return }
    if (src == null) { return src }
    const type = typeof src
    if (type === 'string' ||
        type === 'number' ||
        type === 'boolean') {
      return src
    }

    if (type === 'object') {
      if (seen.has(src)) { return '[Circular]' }
      seen.add(src)

      if (Array.isArray(src)) {
        const newArray = []
        for (let i = 0; i < src.length; i++) {
          newArray[i] = notationCopyRecursive({}, src[i])
        }
        return newArray
      }

      if (src instanceof Date) {
        return src
      }

      if (src instanceof Error) {
        for (const name of Reflect.ownKeys(src)) {
          const result = notationCopyRecursive({}, src[name])
          if (result !== undefined) { tgt[name] = result }
        }
        if (tgt.message === undefined) {
          tgt.message = 'The application has encountered an unknown error.'
        }
        if (tgt.name === undefined) { tgt.name = 'Error' }
        return tgt
      }

      if (convertBuffer && src instanceof Buffer) {
        const maxBytes = 50 // Same max value as buffer.INSPECT_MAX_BYTES
        const result = { type: 'Buffer' }
        result.hex = src.toString('hex', 0, maxBytes)
        result.utf8 = src.toString('utf8', 0, maxBytes)
        result.base64 = src.toString('base64', 0, maxBytes)
        if (src.length > maxBytes) {
          const suffix = '...'
          result.hex += suffix
          result.utf8 += suffix
          result.base64 += suffix
        }
        return result
      }

      for (const name in src) {
        const result = notationCopyRecursive({}, src[name])
        if (result !== undefined) { tgt[name] = result }
      }
      return tgt
    }

    return undefined
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module './../node_modules/buffer/index.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Buffer))

/***/ }),

/***/ "./src/options.js":
/*!************************!*\
  !*** ./src/options.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const notationCopy = __webpack_require__(/*! ./notation-copy */ "./src/notation-copy.js")

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
  serializeErrorFunction,
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

function stringifyFunction (obj, replacer, spacer) {
  if (obj == null) { return null }
  const type = typeof obj
  if (type === 'string') {
    return JSON.stringify(obj, replacer, spacer)
  }
  if (type === 'number' ||
      type === 'boolean') {
    return obj
  }
  if (Array.isArray(obj)) {
    let objJson = '['
    const last = obj.length - 1
    for (let i = 0; i < obj.length; i++) {
      objJson += stringifyFunction(obj[i])
      if (i < last) { objJson += ',' }
    }
    return objJson + ']'
  }
  return JSON.stringify(notationCopy({}, obj), replacer, spacer)
}

function serializeErrorFunction (value) {
  return notationCopy({}, value)
}


/***/ }),

/***/ "./src/perj.js":
/*!*********************!*\
  !*** ./src/perj.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const defaultOptions = __webpack_require__(/*! ./options */ "./src/options.js")
const notationCopy = __webpack_require__(/*! ./notation-copy */ "./src/notation-copy.js")

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
  Object copy is a real pig to work with in a high
  performance project. To avoid copying objects, this flag
  is used to indicate if the user has assigned a top level property
  with values that are only simple primitives (string, number, boolean).
  If the user assigned values are all simple primitives, a 'for' loop
  is faster to duplicate an object.
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
      this[_HeaderValues][level] = notationCopy(levelObj, this[_TopValues])
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
      let isError = false

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
        } else if (item == null || type === 'function') {
          // Undefined or null, keep defaults.
        } else if (type === 'number' || type === 'boolean') {
          data = item
          dataJson = '' + item
        } else if (item instanceof Error) {
          isError = true
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
          if (item == null || type === 'function') {
            data.push(null)
            continue
          }
          if (item instanceof Error) {
            isError = true
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

      let json = this[_HeaderStrings][level] + time +
          ',"' + this[_Options].messageKey + '":"' + msg +
          '","' + this[_Options].dataKey + '":' + dataJson
      if (isError) { json += ',"error":true' }
      json += '}\n'

      if (this[_Options].passThrough) {
        const obj = notationCopy({}, this[_HeaderValues][level], {
          [this[_Options].dateTimeKey]: time,
          [this[_Options].messageKey]: msg,
          [this[_Options].dataKey]: data
        })
        if (isError) { obj.error = true }
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
      // Top value is an object. Take the object copy hit like a man.
      newChild[_TopValues] = notationCopy({}, this[_TopValues])
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


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QZXJqL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9QZXJqL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1BlcmovLi9zcmMvbm90YXRpb24tY29weS5qcyIsIndlYnBhY2s6Ly9QZXJqLy4vc3JjL29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vUGVyai8uL3NyYy9wZXJqLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxTQUFTO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QjtBQUM3QixzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsZ0JBQWdCO0FBQ3ZDLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDO0FBQy9DLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL0VBLHFCQUFxQixtQkFBTyxDQUFDLCtDQUFpQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsT0FBTztBQUNwQixxQ0FBcUMsT0FBTztBQUM1QyxXQUFXLE9BQU8sbUJBQW1CLE9BQU87QUFDNUM7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2Qzs7QUFFQTtBQUNBLHdCQUF3QjtBQUN4Qjs7Ozs7Ozs7Ozs7O0FDakVBLHVCQUF1QixtQkFBTyxDQUFDLG1DQUFXO0FBQzFDLHFCQUFxQixtQkFBTyxDQUFDLCtDQUFpQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixrQkFBa0IsT0FBTztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLGdCQUFnQjs7QUFFaEI7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULHNCQUFzQjtBQUN0QjtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6InBlcmouanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJQZXJqXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlBlcmpcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGVyai5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gbm90YXRpb25Db3B5XHJcblxyXG5mdW5jdGlvbiBub3RhdGlvbkNvcHkgKHRhcmdldCwgLi4uc291cmNlcykge1xyXG4gIGxldCBjb252ZXJ0QnVmZmVyID0gZmFsc2VcclxuICBpZiAodHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpIHsgY29udmVydEJ1ZmZlciA9IHRydWUgfVxyXG4gIGNvbnN0IG1heENhbGxzID0gMjAwMFxyXG4gIGxldCBjYWxsc1xyXG4gIGNvbnN0IHNlZW4gPSBuZXcgV2Vha1NldCgpXHJcbiAgZm9yIChjb25zdCBzb3VyY2Ugb2Ygc291cmNlcykge1xyXG4gICAgY2FsbHMgPSAwXHJcbiAgICBub3RhdGlvbkNvcHlSZWN1cnNpdmUodGFyZ2V0LCBzb3VyY2UpXHJcbiAgICBpZiAoY2FsbHMgPiBtYXhDYWxscykge1xyXG4gICAgICBjb25zb2xlLndhcm4oYFtQZXJqXSBNYXhpbXVtIG9mICR7bWF4Q2FsbHN9IHJlY3Vyc2l2ZSBjYWxscyBoYXMgYmVlbiByZWFjaGVkLmApXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0YXJnZXRcclxuXHJcbiAgZnVuY3Rpb24gbm90YXRpb25Db3B5UmVjdXJzaXZlICh0Z3QsIHNyYykge1xyXG4gICAgaWYgKGNhbGxzKysgPiBtYXhDYWxscykgeyByZXR1cm4gfVxyXG4gICAgaWYgKHNyYyA9PSBudWxsKSB7IHJldHVybiBzcmMgfVxyXG4gICAgY29uc3QgdHlwZSA9IHR5cGVvZiBzcmNcclxuICAgIGlmICh0eXBlID09PSAnc3RyaW5nJyB8fFxyXG4gICAgICAgIHR5cGUgPT09ICdudW1iZXInIHx8XHJcbiAgICAgICAgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIHJldHVybiBzcmNcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHNlZW4uaGFzKHNyYykpIHsgcmV0dXJuICdbQ2lyY3VsYXJdJyB9XHJcbiAgICAgIHNlZW4uYWRkKHNyYylcclxuXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNyYykpIHtcclxuICAgICAgICBjb25zdCBuZXdBcnJheSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcmMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIG5ld0FycmF5W2ldID0gbm90YXRpb25Db3B5UmVjdXJzaXZlKHt9LCBzcmNbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdBcnJheVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc3JjIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgIHJldHVybiBzcmNcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNyYyBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIFJlZmxlY3Qub3duS2V5cyhzcmMpKSB7XHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBub3RhdGlvbkNvcHlSZWN1cnNpdmUoe30sIHNyY1tuYW1lXSlcclxuICAgICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkgeyB0Z3RbbmFtZV0gPSByZXN1bHQgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGd0Lm1lc3NhZ2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGd0Lm1lc3NhZ2UgPSAnVGhlIGFwcGxpY2F0aW9uIGhhcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGVycm9yLidcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRndC5uYW1lID09PSB1bmRlZmluZWQpIHsgdGd0Lm5hbWUgPSAnRXJyb3InIH1cclxuICAgICAgICByZXR1cm4gdGd0XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb252ZXJ0QnVmZmVyICYmIHNyYyBpbnN0YW5jZW9mIEJ1ZmZlcikge1xyXG4gICAgICAgIGNvbnN0IG1heEJ5dGVzID0gNTAgLy8gU2FtZSBtYXggdmFsdWUgYXMgYnVmZmVyLklOU1BFQ1RfTUFYX0JZVEVTXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyB0eXBlOiAnQnVmZmVyJyB9XHJcbiAgICAgICAgcmVzdWx0LmhleCA9IHNyYy50b1N0cmluZygnaGV4JywgMCwgbWF4Qnl0ZXMpXHJcbiAgICAgICAgcmVzdWx0LnV0ZjggPSBzcmMudG9TdHJpbmcoJ3V0ZjgnLCAwLCBtYXhCeXRlcylcclxuICAgICAgICByZXN1bHQuYmFzZTY0ID0gc3JjLnRvU3RyaW5nKCdiYXNlNjQnLCAwLCBtYXhCeXRlcylcclxuICAgICAgICBpZiAoc3JjLmxlbmd0aCA+IG1heEJ5dGVzKSB7XHJcbiAgICAgICAgICBjb25zdCBzdWZmaXggPSAnLi4uJ1xyXG4gICAgICAgICAgcmVzdWx0LmhleCArPSBzdWZmaXhcclxuICAgICAgICAgIHJlc3VsdC51dGY4ICs9IHN1ZmZpeFxyXG4gICAgICAgICAgcmVzdWx0LmJhc2U2NCArPSBzdWZmaXhcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gc3JjKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbm90YXRpb25Db3B5UmVjdXJzaXZlKHt9LCBzcmNbbmFtZV0pXHJcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7IHRndFtuYW1lXSA9IHJlc3VsdCB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRndFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1bmRlZmluZWRcclxuICB9XHJcbn1cclxuIiwiY29uc3Qgbm90YXRpb25Db3B5ID0gcmVxdWlyZSgnLi9ub3RhdGlvbi1jb3B5JylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGxldmVsczoge1xyXG4gICAgZmF0YWw6IDYwLFxyXG4gICAgZXJyb3I6IDUwLFxyXG4gICAgd2FybjogNDAsXHJcbiAgICBpbmZvOiAzMCxcclxuICAgIGRlYnVnOiAyMCxcclxuICAgIHRyYWNlOiAxMFxyXG4gIH0sXHJcbiAgbGV2ZWw6ICdpbmZvJyxcclxuICBsZXZlbEtleTogJ2xldmVsJyxcclxuICBsZXZlbEtleUVuYWJsZWQ6IHRydWUsXHJcbiAgbGV2ZWxOdW1iZXJLZXk6ICdsdmwnLFxyXG4gIGxldmVsTnVtYmVyS2V5RW5hYmxlZDogdHJ1ZSxcclxuICBkYXRlVGltZUtleTogJ3RpbWUnLFxyXG4gIGRhdGVUaW1lRnVuY3Rpb24sXHJcbiAgbWVzc2FnZUtleTogJ21zZycsXHJcbiAgZGF0YUtleTogJ2RhdGEnLFxyXG4gIHNlcGFyYXRvclN0cmluZzogJzonLFxyXG4gIHNlcmlhbGl6ZXJzOiBmYWxzZSxcclxuICBzZXJpYWxpemVFcnJvckZ1bmN0aW9uLFxyXG4gIHN0cmluZ2lmeUZ1bmN0aW9uLFxyXG4gIHBhc3NUaHJvdWdoOiBmYWxzZSxcclxuICB3cml0ZTogZGVmYXVsdFdyaXRlcigpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRhdGVUaW1lRnVuY3Rpb24gKCkge1xyXG4gIC8vIFJldHVybnMgZXBvY2ggdGltZS5cclxuICByZXR1cm4gRGF0ZS5ub3coKVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyICgpIHtcclxuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmXHJcbiAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XHJcbiAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUuYmluZChwcm9jZXNzLnN0ZG91dClcclxuICB9XHJcbiAgcmV0dXJuIGNvbnNvbGUubG9nXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0cmluZ2lmeUZ1bmN0aW9uIChvYmosIHJlcGxhY2VyLCBzcGFjZXIpIHtcclxuICBpZiAob2JqID09IG51bGwpIHsgcmV0dXJuIG51bGwgfVxyXG4gIGNvbnN0IHR5cGUgPSB0eXBlb2Ygb2JqXHJcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCByZXBsYWNlciwgc3BhY2VyKVxyXG4gIH1cclxuICBpZiAodHlwZSA9PT0gJ251bWJlcicgfHxcclxuICAgICAgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICByZXR1cm4gb2JqXHJcbiAgfVxyXG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgIGxldCBvYmpKc29uID0gJ1snXHJcbiAgICBjb25zdCBsYXN0ID0gb2JqLmxlbmd0aCAtIDFcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG9iakpzb24gKz0gc3RyaW5naWZ5RnVuY3Rpb24ob2JqW2ldKVxyXG4gICAgICBpZiAoaSA8IGxhc3QpIHsgb2JqSnNvbiArPSAnLCcgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iakpzb24gKyAnXSdcclxuICB9XHJcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG5vdGF0aW9uQ29weSh7fSwgb2JqKSwgcmVwbGFjZXIsIHNwYWNlcilcclxufVxyXG5cclxuZnVuY3Rpb24gc2VyaWFsaXplRXJyb3JGdW5jdGlvbiAodmFsdWUpIHtcclxuICByZXR1cm4gbm90YXRpb25Db3B5KHt9LCB2YWx1ZSlcclxufVxyXG4iLCJjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpXHJcbmNvbnN0IG5vdGF0aW9uQ29weSA9IHJlcXVpcmUoJy4vbm90YXRpb24tY29weScpXHJcblxyXG4vLyBTeW1ib2xzIGZvciBmdW5jdGlvbnMgYW5kIHZhbHVlc1xyXG5jb25zdCBfU3BsaXRPcHRpb25zID0gU3ltYm9sKCdTcGxpdE9wdGlvbnMnKVxyXG5jb25zdCBfT3B0aW9ucyA9IFN5bWJvbCgnT3B0aW9ucycpXHJcbmNvbnN0IF9Ub3BTbmlwID0gU3ltYm9sKCdUb3BTbmlwJylcclxuY29uc3QgX1RvcFZhbHVlcyA9IFN5bWJvbCgnVG9wVmFsdWVzJylcclxuY29uc3QgX1RvcElzUHJpbWl0aXZlID0gU3ltYm9sKCdUb3BJc1ByaW1pdGl2ZScpXHJcbmNvbnN0IF9IZWFkZXJTdHJpbmdzID0gU3ltYm9sKCdIZWFkZXJTdHJpbmdzJylcclxuY29uc3QgX0hlYWRlclZhbHVlcyA9IFN5bWJvbCgnSGVhZGVyVmFsdWVzJylcclxuY29uc3QgX1NldExldmVsSGVhZGVyID0gU3ltYm9sKCdTZXRMZXZlbEhlYWRlcicpXHJcbmNvbnN0IF9TZXRMZXZlbEZ1bmN0aW9uID0gU3ltYm9sKCdTZXRMZXZlbEZ1bmN0aW9uJylcclxuXHJcbi8qXHJcbkNvZGUgU3VtbWFyeTpcclxuRm9sbG93aW5nIGFyZSBwb2ludHMgb2YgaW50ZXJlc3QgYXJvdW5kIHRoZSBwZXJqIGNvZGUgY2hvaWNlcy5cclxuLSBTeW1ib2xzIHVzZWQgdG8gaGlkZSBpbnRlcm5hbCBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzLlxyXG4tIE11bHRpcGxlIFN5bWJvbHMgZHVlIHRvIG1ham9yIHBlcmZvcm1hbmNlIGhpdCBpZiB1c2luZyBuZXN0ZWQuXHJcbi0gRGVlcGx5IG5lc3RlZCAnaWYnIGFuZCAnZm9yJyBzdGF0ZW1lbnRzIGR1ZSB0byBwZXJmb3JtYW5jZSBiZW5pZml0cy5cclxuLSBTb21lIG1pbm9yIGR1cGxpY2F0aW9uIGR1ZSB0byBwZXJmb3JtYW5jZSBiZW5pZml0cy5cclxuXHJcblN5bWJvbCBTdW1tYXJ5OlxyXG5fU3BsaXRPcHRpb25zOiA8RnVuY3Rpb24+XHJcbiAgVXNlZCB0byBzcGxpdCB0aGUgdXNlciBvcHRpb25zIGZyb20gdG9wIGxldmVsIHByb3BlcnRpZXMuXHJcbiAgSGVscHMgdG8gYWJzdHJhY3QgdGhlIHNwbGl0IGZ1bmN0aW9uIG91dCBvZiB0aGUgY29uc3RydWN0b3IuXHJcblxyXG5fT3B0aW9uczogPE9iamVjdD5cclxuICBUaGlzIGhvbGRzIGFuIE9iamVjdCB3aXRoIHRoZSBkZWZhdWx0IG9yIGN1c3RvbSBvcHRpb25zLlxyXG5cclxuX1RvcFNuaXA6IDxTdHJpbmc+XHJcbiAgVGhpcyBob2xkcyBhIEpTT04gc25pcHBldCBvZiB0aGUgdXNlciBzdXBwbGllZCB0b3AgbGV2ZWwgcHJvcGVydGllcy5cclxuXHJcbl9Ub3BWYWx1ZXM6IDxPYmplY3Q+XHJcbiAgVGhpcyBob2xkcyB0aGUgdXNlciBzdXBwbGllZCB0b3AgbGV2ZWwgcHJvcGVyaWVzLlxyXG4gIEl0IGlzIHVzZWQgdG8gYnVpbGQgdGhlIF9Ub3BTbmlwIHN0cmluZyBhbmQgd2hlblxyXG4gICdwYXNzVGhyb3VnaCcgaXMgZW5hYmxlZC5cclxuXHJcbl9Ub3BJc1ByaW1pdGl2ZTogPEJvb2xlYW4+XHJcbiAgT2JqZWN0IGNvcHkgaXMgYSByZWFsIHBpZyB0byB3b3JrIHdpdGggaW4gYSBoaWdoXHJcbiAgcGVyZm9ybWFuY2UgcHJvamVjdC4gVG8gYXZvaWQgY29weWluZyBvYmplY3RzLCB0aGlzIGZsYWdcclxuICBpcyB1c2VkIHRvIGluZGljYXRlIGlmIHRoZSB1c2VyIGhhcyBhc3NpZ25lZCBhIHRvcCBsZXZlbCBwcm9wZXJ0eVxyXG4gIHdpdGggdmFsdWVzIHRoYXQgYXJlIG9ubHkgc2ltcGxlIHByaW1pdGl2ZXMgKHN0cmluZywgbnVtYmVyLCBib29sZWFuKS5cclxuICBJZiB0aGUgdXNlciBhc3NpZ25lZCB2YWx1ZXMgYXJlIGFsbCBzaW1wbGUgcHJpbWl0aXZlcywgYSAnZm9yJyBsb29wXHJcbiAgaXMgZmFzdGVyIHRvIGR1cGxpY2F0ZSBhbiBvYmplY3QuXHJcbiAgVGhpcyBmbGFnIGlzIGFsc28gc2V0IHRvIGZhbHNlIGlmIHRoZSB1c2VyIHN1cHBsaWVzIGEgY3VzdG9tXHJcbiAgc3RyaW5naWZ5IGZ1bmN0aW9uLlxyXG5cclxuX0hlYWRlclN0cmluZ3M6IDxPYmplY3Q+XHJcbiAgVGhlIGhlYWRlciBmb3IgZWFjaCBsb2cgbGV2ZWwgaXMgdGhlIHNhbWUgc3VjaCBhczpcclxuICB7XCJsZXZlbFwiOlwiZXJyb3JcIixcImx2bFwiOjUwLFwidGltZVwiOjE1MjU2NDMyOTE3MTZcclxuICBUaGlzIGNhY2hlcyB0aGUgbGV2ZWwgaGVhZGVycy5cclxuXHJcbl9IZWFkZXJWYWx1ZXM6IDxPYmplY3Q+XHJcbiAgT25seSB1c2VkIHdoZW4gJ3Bhc3NUaHJvdWdoJyBpcyBlbmFibGVkLlxyXG4gIFBlcm1pdHMgcmVidWlsZGluZyB0aGUgSlNPTiBvYmplY3QgZm9yIG91dHB1dC5cclxuXHJcbl9TZXRMZXZlbEhlYWRlcjogPEZ1bmN0aW9uPlxyXG4gIEhvbGRzIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGJ1aWxkIHRoZSBsZXZlbCBoZWFkZXIuXHJcblxyXG5fU2V0TGV2ZWxGdW5jdGlvbjogPEZ1bmN0aW9uPlxyXG4gIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBnZW5lcmF0ZSB0aGUgbGV2ZWwgZnVuY3Rpb25zLlxyXG4qL1xyXG5cclxuY2xhc3MgUGVyaiB7XHJcbiAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zICE9IG51bGwgJiYgb3B0aW9ucy5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignUHJvdmlkZSBvcHRpb25zIG9iamVjdCB0byBjcmVhdGUgYSBsb2dnZXIuJylcclxuICAgIH1cclxuICAgIHRoaXNbX09wdGlvbnNdID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMpXHJcbiAgICB0aGlzW19Ub3BTbmlwXSA9ICcnXHJcbiAgICB0aGlzW19Ub3BWYWx1ZXNdID0ge31cclxuICAgIHRoaXNbX1RvcElzUHJpbWl0aXZlXSA9IHRydWVcclxuICAgIHRoaXNbX1NwbGl0T3B0aW9uc10ob3B0aW9ucylcclxuICAgIHRoaXNbX0hlYWRlclN0cmluZ3NdID0ge31cclxuICAgIHRoaXNbX0hlYWRlclZhbHVlc10gPSB7fVxyXG4gICAgZm9yIChjb25zdCBsZXZlbCBpbiB0aGlzW19PcHRpb25zXS5sZXZlbHMpIHtcclxuICAgICAgdGhpc1tfU2V0TGV2ZWxIZWFkZXJdKGxldmVsKVxyXG4gICAgICB0aGlzW19TZXRMZXZlbEZ1bmN0aW9uXShsZXZlbClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBsZXZlbCAoKSB7XHJcbiAgICByZXR1cm4gdGhpc1tfT3B0aW9uc10ubGV2ZWxcclxuICB9XHJcblxyXG4gIHNldCBsZXZlbCAobGV2ZWwpIHtcclxuICAgIGlmICghKHRoaXNbX09wdGlvbnNdLmxldmVscy5oYXNPd25Qcm9wZXJ0eShsZXZlbCkpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGxldmVsIG9wdGlvbiBtdXN0IGJlIGEgdmFsaWQga2V5IGluIHRoZSBsZXZlbHMgb2JqZWN0LicpXHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoX09wdGlvbnMpKSB7XHJcbiAgICAgIC8vIEF0dGFjaGluZyB0aGUgb3B0aW9ucyBvYmplY3QgdG8gdGhpcyBpbnN0YW5jZVxyXG4gICAgICB0aGlzW19PcHRpb25zXSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXNbX09wdGlvbnNdKVxyXG4gICAgfVxyXG4gICAgdGhpc1tfT3B0aW9uc10ubGV2ZWwgPSBsZXZlbFxyXG4gIH1cclxuXHJcbiAgZ2V0IGxldmVscyAoKSB7XHJcbiAgICByZXR1cm4gdGhpc1tfT3B0aW9uc10ubGV2ZWxzXHJcbiAgfVxyXG5cclxuICBhZGRMZXZlbCAobmV3TGV2ZWxzKSB7XHJcbiAgICBmb3IgKGNvbnN0IGxldmVsIGluIG5ld0xldmVscykge1xyXG4gICAgICBpZiAodGhpc1tsZXZlbF0pIHsgY29udGludWUgfVxyXG4gICAgICB0aGlzW19PcHRpb25zXS5sZXZlbHNbbGV2ZWxdID0gbmV3TGV2ZWxzW2xldmVsXVxyXG4gICAgICB0aGlzW19TZXRMZXZlbEhlYWRlcl0obGV2ZWwpXHJcbiAgICAgIHRoaXNbX1NldExldmVsRnVuY3Rpb25dKGxldmVsKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IHdyaXRlICgpIHtcclxuICAgIHJldHVybiB0aGlzW19PcHRpb25zXS53cml0ZVxyXG4gIH1cclxuXHJcbiAgW19TcGxpdE9wdGlvbnNdIChvcHRpb25zKSB7XHJcbiAgICBpZiAoIW9wdGlvbnMpIHsgcmV0dXJuIH1cclxuICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMpIHtcclxuICAgICAgaWYgKGRlZmF1bHRPcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBpZiAoa2V5ID09PSAnbGV2ZWwnKSB7XHJcbiAgICAgICAgICB0aGlzLmxldmVsID0gb3B0aW9uc1trZXldXHJcbiAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoa2V5ID09PSAnc3RyaW5naWZ5RnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICB0aGlzW19Ub3BJc1ByaW1pdGl2ZV0gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzW19PcHRpb25zXVtrZXldID0gb3B0aW9uc1trZXldXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBvcHRpb25zW2tleV1cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIHRoaXNbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6XCInICsgb3B0aW9uc1trZXldICsgJ1wiLCdcclxuICAgICAgICAgIHRoaXNbX1RvcFZhbHVlc11ba2V5XSA9IG9wdGlvbnNba2V5XVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICB0aGlzW19Ub3BTbmlwXSArPSAnXCInICsga2V5ICsgJ1wiOicgKyBvcHRpb25zW2tleV0gKyAnLCdcclxuICAgICAgICAgIHRoaXNbX1RvcFZhbHVlc11ba2V5XSA9IG9wdGlvbnNba2V5XVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIHRoaXNbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6bnVsbCwnXHJcbiAgICAgICAgICB0aGlzW19Ub3BWYWx1ZXNdW2tleV0gPSBudWxsXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXNbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6JyArIHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKG9wdGlvbnNba2V5XSkgKyAnLCdcclxuICAgICAgICAgIHRoaXNbX1RvcFZhbHVlc11ba2V5XSA9IG9wdGlvbnNba2V5XVxyXG4gICAgICAgICAgdGhpc1tfVG9wSXNQcmltaXRpdmVdID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIFtfU2V0TGV2ZWxIZWFkZXJdIChsZXZlbCkge1xyXG4gICAgdGhpc1tfSGVhZGVyU3RyaW5nc11bbGV2ZWxdID0gJ3snXHJcbiAgICB0aGlzW19PcHRpb25zXS5sZXZlbEtleUVuYWJsZWQgJiYgKHRoaXNbX0hlYWRlclN0cmluZ3NdW2xldmVsXSArPSAnXCInICsgdGhpc1tfT3B0aW9uc10ubGV2ZWxLZXkgKyAnXCI6XCInICsgbGV2ZWwgKyAnXCIsJylcclxuICAgIHRoaXNbX09wdGlvbnNdLmxldmVsTnVtYmVyS2V5RW5hYmxlZCAmJiAodGhpc1tfSGVhZGVyU3RyaW5nc11bbGV2ZWxdICs9ICdcIicgKyB0aGlzW19PcHRpb25zXS5sZXZlbE51bWJlcktleSArICdcIjonICsgdGhpc1tfT3B0aW9uc10ubGV2ZWxzW2xldmVsXSArICcsJylcclxuICAgIHRoaXNbX1RvcFNuaXBdICE9PSAnJyAmJiAodGhpc1tfSGVhZGVyU3RyaW5nc11bbGV2ZWxdICs9IHRoaXNbX1RvcFNuaXBdKVxyXG4gICAgdGhpc1tfSGVhZGVyU3RyaW5nc11bbGV2ZWxdICs9ICdcIicgKyB0aGlzW19PcHRpb25zXS5kYXRlVGltZUtleSArICdcIjonXHJcblxyXG4gICAgaWYgKHRoaXNbX09wdGlvbnNdLnBhc3NUaHJvdWdoKSB7XHJcbiAgICAgIGNvbnN0IGxldmVsT2JqID0ge31cclxuICAgICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxLZXlFbmFibGVkICYmIChsZXZlbE9ialt0aGlzW19PcHRpb25zXS5sZXZlbEtleV0gPSBsZXZlbClcclxuICAgICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxOdW1iZXJLZXlFbmFibGVkICYmIChsZXZlbE9ialt0aGlzW19PcHRpb25zXS5sZXZlbE51bWJlcktleV0gPSB0aGlzW19PcHRpb25zXS5sZXZlbHNbbGV2ZWxdKVxyXG4gICAgICB0aGlzW19IZWFkZXJWYWx1ZXNdW2xldmVsXSA9IG5vdGF0aW9uQ29weShsZXZlbE9iaiwgdGhpc1tfVG9wVmFsdWVzXSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFtfU2V0TGV2ZWxGdW5jdGlvbl0gKGxldmVsKSB7XHJcbiAgICB0aGlzW2xldmVsXSA9IGZ1bmN0aW9uICguLi5pdGVtcykge1xyXG4gICAgICBpZiAodGhpc1tfT3B0aW9uc10ubGV2ZWxzW3RoaXNbX09wdGlvbnNdLmxldmVsXSA+XHJcbiAgICAgICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxzW2xldmVsXSkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHRpbWUgPSB0aGlzW19PcHRpb25zXS5kYXRlVGltZUZ1bmN0aW9uKClcclxuICAgICAgbGV0IG1zZyA9ICcnXHJcbiAgICAgIGxldCBkYXRhID0gbnVsbFxyXG4gICAgICBsZXQgZGF0YUpzb24gPSAnbnVsbCdcclxuICAgICAgbGV0IGlzRXJyb3IgPSBmYWxzZVxyXG5cclxuICAgICAgY29uc3Qgc2VyaWFsaXplID0gKGl0ZW0pID0+IHtcclxuICAgICAgICBpZiAoIXRoaXNbX09wdGlvbnNdLnNlcmlhbGl6ZXJzKSB7IHJldHVybiBpdGVtIH1cclxuICAgICAgICBpZiAoaXRlbSA9PSBudWxsKSB7IHJldHVybiBudWxsIH1cclxuICAgICAgICBjb25zdCBncmFkZWQgPSB7fVxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGl0ZW0pIHtcclxuICAgICAgICAgIGxldCB2YWx1ZSA9IGl0ZW1ba2V5XVxyXG4gICAgICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkgJiYgaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHRoaXNbX09wdGlvbnNdLnNlcmlhbGl6ZXJzW2tleV0pIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzW19PcHRpb25zXS5zZXJpYWxpemVyc1trZXldKHZhbHVlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZ3JhZGVkW2tleV0gPSB2YWx1ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ3JhZGVkXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAvLyBTaW5nbGUgaXRlbSBwcm9jZXNzaW5nXHJcbiAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zWzBdXHJcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBpdGVtXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICBtc2cgPSBpdGVtXHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtID09IG51bGwgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgLy8gVW5kZWZpbmVkIG9yIG51bGwsIGtlZXAgZGVmYXVsdHMuXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgIGRhdGEgPSBpdGVtXHJcbiAgICAgICAgICBkYXRhSnNvbiA9ICcnICsgaXRlbVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICBpc0Vycm9yID0gdHJ1ZVxyXG4gICAgICAgICAgbXNnID0gaXRlbS5tZXNzYWdlXHJcbiAgICAgICAgICBkYXRhID0gdGhpc1tfT3B0aW9uc10uc2VyaWFsaXplRXJyb3JGdW5jdGlvbihpdGVtKVxyXG4gICAgICAgICAgZGF0YUpzb24gPSB0aGlzW19PcHRpb25zXS5zdHJpbmdpZnlGdW5jdGlvbihkYXRhKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkYXRhID0gc2VyaWFsaXplKGl0ZW0pXHJcbiAgICAgICAgICBkYXRhSnNvbiA9IHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKGRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGl0ZW1zLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAvLyBNdWx0aXBsZSBpdGVtIHByb2Nlc3NpbmdcclxuICAgICAgICBkYXRhID0gW11cclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgaXRlbVxyXG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGlmIChtc2cpIHsgZGF0YS5wdXNoKGl0ZW0pIH0gZWxzZSB7IG1zZyA9IGl0ZW0gfVxyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGl0ZW0gPT0gbnVsbCB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGRhdGEucHVzaChudWxsKVxyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICBpc0Vycm9yID0gdHJ1ZVxyXG4gICAgICAgICAgICBkYXRhLnB1c2godGhpc1tfT3B0aW9uc10uc2VyaWFsaXplRXJyb3JGdW5jdGlvbihpdGVtKSlcclxuICAgICAgICAgICAgaWYgKCFtc2cpIHsgbXNnID0gaXRlbS5tZXNzYWdlIH1cclxuICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBkYXRhLnB1c2goc2VyaWFsaXplKGl0ZW0pKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICBkYXRhID0gZGF0YVswXVxyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhSnNvbiA9IHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKGRhdGEpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBqc29uID0gdGhpc1tfSGVhZGVyU3RyaW5nc11bbGV2ZWxdICsgdGltZSArXHJcbiAgICAgICAgICAnLFwiJyArIHRoaXNbX09wdGlvbnNdLm1lc3NhZ2VLZXkgKyAnXCI6XCInICsgbXNnICtcclxuICAgICAgICAgICdcIixcIicgKyB0aGlzW19PcHRpb25zXS5kYXRhS2V5ICsgJ1wiOicgKyBkYXRhSnNvblxyXG4gICAgICBpZiAoaXNFcnJvcikgeyBqc29uICs9ICcsXCJlcnJvclwiOnRydWUnIH1cclxuICAgICAganNvbiArPSAnfVxcbidcclxuXHJcbiAgICAgIGlmICh0aGlzW19PcHRpb25zXS5wYXNzVGhyb3VnaCkge1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IG5vdGF0aW9uQ29weSh7fSwgdGhpc1tfSGVhZGVyVmFsdWVzXVtsZXZlbF0sIHtcclxuICAgICAgICAgIFt0aGlzW19PcHRpb25zXS5kYXRlVGltZUtleV06IHRpbWUsXHJcbiAgICAgICAgICBbdGhpc1tfT3B0aW9uc10ubWVzc2FnZUtleV06IG1zZyxcclxuICAgICAgICAgIFt0aGlzW19PcHRpb25zXS5kYXRhS2V5XTogZGF0YVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKGlzRXJyb3IpIHsgb2JqLmVycm9yID0gdHJ1ZSB9XHJcbiAgICAgICAgdGhpc1tfT3B0aW9uc10ud3JpdGUoanNvbiwgb2JqKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXNbX09wdGlvbnNdLndyaXRlKGpzb24pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoaWxkICh0b3BzKSB7XHJcbiAgICBpZiAodG9wcyA9PSBudWxsIHx8IHRvcHMuY29uc3RydWN0b3IgIT09IE9iamVjdCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGUgdG9wIGxldmVsIGFyZ3VtZW50cyBvYmplY3QgdG8gY3JlYXRlIGEgY2hpbGQgbG9nZ2VyLicpXHJcbiAgICB9XHJcbiAgICBjb25zdCBuZXdDaGlsZCA9IE9iamVjdC5jcmVhdGUodGhpcylcclxuICAgIGlmICh0aGlzW19Ub3BJc1ByaW1pdGl2ZV0pIHtcclxuICAgICAgLy8gQXZvaWRpbmcgT2JqZWN0LmFzc2lnbiB3aGljaCBpcyBub3QgbmVlZGVkXHJcbiAgICAgIG5ld0NoaWxkW19Ub3BWYWx1ZXNdID0ge31cclxuICAgICAgbmV3Q2hpbGRbX1RvcElzUHJpbWl0aXZlXSA9IHRydWVcclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpc1tfVG9wVmFsdWVzXSkge1xyXG4gICAgICAgIG5ld0NoaWxkW19Ub3BWYWx1ZXNdW2tleV0gPSB0aGlzW19Ub3BWYWx1ZXNdW2tleV1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gVG9wIHZhbHVlIGlzIGFuIG9iamVjdC4gVGFrZSB0aGUgb2JqZWN0IGNvcHkgaGl0IGxpa2UgYSBtYW4uXHJcbiAgICAgIG5ld0NoaWxkW19Ub3BWYWx1ZXNdID0gbm90YXRpb25Db3B5KHt9LCB0aGlzW19Ub3BWYWx1ZXNdKVxyXG4gICAgICBuZXdDaGlsZFtfVG9wSXNQcmltaXRpdmVdID0gZmFsc2VcclxuICAgIH1cclxuICAgIGZvciAoY29uc3Qga2V5IGluIHRvcHMpIHtcclxuICAgICAgLy8gT3B0aW9ucyBhbmQga2V5IG5hbWVzIGFyZSBub3QgdmFsaWQsIHNraXBwaW5nLlxyXG4gICAgICBpZiAoZGVmYXVsdE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSB8fFxyXG4gICAgICAgICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxLZXkgPT09IGtleSB8fFxyXG4gICAgICAgICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxOdW1iZXJLZXkgPT09IGtleSB8fFxyXG4gICAgICAgICAgdGhpc1tfT3B0aW9uc10uZGF0ZVRpbWVLZXkgPT09IGtleSB8fFxyXG4gICAgICAgICAgdGhpc1tfT3B0aW9uc10ubWVzc2FnZUtleSA9PT0ga2V5IHx8XHJcbiAgICAgICAgICB0aGlzW19PcHRpb25zXS5kYXRhS2V5ID09PSBrZXkpIHsgY29udGludWUgfVxyXG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIHRvcHNba2V5XVxyXG4gICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgIHRoaXNbX1RvcFZhbHVlc10uaGFzT3duUHJvcGVydHkoa2V5KSAmJlxyXG4gICAgICAgICAgdHlwZW9mIHRoaXNbX1RvcFZhbHVlc11ba2V5XSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAvLyBOZXcgdG9wIGtleSBpcyB0aGUgc2FtZSBhcyBwYXJlbnQgYW5kIGlzIGEgc3RyaW5nLiBBcHBlbmRpbmcgc2VwYXJhdG9yIHN0cmluZyBhbmQgbmV3IHZhbHVlLlxyXG4gICAgICAgIG5ld0NoaWxkW19Ub3BWYWx1ZXNdW2tleV0gPSB0aGlzW19Ub3BWYWx1ZXNdW2tleV0gKyB0aGlzW19PcHRpb25zXS5zZXBhcmF0b3JTdHJpbmcgKyB0b3BzW2tleV1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIG5ld0NoaWxkW19Ub3BWYWx1ZXNdW2tleV0gPSBudWxsXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XSA9IHRvcHNba2V5XVxyXG4gICAgICAgIC8vIE5vdCB1c2luZyAmJiBzbyB3ZSBjYW4gZXhpdCBlYXJseVxyXG4gICAgICAgIGlmICghKHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8IHR5cGUgPT09ICdib29sZWFuJykpIHtcclxuICAgICAgICAgIHRoaXNbX1RvcElzUHJpbWl0aXZlXSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXdDaGlsZFtfVG9wU25pcF0gPSAnJ1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gbmV3Q2hpbGRbX1RvcFZhbHVlc10pIHtcclxuICAgICAgaWYgKG5ld0NoaWxkW19Ub3BJc1ByaW1pdGl2ZV0pIHtcclxuICAgICAgICAvLyBQcml2aXRpdmUgSlNPTi5zdHJpbmdpZnkuIENoZWFwLlxyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XVxyXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgbmV3Q2hpbGRbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6XCInICsgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XSArICdcIiwnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld0NoaWxkW19Ub3BTbmlwXSArPSAnXCInICsga2V5ICsgJ1wiOicgKyBuZXdDaGlsZFtfVG9wVmFsdWVzXVtrZXldICsgJywnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRpbnVlXHJcbiAgICAgIH1cclxuICAgICAgbmV3Q2hpbGRbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6JyArICh0aGlzW19PcHRpb25zXS5zdHJpbmdpZnlGdW5jdGlvbihuZXdDaGlsZFtfVG9wVmFsdWVzXVtrZXldKSkgKyAnLCdcclxuICAgIH1cclxuICAgIG5ld0NoaWxkLnBhcmVudCA9IHRoaXNcclxuICAgIG5ld0NoaWxkW19IZWFkZXJTdHJpbmdzXSA9IHt9XHJcbiAgICBuZXdDaGlsZFtfSGVhZGVyVmFsdWVzXSA9IHt9XHJcbiAgICBmb3IgKGNvbnN0IGxldmVsIGluIHRoaXNbX09wdGlvbnNdLmxldmVscykge1xyXG4gICAgICBuZXdDaGlsZFtfU2V0TGV2ZWxIZWFkZXJdKGxldmVsKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld0NoaWxkXHJcbiAgfVxyXG5cclxuICBzdHJpbmdpZnkgKG9iaiwgcmVwbGFjZXIsIHNwYWNlcikge1xyXG4gICAgcmV0dXJuIHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKG9iaiwgcmVwbGFjZXIsIHNwYWNlcilcclxuICB9XHJcblxyXG4gIGpzb24gKGRhdGEpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKGRhdGEsIG51bGwsIDIpKVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQZXJqXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=