const Perj = require("../src/perj");
const Tool = require("./tool");
const tool = new Tool();
const data = require("../data");
const write = tool.write.bind(tool);
const passThrough = true;

beforeEach(() => {
  tool.reset();
});

describe("logger stringify tests", () => {
  test("stringify function tests", () => {
    let log = new Perj({ stringifyFunction, write, passThrough });
    log.info("stringify test", data.tardis);
    t.equal(tool.jsonOut.data.name, "Not TARDIS");
    t.equal(tool.objOut.data.name, "TARDIS");
    t.equal(tool.jsonOut.data.class, data.tardis.class);
    t.equal(tool.objOut.data.class, data.tardis.class);
    t.equal(tool.jsonOut.msg, "stringify test");
    t.equal(tool.objOut.msg, "stringify test");
  });
  test("child stringify function tests", () => {
    let log = new Perj({ stringifyFunction, write, passThrough });
    let child = log.child({ foo: "bar" });
    child.info("stringify test", data.tardis);
    t.equal(tool.jsonOut.data.name, "Not TARDIS");
    t.equal(tool.objOut.data.name, "TARDIS");
    t.equal(tool.jsonOut.data.class, data.tardis.class);
    t.equal(tool.objOut.data.class, data.tardis.class);
    t.equal(tool.jsonOut.msg, "stringify test");
    t.equal(tool.objOut.msg, "stringify test");
  });
});

function stringifyFunction(value) {
  const copy = Object.assign({}, value);
  if (copy.name === "TARDIS") {
    copy.name = "Not TARDIS";
  }

  return JSON.stringify(copy);
}
