import test from "tape";
import { Perj } from "../src/perj.js";
import { Tool } from "./tool.js";
import { data } from "../data/index.js";

const tool = new Tool();
const write = tool.write.bind(tool);
const passThrough = true;

test("logger stringify tests", (t) => {
  t.test(`${t.name}: stringify function tests`, (t) => {
    tool.reset();
    let log = new Perj({ stringifyFunction, write, passThrough });
    log.info("stringify test", data.tardis);
    t.equal(tool.jsonOut.data.name, "Not TARDIS");
    t.equal(tool.objOut.data.name, "TARDIS");
    t.equal(tool.jsonOut.data.class, data.tardis.class);
    t.equal(tool.objOut.data.class, data.tardis.class);
    t.equal(tool.jsonOut.msg, "stringify test");
    t.equal(tool.objOut.msg, "stringify test");
    t.end();
  });
  t.test(`${t.name}: child stringify function tests`, (t) => {
    tool.reset();
    let log = new Perj({ stringifyFunction, write, passThrough });
    let child = log.child({ foo: "bar" });
    child.info("stringify test", data.tardis);
    t.equal(tool.jsonOut.data.name, "Not TARDIS");
    t.equal(tool.objOut.data.name, "TARDIS");
    t.equal(tool.jsonOut.data.class, data.tardis.class);
    t.equal(tool.objOut.data.class, data.tardis.class);
    t.equal(tool.jsonOut.msg, "stringify test");
    t.equal(tool.objOut.msg, "stringify test");
    t.end();
  });
});

function stringifyFunction(value) {
  const copy = Object.assign({}, value);
  if (copy.name === "TARDIS") {
    copy.name = "Not TARDIS";
  }

  return JSON.stringify(copy);
}
