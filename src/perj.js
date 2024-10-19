import { options as defaultOptions } from "./options.js";
import { notationCopy } from "./notation-copy.js";

// Symbols for functions and values
const _SplitOptions = Symbol("SplitOptions");
const _Options = Symbol("Options");
const _TopSnip = Symbol("TopSnip");
const _TopValues = Symbol("TopValues");
const _TopIsPrimitive = Symbol("TopIsPrimitive");
const _HeaderStrings = Symbol("HeaderStrings");
const _HeaderValues = Symbol("HeaderValues");
const _SetLevelHeader = Symbol("SetLevelHeader");
const _SetLevelFunction = Symbol("SetLevelFunction");

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
export class Perj {
  constructor(options) {
    if (options != null && options.constructor !== Object) {
      throw new Error("Provide options object to create a logger.");
    }
    this[_Options] = Object.assign({}, defaultOptions);
    this[_TopSnip] = "";
    this[_TopValues] = {};
    this[_TopIsPrimitive] = true;
    this[_SplitOptions](options);
    this[_HeaderStrings] = {};
    this[_HeaderValues] = {};
    for (const level in this[_Options].levels) {
      this[_SetLevelHeader](level);
      this[_SetLevelFunction](level);
    }
  }

  get level() {
    return this[_Options].level;
  }

  set level(level) {
    if (!Object.hasOwn(this[_Options].levels, level)) {
      throw new Error("The level option must be a valid key in the levels object.");
    }
    if (!Object.hasOwn(this, _Options)) {
      // Attaching the options object to this instance
      this[_Options] = Object.assign({}, this[_Options]);
    }
    this[_Options].level = level;
  }

  get levels() {
    return this[_Options].levels;
  }

  addLevel(newLevels) {
    for (const level in newLevels) {
      if (this[level]) {
        continue;
      }
      this[_Options].levels[level] = newLevels[level];
      this[_SetLevelHeader](level);
      this[_SetLevelFunction](level);
    }
  }

  get write() {
    return this[_Options].write;
  }

  [_SplitOptions](options) {
    if (!options) {
      return;
    }
    for (const key in options) {
      if (Object.hasOwn(defaultOptions, key)) {
        if (key === "level") {
          this.level = options[key];
          continue;
        }
        if (key === "stringifyFunction") {
          this[_TopIsPrimitive] = false;
        }
        this[_Options][key] = options[key];
      } else {
        const type = typeof options[key];
        if (type === "string") {
          this[_TopSnip] += '"' + key + '":"' + options[key] + '",';
          this[_TopValues][key] = options[key];
        } else if (type === "number" || type === "boolean") {
          this[_TopSnip] += '"' + key + '":' + options[key] + ",";
          this[_TopValues][key] = options[key];
        } else if (type === "undefined") {
          this[_TopSnip] += '"' + key + '":null,';
          this[_TopValues][key] = null;
        } else {
          this[_TopSnip] += '"' + key + '":' + this[_Options].stringifyFunction(options[key]) + ",";
          this[_TopValues][key] = options[key];
          this[_TopIsPrimitive] = false;
        }
      }
    }
  }

  [_SetLevelHeader](level) {
    this[_HeaderStrings][level] = "{";
    this[_Options].levelKeyEnabled &&
      (this[_HeaderStrings][level] += '"' + this[_Options].levelKey + '":"' + level + '",');
    this[_Options].levelNumberKeyEnabled &&
      (this[_HeaderStrings][level] += '"' + this[_Options].levelNumberKey + '":' + this[_Options].levels[level] + ",");
    this[_TopSnip] !== "" && (this[_HeaderStrings][level] += this[_TopSnip]);
    this[_HeaderStrings][level] += '"' + this[_Options].dateTimeKey + '":';

    if (this[_Options].passThrough) {
      const levelObj = {};
      this[_Options].levelKeyEnabled && (levelObj[this[_Options].levelKey] = level);
      this[_Options].levelNumberKeyEnabled && (levelObj[this[_Options].levelNumberKey] = this[_Options].levels[level]);
      this[_HeaderValues][level] = notationCopy(levelObj, this[_TopValues]);
    }
  }

