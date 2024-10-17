import consoleProbe from "console-probe";
import { table } from "table";
import chalk from "chalk";
import Benchmark from "benchmark";
import Perj from "../index.js";
import pino from "pino";
import fs from "fs";
import { hostname } from "os";
import { data } from "../data/index.js";

consoleProbe.apply();
const pid = process.pid;
const v = 1;
const dest = fs.createWriteStream("/dev/null");
const err = [];
for (let i = 0; i < 5; i++) {
  err.push(new Error("Error object number: " + i));
}
const longString = data.msg[4].repeat(1000);
const deep = Object.assign({}, data.deathStar);
deep.deep = Object.assign({}, JSON.parse(JSON.stringify(deep)));
deep.deep.deep = Object.assign({}, JSON.parse(JSON.stringify(deep)));
deep.deep.deep.deep = Object.assign({}, JSON.parse(JSON.stringify(deep)));

// Adding hostname and pid to match pino log string
const perjLog = new Perj({
  v,
  hostname,
  pid,
  write: (json) => {
    dest.write(json);
  },
});
const passThrough = new Perj({
  passThrough: true,
  write: (json, obj) => {
    dest.write(json);
  },
});
const perjComp = new Perj({
  component: "parent",
  write: (json) => {
    dest.write(json);
  },
});

const suite = new Benchmark.Suite();
const line = "=".repeat(80);

console.log(line);
console.log(" perj Benchmark");
console.log(line);

suite.add("Common Log Operations", function () {
  job(perjLog);
});

suite.add("Common Log Operations passThrough", function () {
  job(passThrough);
});

suite.add("Single String Message", function () {
  perjLog.info("hello world");
});

suite.add("Single String Message passThrough", function () {
  passThrough.info("hello world");
});

suite.add("Single Long String", function () {
  perjLog.info(longString);
});

suite.add("Single Long String passThrough", function () {
  passThrough.info(longString);
});

suite.add("Flat Object Data", function () {
  perjLog.info({ foo: "bar" });
});

suite.add("Flat Object Data passThrough", function () {
  passThrough.info({ foo: "bar" });
});

suite.add("Simple Object Data", function () {
  perjLog.info(data.tardis);
});

suite.add("Simple Object Data passThrough", function () {
  passThrough.info(data.tardis);
});

suite.add("Complex Object Data", function () {
  perjLog.info(data.deathStar);
});

suite.add("Complex Object Data passThrough", function () {
  passThrough.info(data.deathStar);
});

suite.add("Deep Object Data", function () {
  perjLog.info(deep);
});

suite.add("Deep Object Data passThrough", function () {
  passThrough.info(deep);
});

suite.add("Single String And Object Data", function () {
  perjLog.info("hello world", { foo: "bar" });
});

suite.add("Single String And Object Data passThrough", function () {
  perjLog.info("hello world", { foo: "bar" });
});

suite.add("Logging Error Objects", function () {
  multipleErrors(perjLog);
});

suite.add("Create Single Child", function () {
  createChild(perjLog, 1);
});

suite.add("Create Child with Separator", function () {
  let childComp = perjComp.child({ component: "child" });
  childComp.info(data.msg[0]);
});

suite.add("Create Two Children", function () {
  createChild(perjLog, 2);
});

suite.add("Create Three Children", function () {
  createChild(perjLog, 3);
});

function multipleErrors(log) {
  for (let i = 0; i < 5; i++) {
    log.error(err[i]);
  }
}

function createChild(log, total) {
  let clog = log;
  for (let i = 0; i < total; i++) {
    let child = "child" + i;
    clog = clog.child({ child });
    clog.info(data.msg[0]);
  }
}

function job(log) {
  log.fatal(data.msg[0]);
  log.warn(data.dataLarge);
  log.trace(data.dataLarge, data.msg[0]);
}

suite.on("cycle", function (event) {
  console.log(String(event.target));
});

suite.on("complete", function () {
  const perj = table([
    [chalk.blue("Bechmark Ops/Sec"), chalk.blue("Result"), chalk.blue("Compare")],
    row("Common Log Operations", this[0]),
    row("Common Log Operations passThrough", this[1], this[0]),
    row("Single String Message", this[2]),
    row("Single String Message passThrough", this[3], this[2]),
    row("Single Long String", this[4]),
    row("Single Long Message passThrough", this[5], this[4]),
    row("Flat Object Data", this[6]),
    row("Flat Object Data passThrough", this[7], this[6]),
    row("Simple Object Data", this[8]),
    row("Simple Object Data passThrough", this[9], this[8]),
    row("Complex Object Data", this[10]),
    row("Complex Object Data passThrough", this[11], this[10]),
    row("Deep Object Data", this[12]),
    row("Deep Object Data passThrough", this[13], this[12]),
    row("Single String And Object Data", this[14]),
    row("Single String And Object Data passThrough", this[15], this[14]),
    row("Logging Error Objects", this[16]),
    row("Create Single Child", this[17]),
    row("Create Child with Separator", this[18], this[17]),
    row("Create Two Children", this[19]),
    row("Create Three Children", this[20]),
  ]);
  console.log(perj);
  console.log(line);
});

suite.run({ async: true });

function row(name, pri, sec) {
  let primary = Number(pri.hz).toFixed(2);
  let pc = "";
  if (sec) {
    pc = Number(100 - (sec.hz / pri.hz) * 100).toFixed(2);
    if (pc < 0) {
      pc = chalk.magenta(pc);
    } else {
      pc = chalk.green(pc);
    }
  }
  return [chalk.blue(name), primary, pc];
}
