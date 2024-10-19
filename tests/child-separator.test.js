import test from "tape";
import { Perj } from "../src/perj.js";
import { Tool } from "./tool.js";

const tool = new Tool();
const write = tool.write.bind(tool);
const passThrough = true;

let log = new Perj({ test: "parent", write, passThrough });
let child = [];

test("child separator tests", (t) => {
  t.test(`${t.name}: parent`, (t) => {
    tool.reset();
    log.info("parent", { parent: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "parent");
    t.equal(tool.jsonOut.data.parent, true);
    t.equal(tool.jsonOut.test, "parent");
    t.end();
  });
  t.test(`${t.name}: first child`, (t) => {
    tool.reset();
    child.push(log.child({ test: "first child", test2: "first child2" }));
    child[0].info("first child", { c1: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "first child");
    t.equal(tool.jsonOut.data.c1, true);
    t.equal(tool.jsonOut.test, "parent:first child");
    t.equal(tool.jsonOut.test2, "first child2");
    t.end();
  });
  t.test(`${t.name}: second child`, (t) => {
    tool.reset();
    child.push(child[0].child({ test: "second child", test2: "second child2" }));
    child[1].info("second child", { c2: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "second child");
    t.equal(tool.jsonOut.data.c2, true);
    t.equal(tool.jsonOut.test, "parent:first child:second child");
    t.equal(tool.jsonOut.test2, "first child2:second child2");
    t.end();
  });
  t.test(`${t.name}: third child`, (t) => {
    tool.reset();
    child.push(child[1].child({ test: "third child", test2: "third child2" }));
    child[2].info("third child", { c3: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "third child");
    t.equal(tool.jsonOut.data.c3, true);
    t.equal(tool.jsonOut.test, "parent:first child:second child:third child");
    t.equal(tool.jsonOut.test2, "first child2:second child2:third child2");
    t.end();
  });
  t.test(`${t.name}: parent unchanged`, (t) => {
    tool.reset();
    log = new Perj({ animal: "cat", write, passThrough });
    log.child({ animal: "dog" });
    log.info("parent", { parent: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "parent");
    t.equal(tool.jsonOut.data.parent, true);
    t.equal(tool.jsonOut.animal, "cat");
    t.equal(tool.objOut.animal, "cat");
    t.equal(tool.jsonOut.test2, undefined);
    t.end();
  });
  t.end();
});

test("child custom separator tests", (t) => {
  t.test(`${t.name}: custom parent`, (t) => {
    tool.reset();
    log = new Perj({
      test: "parent",
      write,
      passThrough,
      separatorString: " > ",
    });
    child = [];
    log.info("parent", { parent: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "parent");
    t.equal(tool.jsonOut.data.parent, true);
    t.equal(tool.jsonOut.test, "parent");
    t.end();
  });
  t.test(`${t.name}: custom first child`, (t) => {
    tool.reset();
    child.push(log.child({ test: "first child" }));
    child[0].info("first child", { c1: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "first child");
    t.equal(tool.jsonOut.data.c1, true);
    t.equal(tool.jsonOut.test, "parent > first child");
    t.end();
  });
  t.test(`${t.name}: custom second child`, (t) => {
    tool.reset();
    child.push(child[0].child({ test: "second child" }));
    child[1].info("second child", { c2: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "second child");
    t.equal(tool.jsonOut.data.c2, true);
    t.equal(tool.jsonOut.test, "parent > first child > second child");
    t.end();
  });
  t.test(`${t.name}: custom third child`, (t) => {
    tool.reset();
    child.push(child[1].child({ test: "third child" }));
    child[2].info("third child", { c3: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "third child");
    t.equal(tool.jsonOut.data.c3, true);
    t.equal(tool.jsonOut.test, "parent > first child > second child > third child");
    t.end();
  });
  t.test(`${t.name}: custom parent unchanged`, (t) => {
    tool.reset();
    log.info("parent", { parent: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "parent");
    t.equal(tool.jsonOut.data.parent, true);
    t.equal(tool.jsonOut.test, "parent");
    t.end();
  });
  t.end();
});

test("object no child separator", (t) => {
  t.test(`${t.name}: parent no child separator`, (t) => {
    tool.reset();
    log = new Perj({
      test: { p: 1 },
      write,
      passThrough,
      separatorString: "@",
    });
    child = [];
    log.info("parent", { parent: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "parent");
    t.equal(tool.jsonOut.data.parent, true);
    t.equal(tool.jsonOut.test.p, 1);
    t.end();
  });
  t.test(`${t.name}: first child no child separator`, (t) => {
    tool.reset();
    child.push(log.child({ test: { c: 1 } }));
    child[0].info("first child", { c1: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "first child");
    t.equal(tool.jsonOut.data.c1, true);
    t.equal(tool.jsonOut.test.c, 1);
    t.end();
  });
  t.test(`${t.name}: second child no child separator`, (t) => {
    tool.reset();
    child.push(child[0].child({ test: { c: 2 } }));
    child[1].info("second child", { c2: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "second child");
    t.equal(tool.jsonOut.data.c2, true);
    t.equal(tool.jsonOut.test.c, 2);
    t.end();
  });
  t.test(`${t.name}: parent unchanged no child separator`, (t) => {
    tool.reset();
    log.info("parent", { parent: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "parent");
    t.equal(tool.jsonOut.data.parent, true);
    t.equal(tool.jsonOut.test.p, 1);
    t.end();
  });
  t.end();
});

test("deep child separator", (t) => {
  let deepLog = new Perj({
    test: "p",
    write,
    passThrough,
    separatorString: "#",
  });
  let value = "p";
  t.test(`${t.name}: parent deep`, (t) => {
    tool.reset();
    deepLog.info(value, { parent: true });
    t.equal(tool.jsonOut.level, "info");
    t.equal(tool.jsonOut.lvl, 30);
    t.equal(tool.getType(tool.jsonOut.time), "Number");
    t.equal(tool.jsonOut.msg, "p");
    t.equal(tool.jsonOut.data.parent, true);
    t.equal(tool.jsonOut.test, value);
    t.end();
  });
  t.test(`${t.name}: child deep separator`, (t) => {
    tool.reset();
    for (let i = 0; i < 100; i++) {
      value += "#c" + i;
      deepLog = deepLog.child({ test: "c" + i });
      deepLog.info("c" + i, { c: i });
      t.equal(tool.jsonOut.level, "info");
      t.equal(tool.jsonOut.lvl, 30);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.jsonOut.msg, "c" + i);
      t.equal(tool.jsonOut.data.c, i);
      t.equal(tool.jsonOut.test, value);
    }
    t.end();
  });
  t.end();
});
