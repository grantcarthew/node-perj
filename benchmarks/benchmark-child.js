import consoleProbe from 'console-probe';
import { table } from 'table';
import chalk from 'chalk';
import Benchmark from 'benchmark';
import Perj from '../index.js';
import pino from 'pino';
import fs from 'fs';
import { hostname } from 'os';
import { data } from '../data/index.js';

consoleProbe.apply();
const pid = process.pid;
const v = 1;
const dest = fs.createWriteStream("/dev/null");

// Adding hostname and pid to match pino log string
const perjLog = new Perj({ v, hostname, pid, write: dest.write.bind(dest) });
const pinoLog = pino(dest);

const suite = new Benchmark.Suite();
const line = "=".repeat(80);

console.log(line);
console.log(" perj vs pino Child Benchmark");
console.log(line);

suite.add("perj Create Single Child", function () {
  createChild(perjLog, 1);
});

suite.add("pino Create Single Child", function () {
  createChild(pinoLog, 1);
});

suite.add("perj Create Two Children", function () {
  createChild(perjLog, 2);
});

suite.add("pino Create Two Children", function () {
  createChild(pinoLog, 2);
});

suite.add("perj Create Three Children", function () {
  createChild(perjLog, 3);
});

suite.add("pino Create Three Children", function () {
  createChild(pinoLog, 3);
});

function createChild(log, total) {
  let clog = log;
  for (let i = 0; i < total; i++) {
    let child = "child" + i;
    clog = clog.child({ child });
    clog.info(data.msg[0]);
  }
}

suite.on("cycle", function (event) {
  console.log(String(event.target));
});

suite.on("complete", function () {
  const compare = table([
    [chalk.blue("Benchmark Ops/Sec"), chalk.green("perj"), chalk.yellow("pino"), chalk.blue("Result")],
    row("Create Single Child", this[0], this[1]),
    row("Create Two Children", this[2], this[3]),
    row("Create Three Children", this[4], this[5]),
  ]);
  console.log(compare);
  console.log(line);
});

suite.run({ async: true });

function row(name, perj, pino) {
  let perjHz = Number(perj.hz).toFixed(2);
  let pinoHz = Number(pino.hz).toFixed(2);
  let result = "";
  let pc = 0;

  if (perj.hz >= pino.hz) {
    pc = Number(100 - (pinoHz / perjHz) * 100).toFixed(2);
    result = chalk.green(`perj: ${pc}% faster`);
  } else {
    pc = Number(100 - (perjHz / pinoHz) * 100).toFixed(2);
    result = chalk.yellow(`pino: ${pc}% faster`);
  }
  return [chalk.blue(name), perjHz, pinoHz, result];
}
