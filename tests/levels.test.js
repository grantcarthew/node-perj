import test from "tape";
import { Perj } from "../src/perj.js";
import { Tool } from "./tool.js";

const tool = new Tool();
const write = tool.write.bind(tool);
const title = "log level tests"

test.only(title, (t) => {
  t.test(`${title}: fatal`, (t) => {
    tool.reset();
    const log = new Perj({ level: "fatal", write });
    log.fatal("fatal");
    t.equal(tool.jsonOut.msg, "fatal", "fatal message should be logged");
    tool.reset();
    log.error("error");
    t.notOk(tool.jsonOut.msg, "error message should not be logged");
    log.warn("warn");
    t.notOk(tool.jsonOut.msg, "warn message should not be logged");
    log.info("info");
    t.notOk(tool.jsonOut.msg, "info message should not be logged");
    log.debug("debug");
    t.notOk(tool.jsonOut.msg, "debug message should not be logged");
    log.trace("trace");
    t.notOk(tool.jsonOut.msg, "trace message should not be logged");
    t.end();
  });

  t.test(`${title}: error`, (t) => {
    tool.reset();
    const log = new Perj({ level: "error", write });
    log.fatal("fatal");
    t.equal(tool.jsonOut.msg, "fatal", "fatal message should be logged");
    log.error("error");
    t.equal(tool.jsonOut.msg, "error", "error message should be logged");
    tool.reset();
    log.warn("warn");
    t.notOk(tool.jsonOut.msg, "warn message should not be logged");
    log.info("info");
    t.notOk(tool.jsonOut.msg, "info message should not be logged");
    log.debug("debug");
    t.notOk(tool.jsonOut.msg, "debug message should not be logged");
    log.trace("trace");
    t.notOk(tool.jsonOut.msg, "trace message should not be logged");
    t.end();
  });

  t.test(`${title}: warn`, (t) => {
    tool.reset();
    const log = new Perj({ level: "warn", write });
    log.fatal("fatal");
    t.equal(tool.jsonOut.msg, "fatal", "fatal message should be logged");
    log.error("error");
    t.equal(tool.jsonOut.msg, "error", "error message should be logged");
    log.warn("warn");
    t.equal(tool.jsonOut.msg, "warn", "warn message should be logged");
    tool.reset();
    log.info("info");
    t.notOk(tool.jsonOut.msg, "info message should not be logged");
    log.debug("debug");
    t.notOk(tool.jsonOut.msg, "debug message should not be logged");
    log.trace("trace");
    t.notOk(tool.jsonOut.msg, "trace message should not be logged");
    t.end();
  });

  t.test(`${title}: info`, (t) => {
    tool.reset();
    const log = new Perj({ level: "info", write });
    log.fatal("fatal");
    t.equal(tool.jsonOut.msg, "fatal", "fatal message should be logged");
    log.error("error");
    t.equal(tool.jsonOut.msg, "error", "error message should be logged");
    log.warn("warn");
    t.equal(tool.jsonOut.msg, "warn", "warn message should be logged");
    log.info("info");
    t.equal(tool.jsonOut.msg, "info", "info message should be logged");
    tool.reset();
    log.debug("debug");
    t.notOk(tool.jsonOut.msg, "debug message should not be logged");
    log.trace("trace");
    t.notOk(tool.jsonOut.msg, "trace message should not be logged");
    t.end();
  });

  t.test(`${title}: debug`, (t) => {
    tool.reset();
    const log = new Perj({ level: "debug", write });
    log.fatal("fatal");
    t.equal(tool.jsonOut.msg, "fatal", "fatal message should be logged");
    log.error("error");
    t.equal(tool.jsonOut.msg, "error", "error message should be logged");
    log.warn("warn");
    t.equal(tool.jsonOut.msg, "warn", "warn message should be logged");
    log.info("info");
    t.equal(tool.jsonOut.msg, "info", "info message should be logged");
    log.debug("debug");
    t.equal(tool.jsonOut.msg, "debug", "debug message should be logged");
    tool.reset();
    log.trace("trace");
    t.notOk(tool.jsonOut.msg, "trace message should not be logged");
    t.end();
  });

  t.test(`${title}: trace`, (t) => {
    tool.reset();
    const log = new Perj({ level: "trace", write });
    log.fatal("fatal");
    t.equal(tool.jsonOut.msg, "fatal", "fatal message should be logged");
    log.error("error");
    t.equal(tool.jsonOut.msg, "error", "error message should be logged");
    log.warn("warn");
    t.equal(tool.jsonOut.msg, "warn", "warn message should be logged");
    log.info("info");
    t.equal(tool.jsonOut.msg, "info", "info message should be logged");
    log.debug("debug");
    t.equal(tool.jsonOut.msg, "debug", "debug message should be logged");
    log.trace("trace");
    t.equal(tool.jsonOut.msg, "trace", "trace message should be logged");
    t.end();
  });

  t.test(`${title}: change level`, (t) => {
    tool.reset();
    const log = new Perj({ write });
    log.fatal("fatal");
    t.equal(tool.jsonOut.msg, "fatal", "fatal message should be logged");
    log.error("error");
    t.equal(tool.jsonOut.msg, "error", "error message should be logged");
    log.warn("warn");
    t.equal(tool.jsonOut.msg, "warn", "warn message should be logged");
    log.info("info");
    t.equal(tool.jsonOut.msg, "info", "info message should be logged");
    tool.reset();
    log.debug("debug");
    t.notOk(tool.jsonOut.msg, "debug message should not be logged");
    log.trace("trace");
    t.notOk(tool.jsonOut.msg, "trace message should not be logged");
    log.level = "trace";
    log.fatal("fatal");
    t.equal(
      tool.jsonOut.msg,
      "fatal",
      "fatal message should be logged after level change"
    );
    log.error("error");
    t.equal(
      tool.jsonOut.msg,
      "error",
      "error message should be logged after level change"
    );
    log.warn("warn");
    t.equal(
      tool.jsonOut.msg,
      "warn",
      "warn message should be logged after level change"
    );
    log.info("info");
    t.equal(
      tool.jsonOut.msg,
      "info",
      "info message should be logged after level change"
    );
    log.debug("debug");
    t.equal(
      tool.jsonOut.msg,
      "debug",
      "debug message should be logged after level change"
    );
    log.trace("trace");
    t.equal(
      tool.jsonOut.msg,
      "trace",
      "trace message should be logged after level change"
    );
    log.addLevel({ spiderman: 600, batman: 500 });
    t.equal(Object.keys(log).length, 8, "custom levels added correctly");
    log.addLevel({ spiderman: 3 });
    t.equal(
      Object.keys(log).length,
      8,
      "duplicate level addition handled correctly"
    );
    log.spiderman("spiderman");
    t.equal(
      tool.jsonOut.level,
      "spiderman",
      "spiderman level logged correctly"
    );
    t.equal(tool.jsonOut.lvl, 600, "spiderman level value correct");
    t.equal(
      tool.jsonOut.msg,
      "spiderman",
      "spiderman message logged correctly"
    );
    log.batman("batman");
    t.equal(tool.jsonOut.level, "batman", "batman level logged correctly");
    t.equal(tool.jsonOut.lvl, 500, "batman level value correct");
    t.equal(tool.jsonOut.msg, "batman", "batman message logged correctly");
    t.end();
  });

  t.end();
});
