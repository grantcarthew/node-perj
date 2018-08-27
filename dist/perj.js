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
/***/ (function(module, exports) {

module.exports = notationCopy

function notationCopy (target, ...sources) {
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

    if (type === 'object' || type === 'function') {
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

      for (const name in src) {
        const result = notationCopyRecursive({}, src[name])
        if (result !== undefined) { tgt[name] = result }
      }
      return tgt
    }

    return undefined
  }
}


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
        } else if (item == null) {
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
          if (type === 'undefined') {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QZXJqL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9QZXJqL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1BlcmovLi9zcmMvbm90YXRpb24tY29weS5qcyIsIndlYnBhY2s6Ly9QZXJqLy4vc3JjL29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vUGVyai8uL3NyYy9wZXJqLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxTQUFTO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QjtBQUM3QixzQkFBc0I7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLGdCQUFnQjs7QUFFaEI7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULHNCQUFzQjtBQUN0QjtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6InBlcmouanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJQZXJqXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlBlcmpcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGVyai5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gbm90YXRpb25Db3B5XHJcblxyXG5mdW5jdGlvbiBub3RhdGlvbkNvcHkgKHRhcmdldCwgLi4uc291cmNlcykge1xyXG4gIGNvbnN0IG1heENhbGxzID0gMjAwMFxyXG4gIGxldCBjYWxsc1xyXG4gIGNvbnN0IHNlZW4gPSBuZXcgV2Vha1NldCgpXHJcbiAgZm9yIChjb25zdCBzb3VyY2Ugb2Ygc291cmNlcykge1xyXG4gICAgY2FsbHMgPSAwXHJcbiAgICBub3RhdGlvbkNvcHlSZWN1cnNpdmUodGFyZ2V0LCBzb3VyY2UpXHJcbiAgICBpZiAoY2FsbHMgPiBtYXhDYWxscykge1xyXG4gICAgICBjb25zb2xlLndhcm4oYFtQZXJqXSBNYXhpbXVtIG9mICR7bWF4Q2FsbHN9IHJlY3Vyc2l2ZSBjYWxscyBoYXMgYmVlbiByZWFjaGVkLmApXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0YXJnZXRcclxuXHJcbiAgZnVuY3Rpb24gbm90YXRpb25Db3B5UmVjdXJzaXZlICh0Z3QsIHNyYykge1xyXG4gICAgaWYgKGNhbGxzKysgPiBtYXhDYWxscykgeyByZXR1cm4gfVxyXG4gICAgaWYgKHNyYyA9PSBudWxsKSB7IHJldHVybiBzcmMgfVxyXG4gICAgY29uc3QgdHlwZSA9IHR5cGVvZiBzcmNcclxuICAgIGlmICh0eXBlID09PSAnc3RyaW5nJyB8fFxyXG4gICAgICAgIHR5cGUgPT09ICdudW1iZXInIHx8XHJcbiAgICAgICAgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIHJldHVybiBzcmNcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBpZiAoc2Vlbi5oYXMoc3JjKSkgeyByZXR1cm4gJ1tDaXJjdWxhcl0nIH1cclxuICAgICAgc2Vlbi5hZGQoc3JjKVxyXG5cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc3JjKSkge1xyXG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNyYy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgbmV3QXJyYXlbaV0gPSBub3RhdGlvbkNvcHlSZWN1cnNpdmUoe30sIHNyY1tpXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzcmMgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHNyY1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc3JjIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgUmVmbGVjdC5vd25LZXlzKHNyYykpIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5vdGF0aW9uQ29weVJlY3Vyc2l2ZSh7fSwgc3JjW25hbWVdKVxyXG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7IHRndFtuYW1lXSA9IHJlc3VsdCB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0Z3QubWVzc2FnZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0Z3QubWVzc2FnZSA9ICdUaGUgYXBwbGljYXRpb24gaGFzIGVuY291bnRlcmVkIGFuIHVua25vd24gZXJyb3IuJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGd0Lm5hbWUgPT09IHVuZGVmaW5lZCkgeyB0Z3QubmFtZSA9ICdFcnJvcicgfVxyXG4gICAgICAgIHJldHVybiB0Z3RcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChjb25zdCBuYW1lIGluIHNyYykge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5vdGF0aW9uQ29weVJlY3Vyc2l2ZSh7fSwgc3JjW25hbWVdKVxyXG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkgeyB0Z3RbbmFtZV0gPSByZXN1bHQgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0Z3RcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IG5vdGF0aW9uQ29weSA9IHJlcXVpcmUoJy4vbm90YXRpb24tY29weScpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBsZXZlbHM6IHtcclxuICAgIGZhdGFsOiA2MCxcclxuICAgIGVycm9yOiA1MCxcclxuICAgIHdhcm46IDQwLFxyXG4gICAgaW5mbzogMzAsXHJcbiAgICBkZWJ1ZzogMjAsXHJcbiAgICB0cmFjZTogMTBcclxuICB9LFxyXG4gIGxldmVsOiAnaW5mbycsXHJcbiAgbGV2ZWxLZXk6ICdsZXZlbCcsXHJcbiAgbGV2ZWxLZXlFbmFibGVkOiB0cnVlLFxyXG4gIGxldmVsTnVtYmVyS2V5OiAnbHZsJyxcclxuICBsZXZlbE51bWJlcktleUVuYWJsZWQ6IHRydWUsXHJcbiAgZGF0ZVRpbWVLZXk6ICd0aW1lJyxcclxuICBkYXRlVGltZUZ1bmN0aW9uLFxyXG4gIG1lc3NhZ2VLZXk6ICdtc2cnLFxyXG4gIGRhdGFLZXk6ICdkYXRhJyxcclxuICBzZXBhcmF0b3JTdHJpbmc6ICc6JyxcclxuICBzZXJpYWxpemVyczogZmFsc2UsXHJcbiAgc2VyaWFsaXplRXJyb3JGdW5jdGlvbixcclxuICBzdHJpbmdpZnlGdW5jdGlvbixcclxuICBwYXNzVGhyb3VnaDogZmFsc2UsXHJcbiAgd3JpdGU6IGRlZmF1bHRXcml0ZXIoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBkYXRlVGltZUZ1bmN0aW9uICgpIHtcclxuICAvLyBSZXR1cm5zIGVwb2NoIHRpbWUuXHJcbiAgcmV0dXJuIERhdGUubm93KClcclxufVxyXG5cclxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlciAoKSB7XHJcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJlxyXG4gICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xyXG4gICAgcmV0dXJuIHByb2Nlc3Muc3Rkb3V0LndyaXRlLmJpbmQocHJvY2Vzcy5zdGRvdXQpXHJcbiAgfVxyXG4gIHJldHVybiBjb25zb2xlLmxvZ1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdHJpbmdpZnlGdW5jdGlvbiAob2JqLCByZXBsYWNlciwgc3BhY2VyKSB7XHJcbiAgaWYgKG9iaiA9PSBudWxsKSB7IHJldHVybiBudWxsIH1cclxuICBjb25zdCB0eXBlID0gdHlwZW9mIG9ialxyXG4gIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaiwgcmVwbGFjZXIsIHNwYWNlcilcclxuICB9XHJcbiAgaWYgKHR5cGUgPT09ICdudW1iZXInIHx8XHJcbiAgICAgIHR5cGUgPT09ICdib29sZWFuJykge1xyXG4gICAgcmV0dXJuIG9ialxyXG4gIH1cclxuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICBsZXQgb2JqSnNvbiA9ICdbJ1xyXG4gICAgY29uc3QgbGFzdCA9IG9iai5sZW5ndGggLSAxXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICBvYmpKc29uICs9IHN0cmluZ2lmeUZ1bmN0aW9uKG9ialtpXSlcclxuICAgICAgaWYgKGkgPCBsYXN0KSB7IG9iakpzb24gKz0gJywnIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvYmpKc29uICsgJ10nXHJcbiAgfVxyXG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShub3RhdGlvbkNvcHkoe30sIG9iaiksIHJlcGxhY2VyLCBzcGFjZXIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlcmlhbGl6ZUVycm9yRnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgcmV0dXJuIG5vdGF0aW9uQ29weSh7fSwgdmFsdWUpXHJcbn1cclxuIiwiY29uc3QgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKVxyXG5jb25zdCBub3RhdGlvbkNvcHkgPSByZXF1aXJlKCcuL25vdGF0aW9uLWNvcHknKVxyXG5cclxuLy8gU3ltYm9scyBmb3IgZnVuY3Rpb25zIGFuZCB2YWx1ZXNcclxuY29uc3QgX1NwbGl0T3B0aW9ucyA9IFN5bWJvbCgnU3BsaXRPcHRpb25zJylcclxuY29uc3QgX09wdGlvbnMgPSBTeW1ib2woJ09wdGlvbnMnKVxyXG5jb25zdCBfVG9wU25pcCA9IFN5bWJvbCgnVG9wU25pcCcpXHJcbmNvbnN0IF9Ub3BWYWx1ZXMgPSBTeW1ib2woJ1RvcFZhbHVlcycpXHJcbmNvbnN0IF9Ub3BJc1ByaW1pdGl2ZSA9IFN5bWJvbCgnVG9wSXNQcmltaXRpdmUnKVxyXG5jb25zdCBfSGVhZGVyU3RyaW5ncyA9IFN5bWJvbCgnSGVhZGVyU3RyaW5ncycpXHJcbmNvbnN0IF9IZWFkZXJWYWx1ZXMgPSBTeW1ib2woJ0hlYWRlclZhbHVlcycpXHJcbmNvbnN0IF9TZXRMZXZlbEhlYWRlciA9IFN5bWJvbCgnU2V0TGV2ZWxIZWFkZXInKVxyXG5jb25zdCBfU2V0TGV2ZWxGdW5jdGlvbiA9IFN5bWJvbCgnU2V0TGV2ZWxGdW5jdGlvbicpXHJcblxyXG4vKlxyXG5Db2RlIFN1bW1hcnk6XHJcbkZvbGxvd2luZyBhcmUgcG9pbnRzIG9mIGludGVyZXN0IGFyb3VuZCB0aGUgcGVyaiBjb2RlIGNob2ljZXMuXHJcbi0gU3ltYm9scyB1c2VkIHRvIGhpZGUgaW50ZXJuYWwgcHJvcGVydGllcyBhbmQgbWV0aG9kcy5cclxuLSBNdWx0aXBsZSBTeW1ib2xzIGR1ZSB0byBtYWpvciBwZXJmb3JtYW5jZSBoaXQgaWYgdXNpbmcgbmVzdGVkLlxyXG4tIERlZXBseSBuZXN0ZWQgJ2lmJyBhbmQgJ2Zvcicgc3RhdGVtZW50cyBkdWUgdG8gcGVyZm9ybWFuY2UgYmVuaWZpdHMuXHJcbi0gU29tZSBtaW5vciBkdXBsaWNhdGlvbiBkdWUgdG8gcGVyZm9ybWFuY2UgYmVuaWZpdHMuXHJcblxyXG5TeW1ib2wgU3VtbWFyeTpcclxuX1NwbGl0T3B0aW9uczogPEZ1bmN0aW9uPlxyXG4gIFVzZWQgdG8gc3BsaXQgdGhlIHVzZXIgb3B0aW9ucyBmcm9tIHRvcCBsZXZlbCBwcm9wZXJ0aWVzLlxyXG4gIEhlbHBzIHRvIGFic3RyYWN0IHRoZSBzcGxpdCBmdW5jdGlvbiBvdXQgb2YgdGhlIGNvbnN0cnVjdG9yLlxyXG5cclxuX09wdGlvbnM6IDxPYmplY3Q+XHJcbiAgVGhpcyBob2xkcyBhbiBPYmplY3Qgd2l0aCB0aGUgZGVmYXVsdCBvciBjdXN0b20gb3B0aW9ucy5cclxuXHJcbl9Ub3BTbmlwOiA8U3RyaW5nPlxyXG4gIFRoaXMgaG9sZHMgYSBKU09OIHNuaXBwZXQgb2YgdGhlIHVzZXIgc3VwcGxpZWQgdG9wIGxldmVsIHByb3BlcnRpZXMuXHJcblxyXG5fVG9wVmFsdWVzOiA8T2JqZWN0PlxyXG4gIFRoaXMgaG9sZHMgdGhlIHVzZXIgc3VwcGxpZWQgdG9wIGxldmVsIHByb3Blcmllcy5cclxuICBJdCBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBfVG9wU25pcCBzdHJpbmcgYW5kIHdoZW5cclxuICAncGFzc1Rocm91Z2gnIGlzIGVuYWJsZWQuXHJcblxyXG5fVG9wSXNQcmltaXRpdmU6IDxCb29sZWFuPlxyXG4gIE9iamVjdCBjb3B5IGlzIGEgcmVhbCBwaWcgdG8gd29yayB3aXRoIGluIGEgaGlnaFxyXG4gIHBlcmZvcm1hbmNlIHByb2plY3QuIFRvIGF2b2lkIGNvcHlpbmcgb2JqZWN0cywgdGhpcyBmbGFnXHJcbiAgaXMgdXNlZCB0byBpbmRpY2F0ZSBpZiB0aGUgdXNlciBoYXMgYXNzaWduZWQgYSB0b3AgbGV2ZWwgcHJvcGVydHlcclxuICB3aXRoIHZhbHVlcyB0aGF0IGFyZSBvbmx5IHNpbXBsZSBwcmltaXRpdmVzIChzdHJpbmcsIG51bWJlciwgYm9vbGVhbikuXHJcbiAgSWYgdGhlIHVzZXIgYXNzaWduZWQgdmFsdWVzIGFyZSBhbGwgc2ltcGxlIHByaW1pdGl2ZXMsIGEgJ2ZvcicgbG9vcFxyXG4gIGlzIGZhc3RlciB0byBkdXBsaWNhdGUgYW4gb2JqZWN0LlxyXG4gIFRoaXMgZmxhZyBpcyBhbHNvIHNldCB0byBmYWxzZSBpZiB0aGUgdXNlciBzdXBwbGllcyBhIGN1c3RvbVxyXG4gIHN0cmluZ2lmeSBmdW5jdGlvbi5cclxuXHJcbl9IZWFkZXJTdHJpbmdzOiA8T2JqZWN0PlxyXG4gIFRoZSBoZWFkZXIgZm9yIGVhY2ggbG9nIGxldmVsIGlzIHRoZSBzYW1lIHN1Y2ggYXM6XHJcbiAge1wibGV2ZWxcIjpcImVycm9yXCIsXCJsdmxcIjo1MCxcInRpbWVcIjoxNTI1NjQzMjkxNzE2XHJcbiAgVGhpcyBjYWNoZXMgdGhlIGxldmVsIGhlYWRlcnMuXHJcblxyXG5fSGVhZGVyVmFsdWVzOiA8T2JqZWN0PlxyXG4gIE9ubHkgdXNlZCB3aGVuICdwYXNzVGhyb3VnaCcgaXMgZW5hYmxlZC5cclxuICBQZXJtaXRzIHJlYnVpbGRpbmcgdGhlIEpTT04gb2JqZWN0IGZvciBvdXRwdXQuXHJcblxyXG5fU2V0TGV2ZWxIZWFkZXI6IDxGdW5jdGlvbj5cclxuICBIb2xkcyB0aGUgZnVuY3Rpb24gdXNlZCB0byBidWlsZCB0aGUgbGV2ZWwgaGVhZGVyLlxyXG5cclxuX1NldExldmVsRnVuY3Rpb246IDxGdW5jdGlvbj5cclxuICBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIGxldmVsIGZ1bmN0aW9ucy5cclxuKi9cclxuXHJcbmNsYXNzIFBlcmoge1xyXG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucyAhPSBudWxsICYmIG9wdGlvbnMuY29uc3RydWN0b3IgIT09IE9iamVjdCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGUgb3B0aW9ucyBvYmplY3QgdG8gY3JlYXRlIGEgbG9nZ2VyLicpXHJcbiAgICB9XHJcbiAgICB0aGlzW19PcHRpb25zXSA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zKVxyXG4gICAgdGhpc1tfVG9wU25pcF0gPSAnJ1xyXG4gICAgdGhpc1tfVG9wVmFsdWVzXSA9IHt9XHJcbiAgICB0aGlzW19Ub3BJc1ByaW1pdGl2ZV0gPSB0cnVlXHJcbiAgICB0aGlzW19TcGxpdE9wdGlvbnNdKG9wdGlvbnMpXHJcbiAgICB0aGlzW19IZWFkZXJTdHJpbmdzXSA9IHt9XHJcbiAgICB0aGlzW19IZWFkZXJWYWx1ZXNdID0ge31cclxuICAgIGZvciAoY29uc3QgbGV2ZWwgaW4gdGhpc1tfT3B0aW9uc10ubGV2ZWxzKSB7XHJcbiAgICAgIHRoaXNbX1NldExldmVsSGVhZGVyXShsZXZlbClcclxuICAgICAgdGhpc1tfU2V0TGV2ZWxGdW5jdGlvbl0obGV2ZWwpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgbGV2ZWwgKCkge1xyXG4gICAgcmV0dXJuIHRoaXNbX09wdGlvbnNdLmxldmVsXHJcbiAgfVxyXG5cclxuICBzZXQgbGV2ZWwgKGxldmVsKSB7XHJcbiAgICBpZiAoISh0aGlzW19PcHRpb25zXS5sZXZlbHMuaGFzT3duUHJvcGVydHkobGV2ZWwpKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBsZXZlbCBvcHRpb24gbXVzdCBiZSBhIHZhbGlkIGtleSBpbiB0aGUgbGV2ZWxzIG9iamVjdC4nKVxyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KF9PcHRpb25zKSkge1xyXG4gICAgICAvLyBBdHRhY2hpbmcgdGhlIG9wdGlvbnMgb2JqZWN0IHRvIHRoaXMgaW5zdGFuY2VcclxuICAgICAgdGhpc1tfT3B0aW9uc10gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzW19PcHRpb25zXSlcclxuICAgIH1cclxuICAgIHRoaXNbX09wdGlvbnNdLmxldmVsID0gbGV2ZWxcclxuICB9XHJcblxyXG4gIGdldCBsZXZlbHMgKCkge1xyXG4gICAgcmV0dXJuIHRoaXNbX09wdGlvbnNdLmxldmVsc1xyXG4gIH1cclxuXHJcbiAgYWRkTGV2ZWwgKG5ld0xldmVscykge1xyXG4gICAgZm9yIChjb25zdCBsZXZlbCBpbiBuZXdMZXZlbHMpIHtcclxuICAgICAgaWYgKHRoaXNbbGV2ZWxdKSB7IGNvbnRpbnVlIH1cclxuICAgICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxzW2xldmVsXSA9IG5ld0xldmVsc1tsZXZlbF1cclxuICAgICAgdGhpc1tfU2V0TGV2ZWxIZWFkZXJdKGxldmVsKVxyXG4gICAgICB0aGlzW19TZXRMZXZlbEZ1bmN0aW9uXShsZXZlbClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCB3cml0ZSAoKSB7XHJcbiAgICByZXR1cm4gdGhpc1tfT3B0aW9uc10ud3JpdGVcclxuICB9XHJcblxyXG4gIFtfU3BsaXRPcHRpb25zXSAob3B0aW9ucykge1xyXG4gICAgaWYgKCFvcHRpb25zKSB7IHJldHVybiB9XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRpb25zKSB7XHJcbiAgICAgIGlmIChkZWZhdWx0T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gJ2xldmVsJykge1xyXG4gICAgICAgICAgdGhpcy5sZXZlbCA9IG9wdGlvbnNba2V5XVxyXG4gICAgICAgICAgY29udGludWVcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGtleSA9PT0gJ3N0cmluZ2lmeUZ1bmN0aW9uJykge1xyXG4gICAgICAgICAgdGhpc1tfVG9wSXNQcmltaXRpdmVdID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpc1tfT3B0aW9uc11ba2V5XSA9IG9wdGlvbnNba2V5XVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2Ygb3B0aW9uc1trZXldXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICB0aGlzW19Ub3BTbmlwXSArPSAnXCInICsga2V5ICsgJ1wiOlwiJyArIG9wdGlvbnNba2V5XSArICdcIiwnXHJcbiAgICAgICAgICB0aGlzW19Ub3BWYWx1ZXNdW2tleV0gPSBvcHRpb25zW2tleV1cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgdGhpc1tfVG9wU25pcF0gKz0gJ1wiJyArIGtleSArICdcIjonICsgb3B0aW9uc1trZXldICsgJywnXHJcbiAgICAgICAgICB0aGlzW19Ub3BWYWx1ZXNdW2tleV0gPSBvcHRpb25zW2tleV1cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICB0aGlzW19Ub3BTbmlwXSArPSAnXCInICsga2V5ICsgJ1wiOm51bGwsJ1xyXG4gICAgICAgICAgdGhpc1tfVG9wVmFsdWVzXVtrZXldID0gbnVsbFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzW19Ub3BTbmlwXSArPSAnXCInICsga2V5ICsgJ1wiOicgKyB0aGlzW19PcHRpb25zXS5zdHJpbmdpZnlGdW5jdGlvbihvcHRpb25zW2tleV0pICsgJywnXHJcbiAgICAgICAgICB0aGlzW19Ub3BWYWx1ZXNdW2tleV0gPSBvcHRpb25zW2tleV1cclxuICAgICAgICAgIHRoaXNbX1RvcElzUHJpbWl0aXZlXSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBbX1NldExldmVsSGVhZGVyXSAobGV2ZWwpIHtcclxuICAgIHRoaXNbX0hlYWRlclN0cmluZ3NdW2xldmVsXSA9ICd7J1xyXG4gICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxLZXlFbmFibGVkICYmICh0aGlzW19IZWFkZXJTdHJpbmdzXVtsZXZlbF0gKz0gJ1wiJyArIHRoaXNbX09wdGlvbnNdLmxldmVsS2V5ICsgJ1wiOlwiJyArIGxldmVsICsgJ1wiLCcpXHJcbiAgICB0aGlzW19PcHRpb25zXS5sZXZlbE51bWJlcktleUVuYWJsZWQgJiYgKHRoaXNbX0hlYWRlclN0cmluZ3NdW2xldmVsXSArPSAnXCInICsgdGhpc1tfT3B0aW9uc10ubGV2ZWxOdW1iZXJLZXkgKyAnXCI6JyArIHRoaXNbX09wdGlvbnNdLmxldmVsc1tsZXZlbF0gKyAnLCcpXHJcbiAgICB0aGlzW19Ub3BTbmlwXSAhPT0gJycgJiYgKHRoaXNbX0hlYWRlclN0cmluZ3NdW2xldmVsXSArPSB0aGlzW19Ub3BTbmlwXSlcclxuICAgIHRoaXNbX0hlYWRlclN0cmluZ3NdW2xldmVsXSArPSAnXCInICsgdGhpc1tfT3B0aW9uc10uZGF0ZVRpbWVLZXkgKyAnXCI6J1xyXG5cclxuICAgIGlmICh0aGlzW19PcHRpb25zXS5wYXNzVGhyb3VnaCkge1xyXG4gICAgICBjb25zdCBsZXZlbE9iaiA9IHt9XHJcbiAgICAgIHRoaXNbX09wdGlvbnNdLmxldmVsS2V5RW5hYmxlZCAmJiAobGV2ZWxPYmpbdGhpc1tfT3B0aW9uc10ubGV2ZWxLZXldID0gbGV2ZWwpXHJcbiAgICAgIHRoaXNbX09wdGlvbnNdLmxldmVsTnVtYmVyS2V5RW5hYmxlZCAmJiAobGV2ZWxPYmpbdGhpc1tfT3B0aW9uc10ubGV2ZWxOdW1iZXJLZXldID0gdGhpc1tfT3B0aW9uc10ubGV2ZWxzW2xldmVsXSlcclxuICAgICAgdGhpc1tfSGVhZGVyVmFsdWVzXVtsZXZlbF0gPSBub3RhdGlvbkNvcHkobGV2ZWxPYmosIHRoaXNbX1RvcFZhbHVlc10pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBbX1NldExldmVsRnVuY3Rpb25dIChsZXZlbCkge1xyXG4gICAgdGhpc1tsZXZlbF0gPSBmdW5jdGlvbiAoLi4uaXRlbXMpIHtcclxuICAgICAgaWYgKHRoaXNbX09wdGlvbnNdLmxldmVsc1t0aGlzW19PcHRpb25zXS5sZXZlbF0gPlxyXG4gICAgICAgIHRoaXNbX09wdGlvbnNdLmxldmVsc1tsZXZlbF0pIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBjb25zdCB0aW1lID0gdGhpc1tfT3B0aW9uc10uZGF0ZVRpbWVGdW5jdGlvbigpXHJcbiAgICAgIGxldCBtc2cgPSAnJ1xyXG4gICAgICBsZXQgZGF0YSA9IG51bGxcclxuICAgICAgbGV0IGRhdGFKc29uID0gJ251bGwnXHJcbiAgICAgIGxldCBpc0Vycm9yID0gZmFsc2VcclxuXHJcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IChpdGVtKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzW19PcHRpb25zXS5zZXJpYWxpemVycykgeyByZXR1cm4gaXRlbSB9XHJcbiAgICAgICAgaWYgKGl0ZW0gPT0gbnVsbCkgeyByZXR1cm4gbnVsbCB9XHJcbiAgICAgICAgY29uc3QgZ3JhZGVkID0ge31cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBpdGVtKSB7XHJcbiAgICAgICAgICBsZXQgdmFsdWUgPSBpdGVtW2tleV1cclxuICAgICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5ICYmIGl0ZW0uaGFzT3duUHJvcGVydHkoa2V5KSAmJiB0aGlzW19PcHRpb25zXS5zZXJpYWxpemVyc1trZXldKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGhpc1tfT3B0aW9uc10uc2VyaWFsaXplcnNba2V5XSh2YWx1ZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGdyYWRlZFtrZXldID0gdmFsdWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdyYWRlZFxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgLy8gU2luZ2xlIGl0ZW0gcHJvY2Vzc2luZ1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1swXVxyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgaXRlbVxyXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgbXNnID0gaXRlbVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAvLyBVbmRlZmluZWQgb3IgbnVsbCwga2VlcCBkZWZhdWx0cy5cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgZGF0YSA9IGl0ZW1cclxuICAgICAgICAgIGRhdGFKc29uID0gJycgKyBpdGVtXHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICAgIGlzRXJyb3IgPSB0cnVlXHJcbiAgICAgICAgICBtc2cgPSBpdGVtLm1lc3NhZ2VcclxuICAgICAgICAgIGRhdGEgPSB0aGlzW19PcHRpb25zXS5zZXJpYWxpemVFcnJvckZ1bmN0aW9uKGl0ZW0pXHJcbiAgICAgICAgICBkYXRhSnNvbiA9IHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKGRhdGEpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRhdGEgPSBzZXJpYWxpemUoaXRlbSlcclxuICAgICAgICAgIGRhdGFKc29uID0gdGhpc1tfT3B0aW9uc10uc3RyaW5naWZ5RnVuY3Rpb24oZGF0YSlcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIC8vIE11bHRpcGxlIGl0ZW0gcHJvY2Vzc2luZ1xyXG4gICAgICAgIGRhdGEgPSBbXVxyXG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBpdGVtXHJcbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgaWYgKG1zZykgeyBkYXRhLnB1c2goaXRlbSkgfSBlbHNlIHsgbXNnID0gaXRlbSB9XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgZGF0YS5wdXNoKG51bGwpXHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICAgIGlzRXJyb3IgPSB0cnVlXHJcbiAgICAgICAgICAgIGRhdGEucHVzaCh0aGlzW19PcHRpb25zXS5zZXJpYWxpemVFcnJvckZ1bmN0aW9uKGl0ZW0pKVxyXG4gICAgICAgICAgICBpZiAoIW1zZykgeyBtc2cgPSBpdGVtLm1lc3NhZ2UgfVxyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRhdGEucHVzaChzZXJpYWxpemUoaXRlbSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgIGRhdGEgPSBkYXRhWzBdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGFKc29uID0gdGhpc1tfT3B0aW9uc10uc3RyaW5naWZ5RnVuY3Rpb24oZGF0YSlcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IGpzb24gPSB0aGlzW19IZWFkZXJTdHJpbmdzXVtsZXZlbF0gKyB0aW1lICtcclxuICAgICAgICAgICcsXCInICsgdGhpc1tfT3B0aW9uc10ubWVzc2FnZUtleSArICdcIjpcIicgKyBtc2cgK1xyXG4gICAgICAgICAgJ1wiLFwiJyArIHRoaXNbX09wdGlvbnNdLmRhdGFLZXkgKyAnXCI6JyArIGRhdGFKc29uXHJcbiAgICAgIGlmIChpc0Vycm9yKSB7IGpzb24gKz0gJyxcImVycm9yXCI6dHJ1ZScgfVxyXG4gICAgICBqc29uICs9ICd9XFxuJ1xyXG5cclxuICAgICAgaWYgKHRoaXNbX09wdGlvbnNdLnBhc3NUaHJvdWdoKSB7XHJcbiAgICAgICAgY29uc3Qgb2JqID0gbm90YXRpb25Db3B5KHt9LCB0aGlzW19IZWFkZXJWYWx1ZXNdW2xldmVsXSwge1xyXG4gICAgICAgICAgW3RoaXNbX09wdGlvbnNdLmRhdGVUaW1lS2V5XTogdGltZSxcclxuICAgICAgICAgIFt0aGlzW19PcHRpb25zXS5tZXNzYWdlS2V5XTogbXNnLFxyXG4gICAgICAgICAgW3RoaXNbX09wdGlvbnNdLmRhdGFLZXldOiBkYXRhXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoaXNFcnJvcikgeyBvYmouZXJyb3IgPSB0cnVlIH1cclxuICAgICAgICB0aGlzW19PcHRpb25zXS53cml0ZShqc29uLCBvYmopXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpc1tfT3B0aW9uc10ud3JpdGUoanNvbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hpbGQgKHRvcHMpIHtcclxuICAgIGlmICh0b3BzID09IG51bGwgfHwgdG9wcy5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignUHJvdmlkZSB0b3AgbGV2ZWwgYXJndW1lbnRzIG9iamVjdCB0byBjcmVhdGUgYSBjaGlsZCBsb2dnZXIuJylcclxuICAgIH1cclxuICAgIGNvbnN0IG5ld0NoaWxkID0gT2JqZWN0LmNyZWF0ZSh0aGlzKVxyXG4gICAgaWYgKHRoaXNbX1RvcElzUHJpbWl0aXZlXSkge1xyXG4gICAgICAvLyBBdm9pZGluZyBPYmplY3QuYXNzaWduIHdoaWNoIGlzIG5vdCBuZWVkZWRcclxuICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc10gPSB7fVxyXG4gICAgICBuZXdDaGlsZFtfVG9wSXNQcmltaXRpdmVdID0gdHJ1ZVxyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzW19Ub3BWYWx1ZXNdKSB7XHJcbiAgICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XSA9IHRoaXNbX1RvcFZhbHVlc11ba2V5XVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBUb3AgdmFsdWUgaXMgYW4gb2JqZWN0LiBUYWtlIHRoZSBvYmplY3QgY29weSBoaXQgbGlrZSBhIG1hbi5cclxuICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc10gPSBub3RhdGlvbkNvcHkoe30sIHRoaXNbX1RvcFZhbHVlc10pXHJcbiAgICAgIG5ld0NoaWxkW19Ub3BJc1ByaW1pdGl2ZV0gPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9wcykge1xyXG4gICAgICAvLyBPcHRpb25zIGFuZCBrZXkgbmFtZXMgYXJlIG5vdCB2YWxpZCwgc2tpcHBpbmcuXHJcbiAgICAgIGlmIChkZWZhdWx0T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8XHJcbiAgICAgICAgICB0aGlzW19PcHRpb25zXS5sZXZlbEtleSA9PT0ga2V5IHx8XHJcbiAgICAgICAgICB0aGlzW19PcHRpb25zXS5sZXZlbE51bWJlcktleSA9PT0ga2V5IHx8XHJcbiAgICAgICAgICB0aGlzW19PcHRpb25zXS5kYXRlVGltZUtleSA9PT0ga2V5IHx8XHJcbiAgICAgICAgICB0aGlzW19PcHRpb25zXS5tZXNzYWdlS2V5ID09PSBrZXkgfHxcclxuICAgICAgICAgIHRoaXNbX09wdGlvbnNdLmRhdGFLZXkgPT09IGtleSkgeyBjb250aW51ZSB9XHJcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdG9wc1trZXldXHJcbiAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJlxyXG4gICAgICAgICAgdGhpc1tfVG9wVmFsdWVzXS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmXHJcbiAgICAgICAgICB0eXBlb2YgdGhpc1tfVG9wVmFsdWVzXVtrZXldID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIC8vIE5ldyB0b3Aga2V5IGlzIHRoZSBzYW1lIGFzIHBhcmVudCBhbmQgaXMgYSBzdHJpbmcuIEFwcGVuZGluZyBzZXBhcmF0b3Igc3RyaW5nIGFuZCBuZXcgdmFsdWUuXHJcbiAgICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XSA9IHRoaXNbX1RvcFZhbHVlc11ba2V5XSArIHRoaXNbX09wdGlvbnNdLnNlcGFyYXRvclN0cmluZyArIHRvcHNba2V5XVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XSA9IG51bGxcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdDaGlsZFtfVG9wVmFsdWVzXVtrZXldID0gdG9wc1trZXldXHJcbiAgICAgICAgLy8gTm90IHVzaW5nICYmIHNvIHdlIGNhbiBleGl0IGVhcmx5XHJcbiAgICAgICAgaWYgKCEodHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ251bWJlcicgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSkge1xyXG4gICAgICAgICAgdGhpc1tfVG9wSXNQcmltaXRpdmVdID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG5ld0NoaWxkW19Ub3BTbmlwXSA9ICcnXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBuZXdDaGlsZFtfVG9wVmFsdWVzXSkge1xyXG4gICAgICBpZiAobmV3Q2hpbGRbX1RvcElzUHJpbWl0aXZlXSkge1xyXG4gICAgICAgIC8vIFByaXZpdGl2ZSBKU09OLnN0cmluZ2lmeS4gQ2hlYXAuXHJcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBuZXdDaGlsZFtfVG9wVmFsdWVzXVtrZXldXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICBuZXdDaGlsZFtfVG9wU25pcF0gKz0gJ1wiJyArIGtleSArICdcIjpcIicgKyBuZXdDaGlsZFtfVG9wVmFsdWVzXVtrZXldICsgJ1wiLCdcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV3Q2hpbGRbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6JyArIG5ld0NoaWxkW19Ub3BWYWx1ZXNdW2tleV0gKyAnLCdcclxuICAgICAgICB9XHJcbiAgICAgICAgY29udGludWVcclxuICAgICAgfVxyXG4gICAgICBuZXdDaGlsZFtfVG9wU25pcF0gKz0gJ1wiJyArIGtleSArICdcIjonICsgKHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKG5ld0NoaWxkW19Ub3BWYWx1ZXNdW2tleV0pKSArICcsJ1xyXG4gICAgfVxyXG4gICAgbmV3Q2hpbGQucGFyZW50ID0gdGhpc1xyXG4gICAgbmV3Q2hpbGRbX0hlYWRlclN0cmluZ3NdID0ge31cclxuICAgIG5ld0NoaWxkW19IZWFkZXJWYWx1ZXNdID0ge31cclxuICAgIGZvciAoY29uc3QgbGV2ZWwgaW4gdGhpc1tfT3B0aW9uc10ubGV2ZWxzKSB7XHJcbiAgICAgIG5ld0NoaWxkW19TZXRMZXZlbEhlYWRlcl0obGV2ZWwpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3Q2hpbGRcclxuICB9XHJcblxyXG4gIHN0cmluZ2lmeSAob2JqLCByZXBsYWNlciwgc3BhY2VyKSB7XHJcbiAgICByZXR1cm4gdGhpc1tfT3B0aW9uc10uc3RyaW5naWZ5RnVuY3Rpb24ob2JqLCByZXBsYWNlciwgc3BhY2VyKVxyXG4gIH1cclxuXHJcbiAganNvbiAoZGF0YSkge1xyXG4gICAgY29uc29sZS5sb2codGhpc1tfT3B0aW9uc10uc3RyaW5naWZ5RnVuY3Rpb24oZGF0YSwgbnVsbCwgMikpXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBlcmpcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==