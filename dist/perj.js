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
  const seen = new WeakSet()
  for (const source of sources) {
    notationCopyRecursive(target, source)
  }
  return target

  function notationCopyRecursive (tgt, src) {
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

function stringifyFunction (value) {
  if (value == null || value.constructor !== Object) {
    return JSON.stringify(value)
  }
  return JSON.stringify(notationCopy({}, value))
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
        const obj = notationCopy({}, this[_HeaderValues][level], {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QZXJqL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9QZXJqL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1BlcmovLi9zcmMvbm90YXRpb24tY29weS5qcyIsIndlYnBhY2s6Ly9QZXJqLy4vc3JjL29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vUGVyai8uL3NyYy9wZXJqLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjs7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJwZXJqLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUGVyalwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJQZXJqXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BlcmouanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IG5vdGF0aW9uQ29weVxyXG5cclxuZnVuY3Rpb24gbm90YXRpb25Db3B5ICh0YXJnZXQsIC4uLnNvdXJjZXMpIHtcclxuICBjb25zdCBzZWVuID0gbmV3IFdlYWtTZXQoKVxyXG4gIGZvciAoY29uc3Qgc291cmNlIG9mIHNvdXJjZXMpIHtcclxuICAgIG5vdGF0aW9uQ29weVJlY3Vyc2l2ZSh0YXJnZXQsIHNvdXJjZSlcclxuICB9XHJcbiAgcmV0dXJuIHRhcmdldFxyXG5cclxuICBmdW5jdGlvbiBub3RhdGlvbkNvcHlSZWN1cnNpdmUgKHRndCwgc3JjKSB7XHJcbiAgICBpZiAoc3JjID09IG51bGwpIHsgcmV0dXJuIHNyYyB9XHJcbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIHNyY1xyXG4gICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnIHx8XHJcbiAgICAgICAgdHlwZSA9PT0gJ251bWJlcicgfHxcclxuICAgICAgICB0eXBlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgcmV0dXJuIHNyY1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAoc2Vlbi5oYXMoc3JjKSkgeyByZXR1cm4gJ1tDaXJjdWxhcl0nIH1cclxuICAgICAgc2Vlbi5hZGQoc3JjKVxyXG5cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc3JjKSkge1xyXG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNyYy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgbmV3QXJyYXlbaV0gPSBub3RhdGlvbkNvcHlSZWN1cnNpdmUoe30sIHNyY1tpXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzcmMgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHNyY1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc3JjIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgUmVmbGVjdC5vd25LZXlzKHNyYykpIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5vdGF0aW9uQ29weVJlY3Vyc2l2ZSh7fSwgc3JjW25hbWVdKVxyXG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7IHRndFtuYW1lXSA9IHJlc3VsdCB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0Z3RcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChjb25zdCBuYW1lIGluIHNyYykge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5vdGF0aW9uQ29weVJlY3Vyc2l2ZSh7fSwgc3JjW25hbWVdKVxyXG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkgeyB0Z3RbbmFtZV0gPSByZXN1bHQgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0Z3RcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IG5vdGF0aW9uQ29weSA9IHJlcXVpcmUoJy4vbm90YXRpb24tY29weScpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBsZXZlbHM6IHtcclxuICAgIGZhdGFsOiA2MCxcclxuICAgIGVycm9yOiA1MCxcclxuICAgIHdhcm46IDQwLFxyXG4gICAgaW5mbzogMzAsXHJcbiAgICBkZWJ1ZzogMjAsXHJcbiAgICB0cmFjZTogMTBcclxuICB9LFxyXG4gIGxldmVsOiAnaW5mbycsXHJcbiAgbGV2ZWxLZXk6ICdsZXZlbCcsXHJcbiAgbGV2ZWxLZXlFbmFibGVkOiB0cnVlLFxyXG4gIGxldmVsTnVtYmVyS2V5OiAnbHZsJyxcclxuICBsZXZlbE51bWJlcktleUVuYWJsZWQ6IHRydWUsXHJcbiAgZGF0ZVRpbWVLZXk6ICd0aW1lJyxcclxuICBkYXRlVGltZUZ1bmN0aW9uLFxyXG4gIG1lc3NhZ2VLZXk6ICdtc2cnLFxyXG4gIGRhdGFLZXk6ICdkYXRhJyxcclxuICBzZXBhcmF0b3JTdHJpbmc6ICc6JyxcclxuICBzZXJpYWxpemVyczogZmFsc2UsXHJcbiAgc2VyaWFsaXplRXJyb3JGdW5jdGlvbixcclxuICBzdHJpbmdpZnlGdW5jdGlvbixcclxuICBwYXNzVGhyb3VnaDogZmFsc2UsXHJcbiAgd3JpdGU6IGRlZmF1bHRXcml0ZXIoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBkYXRlVGltZUZ1bmN0aW9uICgpIHtcclxuICAvLyBSZXR1cm5zIGVwb2NoIHRpbWUuXHJcbiAgcmV0dXJuIERhdGUubm93KClcclxufVxyXG5cclxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlciAoKSB7XHJcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJlxyXG4gICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xyXG4gICAgcmV0dXJuIHByb2Nlc3Muc3Rkb3V0LndyaXRlLmJpbmQocHJvY2Vzcy5zdGRvdXQpXHJcbiAgfVxyXG4gIHJldHVybiBjb25zb2xlLmxvZ1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdHJpbmdpZnlGdW5jdGlvbiAodmFsdWUpIHtcclxuICBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZS5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpXHJcbiAgfVxyXG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShub3RhdGlvbkNvcHkoe30sIHZhbHVlKSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2VyaWFsaXplRXJyb3JGdW5jdGlvbiAodmFsdWUpIHtcclxuICByZXR1cm4gbm90YXRpb25Db3B5KHt9LCB2YWx1ZSlcclxufVxyXG4iLCJjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpXHJcbmNvbnN0IG5vdGF0aW9uQ29weSA9IHJlcXVpcmUoJy4vbm90YXRpb24tY29weScpXHJcblxyXG4vLyBTeW1ib2xzIGZvciBmdW5jdGlvbnMgYW5kIHZhbHVlc1xyXG5jb25zdCBfU3BsaXRPcHRpb25zID0gU3ltYm9sKCdTcGxpdE9wdGlvbnMnKVxyXG5jb25zdCBfT3B0aW9ucyA9IFN5bWJvbCgnT3B0aW9ucycpXHJcbmNvbnN0IF9Ub3BTbmlwID0gU3ltYm9sKCdUb3BTbmlwJylcclxuY29uc3QgX1RvcFZhbHVlcyA9IFN5bWJvbCgnVG9wVmFsdWVzJylcclxuY29uc3QgX1RvcElzUHJpbWl0aXZlID0gU3ltYm9sKCdUb3BJc1ByaW1pdGl2ZScpXHJcbmNvbnN0IF9IZWFkZXJTdHJpbmdzID0gU3ltYm9sKCdIZWFkZXJTdHJpbmdzJylcclxuY29uc3QgX0hlYWRlclZhbHVlcyA9IFN5bWJvbCgnSGVhZGVyVmFsdWVzJylcclxuY29uc3QgX1NldExldmVsSGVhZGVyID0gU3ltYm9sKCdTZXRMZXZlbEhlYWRlcicpXHJcbmNvbnN0IF9TZXRMZXZlbEZ1bmN0aW9uID0gU3ltYm9sKCdTZXRMZXZlbEZ1bmN0aW9uJylcclxuXHJcbi8qXHJcbkNvZGUgU3VtbWFyeTpcclxuRm9sbG93aW5nIGFyZSBwb2ludHMgb2YgaW50ZXJlc3QgYXJvdW5kIHRoZSBwZXJqIGNvZGUgY2hvaWNlcy5cclxuLSBTeW1ib2xzIHVzZWQgdG8gaGlkZSBpbnRlcm5hbCBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzLlxyXG4tIE11bHRpcGxlIFN5bWJvbHMgZHVlIHRvIG1ham9yIHBlcmZvcm1hbmNlIGhpdCBpZiB1c2luZyBuZXN0ZWQuXHJcbi0gRGVlcGx5IG5lc3RlZCAnaWYnIGFuZCAnZm9yJyBzdGF0ZW1lbnRzIGR1ZSB0byBwZXJmb3JtYW5jZSBiZW5pZml0cy5cclxuLSBTb21lIG1pbm9yIGR1cGxpY2F0aW9uIGR1ZSB0byBwZXJmb3JtYW5jZSBiZW5pZml0cy5cclxuXHJcblN5bWJvbCBTdW1tYXJ5OlxyXG5fU3BsaXRPcHRpb25zOiA8RnVuY3Rpb24+XHJcbiAgVXNlZCB0byBzcGxpdCB0aGUgdXNlciBvcHRpb25zIGZyb20gdG9wIGxldmVsIHByb3BlcnRpZXMuXHJcbiAgSGVscHMgdG8gYWJzdHJhY3QgdGhlIHNwbGl0IGZ1bmN0aW9uIG91dCBvZiB0aGUgY29uc3RydWN0b3IuXHJcblxyXG5fT3B0aW9uczogPE9iamVjdD5cclxuICBUaGlzIGhvbGRzIGFuIE9iamVjdCB3aXRoIHRoZSBkZWZhdWx0IG9yIGN1c3RvbSBvcHRpb25zLlxyXG5cclxuX1RvcFNuaXA6IDxTdHJpbmc+XHJcbiAgVGhpcyBob2xkcyBhIEpTT04gc25pcHBldCBvZiB0aGUgdXNlciBzdXBwbGllZCB0b3AgbGV2ZWwgcHJvcGVydGllcy5cclxuXHJcbl9Ub3BWYWx1ZXM6IDxPYmplY3Q+XHJcbiAgVGhpcyBob2xkcyB0aGUgdXNlciBzdXBwbGllZCB0b3AgbGV2ZWwgcHJvcGVyaWVzLlxyXG4gIEl0IGlzIHVzZWQgdG8gYnVpbGQgdGhlIF9Ub3BTbmlwIHN0cmluZyBhbmQgd2hlblxyXG4gICdwYXNzVGhyb3VnaCcgaXMgZW5hYmxlZC5cclxuXHJcbl9Ub3BJc1ByaW1pdGl2ZTogPEJvb2xlYW4+XHJcbiAgT2JqZWN0LmFzc2lnbiBpcyBhIHJlYWwgcGlnIHRvIHdvcmsgd2l0aCBpbiBhIGhpZ2hcclxuICBwZXJmb3JtYW5jZSBwcm9qZWN0LiBUbyBhdm9pZCB1c2luZyBPYmplY3QuYXNzaWduLCB0aGlzIGZsYWdcclxuICBpcyB1c2VkIHRvIGluZGljYXRlIGlmIHRoZSB1c2VyIGhhcyBhc3NpZ25lZCBhIHRvcCBsZXZlbCBwcm9wZXJ0eVxyXG4gIHdpdGggdmFsdWVzIHRoYXQgYXJlIG9ubHkgcHJpbWl0aXZlcyAoc3RyaW5nLCBudW1iZXIsIGJvb2xlYW4pLlxyXG4gIElmIHRoZSB1c2VyIGFzc2lnbmVkIHZhbHVlcyBhcmUgYWxsIHByaW1pdGl2ZSwgYSBzaW1wbGUgJ2ZvcicgbG9vcFxyXG4gIGlzIGZhc3RlciB0byBkdXBsaWNhdGUgYW4gb2JqZWN0IHRoYW4gdXNpbmcgT2JqZWN0LmFzc2lnbi5cclxuICBUaGlzIGZsYWcgaXMgYWxzbyBzZXQgdG8gZmFsc2UgaWYgdGhlIHVzZXIgc3VwcGxpZXMgYSBjdXN0b21cclxuICBzdHJpbmdpZnkgZnVuY3Rpb24uXHJcblxyXG5fSGVhZGVyU3RyaW5nczogPE9iamVjdD5cclxuICBUaGUgaGVhZGVyIGZvciBlYWNoIGxvZyBsZXZlbCBpcyB0aGUgc2FtZSBzdWNoIGFzOlxyXG4gIHtcImxldmVsXCI6XCJlcnJvclwiLFwibHZsXCI6NTAsXCJ0aW1lXCI6MTUyNTY0MzI5MTcxNlxyXG4gIFRoaXMgY2FjaGVzIHRoZSBsZXZlbCBoZWFkZXJzLlxyXG5cclxuX0hlYWRlclZhbHVlczogPE9iamVjdD5cclxuICBPbmx5IHVzZWQgd2hlbiAncGFzc1Rocm91Z2gnIGlzIGVuYWJsZWQuXHJcbiAgUGVybWl0cyByZWJ1aWxkaW5nIHRoZSBKU09OIG9iamVjdCBmb3Igb3V0cHV0LlxyXG5cclxuX1NldExldmVsSGVhZGVyOiA8RnVuY3Rpb24+XHJcbiAgSG9sZHMgdGhlIGZ1bmN0aW9uIHVzZWQgdG8gYnVpbGQgdGhlIGxldmVsIGhlYWRlci5cclxuXHJcbl9TZXRMZXZlbEZ1bmN0aW9uOiA8RnVuY3Rpb24+XHJcbiAgVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGdlbmVyYXRlIHRoZSBsZXZlbCBmdW5jdGlvbnMuXHJcbiovXHJcblxyXG5jbGFzcyBQZXJqIHtcclxuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMgIT0gbnVsbCAmJiBvcHRpb25zLmNvbnN0cnVjdG9yICE9PSBPYmplY3QpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlIG9wdGlvbnMgb2JqZWN0IHRvIGNyZWF0ZSBhIGxvZ2dlci4nKVxyXG4gICAgfVxyXG4gICAgdGhpc1tfT3B0aW9uc10gPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucylcclxuICAgIHRoaXNbX1RvcFNuaXBdID0gJydcclxuICAgIHRoaXNbX1RvcFZhbHVlc10gPSB7fVxyXG4gICAgdGhpc1tfVG9wSXNQcmltaXRpdmVdID0gdHJ1ZVxyXG4gICAgdGhpc1tfU3BsaXRPcHRpb25zXShvcHRpb25zKVxyXG4gICAgdGhpc1tfSGVhZGVyU3RyaW5nc10gPSB7fVxyXG4gICAgdGhpc1tfSGVhZGVyVmFsdWVzXSA9IHt9XHJcbiAgICBmb3IgKGNvbnN0IGxldmVsIGluIHRoaXNbX09wdGlvbnNdLmxldmVscykge1xyXG4gICAgICB0aGlzW19TZXRMZXZlbEhlYWRlcl0obGV2ZWwpXHJcbiAgICAgIHRoaXNbX1NldExldmVsRnVuY3Rpb25dKGxldmVsKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGxldmVsICgpIHtcclxuICAgIHJldHVybiB0aGlzW19PcHRpb25zXS5sZXZlbFxyXG4gIH1cclxuXHJcbiAgc2V0IGxldmVsIChsZXZlbCkge1xyXG4gICAgaWYgKCEodGhpc1tfT3B0aW9uc10ubGV2ZWxzLmhhc093blByb3BlcnR5KGxldmVsKSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgbGV2ZWwgb3B0aW9uIG11c3QgYmUgYSB2YWxpZCBrZXkgaW4gdGhlIGxldmVscyBvYmplY3QuJylcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eShfT3B0aW9ucykpIHtcclxuICAgICAgLy8gQXR0YWNoaW5nIHRoZSBvcHRpb25zIG9iamVjdCB0byB0aGlzIGluc3RhbmNlXHJcbiAgICAgIHRoaXNbX09wdGlvbnNdID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpc1tfT3B0aW9uc10pXHJcbiAgICB9XHJcbiAgICB0aGlzW19PcHRpb25zXS5sZXZlbCA9IGxldmVsXHJcbiAgfVxyXG5cclxuICBnZXQgbGV2ZWxzICgpIHtcclxuICAgIHJldHVybiB0aGlzW19PcHRpb25zXS5sZXZlbHNcclxuICB9XHJcblxyXG4gIGFkZExldmVsIChuZXdMZXZlbHMpIHtcclxuICAgIGZvciAoY29uc3QgbGV2ZWwgaW4gbmV3TGV2ZWxzKSB7XHJcbiAgICAgIGlmICh0aGlzW2xldmVsXSkgeyBjb250aW51ZSB9XHJcbiAgICAgIHRoaXNbX09wdGlvbnNdLmxldmVsc1tsZXZlbF0gPSBuZXdMZXZlbHNbbGV2ZWxdXHJcbiAgICAgIHRoaXNbX1NldExldmVsSGVhZGVyXShsZXZlbClcclxuICAgICAgdGhpc1tfU2V0TGV2ZWxGdW5jdGlvbl0obGV2ZWwpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgd3JpdGUgKCkge1xyXG4gICAgcmV0dXJuIHRoaXNbX09wdGlvbnNdLndyaXRlXHJcbiAgfVxyXG5cclxuICBbX1NwbGl0T3B0aW9uc10gKG9wdGlvbnMpIHtcclxuICAgIGlmICghb3B0aW9ucykgeyByZXR1cm4gfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9ucykge1xyXG4gICAgICBpZiAoZGVmYXVsdE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIGlmIChrZXkgPT09ICdsZXZlbCcpIHtcclxuICAgICAgICAgIHRoaXMubGV2ZWwgPSBvcHRpb25zW2tleV1cclxuICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChrZXkgPT09ICdzdHJpbmdpZnlGdW5jdGlvbicpIHtcclxuICAgICAgICAgIHRoaXNbX1RvcElzUHJpbWl0aXZlXSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXNbX09wdGlvbnNdW2tleV0gPSBvcHRpb25zW2tleV1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIG9wdGlvbnNba2V5XVxyXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgdGhpc1tfVG9wU25pcF0gKz0gJ1wiJyArIGtleSArICdcIjpcIicgKyBvcHRpb25zW2tleV0gKyAnXCIsJ1xyXG4gICAgICAgICAgdGhpc1tfVG9wVmFsdWVzXVtrZXldID0gb3B0aW9uc1trZXldXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgIHRoaXNbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6JyArIG9wdGlvbnNba2V5XSArICcsJ1xyXG4gICAgICAgICAgdGhpc1tfVG9wVmFsdWVzXVtrZXldID0gb3B0aW9uc1trZXldXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgdGhpc1tfVG9wU25pcF0gKz0gJ1wiJyArIGtleSArICdcIjpudWxsLCdcclxuICAgICAgICAgIHRoaXNbX1RvcFZhbHVlc11ba2V5XSA9IG51bGxcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpc1tfVG9wU25pcF0gKz0gJ1wiJyArIGtleSArICdcIjonICsgdGhpc1tfT3B0aW9uc10uc3RyaW5naWZ5RnVuY3Rpb24ob3B0aW9uc1trZXldKSArICcsJ1xyXG4gICAgICAgICAgdGhpc1tfVG9wVmFsdWVzXVtrZXldID0gb3B0aW9uc1trZXldXHJcbiAgICAgICAgICB0aGlzW19Ub3BJc1ByaW1pdGl2ZV0gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgW19TZXRMZXZlbEhlYWRlcl0gKGxldmVsKSB7XHJcbiAgICB0aGlzW19IZWFkZXJTdHJpbmdzXVtsZXZlbF0gPSAneydcclxuICAgIHRoaXNbX09wdGlvbnNdLmxldmVsS2V5RW5hYmxlZCAmJiAodGhpc1tfSGVhZGVyU3RyaW5nc11bbGV2ZWxdICs9ICdcIicgKyB0aGlzW19PcHRpb25zXS5sZXZlbEtleSArICdcIjpcIicgKyBsZXZlbCArICdcIiwnKVxyXG4gICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxOdW1iZXJLZXlFbmFibGVkICYmICh0aGlzW19IZWFkZXJTdHJpbmdzXVtsZXZlbF0gKz0gJ1wiJyArIHRoaXNbX09wdGlvbnNdLmxldmVsTnVtYmVyS2V5ICsgJ1wiOicgKyB0aGlzW19PcHRpb25zXS5sZXZlbHNbbGV2ZWxdICsgJywnKVxyXG4gICAgdGhpc1tfVG9wU25pcF0gIT09ICcnICYmICh0aGlzW19IZWFkZXJTdHJpbmdzXVtsZXZlbF0gKz0gdGhpc1tfVG9wU25pcF0pXHJcbiAgICB0aGlzW19IZWFkZXJTdHJpbmdzXVtsZXZlbF0gKz0gJ1wiJyArIHRoaXNbX09wdGlvbnNdLmRhdGVUaW1lS2V5ICsgJ1wiOidcclxuXHJcbiAgICBpZiAodGhpc1tfT3B0aW9uc10ucGFzc1Rocm91Z2gpIHtcclxuICAgICAgY29uc3QgbGV2ZWxPYmogPSB7fVxyXG4gICAgICB0aGlzW19PcHRpb25zXS5sZXZlbEtleUVuYWJsZWQgJiYgKGxldmVsT2JqW3RoaXNbX09wdGlvbnNdLmxldmVsS2V5XSA9IGxldmVsKVxyXG4gICAgICB0aGlzW19PcHRpb25zXS5sZXZlbE51bWJlcktleUVuYWJsZWQgJiYgKGxldmVsT2JqW3RoaXNbX09wdGlvbnNdLmxldmVsTnVtYmVyS2V5XSA9IHRoaXNbX09wdGlvbnNdLmxldmVsc1tsZXZlbF0pXHJcbiAgICAgIHRoaXNbX0hlYWRlclZhbHVlc11bbGV2ZWxdID0gbm90YXRpb25Db3B5KGxldmVsT2JqLCB0aGlzW19Ub3BWYWx1ZXNdKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgW19TZXRMZXZlbEZ1bmN0aW9uXSAobGV2ZWwpIHtcclxuICAgIHRoaXNbbGV2ZWxdID0gZnVuY3Rpb24gKC4uLml0ZW1zKSB7XHJcbiAgICAgIGlmICh0aGlzW19PcHRpb25zXS5sZXZlbHNbdGhpc1tfT3B0aW9uc10ubGV2ZWxdID5cclxuICAgICAgICB0aGlzW19PcHRpb25zXS5sZXZlbHNbbGV2ZWxdKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdGltZSA9IHRoaXNbX09wdGlvbnNdLmRhdGVUaW1lRnVuY3Rpb24oKVxyXG4gICAgICBsZXQgbXNnID0gJydcclxuICAgICAgbGV0IGRhdGEgPSBudWxsXHJcbiAgICAgIGxldCBkYXRhSnNvbiA9ICdudWxsJ1xyXG5cclxuICAgICAgY29uc3Qgc2VyaWFsaXplID0gKGl0ZW0pID0+IHtcclxuICAgICAgICBpZiAoIXRoaXNbX09wdGlvbnNdLnNlcmlhbGl6ZXJzKSB7IHJldHVybiBpdGVtIH1cclxuICAgICAgICBpZiAoaXRlbSA9PSBudWxsKSB7IHJldHVybiBudWxsIH1cclxuICAgICAgICBjb25zdCBncmFkZWQgPSB7fVxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGl0ZW0pIHtcclxuICAgICAgICAgIGxldCB2YWx1ZSA9IGl0ZW1ba2V5XVxyXG4gICAgICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkgJiYgaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHRoaXNbX09wdGlvbnNdLnNlcmlhbGl6ZXJzW2tleV0pIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzW19PcHRpb25zXS5zZXJpYWxpemVyc1trZXldKHZhbHVlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZ3JhZGVkW2tleV0gPSB2YWx1ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ3JhZGVkXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAvLyBTaW5nbGUgaXRlbSBwcm9jZXNzaW5nXHJcbiAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zWzBdXHJcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBpdGVtXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICBtc2cgPSBpdGVtXHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtID09IG51bGwpIHtcclxuICAgICAgICAgIC8vIFVuZGVmaW5lZCBvciBudWxsLCBrZWVwIGRlZmF1bHRzLlxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICBkYXRhID0gaXRlbVxyXG4gICAgICAgICAgZGF0YUpzb24gPSAnJyArIGl0ZW1cclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0gaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgbXNnID0gaXRlbS5tZXNzYWdlXHJcbiAgICAgICAgICBkYXRhID0gdGhpc1tfT3B0aW9uc10uc2VyaWFsaXplRXJyb3JGdW5jdGlvbihpdGVtKVxyXG4gICAgICAgICAgZGF0YUpzb24gPSB0aGlzW19PcHRpb25zXS5zdHJpbmdpZnlGdW5jdGlvbihkYXRhKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkYXRhID0gc2VyaWFsaXplKGl0ZW0pXHJcbiAgICAgICAgICBkYXRhSnNvbiA9IHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKGRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGl0ZW1zLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAvLyBNdWx0aXBsZSBpdGVtIHByb2Nlc3NpbmdcclxuICAgICAgICBkYXRhID0gW11cclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgaXRlbVxyXG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGlmIChtc2cpIHsgZGF0YS5wdXNoKGl0ZW0pIH0gZWxzZSB7IG1zZyA9IGl0ZW0gfVxyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGRhdGEucHVzaChudWxsKVxyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICBkYXRhLnB1c2godGhpc1tfT3B0aW9uc10uc2VyaWFsaXplRXJyb3JGdW5jdGlvbihpdGVtKSlcclxuICAgICAgICAgICAgaWYgKCFtc2cpIHsgbXNnID0gaXRlbS5tZXNzYWdlIH1cclxuICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBkYXRhLnB1c2goc2VyaWFsaXplKGl0ZW0pKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICBkYXRhID0gZGF0YVswXVxyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhSnNvbiA9IHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKGRhdGEpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGpzb24gPSB0aGlzW19IZWFkZXJTdHJpbmdzXVtsZXZlbF0gKyB0aW1lICtcclxuICAgICAgICAgICcsXCInICsgdGhpc1tfT3B0aW9uc10ubWVzc2FnZUtleSArICdcIjpcIicgKyBtc2cgK1xyXG4gICAgICAgICAgJ1wiLFwiJyArIHRoaXNbX09wdGlvbnNdLmRhdGFLZXkgKyAnXCI6JyArIGRhdGFKc29uICsgJ31cXG4nXHJcblxyXG4gICAgICBpZiAodGhpc1tfT3B0aW9uc10ucGFzc1Rocm91Z2gpIHtcclxuICAgICAgICBjb25zdCBvYmogPSBub3RhdGlvbkNvcHkoe30sIHRoaXNbX0hlYWRlclZhbHVlc11bbGV2ZWxdLCB7XHJcbiAgICAgICAgICBbdGhpc1tfT3B0aW9uc10uZGF0ZVRpbWVLZXldOiB0aW1lLFxyXG4gICAgICAgICAgW3RoaXNbX09wdGlvbnNdLm1lc3NhZ2VLZXldOiBtc2csXHJcbiAgICAgICAgICBbdGhpc1tfT3B0aW9uc10uZGF0YUtleV06IGRhdGFcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXNbX09wdGlvbnNdLndyaXRlKGpzb24sIG9iailcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzW19PcHRpb25zXS53cml0ZShqc29uKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGlsZCAodG9wcykge1xyXG4gICAgaWYgKHRvcHMgPT0gbnVsbCB8fCB0b3BzLmNvbnN0cnVjdG9yICE9PSBPYmplY3QpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlIHRvcCBsZXZlbCBhcmd1bWVudHMgb2JqZWN0IHRvIGNyZWF0ZSBhIGNoaWxkIGxvZ2dlci4nKVxyXG4gICAgfVxyXG4gICAgY29uc3QgbmV3Q2hpbGQgPSBPYmplY3QuY3JlYXRlKHRoaXMpXHJcbiAgICBpZiAodGhpc1tfVG9wSXNQcmltaXRpdmVdKSB7XHJcbiAgICAgIC8vIEF2b2lkaW5nIE9iamVjdC5hc3NpZ24gd2hpY2ggaXMgbm90IG5lZWRlZFxyXG4gICAgICBuZXdDaGlsZFtfVG9wVmFsdWVzXSA9IHt9XHJcbiAgICAgIG5ld0NoaWxkW19Ub3BJc1ByaW1pdGl2ZV0gPSB0cnVlXHJcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXNbX1RvcFZhbHVlc10pIHtcclxuICAgICAgICBuZXdDaGlsZFtfVG9wVmFsdWVzXVtrZXldID0gdGhpc1tfVG9wVmFsdWVzXVtrZXldXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFRvcCB2YWx1ZSBpcyBhbiBvYmplY3QuIFRha2UgdGhlIE9iamVjdC5hc3NpZ24gaGl0IGxpa2UgYSBtYW4uXHJcbiAgICAgIG5ld0NoaWxkW19Ub3BWYWx1ZXNdID0gbm90YXRpb25Db3B5KHt9LCB0aGlzW19Ub3BWYWx1ZXNdKVxyXG4gICAgICBuZXdDaGlsZFtfVG9wSXNQcmltaXRpdmVdID0gZmFsc2VcclxuICAgIH1cclxuICAgIGZvciAoY29uc3Qga2V5IGluIHRvcHMpIHtcclxuICAgICAgLy8gT3B0aW9ucyBhbmQga2V5IG5hbWVzIGFyZSBub3QgdmFsaWQsIHNraXBwaW5nLlxyXG4gICAgICBpZiAoZGVmYXVsdE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSB8fFxyXG4gICAgICAgICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxLZXkgPT09IGtleSB8fFxyXG4gICAgICAgICAgdGhpc1tfT3B0aW9uc10ubGV2ZWxOdW1iZXJLZXkgPT09IGtleSB8fFxyXG4gICAgICAgICAgdGhpc1tfT3B0aW9uc10uZGF0ZVRpbWVLZXkgPT09IGtleSB8fFxyXG4gICAgICAgICAgdGhpc1tfT3B0aW9uc10ubWVzc2FnZUtleSA9PT0ga2V5IHx8XHJcbiAgICAgICAgICB0aGlzW19PcHRpb25zXS5kYXRhS2V5ID09PSBrZXkpIHsgY29udGludWUgfVxyXG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIHRvcHNba2V5XVxyXG4gICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgIHRoaXNbX1RvcFZhbHVlc10uaGFzT3duUHJvcGVydHkoa2V5KSAmJlxyXG4gICAgICAgICAgdHlwZW9mIHRoaXNbX1RvcFZhbHVlc11ba2V5XSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAvLyBOZXcgdG9wIGtleSBpcyB0aGUgc2FtZSBhcyBwYXJlbnQgYW5kIGlzIGEgc3RyaW5nLiBBcHBlbmRpbmcgc2VwYXJhdG9yIHN0cmluZyBhbmQgbmV3IHZhbHVlLlxyXG4gICAgICAgIG5ld0NoaWxkW19Ub3BWYWx1ZXNdW2tleV0gPSB0aGlzW19Ub3BWYWx1ZXNdW2tleV0gKyB0aGlzW19PcHRpb25zXS5zZXBhcmF0b3JTdHJpbmcgKyB0b3BzW2tleV1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIG5ld0NoaWxkW19Ub3BWYWx1ZXNdW2tleV0gPSBudWxsXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XSA9IHRvcHNba2V5XVxyXG4gICAgICAgIC8vIE5vdCB1c2luZyAmJiBzbyB3ZSBjYW4gZXhpdCBlYXJseVxyXG4gICAgICAgIGlmICghKHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8IHR5cGUgPT09ICdib29sZWFuJykpIHtcclxuICAgICAgICAgIHRoaXNbX1RvcElzUHJpbWl0aXZlXSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXdDaGlsZFtfVG9wU25pcF0gPSAnJ1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gbmV3Q2hpbGRbX1RvcFZhbHVlc10pIHtcclxuICAgICAgaWYgKG5ld0NoaWxkW19Ub3BJc1ByaW1pdGl2ZV0pIHtcclxuICAgICAgICAvLyBQcml2aXRpdmUgSlNPTi5zdHJpbmdpZnkuIENoZWFwLlxyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XVxyXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgbmV3Q2hpbGRbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6XCInICsgbmV3Q2hpbGRbX1RvcFZhbHVlc11ba2V5XSArICdcIiwnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld0NoaWxkW19Ub3BTbmlwXSArPSAnXCInICsga2V5ICsgJ1wiOicgKyBuZXdDaGlsZFtfVG9wVmFsdWVzXVtrZXldICsgJywnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRpbnVlXHJcbiAgICAgIH1cclxuICAgICAgbmV3Q2hpbGRbX1RvcFNuaXBdICs9ICdcIicgKyBrZXkgKyAnXCI6JyArICh0aGlzW19PcHRpb25zXS5zdHJpbmdpZnlGdW5jdGlvbihuZXdDaGlsZFtfVG9wVmFsdWVzXVtrZXldKSkgKyAnLCdcclxuICAgIH1cclxuICAgIG5ld0NoaWxkLnBhcmVudCA9IHRoaXNcclxuICAgIG5ld0NoaWxkW19IZWFkZXJTdHJpbmdzXSA9IHt9XHJcbiAgICBuZXdDaGlsZFtfSGVhZGVyVmFsdWVzXSA9IHt9XHJcbiAgICBmb3IgKGNvbnN0IGxldmVsIGluIHRoaXNbX09wdGlvbnNdLmxldmVscykge1xyXG4gICAgICBuZXdDaGlsZFtfU2V0TGV2ZWxIZWFkZXJdKGxldmVsKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld0NoaWxkXHJcbiAgfVxyXG5cclxuICBzdHJpbmdpZnkgKG9iaiwgcmVwbGFjZXIsIHNwYWNlcikge1xyXG4gICAgcmV0dXJuIHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKG9iaiwgcmVwbGFjZXIsIHNwYWNlcilcclxuICB9XHJcblxyXG4gIGpzb24gKGRhdGEpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXNbX09wdGlvbnNdLnN0cmluZ2lmeUZ1bmN0aW9uKGRhdGEsIG51bGwsIDIpKVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQZXJqXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=