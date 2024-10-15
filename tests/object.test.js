import test from "tape";
import { Perj } from "../src/perj.js";
import { Tool } from "./tool.js";

const tool = new Tool();
const write = tool.write.bind(tool);

test("logger object tests", (t) => {
  t.test("perj member tests", (t) => {
    tool.reset();
    t.equal(tool.getType(Perj), "Function");
    t.end();
  });
  t.test("log member tests", (t) => {
    tool.reset();
    const log = new Perj();
    t.equal(tool.getType(log.level), "String");
    t.equal(log.level, "info");
    t.equal(tool.getType(log.levels), "Object");
    t.equal(log.levels.info, 30);
    t.equal(tool.getType(log.write), "Function");
    t.doesNotMatch(log.write.name, /log/);
    t.equal(tool.getType(log.child), "Function");
    t.equal(tool.getType(log.fatal), "Function");
    t.equal(tool.getType(log.error), "Function");
    t.equal(tool.getType(log.warn), "Function");
    t.equal(tool.getType(log.info), "Function");
    t.equal(tool.getType(log.debug), "Function");
    t.equal(tool.getType(log.trace), "Function");
    t.throws(() => {
      log.level = "abc";
    }, "The level option must be a valid key in the levels object.");
    log.level = "debug";
    t.equal(log.level, "debug");
    t.end();
  });
  t.test("convenience methods", (t) => {
    tool.reset();
    const log = new Perj({ level: "debug", write });
    const foo = { one: [1, 2, 3], two: { inner: true }, three: 3.14 };
    tool.jsonOut = log.stringify(foo);
    t.equal(tool.getType(tool.jsonOut), "String");

    tool.reset();
    const conLog = console.log;
    console.log = write;
    foo.foo = foo;
    log.json(foo);
    const result1 = tool.jsonOut.one[0] === 1;
    const result2 = tool.jsonOut.foo === "[Circular]";
    console.log = conLog;
    t.ok(result1);
    t.ok(result2);
    t.end();
  });
  t.end();
});
