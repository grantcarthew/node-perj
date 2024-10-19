import consoleProbe from "console-probe";
import { table } from "table";
import chalk from "chalk";
import Benchmark from "benchmark";
import Perj from "../index.js";
import pino from "pino";
import fs from "fs";
import { hostname } from "os";
import { data } from "../data/index.js";
import tc from "test-constructs";
import { notationCopy as pc } from "../src/notation-copy.js";

// You will need to install fast-safe-stringify to test.
// npm install --no-save fast-safe-stringify
import stringify from "fast-safe-stringify";

consoleProbe.apply();
const suite = new Benchmark.Suite();

const small = tc.objects.bySize.small;
const types = tc.objects.special.types;
const deep = tc.objects.special.deep;
deep.arr = [deep, 2, "yell", deep];
deep[Symbol("beep")] = deep.arr;
types.arr = [types, 34, "run", undefined, "box"];

const line = "=".repeat(80);
console.log(line);
console.log(" Object Copy Benchmark");
console.log(line);
console.dir(types);
console.dir(pc({}, types));
// console.log(JSON.stringify(pc({}, types), null, 2))

suite.add("small Object.assign()", smallObjectAssignTest);
suite.add("types Object.assign()", typesObjectAssignTest);
suite.add("deep Object.assign()", deepObjectAssignTest);
suite.add("small notationCopy", smallNotationCopyTest);
suite.add("types notationCopy", typesNotationCopyTest);
suite.add("deep notationCopy", deepNotationCopyTest);
suite.add("small notationCopyWithStringify", smallNotationCopyWithStringifyTest);
suite.add("types notationCopyWithStringify", typesNotationCopyWithStringifyTest);
suite.add("deep notationCopyWithStringify", deepNotationCopyWithStringifyTest);
suite.add("small fast-safe-stringify", smallFastSafeStringifyTest);
suite.add("types fast-safe-stringify", typesFastSafeStringifyTest);
suite.add("deep fast-safe-stringify", deepFastSafeStringifyTest);

function smallObjectAssignTest() {
  return Object.assign({}, small);
}
function smallNotationCopyTest() {
  return pc({}, small);
}
function smallNotationCopyWithStringifyTest() {
  return JSON.stringify(pc({}, small));
}
function smallFastSafeStringifyTest() {
  return stringify(small);
}

function typesObjectAssignTest() {
  return Object.assign({}, types);
}
function typesNotationCopyTest() {
  return pc({}, types);
}
function typesNotationCopyWithStringifyTest() {
  return JSON.stringify(pc({}, types));
}
function typesFastSafeStringifyTest() {
  return stringify(types);
}

function deepObjectAssignTest() {
  return Object.assign({}, deep);
}
function deepNotationCopyTest() {
  return pc({}, deep);
}
function deepNotationCopyWithStringifyTest() {
  return JSON.stringify(pc({}, deep));
}
function deepFastSafeStringifyTest() {
  return stringify(deep);
}
suite.on("cycle", function (event) {
  console.log(String(event.target));
});

suite.on("complete", function () {
  const result = table([
    [chalk.blue("Benchmark Ops/Sec"), chalk.blue("Ops/Sec")],
    row("small Object.assign", this[0]),
    row("types Object.assign", this[1]),
    row("deep Object.assign", this[2]),
    row("small notationCopy", this[3]),
    row("types notationCopy", this[4]),
    row("deep notationCopy", this[5]),
    row("small notationCopyWithStringify", this[6]),
    row("types notationCopyWithStringify", this[7]),
    row("deep notationCopyWithStringify", this[8]),
    row("small fast-safe-stringify", this[9]),
    row("types fast-safe-stringify", this[10]),
    row("deep fast-safe-stringify", this[11]),
  ]);
  console.log(result);
  console.log(line);
});

suite.run({ async: true });

function row(name, n, m) {
  let n2 = Number(n.hz).toFixed(2);
  // let m2 = Number(m.hz).toFixed(2)
  let result = "";
  let pc = 0;

  // if (n.hz >= m.hz) {
  //   pc = Number(100 - (m.hz / n.hz * 100)).toFixed(2)
  //   result = chalk.green(`${n.name} faster by ${pc}%`)
  // } else {
  //   pc = Number(100 - (n.hz / m.hz * 100)).toFixed(2)
  //   result = chalk.yellow(`${m.name} faster by ${pc}%`)
  // }
  // return [chalk.blue(name), n2, m2, result]
  return [chalk.blue(name), n2];
}
