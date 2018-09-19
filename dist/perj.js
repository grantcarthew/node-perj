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
        return src.toString()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QZXJqL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9QZXJqL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1BlcmovLi9zcmMvbm90YXRpb24tY29weS5qcyIsIndlYnBhY2s6Ly9QZXJqLy4vc3JjL29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vUGVyai8uL3NyYy9wZXJqLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxTQUFTO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZC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QixPQUFPO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsZ0JBQWdCOztBQUVoQjtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsc0JBQXNCO0FBQ3RCO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoicGVyai5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlBlcmpcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiUGVyalwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wZXJqLmpzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBub3RhdGlvbkNvcHlcclxuXHJcbmZ1bmN0aW9uIG5vdGF0aW9uQ29weSAodGFyZ2V0LCAuLi5zb3VyY2VzKSB7XHJcbiAgbGV0IGNvbnZlcnRCdWZmZXIgPSBmYWxzZVxyXG4gIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJykgeyBjb252ZXJ0QnVmZmVyID0gdHJ1ZSB9XHJcbiAgY29uc3QgbWF4Q2FsbHMgPSAyMDAwXHJcbiAgbGV0IGNhbGxzXHJcbiAgY29uc3Qgc2VlbiA9IG5ldyBXZWFrU2V0KClcclxuICBmb3IgKGNvbnN0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XHJcbiAgICBjYWxscyA9IDBcclxuICAgIG5vdGF0aW9uQ29weVJlY3Vyc2l2ZSh0YXJnZXQsIHNvdXJjZSlcclxuICAgIGlmIChjYWxscyA+IG1heENhbGxzKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgW1BlcmpdIE1heGltdW0gb2YgJHttYXhDYWxsc30gcmVjdXJzaXZlIGNhbGxzIGhhcyBiZWVuIHJlYWNoZWQuYClcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRhcmdldFxyXG5cclxuICBmdW5jdGlvbiBub3RhdGlvbkNvcHlSZWN1cnNpdmUgKHRndCwgc3JjKSB7XHJcbiAgICBpZiAoY2FsbHMrKyA+IG1heENhbGxzKSB7IHJldHVybiB9XHJcbiAgICBpZiAoc3JjID09IG51bGwpIHsgcmV0dXJuIHNyYyB9XHJcbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIHNyY1xyXG4gICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnIHx8XHJcbiAgICAgICAgdHlwZSA9PT0gJ251bWJlcicgfHxcclxuICAgICAgICB0eXBlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgcmV0dXJuIHNyY1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAoc2Vlbi5oYXMoc3JjKSkgeyByZXR1cm4gJ1tDaXJjdWxhcl0nIH1cclxuICAgICAgc2Vlbi5hZGQoc3JjKVxyXG5cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc3JjKSkge1xyXG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNyYy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgbmV3QXJyYXlbaV0gPSBub3RhdGlvbkNvcHlSZWN1cnNpdmUoe30sIHNyY1tpXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzcmMgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHNyY1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc3JjIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgUmVmbGVjdC5vd25LZXlzKHNyYykpIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5vdGF0aW9uQ29weVJlY3Vyc2l2ZSh7fSwgc3JjW25hbWVdKVxyXG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7IHRndFtuYW1lXSA9IHJlc3VsdCB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0Z3QubWVzc2FnZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0Z3QubWVzc2FnZSA9ICdUaGUgYXBwbGljYXRpb24gaGFzIGVuY291bnRlcmVkIGFuIHVua25vd24gZXJyb3IuJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGd0Lm5hbWUgPT09IHVuZGVmaW5lZCkgeyB0Z3QubmFtZSA9ICdFcnJvcicgfVxyXG4gICAgICAgIHJldHVybiB0Z3RcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNvbnZlcnRCdWZmZXIgJiYgc3JjIGluc3RhbmNlb2YgQnVmZmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHNyYy50b1N0cmluZygpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBzcmMpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBub3RhdGlvbkNvcHlSZWN1cnNpdmUoe30sIHNyY1tuYW1lXSlcclxuICAgICAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHsgdGd0W25hbWVdID0gcmVzdWx0IH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGd0XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gIH1cclxufVxyXG4iLCJjb25zdCBub3RhdGlvbkNvcHkgPSByZXF1aXJlKCcuL25vdGF0aW9uLWNvcHknKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgbGV2ZWxzOiB7XHJcbiAgICBmYXRhbDogNjAsXHJcbiAgICBlcnJvcjogNTAsXHJcbiAgICB3YXJuOiA0MCxcclxuICAgIGluZm86IDMwLFxyXG4gICAgZGVidWc6IDIwLFxyXG4gICAgdHJhY2U6IDEwXHJcbiAgfSxcclxuICBsZXZlbDogJ2luZm8nLFxyXG4gIGxldmVsS2V5OiAnbGV2ZWwnLFxyXG4gIGxldmVsS2V5RW5hYmxlZDogdHJ1ZSxcclxuICBsZXZlbE51bWJlcktleTogJ2x2bCcsXHJcbiAgbGV2ZWxOdW1iZXJLZXlFbmFibGVkOiB0cnVlLFxyXG4gIGRhdGVUaW1lS2V5OiAndGltZScsXHJcbiAgZGF0ZVRpbWVGdW5jdGlvbixcclxuICBtZXNzYWdlS2V5OiAnbXNnJyxcclxuICBkYXRhS2V5OiAnZGF0YScsXHJcbiAgc2VwYXJhdG9yU3RyaW5nOiAnOicsXHJcbiAgc2VyaWFsaXplcnM6IGZhbHNlLFxyXG4gIHNlcmlhbGl6ZUVycm9yRnVuY3Rpb24sXHJcbiAgc3RyaW5naWZ5RnVuY3Rpb24sXHJcbiAgcGFzc1Rocm91Z2g6IGZhbHNlLFxyXG4gIHdyaXRlOiBkZWZhdWx0V3JpdGVyKClcclxufVxyXG5cclxuZnVuY3Rpb24gZGF0ZVRpbWVGdW5jdGlvbiAoKSB7XHJcbiAgLy8gUmV0dXJucyBlcG9jaCB0aW1lLlxyXG4gIHJldHVybiBEYXRlLm5vdygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXIgKCkge1xyXG4gIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiZcclxuICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcclxuICAgIHJldHVybiBwcm9jZXNzLnN0ZG91dC53cml0ZS5iaW5kKHByb2Nlc3Muc3Rkb3V0KVxyXG4gIH1cclxuICByZXR1cm4gY29uc29sZS5sb2dcclxufVxyXG5cclxuZnVuY3Rpb24gc3RyaW5naWZ5RnVuY3Rpb24gKG9iaiwgcmVwbGFjZXIsIHNwYWNlcikge1xyXG4gIGlmIChvYmogPT0gbnVsbCkgeyByZXR1cm4gbnVsbCB9XHJcbiAgY29uc3QgdHlwZSA9IHR5cGVvZiBvYmpcclxuICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIHJlcGxhY2VyLCBzcGFjZXIpXHJcbiAgfVxyXG4gIGlmICh0eXBlID09PSAnbnVtYmVyJyB8fFxyXG4gICAgICB0eXBlID09PSAnYm9vbGVhbicpIHtcclxuICAgIHJldHVybiBvYmpcclxuICB9XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgbGV0IG9iakpzb24gPSAnWydcclxuICAgIGNvbnN0IGxhc3QgPSBvYmoubGVuZ3RoIC0gMVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcclxuICAgICAgb2JqSnNvbiArPSBzdHJpbmdpZnlGdW5jdGlvbihvYmpbaV0pXHJcbiAgICAgIGlmIChpIDwgbGFzdCkgeyBvYmpKc29uICs9ICcsJyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqSnNvbiArICddJ1xyXG4gIH1cclxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobm90YXRpb25Db3B5KHt9LCBvYmopLCByZXBsYWNlciwgc3BhY2VyKVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXJpYWxpemVFcnJvckZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gIHJldHVybiBub3RhdGlvbkNvcHkoe30sIHZhbHVlKVxyXG59XHJcbiIsImNvbnN0IGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJylcclxuY29uc3Qgbm90YXRpb25Db3B5ID0gcmVxdWlyZSgnLi9ub3RhdGlvbi1jb3B5JylcclxuXHJcbi8vIFN5bWJvbHMgZm9yIGZ1bmN0aW9ucyBhbmQgdmFsdWVzXHJcbmNvbnN0IF9TcGxpdE9wdGlvbnMgPSBTeW1ib2woJ1NwbGl0T3B0aW9ucycpXHJcbmNvbnN0IF9PcHRpb25zID0gU3ltYm9sKCdPcHRpb25zJylcclxuY29uc3QgX1RvcFNuaXAgPSBTeW1ib2woJ1RvcFNuaXAnKVxyXG5jb25zdCBfVG9wVmFsdWVzID0gU3ltYm9sKCdUb3BWYWx1ZXMnKVxyXG5jb25zdCBfVG9wSXNQcmltaXRpdmUgPSBTeW1ib2woJ1RvcElzUHJpbWl0aXZlJylcclxuY29uc3QgX0hlYWRlclN0cmluZ3MgPSBTeW1ib2woJ0hlYWRlclN0cmluZ3MnKVxyXG5jb25zdCBfSGVhZGVyVmFsdWVzID0gU3ltYm9sKCdIZWFkZXJWYWx1ZXMnKVxyXG5jb25zdCBfU2V0TGV2ZWxIZWFkZXIgPSBTeW1ib2woJ1NldExldmVsSGVhZGVyJylcclxuY29uc3QgX1NldExldmVsRnVuY3Rpb24gPSBTeW1ib2woJ1NldExldmVsRnVuY3Rpb24nKVxyXG5cclxuLypcclxuQ29kZSBTdW1tYXJ5OlxyXG5Gb2xsb3dpbmcgYXJlIHBvaW50cyBvZiBpbnRlcmVzdCBhcm91bmQgdGhlIHBlcmogY29kZSBjaG9pY2VzLlxyXG4tIFN5bWJvbHMgdXNlZCB0byBoaWRlIGludGVybmFsIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuXHJcbi0gTXVsdGlwbGUgU3ltYm9scyBkdWUgdG8gbWFqb3IgcGVyZm9ybWFuY2UgaGl0IGlmIHVzaW5nIG5lc3RlZC5cclxuLSBEZWVwbHkgbmVzdGVkICdpZicgYW5kICdmb3InIHN0YXRlbWVudHMgZHVlIHRvIHBlcmZvcm1hbmNlIGJlbmlmaXRzLlxyXG4tIFNvbWUgbWlub3IgZHVwbGljYXRpb24gZHVlIHRvIHBlcmZvcm1hbmNlIGJlbmlmaXRzLlxyXG5cclxuU3ltYm9sIFN1bW1hcnk6XHJcbl9TcGxpdE9wdGlvbnM6IDxGdW5jdGlvbj5cclxuICBVc2VkIHRvIHNwbGl0IHRoZSB1c2VyIG9wdGlvbnMgZnJvbSB0b3AgbGV2ZWwgcHJvcGVydGllcy5cclxuICBIZWxwcyB0byBhYnN0cmFjdCB0aGUgc3BsaXQgZnVuY3Rpb24gb3V0IG9mIHRoZSBjb25zdHJ1Y3Rvci5cclxuXHJcbl9PcHRpb25zOiA8T2JqZWN0PlxyXG4gIFRoaXMgaG9sZHMgYW4gT2JqZWN0IHdpdGggdGhlIGRlZmF1bHQgb3IgY3VzdG9tIG9wdGlvbnMuXHJcblxyXG5fVG9wU25pcDogPFN0cmluZz5cclxuICBUaGlzIGhvbGRzIGEgSlNPTiBzbmlwcGV0IG9mIHRoZSB1c2VyIHN1cHBsaWVkIHRvcCBsZXZlbCBwcm9wZXJ0aWVzLlxyXG5cclxuX1RvcFZhbHVlczogPE9iamVjdD5cclxuICBUaGlzIGhvbGRzIHRoZSB1c2VyIHN1cHBsaWVkIHRvcCBsZXZlbCBwcm9wZXJpZXMuXHJcbiAgSXQgaXMgdXNlZCB0byBidWlsZCB0aGUgX1RvcFNuaXAgc3RyaW5nIGFuZCB3aGVuXHJcbiAgJ3Bhc3NUaHJvdWdoJyBpcyBlbmFibGVkLlxyXG5cclxuX1RvcElzUHJpbWl0aXZlOiA8Qm9vbGVhbj5cclxuICBPYmplY3QgY29weSBpcyBhIHJlYWwgcGlnIHRvIHdvcmsgd2l0aCBpbiBhIGhpZ2hcclxuICBwZXJmb3JtYW5jZSBwcm9qZWN0LiBUbyBhdm9pZCBjb3B5aW5nIG9iamVjdHMsIHRoaXMgZmxhZ1xyXG4gIGlzIHVzZWQgdG8gaW5kaWNhdGUgaWYgdGhlIHVzZXIgaGFzIGFzc2lnbmVkIGEgdG9wIGxldmVsIHByb3BlcnR5XHJcbiAgd2l0aCB2YWx1ZXMgdGhhdCBhcmUgb25seSBzaW1wbGUgcHJpbWl0aXZlcyAoc3RyaW5nLCBudW1iZXIsIGJvb2xlYW4pLlxyXG4gIElmIHRoZSB1c2VyIGFzc2lnbmVkIHZhbHVlcyBhcmUgYWxsIHNpbXBsZSBwcmltaXRpdmVzLCBhICdmb3InIGxvb3BcclxuICBpcyBmYXN0ZXIgdG8gZHVwbGljYXRlIGFuIG9iamVjdC5cclxuICBUaGlzIGZsYWcgaXMgYWxzbyBzZXQgdG8gZmFsc2UgaWYgdGhlIHVzZXIgc3VwcGxpZXMgYSBjdXN0b21cclxuICBzdHJpbmdpZnkgZnVuY3Rpb24uXHJcblxyXG5fSGVhZGVyU3RyaW5nczogPE9iamVjdD5cclxuICBUaGUgaGVhZGVyIGZvciBlYWNoIGxvZyBsZXZlbCBpcyB0aGUgc2FtZSBzdWNoIGFzOlxyXG4gIHtcImxldmVsXCI6XCJlcnJvclwiLFwibHZsXCI6NTAsXCJ0aW1lXCI6MTUyNTY0MzI5MTcxNlxyXG4gIFRoaXMgY2FjaGVzIHRoZSBsZXZlbCBoZWFkZXJzLlxyXG5cclxuX0hlYWRlclZhbHVlczogPE9iamVjdD5cclxuICBPbmx5IHVzZWQgd2hlbiAncGFzc1Rocm91Z2gnIGlzIGVuYWJsZWQuXHJcbiAgUGVybWl0cyByZWJ1aWxkaW5nIHRoZSBKU09OIG9iamVjdCBmb3Igb3V0cHV0LlxyXG5cclxuX1NldExldmVsSGVhZGVyOiA8RnVuY3Rpb24+XHJcbiAgSG9sZHMgdGhlIGZ1bmN0aW9uIHVzZWQgdG8gYnVpbGQgdGhlIGxldmVsIGhlYWRlci5cclxuXHJcbl9TZXRMZXZlbEZ1bmN0aW9uOiA8RnVuY3Rpb24+XHJcbiAgVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGdlbmVyYXRlIHRoZSBsZXZlbCBmdW5jdGlvbnMuXHJcbiovXHJcblxyXG5jbGFzcyBQZXJqIHtcclxuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMgIT0gbnVsbCAmJiBvcHRpb25zLmNvbnN0cnVjdG9yICE9PSBPYmplY3QpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlIG9wdGlvbnMgb2JqZWN0IHRvIGNyZWF0ZSBhIGxvZ2dlci4nKVxyXG4gICAgfVxyXG4gICAgdGhpc1tfT3B0aW9uc10gPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucylcclxuICAgIHRoaXNbX1RvcFNuaXBdID0gJydcclxuICAgIHRoaXNbX1RvcFZhbHVlc10gPSB7fVxyXG4gICAgdGhpc1tfVG9wSXNQcmltaXRpdmVdID0gdHJ1ZVxyXG4gICAgdGhpc1tfU3BsaXRPcHRpb25zXShvcHRpb25zKVxyXG4gICAgdGhpc1tfSGVhZGVyU3RyaW5nc10gPSB7fVxyXG4gICAgdGhpc1tfSGVhZGVyVmFsdWVzXSA9IHt9XHJcbiAgICBmb3IgKGNvbnN0IGxldmVsIGluIHRoaXNbX09wdGlvbnNdLmxldmVscykge1xyXG4gICAgICB0aGlzW19TZXRMZXZlbEhlYWRlcl0obGV2ZWwpXHJcbiAgICAgIHRoaXNbX1NldExldmVsRnVuY3Rpb25dKGxldmVsKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGxldmVsICgpIHtcclxuICAgIHJldHVybiB0aGlzW19PcHRpb25zXS5sZXZlbFxyXG4gIH1cclxuXHJcbiAgc2V0IGxldmVsIChsZXZlbCkge1xyXG4gICAgaWYgKCEodGhpc1tfT3B0aW9uc10ubGV2ZWxzLmhhc093blByb3BlcnR5KGxldmVsKSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgbGV2ZWwgb3B0aW9uIG11c3QgYmUgYSB2YWxpZCBrZXkgaW4gdGhlIGxldmVscyBvYmplY3QuJylcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eShfT3B0aW9ucykpIHtcclxuICAgICAgLy8gQXR0YWNoaW5nIHRoZSBvcHRpb25zIG9iamVjdCB0byB0aGlzIGluc3RhbmNlXHJcbiAgICAgIHRoaXNbX09wdGlvbnNdID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpc1tfT3B0aW9uc10pXHJcbiAgICB9XHJcbiAgICB0aGlzW19PcHRpb25zXS5sZXZlbCA9IGxldmVsXHJcbiAgfVxyXG5cclxuICBnZXQgbGV2ZWxzICgpIHtcclxuICAgIHJldHVybiB0aGlzW19PcHRpb25zXS5sZXZlbHNcclxuICB9XHJcblxyXG4gIGFkZExldmVsIChuZXdMZXZlbHMpIHtcclxuICAgIGZvciAoY29uc3QgbGV2ZWwgaW4gbmV3TGV2ZWxzKSB7XHJcbiAgICAgIGlmICh0aGlzW2xldmVsXSkgeyBjb250aW51ZSB9XHJcbiAgICAgIHRoaXNbX09wdGlvbnNdLmxldmVsc1tsZXZlbF0gPSBuZXdMZXZlbHNbbGV2ZWxdXHJcbiAgICAgIHRoaXNbX1NldExldmVsSGVhZGVyXShsZXZlbClcclxuICAgICAgdGhpc1tfU2V0TGV2ZWxGdW5jdGlvbl0obGV2ZWwpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgd3JpdGUgKCkge1xyXG4gICAgcmV0dXJuIHRoaXNbX09wdGlvbnNdLndyaXRlXHJcbiAgfVxyXG5cclxuICBbX1NwbGl0T3B0aW9uc10gKG9wdGlvbnMpIHtcclxuICAgIGlmICghb3B0aW9ucykgeyByZXR1cm4gfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9ucykge1xyXG4gICAgICBpZiAoZGVmYXVsdE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIGlmIChrZXkgPT09ICdsZXZlbCcpIHtcclxuICAgICAgICAgIHRoaXMubGV2ZWwgPSBvcHRpb25zW2tleV1cclxuICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChrZXkgPT09ICdzdHJpbmdpZnlGdW5jdGlvbicpIHtcclxuICAgICAgICAgIHRoaXNbX1RvcElzUHJpbWl0aXZlXSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXNbX09wdGlvbnNdW2tleV0gPSBvcHRpb25zW2tleV1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIG9wdGlvbnNba2V5XVxyXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgdGhpc1tfVG9wU25pcF0gKz0gJ1wiJyArIGtleSArICdcIjpcIicgKyBvcHRpb25zW2tleV0gKyAnXCIsJ1xyXG4gICAgICAgICAgdGhpc1tfVG9wVmFsdWVzXVtrZXldID0gb3B0aW9uc1trZXldXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgIHRoaXNbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6JyArIG9wdGlvbnNba2V5XSArICcsJ1xyXG4gICAgICAgICAgdGhpc1tfVG9wVmFsdWVzXVtrZXldID0gb3B0aW9uc1trZXldXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgdGhpc1tfVG9wU25pcF0gKz0gJ1wiJyArIGtleSArICdcIjpudWxsLCdcclxuICAgICAgICAgIHRoaXNbX1RvcFZhbHVlc11ba2V5XSA9IG51bGxcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpc1tfVG9wU25pcF0gKz0gJ1wiJyArIGtleSArICdcIjonICsgdGhpc1tfT3B0aW9uc10uc3RyaW5naWZ5RnVuY3Rpb24ob3B0aW9uc1trZXldKSArICcsJ1xyXG4gICAgICAgICAgdGhpc1tfVG9wVmFsdWVzXVtrZXldID0gb3B0aW9uc1trZXldXHJcbiAgICAgICAgICB0aGlzW19Ub3BJc1ByaW1pdGl2ZV0gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgW19TZXRMZXZlbEhlYWRlcl0gKGxldmVsKSB7XHJcbiAgICB0aGlzW19IZWFkZXJTdHJpbmdzXVtsZXZlbF0gPSAneydcclxuICAgIHRoaXNbX09wdGlvbnNdLmxldmVsS2V5RW5hYmxlZCAmJiAodGhpc1tfSGVhZGVyU3RyaW5nc11bbGV2ZWxdICs9ICdcIicgKyB0aGlzW19PcHRpb25zXS5sZXZlbEtleSArICdcIjpcIicgKyBsZXZlbCArICdcIiwnKVxyXG4gICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxOdW1iZXJLZXlFbmFibGVkICYmICh0aGlzW19IZWFkZXJTdHJpbmdzXVtsZXZlbF0gKz0gJ1wiJyArIHRoaXNbX09wdGlvbnNdLmxldmVsTnVtYmVyS2V5ICsgJ1wiOicgKyB0aGlzW19PcHRpb25zXS5sZXZlbHNbbGV2ZWxdICsgJywnKVxyXG4gICAgdGhpc1tfVG9wU25pcF0gIT09ICcnICYmICh0aGlzW19IZWFkZXJTdHJpbmdzXVtsZXZlbF0gKz0gdGhpc1tfVG9wU25pcF0pXHJcbiAgICB0aGlzW19IZWFkZXJTdHJpbmdzXVtsZXZlbF0gKz0gJ1wiJyArIHRoaXNbX09wdGlvbnNdLmRhdGVUaW1lS2V5ICsgJ1wiOidcclxuXHJcbiAgICBpZiAodGhpc1tfT3B0aW9uc10ucGFzc1Rocm91Z2gpIHtcclxuICAgICAgY29uc3QgbGV2ZWxPYmogPSB7fVxyXG4gICAgICB0aGlzW19PcHRpb25zXS5sZXZlbEtleUVuYWJsZWQgJiYgKGxldmVsT2JqW3RoaXNbX09wdGlvbnNdLmxldmVsS2V5XSA9IGxldmVsKVxyXG4gICAgICB0aGlzW19PcHRpb25zXS5sZXZlbE51bWJlcktleUVuYWJsZWQgJiYgKGxldmVsT2JqW3RoaXNbX09wdGlvbnNdLmxldmVsTnVtYmVyS2V5XSA9IHRoaXNbX09wdGlvbnNdLmxldmVsc1tsZXZlbF0pXHJcbiAgICAgIHRoaXNbX0hlYWRlclZhbHVlc11bbGV2ZWxdID0gbm90YXRpb25Db3B5KGxldmVsT2JqLCB0aGlzW19Ub3BWYWx1ZXNdKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgW19TZXRMZXZlbEZ1bmN0aW9uXSAobGV2ZWwpIHtcclxuICAgIHRoaXNbbGV2ZWxdID0gZnVuY3Rpb24gKC4uLml0ZW1zKSB7XHJcbiAgICAgIGlmICh0aGlzW19PcHRpb25zXS5sZXZlbHNbdGhpc1tfT3B0aW9uc10ubGV2ZWxdID5cclxuICAgICAgICB0aGlzW19PcHRpb25zXS5sZXZlbHNbbGV2ZWxdKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdGltZSA9IHRoaXNbX09wdGlvbnNdLmRhdGVUaW1lRnVuY3Rpb24oKVxyXG4gICAgICBsZXQgbXNnID0gJydcclxuICAgICAgbGV0IGRhdGEgPSBudWxsXHJcbiAgICAgIGxldCBkYXRhSnNvbiA9ICdudWxsJ1xyXG4gICAgICBsZXQgaXNFcnJvciA9IGZhbHNlXHJcblxyXG4gICAgICBjb25zdCBzZXJpYWxpemUgPSAoaXRlbSkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpc1tfT3B0aW9uc10uc2VyaWFsaXplcnMpIHsgcmV0dXJuIGl0ZW0gfVxyXG4gICAgICAgIGlmIChpdGVtID09IG51bGwpIHsgcmV0dXJuIG51bGwgfVxyXG4gICAgICAgIGNvbnN0IGdyYWRlZCA9IHt9XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gaXRlbSkge1xyXG4gICAgICAgICAgbGV0IHZhbHVlID0gaXRlbVtrZXldXHJcbiAgICAgICAgICBpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eSAmJiBpdGVtLmhhc093blByb3BlcnR5KGtleSkgJiYgdGhpc1tfT3B0aW9uc10uc2VyaWFsaXplcnNba2V5XSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXNbX09wdGlvbnNdLnNlcmlhbGl6ZXJzW2tleV0odmFsdWUpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBncmFkZWRba2V5XSA9IHZhbHVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBncmFkZWRcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIC8vIFNpbmdsZSBpdGVtIHByb2Nlc3NpbmdcclxuICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNbMF1cclxuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGl0ZW1cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIG1zZyA9IGl0ZW1cclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0gPT0gbnVsbCB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAvLyBVbmRlZmluZWQgb3IgbnVsbCwga2VlcCBkZWZhdWx0cy5cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgZGF0YSA9IGl0ZW1cclxuICAgICAgICAgIGRhdGFKc29uID0gJycgKyBpdGVtXHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICAgIGlzRXJyb3IgPSB0cnVlXHJcbiAgICAgICAgICBtc2cgPSBpdGVtLm1lc3NhZ2VcclxuICAgICAgICAgIGRhdGEgPSB0aGlzW19PcHRpb25zXS5zZXJpYWxpemVFcnJvckZ1bmN0aW9uKGl0ZW0pXHJcbiAgICAgICAgICBkYXRhSnNvbiA9IHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKGRhdGEpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRhdGEgPSBzZXJpYWxpemUoaXRlbSlcclxuICAgICAgICAgIGRhdGFKc29uID0gdGhpc1tfT3B0aW9uc10uc3RyaW5naWZ5RnVuY3Rpb24oZGF0YSlcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIC8vIE11bHRpcGxlIGl0ZW0gcHJvY2Vzc2luZ1xyXG4gICAgICAgIGRhdGEgPSBbXVxyXG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBpdGVtXHJcbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgaWYgKG1zZykgeyBkYXRhLnB1c2goaXRlbSkgfSBlbHNlIHsgbXNnID0gaXRlbSB9XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoaXRlbSA9PSBudWxsIHx8IHR5cGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgZGF0YS5wdXNoKG51bGwpXHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICAgIGlzRXJyb3IgPSB0cnVlXHJcbiAgICAgICAgICAgIGRhdGEucHVzaCh0aGlzW19PcHRpb25zXS5zZXJpYWxpemVFcnJvckZ1bmN0aW9uKGl0ZW0pKVxyXG4gICAgICAgICAgICBpZiAoIW1zZykgeyBtc2cgPSBpdGVtLm1lc3NhZ2UgfVxyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRhdGEucHVzaChzZXJpYWxpemUoaXRlbSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgIGRhdGEgPSBkYXRhWzBdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGFKc29uID0gdGhpc1tfT3B0aW9uc10uc3RyaW5naWZ5RnVuY3Rpb24oZGF0YSlcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IGpzb24gPSB0aGlzW19IZWFkZXJTdHJpbmdzXVtsZXZlbF0gKyB0aW1lICtcclxuICAgICAgICAgICcsXCInICsgdGhpc1tfT3B0aW9uc10ubWVzc2FnZUtleSArICdcIjpcIicgKyBtc2cgK1xyXG4gICAgICAgICAgJ1wiLFwiJyArIHRoaXNbX09wdGlvbnNdLmRhdGFLZXkgKyAnXCI6JyArIGRhdGFKc29uXHJcbiAgICAgIGlmIChpc0Vycm9yKSB7IGpzb24gKz0gJyxcImVycm9yXCI6dHJ1ZScgfVxyXG4gICAgICBqc29uICs9ICd9XFxuJ1xyXG5cclxuICAgICAgaWYgKHRoaXNbX09wdGlvbnNdLnBhc3NUaHJvdWdoKSB7XHJcbiAgICAgICAgY29uc3Qgb2JqID0gbm90YXRpb25Db3B5KHt9LCB0aGlzW19IZWFkZXJWYWx1ZXNdW2xldmVsXSwge1xyXG4gICAgICAgICAgW3RoaXNbX09wdGlvbnNdLmRhdGVUaW1lS2V5XTogdGltZSxcclxuICAgICAgICAgIFt0aGlzW19PcHRpb25zXS5tZXNzYWdlS2V5XTogbXNnLFxyXG4gICAgICAgICAgW3RoaXNbX09wdGlvbnNdLmRhdGFLZXldOiBkYXRhXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoaXNFcnJvcikgeyBvYmouZXJyb3IgPSB0cnVlIH1cclxuICAgICAgICB0aGlzW19PcHRpb25zXS53cml0ZShqc29uLCBvYmopXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpc1tfT3B0aW9uc10ud3JpdGUoanNvbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hpbGQgKHRvcHMpIHtcclxuICAgIGlmICh0b3BzID09IG51bGwgfHwgdG9wcy5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignUHJvdmlkZSB0b3AgbGV2ZWwgYXJndW1lbnRzIG9iamVjdCB0byBjcmVhdGUgYSBjaGlsZCBsb2dnZXIuJylcclxuICAgIH1cclxuICAgIGNvbnN0IG5ld0NoaWxkID0gT2JqZWN0LmNyZWF0ZSh0aGlzKVxyXG4gICAgaWYgKHRoaXNbX1RvcElzUHJpbWl0aXZlXSkge1xyXG4gICAgICAvLyBBdm9pZGluZyBPYmplY3QuYXNzaWduIHdoaWNoIGlzIG5vdCBuZWVkZWRcclxuICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc10gPSB7fVxyXG4gICAgICBuZXdDaGlsZFtfVG9wSXNQcmltaXRpdmVdID0gdHJ1ZVxyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzW19Ub3BWYWx1ZXNdKSB7XHJcbiAgICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XSA9IHRoaXNbX1RvcFZhbHVlc11ba2V5XVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBUb3AgdmFsdWUgaXMgYW4gb2JqZWN0LiBUYWtlIHRoZSBvYmplY3QgY29weSBoaXQgbGlrZSBhIG1hbi5cclxuICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc10gPSBub3RhdGlvbkNvcHkoe30sIHRoaXNbX1RvcFZhbHVlc10pXHJcbiAgICAgIG5ld0NoaWxkW19Ub3BJc1ByaW1pdGl2ZV0gPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9wcykge1xyXG4gICAgICAvLyBPcHRpb25zIGFuZCBrZXkgbmFtZXMgYXJlIG5vdCB2YWxpZCwgc2tpcHBpbmcuXHJcbiAgICAgIGlmIChkZWZhdWx0T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8XHJcbiAgICAgICAgICB0aGlzW19PcHRpb25zXS5sZXZlbEtleSA9PT0ga2V5IHx8XHJcbiAgICAgICAgICB0aGlzW19PcHRpb25zXS5sZXZlbE51bWJlcktleSA9PT0ga2V5IHx8XHJcbiAgICAgICAgICB0aGlzW19PcHRpb25zXS5kYXRlVGltZUtleSA9PT0ga2V5IHx8XHJcbiAgICAgICAgICB0aGlzW19PcHRpb25zXS5tZXNzYWdlS2V5ID09PSBrZXkgfHxcclxuICAgICAgICAgIHRoaXNbX09wdGlvbnNdLmRhdGFLZXkgPT09IGtleSkgeyBjb250aW51ZSB9XHJcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdG9wc1trZXldXHJcbiAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJlxyXG4gICAgICAgICAgdGhpc1tfVG9wVmFsdWVzXS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmXHJcbiAgICAgICAgICB0eXBlb2YgdGhpc1tfVG9wVmFsdWVzXVtrZXldID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIC8vIE5ldyB0b3Aga2V5IGlzIHRoZSBzYW1lIGFzIHBhcmVudCBhbmQgaXMgYSBzdHJpbmcuIEFwcGVuZGluZyBzZXBhcmF0b3Igc3RyaW5nIGFuZCBuZXcgdmFsdWUuXHJcbiAgICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XSA9IHRoaXNbX1RvcFZhbHVlc11ba2V5XSArIHRoaXNbX09wdGlvbnNdLnNlcGFyYXRvclN0cmluZyArIHRvcHNba2V5XVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XSA9IG51bGxcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdDaGlsZFtfVG9wVmFsdWVzXVtrZXldID0gdG9wc1trZXldXHJcbiAgICAgICAgLy8gTm90IHVzaW5nICYmIHNvIHdlIGNhbiBleGl0IGVhcmx5XHJcbiAgICAgICAgaWYgKCEodHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ251bWJlcicgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSkge1xyXG4gICAgICAgICAgdGhpc1tfVG9wSXNQcmltaXRpdmVdID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG5ld0NoaWxkW19Ub3BTbmlwXSA9ICcnXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBuZXdDaGlsZFtfVG9wVmFsdWVzXSkge1xyXG4gICAgICBpZiAobmV3Q2hpbGRbX1RvcElzUHJpbWl0aXZlXSkge1xyXG4gICAgICAgIC8vIFByaXZpdGl2ZSBKU09OLnN0cmluZ2lmeS4gQ2hlYXAuXHJcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBuZXdDaGlsZFtfVG9wVmFsdWVzXVtrZXldXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICBuZXdDaGlsZFtfVG9wU25pcF0gKz0gJ1wiJyArIGtleSArICdcIjpcIicgKyBuZXdDaGlsZFtfVG9wVmFsdWVzXVtrZXldICsgJ1wiLCdcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV3Q2hpbGRbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6JyArIG5ld0NoaWxkW19Ub3BWYWx1ZXNdW2tleV0gKyAnLCdcclxuICAgICAgICB9XHJcbiAgICAgICAgY29udGludWVcclxuICAgICAgfVxyXG4gICAgICBuZXdDaGlsZFtfVG9wU25pcF0gKz0gJ1wiJyArIGtleSArICdcIjonICsgKHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKG5ld0NoaWxkW19Ub3BWYWx1ZXNdW2tleV0pKSArICcsJ1xyXG4gICAgfVxyXG4gICAgbmV3Q2hpbGQucGFyZW50ID0gdGhpc1xyXG4gICAgbmV3Q2hpbGRbX0hlYWRlclN0cmluZ3NdID0ge31cclxuICAgIG5ld0NoaWxkW19IZWFkZXJWYWx1ZXNdID0ge31cclxuICAgIGZvciAoY29uc3QgbGV2ZWwgaW4gdGhpc1tfT3B0aW9uc10ubGV2ZWxzKSB7XHJcbiAgICAgIG5ld0NoaWxkW19TZXRMZXZlbEhlYWRlcl0obGV2ZWwpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3Q2hpbGRcclxuICB9XHJcblxyXG4gIHN0cmluZ2lmeSAob2JqLCByZXBsYWNlciwgc3BhY2VyKSB7XHJcbiAgICByZXR1cm4gdGhpc1tfT3B0aW9uc10uc3RyaW5naWZ5RnVuY3Rpb24ob2JqLCByZXBsYWNlciwgc3BhY2VyKVxyXG4gIH1cclxuXHJcbiAganNvbiAoZGF0YSkge1xyXG4gICAgY29uc29sZS5sb2codGhpc1tfT3B0aW9uc10uc3RyaW5naWZ5RnVuY3Rpb24oZGF0YSwgbnVsbCwgMikpXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBlcmpcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==