import { notationCopy } from "./notation-copy.js";

export const options = {
  levels: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10,
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
  write: defaultWriter(),
};

function dateTimeFunction() {
  // Returns epoch time.
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
