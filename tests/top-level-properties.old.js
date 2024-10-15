const Perj = require("../src/perj");
const Tool = require("./tool");
const tool = new Tool();
const data = require("../data");
const write = tool.write.bind(tool);
const passThrough = true;

beforeEach(() => {
  tool.reset();
});

describe("top level properties tests", () => {
  test("parent top level properties", () => {
    let log = new Perj({ write, passThrough, foo: "bar", bop: 22, bee: true, baz: undefined, boo: null });
    log.info(data.msg[0], data.tardis);
    t.equal(Object.keys(tool.jsonOut).length, 10);
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.objOut.level, "info");
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.getType(tool.objOut.time), "Number");
    t.equal(tool.jsonOut.msg, data.msg[0]);
    t.equal(tool.objOut.msg, data.msg[0]);
    t.equal(tool.jsonOut.foo, "bar");
    t.equal(tool.objOut.foo, "bar");
    t.equal(tool.jsonOut.bop, 22);
    t.equal(tool.objOut.bop, 22);
    t.equal(tool.jsonOut.bee, true);
    t.equal(tool.objOut.bee, true);
    t.equal(tool.jsonOut.baz, null);
    t.equal(tool.objOut.baz, null);
    t.equal(tool.jsonOut.boo, null);
    t.equal(tool.objOut.boo, null);
    t.equal(tool.jsonOut.data).toMatchObject(data.tardis);
    t.equal(data.tardis).toMatchObject(tool.jsonOut.data);
    t.equal(tool.objOut.data).toMatchObject(data.tardis);
    t.equal(data.tardis).toMatchObject(tool.objOut.data);
  });
  test("child top level properties", () => {
    let log = new Perj({ write, passThrough });
    let child = log.child({ foo: "bar", bop: 22, bee: true, baz: undefined, boo: null });
    child.info(data.msg[0], data.tardis);
    t.equal(Object.keys(tool.jsonOut).length, 10);
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.objOut.level, "info");
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.getType(tool.objOut.time), "Number");
    t.equal(tool.jsonOut.msg, data.msg[0]);
    t.equal(tool.objOut.msg, data.msg[0]);
    t.equal(tool.jsonOut.foo, "bar");
    t.equal(tool.objOut.foo, "bar");
    t.equal(tool.jsonOut.bop, 22);
    t.equal(tool.objOut.bop, 22);
    t.equal(tool.jsonOut.bee, true);
    t.equal(tool.objOut.bee, true);
    t.equal(tool.jsonOut.baz, null);
    t.equal(tool.objOut.baz, null);
    t.equal(tool.jsonOut.boo, null);
    t.equal(tool.objOut.boo, null);
    t.equal(tool.jsonOut.data).toMatchObject(data.tardis);
    t.equal(data.tardis).toMatchObject(tool.jsonOut.data);
    t.equal(tool.objOut.data).toMatchObject(data.tardis);
    t.equal(data.tardis).toMatchObject(tool.objOut.data);
  });
});