  [_SetLevelFunction](level) {
    this[level] = function (...items) {
      if (this[_Options].levels[this[_Options].level] > this[_Options].levels[level]) {
        return;
      }
      const time = this[_Options].dateTimeFunction();
      let msg = "";
      let data = null;
      let dataJson = "null";
      let isError = false;

      const serialize = (item) => {
        if (!this[_Options].serializers) {
          return item;
        }
        if (item == null) {
          return null;
        }
        const graded = {};
        for (const key in item) {
          let value = item[key];
          if (Object.hasOwn && Object.hasOwn(item, key) && this[_Options].serializers[key]) {
            value = this[_Options].serializers[key](value);
          }
          if (value !== undefined) {
            graded[key] = value;
          }
        }
        return graded;
      };

      if (items.length === 1) {
        // Single item processing
        const item = items[0];
        const type = typeof item;
        if (type === "string") {
          msg = item;
        } else if (item == null || type === "function") {
          // Undefined or null, keep defaults.
        } else if (type === "number" || type === "boolean") {
          data = item;
          dataJson = "" + item;
        } else if (item instanceof Error) {
          isError = true;
          msg = item.message;
          data = this[_Options].serializeErrorFunction(item);
          dataJson = this[_Options].stringifyFunction(data);
        } else {
          data = serialize(item);
          dataJson = this[_Options].stringifyFunction(data);
        }
      } else if (items.length > 1) {
        // Multiple item processing
        data = [];
        for (const item of items) {
          const type = typeof item;
          if (type === "string") {
            if (msg) {
              data.push(item);
            } else {
              msg = item;
            }
            continue;
          }
          if (item == null || type === "function") {
            data.push(null);
            continue;
          }
          if (item instanceof Error) {
            isError = true;
            data.push(this[_Options].serializeErrorFunction(item));
            if (!msg) {
              msg = item.message;
            }
            continue;
          }

          data.push(serialize(item));
        }

        if (data.length === 1) {
          data = data[0];
        }
        dataJson = this[_Options].stringifyFunction(data);
      }

      let json =
        this[_HeaderStrings][level] +
        time +
        ',"' +
        this[_Options].messageKey +
        '":"' +
        msg +
        '","' +
        this[_Options].dataKey +
        '":' +
        dataJson;
      if (isError) {
        json += ',"error":true';
      }
      json += "}\n";

      if (this[_Options].passThrough) {
        const obj = notationCopy({}, this[_HeaderValues][level], {
          [this[_Options].dateTimeKey]: time,
          [this[_Options].messageKey]: msg,
          [this[_Options].dataKey]: data,
        });
        if (isError) {
          obj.error = true;
        }
        this[_Options].write(json, obj);
      } else {
        this[_Options].write(json);
      }
    };
  }

  child(tops) {
    if (tops == null || tops.constructor !== Object) {
      throw new Error("Provide top level arguments object to create a child logger.");
    }
    const newChild = Object.create(this);
    if (this[_TopIsPrimitive]) {
      // Avoiding Object.assign which is not needed
      newChild[_TopValues] = {};
      newChild[_TopIsPrimitive] = true;
      for (const key in this[_TopValues]) {
        newChild[_TopValues][key] = this[_TopValues][key];
      }
    } else {
      // Top value is an object. Take the object copy hit like a man.
      newChild[_TopValues] = notationCopy({}, this[_TopValues]);
      newChild[_TopIsPrimitive] = false;
    }
    for (const key in tops) {
      // Options and key names are not valid, skipping.
      if (
        Object.hasOwn(defaultOptions, key) ||
        this[_Options].levelKey === key ||
        this[_Options].levelNumberKey === key ||
        this[_Options].dateTimeKey === key ||
        this[_Options].messageKey === key ||
        this[_Options].dataKey === key
      ) {
        continue;
      }
      const type = typeof tops[key];
      if (type === "string" && Object.hasOwn(this[_TopValues], key) && typeof this[_TopValues][key] === "string") {
        // New top key is the same as parent and is a string. Appending separator string and new value.
        newChild[_TopValues][key] = this[_TopValues][key] + this[_Options].separatorString + tops[key];
      } else if (type === "undefined") {
        newChild[_TopValues][key] = null;
      } else {
        newChild[_TopValues][key] = tops[key];
        // Not using && so we can exit early
        if (!(type === "string" || type === "number" || type === "boolean")) {
          this[_TopIsPrimitive] = false;
        }
      }
    }
    newChild[_TopSnip] = "";
    for (const key in newChild[_TopValues]) {
      if (newChild[_TopIsPrimitive]) {
        // Privitive JSON.stringify. Cheap.
        const type = typeof newChild[_TopValues][key];
        if (type === "string") {
          newChild[_TopSnip] += '"' + key + '":"' + newChild[_TopValues][key] + '",';
        } else {
          newChild[_TopSnip] += '"' + key + '":' + newChild[_TopValues][key] + ",";
        }
        continue;
      }
      newChild[_TopSnip] += '"' + key + '":' + this[_Options].stringifyFunction(newChild[_TopValues][key]) + ",";
    }
    newChild.parent = this;
    newChild[_HeaderStrings] = {};
    newChild[_HeaderValues] = {};
    for (const level in this[_Options].levels) {
      newChild[_SetLevelHeader](level);
    }
    return newChild;
  }

  stringify(obj, replacer, spacer) {
    return this[_Options].stringifyFunction(obj, replacer, spacer);
  }

  json(data) {
    console.log(this[_Options].stringifyFunction(data, null, 2));
  }
}

export default Perj;
