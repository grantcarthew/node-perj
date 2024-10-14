import test from "tape";
import { Perj } from "../src/perj.js";
import { Tool } from "./tool.js";
import { data } from "../data/index.js";
import { assertObjectSubsetMatch } from "./asserts.js";

const tool = new Tool();
const write = tool.write.bind(tool);
const passThrough = true;

test("logger options key tests", (t) => {
  t.test("key options tests", (t) => {
    tool.reset();
    let log = new Perj({
      levels: { foo: 100, bar: 200 },
      level: "foo",
      levelKey: "lk",
      levelKeyEnabled: true,
      levelNumberKey: "lnk",
      levelNumberKeyEnabled: true,
      dateTimeKey: "dt",
      dateTimeFunction: () => '"baz"',
      messageKey: "mk",
      dataKey: "dk",
      passThrough,
      write,
      project: "elephant",
      session: 12345,
      platform: {
        name: "node",
        pid: 1234,
      },
      undef: undefined,
      nul: null,
      empty: "",
    });
    log.bar(data.msg[0], data.tardis);
    t.equal(log.levels.foo, 100);
    t.equal(log.levels.bar, 200);
    t.equal(log.level, "foo");
    t.equal(tool.getType(log.write), "Function");
    t.equal(tool.jsonOut.lk, "bar");
    t.equal(tool.objOut.lk, "bar");
    t.equal(tool.jsonOut.lnk, 200);
    t.equal(tool.objOut.lnk, 200);
    t.equal(tool.jsonOut.dt, "baz");
    t.equal(tool.objOut.dt, '"baz"'); // TODO: <==============================
    t.equal(tool.jsonOut.mk, data.msg[0]);
    t.equal(tool.objOut.mk, data.msg[0]);
    assertObjectSubsetMatch(t, tool.jsonOut.dk, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.jsonOut.dk);
    assertObjectSubsetMatch(t, tool.objOut.dk, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.objOut.dk);
    t.equal(tool.jsonOut.project, "elephant");
    t.equal(tool.objOut.project, "elephant");
    t.equal(tool.jsonOut.session, 12345);
    t.equal(tool.objOut.session, 12345);
    t.equal(tool.jsonOut.platform.name, "node");
    t.equal(tool.objOut.platform.name, "node");
    t.equal(tool.jsonOut.platform.pid, 1234);
    t.equal(tool.objOut.platform.pid, 1234);
    t.equal(tool.jsonOut.undef, null);
    t.equal(tool.objOut.undef, null);
    t.equal(tool.jsonOut.nul, null);
    t.equal(tool.objOut.nul, null);
    t.equal(tool.jsonOut.empty, "");
    t.equal(tool.objOut.empty, "");
    t.end();
  });
  t.test("level key not enabled tests", (t) => {
    tool.reset();
    let log = new Perj({ levelKeyEnabled: false, passThrough, write });
    log.info(data.msg[0], data.tardis);
    t.ok(tool.jsonOut.level === undefined);
    t.ok(tool.objOut.level === undefined);
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.objOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.getType(tool.objOut.time), "Number");
    t.equal(tool.jsonOut.msg, data.msg[0]);
    t.equal(tool.objOut.msg, data.msg[0]);
    assertObjectSubsetMatch(t, tool.jsonOut.data, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.jsonOut.data);
    assertObjectSubsetMatch(t, tool.objOut.data, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.objOut.data);
    t.end();
  });
  t.test("level number key not enabled tests", (t) => {
    tool.reset();
    let log = new Perj({ levelNumberKeyEnabled: false, passThrough, write });
    log.info(data.msg[0], data.tardis);
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.objOut.level, "info");
    t.ok(tool.jsonOut.lvl === undefined);
    t.ok(tool.objOut.lvl === undefined);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.getType(tool.objOut.time), "Number");
    t.equal(tool.jsonOut.msg, data.msg[0]);
    t.equal(tool.objOut.msg, data.msg[0]);
    assertObjectSubsetMatch(t, tool.jsonOut.data, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.jsonOut.data);
    assertObjectSubsetMatch(t, tool.objOut.data, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.objOut.data);
    t.end();
  });
  t.test("level key and level number key not enabled tests", (t) => {
    tool.reset();
    let log = new Perj({ levelKeyEnabled: false, levelNumberKeyEnabled: false, passThrough, write });
    log.info(data.msg[0], data.tardis);
    t.ok(tool.jsonOut.level === undefined);
    t.ok(tool.objOut.level === undefined);
    t.ok(tool.jsonOut.lvl === undefined);
    t.ok(tool.objOut.lvl === undefined);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.getType(tool.objOut.time), "Number");
    t.equal(tool.jsonOut.msg, data.msg[0]);
    t.equal(tool.objOut.msg, data.msg[0]);
    assertObjectSubsetMatch(t, tool.jsonOut.data, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.jsonOut.data);
    assertObjectSubsetMatch(t, tool.objOut.data, data.tardis);
    assertObjectSubsetMatch(t, data.tardis, tool.objOut.data);
    t.end();
  });
  t.end();
});
