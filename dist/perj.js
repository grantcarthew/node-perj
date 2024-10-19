// src/notation-copy.js
function notationCopy(target, ...sources) {
  let convertBuffer = false;
  if (typeof Buffer !== "undefined") {
    convertBuffer = true;
  }
  const maxCalls = 2e3;
  let calls;
  const seen = /* @__PURE__ */ new WeakSet();
  for (const source of sources) {
    calls = 0;
    notationCopyRecursive(target, source);
    if (calls > maxCalls) {
      console.warn(`[Perj] Maximum of ${maxCalls} recursive calls has been reached.`);
    }
  }
  return target;
  function notationCopyRecursive(tgt, src) {
    if (calls++ > maxCalls) {
      return;
    }
    if (src == null) {
      return src;
    }
    const type = typeof src;
    if (type === "string" || type === "number" || type === "boolean") {
      return src;
    }
    if (type === "object") {
      if (seen.has(src)) {
        return "[Circular]";
      }
      seen.add(src);
      if (Array.isArray(src)) {
        const newArray = [];
        for (let i = 0; i < src.length; i++) {
          newArray[i] = notationCopyRecursive({}, src[i]);
        }
        return newArray;
      }
      if (src instanceof Date) {
        return src;
      }
      if (src instanceof Error) {
        for (const name of Reflect.ownKeys(src)) {
          const result = notationCopyRecursive({}, src[name]);
          if (result !== void 0) {
            tgt[name] = result;
          }
        }
        if (tgt.message === void 0) {
          tgt.message = "The application has encountered an unknown error.";
        }
        if (tgt.name === void 0) {
          tgt.name = "Error";
        }
        return tgt;
      }
      if (convertBuffer && src instanceof Buffer) {
        const maxBytes = 50;
        const result = { type: "Buffer" };
        result.hex = src.toString("hex", 0, maxBytes);
        result.utf8 = src.toString("utf8", 0, maxBytes);
        result.base64 = src.toString("base64", 0, maxBytes);
        if (src.length > maxBytes) {
          const suffix = "...";
          result.hex += suffix;
          result.utf8 += suffix;
          result.base64 += suffix;
        }
        return result;
      }
      for (const name in src) {
        const result = notationCopyRecursive({}, src[name]);
        if (result !== void 0) {
          tgt[name] = result;
        }
      }
      return tgt;
    }
    return void 0;
  }
}

// src/options.js
var options = {
  levels: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },
  level: "info",
  levelKey: "level",
  levelKeyEnabled: true,
  levelNumberKey: "lvl",
  levelNumberKeyEnabled: true,
  dateTimeKey: "time",
  dateTimeFunction,
  messageKey: "msg",
  dataKey: "data",
  separatorString: ":",
  serializers: false,
  serializeErrorFunction,
  stringifyFunction,
  passThrough: false,
  write: defaultWriter()
};
function dateTimeFunction() {
  return Date.now();
}
function defaultWriter() {
  if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    return process.stdout.write.bind(process.stdout);
  }
  return console.log;
}
function stringifyFunction(obj, replacer, spacer) {
  if (obj == null) {
    return null;
  }
  const type = typeof obj;
  if (type === "string") {
    return JSON.stringify(obj, replacer, spacer);
  }
  if (type === "number" || type === "boolean") {
    return obj;
  }
  if (Array.isArray(obj)) {
    let objJson = "[";
    const last = obj.length - 1;
    for (let i = 0; i < obj.length; i++) {
      objJson += stringifyFunction(obj[i]);
      if (i < last) {
        objJson += ",";
      }
    }
    return objJson + "]";
  }
  return JSON.stringify(notationCopy({}, obj), replacer, spacer);
}
function serializeErrorFunction(value) {
  return notationCopy({}, value);
}

