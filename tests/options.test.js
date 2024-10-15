import test from "tape";
import { Perj } from "../src/perj.js";
import { Tool } from "./tool.js";
import { data } from "../data/index.js";
import { assertObjectSubsetMatch } from "./asserts.js";

const tool = new Tool();
const write = tool.write.bind(tool);
const passThrough = true;

test("logger option tests", (t) => {
  t.test(`${t.name}: invalid options tests`, (t) => {
    tool.reset();
    let log = null; // eslint-disable-line
    t.throws(() => {
      log = new Perj("");
    });
    t.throws(() => {
      log = new Perj(1);
    });
    t.throws(() => {
      log = new Perj([]);
    });
    t.throws(() => {
      log = new Perj(true);
    });
    t.throws(() => {
      log = new Perj(Symbol(""));
    });
    t.doesNotThrow(() => {
      log = new Perj(null);
    });
    t.doesNotThrow(() => {
      log = new Perj(undefined);
    });
    t.end();
  });
  t.test(`${t.name}: options tests`, (t) => {
    tool.reset();
    let log = new Perj();
    let custLevels = Object.assign({}, log.levels);
    custLevels.silly = 42;
    log = new Perj({
      levels: custLevels,
      level: "trace",
      levelKey: "logLevel",
      levelNumberKey: "levelNo",
      dateTimeKey: "datetime",
      messageKey: "message",
      dataKey: "objectData",
      write,
      foo: "bar",
    });
    t.equal(log.levels.silly, 42);
    t.equal(tool.getType(log.silly), "Function");
    t.equal(log.level, "trace");
    t.ok(log.write);
    log.silly(data.msg[0], data.tardis);
    t.equal(tool.jsonOut.logLevel, "silly");
    t.equal(tool.jsonOut.levelNo, 42);
    t.equal(tool.getType(tool.jsonOut.datetime), "Number");
    t.equal(tool.jsonOut.message, data.msg[0]);
    assertObjectSubsetMatch(t, tool.jsonOut.objectData, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.jsonOut.objectData);
    custLevels.crazy = 43;
    // Only baz: true should be added to child.
    log = log.child({
      levels: custLevels,
      level: "debug",
      levelKey: "childLogLevel",
      levelNumberKey: "childLevelNo",
      dateTimeKey: "childDatetime",
      messageKey: "childMessage",
      dataKey: "childObjectData",
      write,
      baz: true,
    });
    t.equal(log.levels.silly, 42);
    t.equal(tool.getType(log.silly), "Function");
    t.ok(log.crazy === undefined);
    t.equal(log.level, "trace");
    t.ok(log.write);
    tool.reset();
    log.silly(data.msg[0], data.tardis);
    t.equal(tool.jsonOut.logLevel, "silly");
    t.equal(tool.jsonOut.levelNo, 42);
    t.equal(tool.getType(tool.jsonOut.datetime), "Number");
    t.equal(tool.jsonOut.message, data.msg[0]);
    assertObjectSubsetMatch(t, tool.jsonOut.objectData, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.jsonOut.objectData);
    t.throws(() => {
      new Perj({ level: "abc" });
    }, "The level option must be a valid key in the levels object.");
    t.end();
  });
  t.test(`${t.name}: options passThrough`, (t) => {
    tool.reset();
    let log = new Perj({ write, passThrough, foo: "bar" });
    log.info(data.msg[0], data.tardis);
    t.equal(tool.objOut.level, "info");
    t.equal(tool.objOut.lvl, 30);
    t.equal(tool.getType(tool.objOut.time), "Number");
    t.equal(tool.objOut.msg, data.msg[0]);
    t.equal(tool.objOut.foo, "bar");
    assertObjectSubsetMatch(t, tool.jsonOut.data, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.jsonOut.data);
    log = log.child({ foobar: "baz" });
    tool.reset();
    log.info(data.msg[0], data.tardis);
    t.equal(tool.objOut.level, "info");
    t.equal(tool.objOut.lvl, 30);
    t.equal(tool.getType(tool.objOut.time), "Number");
    t.equal(tool.objOut.msg, data.msg[0]);
    t.equal(tool.objOut.foo, "bar");
    t.equal(tool.objOut.foobar, "baz");
    assertObjectSubsetMatch(t, tool.jsonOut.data, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.jsonOut.data);
    t.end();
  });
  t.test(`${t.name}: top level object`, (t) => {
    tool.reset();
    let log = new Perj({ write, passThrough, foo: "bar", platform: { name: "node", pid: 1234 } });
    log.info(data.msg[0], data.tardis);
    t.equal(Object.keys(tool.jsonOut).length, 7);
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, data.msg[0]);
    assertObjectSubsetMatch(t, tool.jsonOut.data, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.jsonOut.data);
    t.equal(tool.getType(tool.jsonOut.platform), "Object");
    t.equal(tool.jsonOut.platform.name, "node");
    t.equal(tool.jsonOut.platform.pid, 1234);
    let child = log.child({ platform: { page: 1, exit: false } });
    tool.reset();
    child.info(data.msg[0], data.tardis);
    t.equal(Object.keys(tool.jsonOut).length, 7);
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, data.msg[0]);
    assertObjectSubsetMatch(t, tool.jsonOut.data, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.jsonOut.data);
    t.equal(tool.getType(tool.jsonOut.platform), "Object");
    t.ok(tool.jsonOut.platform.name === undefined);
    t.ok(tool.jsonOut.platform.pid === undefined);
    t.equal(tool.jsonOut.platform.page, 1);
    t.equal(tool.jsonOut.platform.exit, false);
    t.end();
  });
  t.test(`${t.name}: child logger properties`, (t) => {
    tool.reset();
    let log = new Perj({ write, passThrough, foo: "bar" });
    const child = log.child({ env: "dev" });
    tool.reset();
    log.info(data.msg[0]);
    t.ok(tool.jsonOut.env === undefined);
    tool.reset();
    child.info(data.msg[1], data.serenity);
    t.equal(Object.keys(tool.jsonOut).length, 7);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.msg, data.msg[1]);
    assertObjectSubsetMatch(t, tool.jsonOut.data, data.serenity);
    assertObjectSubsetMatch(t, data.serenity, tool.jsonOut.data);
    t.equal(tool.jsonOut.env, "dev");
    t.throws(() => {
      log.child();
    }, "Provide top level arguments object to create a child logger.");
    t.end();
  });
  t.test(`${t.name}: undefined and null values`, (t) => {
    tool.reset();
    const log = new Perj({ undef: undefined, nul: null, passThrough, write });
    log.info(data.msg[0]);
    t.equal(tool.jsonOut.undef, null);
    t.equal(tool.objOut.undef, null);
    t.equal(tool.jsonOut.nul, null);
    t.equal(tool.objOut.nul, null);
    tool.reset();
    const child = log.child({ undef2: undefined, nul2: null });
    child.info(data.msg[0]);
    t.equal(tool.jsonOut.undef2, null);
    t.equal(tool.objOut.undef2, null);
    t.equal(tool.jsonOut.nul2, null);
    t.equal(tool.objOut.nul2, null);
    t.end();
  });
  t.test(`${t.name}: child logger level`, (t) => {
    tool.reset();
    let log = new Perj({ level: "fatal", write });
    let child = log.child({ child: true });
    child.level = "trace";
    tool.reset();
    log.info(data.msg[0]);
    t.ok(tool.jsonOut.msg === undefined);
    tool.reset();
    child.info(data.msg[0]);
    t.equal(tool.jsonOut.msg, data.msg[0]);
    t.end();
  });
  t.end();
});
