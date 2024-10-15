require("console-probe").apply();
const assert = require("assert");
const { table } = require("table");
const chalk = require("chalk");
const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();
const data = require("../data");

const obj = data.deathStar;
const map = new Map();
for (const key in obj) {
  map.set(key, obj[key]);
}

const line = "=".repeat(80);
console.log(line);
console.log(" Map vs Object Benchmark");
console.log(line);

suite.add("Map Iterate", mapIterateTest);
suite.add("Object Iterate", objectIterateTest);
suite.add("Map Lookup", mapLookupTest);
suite.add("Object Lookup", objectLookupTest);
suite.add("Map Set with Object", mapSetWithObjectTest);
suite.add("Object Set with Object", objectSetWithObjectTest);
suite.add("Map Set with String", mapSetWithStringTest);
suite.add("Object Set with String", objectSetWithStringTest);
suite.add("Map Size", mapSizeTest);
suite.add("Object Size", objectSizeTest);

function mapIterateTest() {
  let target = {};
  for (const [key, value] of map.entries()) {
    target[key] = value;
  }
  return target;
}

function objectIterateTest() {
  let target = {};
  for (const key in obj) {
    target[key] = obj[key];
  }
  return target;
}

function mapLookupTest() {
  return map.get("crew");
}

function objectLookupTest() {
  return obj["crew"];
}

function mapSetWithObjectTest() {
  map.set("serenity", data.serenity);
}

function objectSetWithObjectTest() {
  obj.serenity = data.serenity;
}

function mapSetWithStringTest() {
  map.set("serenity", data.msg[0]);
}

function objectSetWithStringTest() {
  obj.serenity = data.msg[0];
}

function mapSizeTest() {
  return map.size;
}

function objectSizeTest() {
  return Object.keys(obj).length;
}

suite.on("cycle", function (event) {
  console.log(String(event.target));
});

suite.on("complete", function () {
  const result = table([
    [chalk.blue("Benchmark Ops/Sec"), chalk.green("Map"), chalk.yellow("Object"), chalk.blue("Percent")],
    row("Iterate", this[0], this[1]),
    row("Lookup", this[2], this[3]),
    row("Set with Object", this[4], this[5]),
    row("Set with String", this[6], this[7]),
    row("Size", this[8], this[9]),
  ]);
  console.log(result);
  console.log(line);
});

suite.run({ async: true });

function row(name, n, m) {
  let n2 = Number(n.hz).toFixed(2);
  let m2 = Number(m.hz).toFixed(2);
  let result = "";
  let pc = 0;

  if (n.hz >= m.hz) {
    pc = Number(100 - (m.hz / n.hz) * 100).toFixed(2);
    result = chalk.green(`${n.name} faster by ${pc}%`);
  } else {
    pc = Number(100 - (n.hz / m.hz) * 100).toFixed(2);
    result = chalk.yellow(`${m.name} faster by ${pc}%`);
  }
  return [chalk.blue(name), n2, m2, result];
}