// src/perj.js
var _SplitOptions = Symbol("SplitOptions");
var _Options = Symbol("Options");
var _TopSnip = Symbol("TopSnip");
var _TopValues = Symbol("TopValues");
var _TopIsPrimitive = Symbol("TopIsPrimitive");
var _HeaderStrings = Symbol("HeaderStrings");
var _HeaderValues = Symbol("HeaderValues");
var _SetLevelHeader = Symbol("SetLevelHeader");
var _SetLevelFunction = Symbol("SetLevelFunction");
var Perj = class {
  constructor(options2) {
    if (options2 != null && options2.constructor !== Object) {
      throw new Error("Provide options object to create a logger.");
    }
    this[_Options] = Object.assign({}, options);
    this[_TopSnip] = "";
    this[_TopValues] = {};
    this[_TopIsPrimitive] = true;
    this[_SplitOptions](options2);
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
  [_SplitOptions](options2) {
    if (!options2) {
      return;
    }
    for (const key in options2) {
      if (Object.hasOwn(options, key)) {
        if (key === "level") {
          this.level = options2[key];
          continue;
        }
        if (key === "stringifyFunction") {
          this[_TopIsPrimitive] = false;
        }
        this[_Options][key] = options2[key];
      } else {
        const type = typeof options2[key];
        if (type === "string") {
          this[_TopSnip] += '"' + key + '":"' + options2[key] + '",';
          this[_TopValues][key] = options2[key];
        } else if (type === "number" || type === "boolean") {
          this[_TopSnip] += '"' + key + '":' + options2[key] + ",";
          this[_TopValues][key] = options2[key];
        } else if (type === "undefined") {
          this[_TopSnip] += '"' + key + '":null,';
          this[_TopValues][key] = null;
        } else {
          this[_TopSnip] += '"' + key + '":' + this[_Options].stringifyFunction(options2[key]) + ",";
          this[_TopValues][key] = options2[key];
          this[_TopIsPrimitive] = false;
        }
      }
    }
  }
  [_SetLevelHeader](level) {
    this[_HeaderStrings][level] = "{";
    this[_Options].levelKeyEnabled && (this[_HeaderStrings][level] += '"' + this[_Options].levelKey + '":"' + level + '",');
    this[_Options].levelNumberKeyEnabled && (this[_HeaderStrings][level] += '"' + this[_Options].levelNumberKey + '":' + this[_Options].levels[level] + ",");
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
    this[level] = function(...items) {
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
          if (value !== void 0) {
            graded[key] = value;
          }
        }
        return graded;
      };
      if (items.length === 1) {
        const item = items[0];
        const type = typeof item;
        if (type === "string") {
          msg = item;
        } else if (item == null || type === "function") {
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
      let json = this[_HeaderStrings][level] + time + ',"' + this[_Options].messageKey + '":"' + msg + '","' + this[_Options].dataKey + '":' + dataJson;
      if (isError) {
        json += ',"error":true';
      }
      json += "}\n";
      if (this[_Options].passThrough) {
        const obj = notationCopy({}, this[_HeaderValues][level], {
          [this[_Options].dateTimeKey]: time,
          [this[_Options].messageKey]: msg,
          [this[_Options].dataKey]: data
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
      newChild[_TopValues] = {};
      newChild[_TopIsPrimitive] = true;
      for (const key in this[_TopValues]) {
        newChild[_TopValues][key] = this[_TopValues][key];
      }
    } else {
      newChild[_TopValues] = notationCopy({}, this[_TopValues]);
      newChild[_TopIsPrimitive] = false;
    }
    for (const key in tops) {
      if (Object.hasOwn(options, key) || this[_Options].levelKey === key || this[_Options].levelNumberKey === key || this[_Options].dateTimeKey === key || this[_Options].messageKey === key || this[_Options].dataKey === key) {
        continue;
      }
      const type = typeof tops[key];
      if (type === "string" && Object.hasOwn(this[_TopValues], key) && typeof this[_TopValues][key] === "string") {
        newChild[_TopValues][key] = this[_TopValues][key] + this[_Options].separatorString + tops[key];
      } else if (type === "undefined") {
        newChild[_TopValues][key] = null;
      } else {
        newChild[_TopValues][key] = tops[key];
        if (!(type === "string" || type === "number" || type === "boolean")) {
          this[_TopIsPrimitive] = false;
        }
      }
    }
    newChild[_TopSnip] = "";
    for (const key in newChild[_TopValues]) {
      if (newChild[_TopIsPrimitive]) {
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
};
var perj_default = Perj;
export {
  Perj,
  perj_default as default
};
