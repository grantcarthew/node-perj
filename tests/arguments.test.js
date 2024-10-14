import test from "tape";
import { Perj } from "../src/perj.js";
import { Tool } from "./tool.js";
import { data } from "../data/index.js";

const tool = new Tool();
const write = tool.write.bind(tool);
const passThrough = true;

let log = new Perj({ write, passThrough });

test("log argument tests", (t) => {
  for (const level of Object.keys(log.levels)) {
    const titlePrefix = `${t.name} | ${level}`;
    const log = new Perj({ level, write, passThrough });

    t.test(`${titlePrefix}: empty`, (t) => {
      tool.reset();
      log[level]();
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.objOut.msg, "");
      t.equal(tool.jsonOut.data, null);
      t.equal(tool.objOut.data, null);
      t.end();
    });

    t.test(`${titlePrefix}: one undefined`, (t) => {
      tool.reset();
      log[level](undefined);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.objOut.msg, "");
      t.equal(tool.jsonOut.data, null);
      t.equal(tool.objOut.data, null);
      t.end();
    });

    t.test(`${titlePrefix}: two undefined`, (t) => {
      tool.reset();
      log[level](undefined, undefined);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.objOut.msg, "");
      t.deepEqual(tool.jsonOut.data, [null, null]);
      t.deepEqual(tool.objOut.data, [null, null]);
      t.end();
    });

    t.test(`${titlePrefix}: one null primitive`, (t) => {
      tool.reset();
      log[level](null);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.objOut.msg, "");
      t.equal(tool.jsonOut.data, null);
      t.equal(tool.objOut.data, null);
      t.end();
    });

    t.test(`${titlePrefix}: two null primitives`, (t) => {
      tool.reset();
      log[level](null, null);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(Object.keys(tool.objOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.getType(tool.objOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.objOut.msg, "");
      t.deepEqual(tool.jsonOut.data, [null, null]);
      t.deepEqual(tool.objOut.data, [null, null]);
      t.end();
    });

    t.test(`${titlePrefix}: one number primitive`, (t) => {
      tool.reset();
      log[level](42);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(Object.keys(tool.objOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.getType(tool.objOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.objOut.msg, "");
      t.equal(tool.jsonOut.data, 42);
      t.equal(tool.objOut.data, 42);
      t.end();
    });

    t.test(`${titlePrefix}: two number primitives`, (t) => {
      tool.reset();
      log[level](42, 43);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(Object.keys(tool.objOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.getType(tool.objOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.objOut.msg, "");
      t.deepEqual(tool.jsonOut.data, [42, 43]);
      t.deepEqual(tool.objOut.data, [42, 43]);
      t.end();
    });

    t.test(`${titlePrefix}: one boolean primitive`, (t) => {
      tool.reset();
      log[level](true);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(Object.keys(tool.objOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.getType(tool.objOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.objOut.msg, "");
      t.equal(tool.jsonOut.data, true);
      t.equal(tool.objOut.data, true);
      t.end();
    });

    t.test(`${titlePrefix}: two boolean primitives`, (t) => {
      tool.reset();
      log[level](true, false);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(Object.keys(tool.objOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.getType(tool.objOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.objOut.msg, "");
      t.deepEqual(tool.jsonOut.data, [true, false]);
      t.deepEqual(tool.objOut.data, [true, false]);
      t.end();
    });

    t.test(`${titlePrefix}: one message`, (t) => {
      tool.reset();
      log[level](data.msg[0]);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(Object.keys(tool.objOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.getType(tool.objOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.jsonOut.msg, data.msg[0]);
      t.equal(tool.objOut.msg, data.msg[0]);
      t.equal(tool.jsonOut.data, null);
      t.equal(tool.objOut.data, null);
      t.end();
    });

    t.test(`${titlePrefix}: two messages`, (t) => {
      tool.reset();
      log[level](data.msg[0], data.msg[1]);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(Object.keys(tool.objOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.getType(tool.objOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.getType(tool.jsonOut.msg), "String");
      t.equal(tool.getType(tool.objOut.msg), "String");
      t.equal(tool.jsonOut.msg, data.msg[0]);
      t.equal(tool.objOut.msg, data.msg[0]);
      t.equal(tool.getType(tool.jsonOut.data), "String");
      t.equal(tool.getType(tool.objOut.data), "String");
      t.equal(tool.jsonOut.data, data.msg[1]);
      t.equal(tool.objOut.data, data.msg[1]);
      t.end();
    });

    t.test(`${titlePrefix}: one object`, (t) => {
      tool.reset();
      log[level](data.tardis);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(Object.keys(tool.objOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.getType(tool.objOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.objOut.msg, "");
      t.deepEqual(tool.jsonOut.data, data.tardis);
      t.deepEqual(tool.objOut.data, data.tardis);
      t.end();
    });

    t.test(`${titlePrefix}: two objects`, (t) => {
      tool.reset();
      log[level](data.tardis, data.serenity);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(Object.keys(tool.objOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.getType(tool.objOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.objOut.msg, "");
      t.deepEqual(tool.jsonOut.data[0], data.tardis);
      t.deepEqual(tool.objOut.data[0], data.tardis);
      t.deepEqual(tool.jsonOut.data[1], data.serenity);
      t.deepEqual(tool.objOut.data[1], data.serenity);
      t.end();
    });

    t.test(`${titlePrefix}: two messages one data`, (t) => {
      tool.reset();
      log[level](data.msg[0], data.msg[1], data.tardis);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(Object.keys(tool.objOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.getType(tool.objOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.getType(tool.jsonOut.msg), "String");
      t.equal(tool.getType(tool.objOut.msg), "String");
      t.equal(tool.jsonOut.msg, data.msg[0]);
      t.equal(tool.objOut.msg, data.msg[0]);
      t.equal(tool.getType(tool.jsonOut.data), "Array");
      t.equal(tool.getType(tool.objOut.data), "Array");
      t.equal(tool.jsonOut.data[0], data.msg[1]);
      t.equal(tool.objOut.data[0], data.msg[1]);
      t.deepEqual(tool.jsonOut.data[1], data.tardis);
      t.deepEqual(tool.objOut.data[1], data.tardis);
      t.end();
    });

    t.test(`${titlePrefix}: two messages two data`, (t) => {
      tool.reset();
      log[level](data.msg[0], data.msg[1], data.tardis, data.serenity);
      t.equal(Object.keys(tool.jsonOut).length, 5);
      t.equal(Object.keys(tool.objOut).length, 5);
      t.equal(tool.getType(tool.jsonOut.time), "Number");
      t.equal(tool.getType(tool.objOut.time), "Number");
      t.equal(tool.jsonOut.level, level);
      t.equal(tool.objOut.level, level);
      t.equal(tool.getType(tool.jsonOut.msg), "String");
      t.equal(tool.getType(tool.objOut.msg), "String");
      t.equal(tool.jsonOut.msg, data.msg[0]);
      t.equal(tool.objOut.msg, data.msg[0]);
      t.equal(tool.getType(tool.jsonOut.data), "Array");
      t.equal(tool.getType(tool.objOut.data), "Array");
      t.equal(tool.jsonOut.data.length, 3);
      t.equal(tool.objOut.data.length, 3);
      t.equal(tool.jsonOut.data[0], data.msg[1]);
      t.equal(tool.objOut.data[0], data.msg[1]);
      t.deepEqual(tool.jsonOut.data[1], data.tardis);
      t.deepEqual(tool.objOut.data[1], data.tardis);
      t.deepEqual(tool.jsonOut.data[2], data.serenity);
      t.deepEqual(tool.objOut.data[2], data.serenity);
      t.end();
    });

    t.test(`${titlePrefix}: two messages two data mixed order`, (t) => {
      log[level](data.tardis, data.msg[1], data.serenity, data.msg[0]);
      t.equal(Object.keys(tool.jsonOut).length, 5, "jsonOut should have 5 keys");
      t.equal(Object.keys(tool.objOut).length, 5, "objOut should have 5 keys");
      t.equal(tool.getType(tool.jsonOut.time), "Number", "jsonOut time should be a number");
      t.equal(tool.getType(tool.objOut.time), "Number", "objOut time should be a number");
      t.equal(tool.jsonOut.level, level, "jsonOut level should match");
      t.equal(tool.objOut.level, level, "objOut level should match");
      t.equal(tool.getType(tool.jsonOut.msg), "String", "jsonOut msg should be a string");
      t.equal(tool.getType(tool.objOut.msg), "String", "objOut msg should be a string");
      t.equal(tool.jsonOut.msg, data.msg[1], "jsonOut msg should match");
      t.equal(tool.objOut.msg, data.msg[1], "objOut msg should match");
      t.equal(tool.getType(tool.jsonOut.data), "Array", "jsonOut data should be an array");
      t.equal(tool.getType(tool.objOut.data), "Array", "objOut data should be an array");
      t.equal(tool.jsonOut.data.length, 3, "jsonOut data array length should be 3");
      t.equal(tool.objOut.data.length, 3, "objOut data array length should be 3");
      t.deepEqual(tool.jsonOut.data[0], data.tardis, "jsonOut data[0] should match tardis");
      t.deepEqual(tool.objOut.data[0], data.tardis, "objOut data[0] should match tardis");
      t.deepEqual(data.tardis, tool.jsonOut.data[0], "tardis should match jsonOut data[0]");
      t.deepEqual(data.tardis, tool.objOut.data[0], "tardis should match objOut data[0]");
      t.deepEqual(tool.jsonOut.data[1], data.serenity, "jsonOut data[1] should match serenity");
      t.deepEqual(tool.objOut.data[1], data.serenity, "objOut data[1] should match serenity");
      t.deepEqual(data.serenity, tool.jsonOut.data[1], "serenity should match jsonOut data[1]");
      t.deepEqual(data.serenity, tool.objOut.data[1], "serenity should match objOut data[1]");
      t.equal(tool.jsonOut.data[2], data.msg[0], "jsonOut data[2] should match msg[0]");
      t.equal(tool.objOut.data[2], data.msg[0], "objOut data[2] should match msg[0]");
      t.end();
    });

    // Test with a single string
    t.test(`${titlePrefix}: single string test`, (t) => {
      tool.reset();
      log[level]("string");
      t.equal(tool.jsonOut.msg, "string");
      t.equal(tool.jsonOut.data, null);
      t.equal(tool.objOut.msg, "string");
      t.equal(tool.objOut.data, null);
      t.end();
    });

    // Test with a single number
    t.test(`${titlePrefix}: single number test`, (t) => {
      tool.reset();
      log[level](123);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.jsonOut.data, 123);
      t.equal(tool.objOut.msg, "");
      t.equal(tool.objOut.data, 123);
      t.end();
    });

    // Test with an empty array
    t.test(`${titlePrefix}: single empty array test`, (t) => {
      tool.reset();
      log[level]([]);
      t.equal(tool.jsonOut.msg, "");
      t.deepEqual(tool.jsonOut.data, []);
      t.equal(tool.objOut.msg, "");
      t.deepEqual(tool.objOut.data, []);
      t.end();
    });

    // Test with an array
    t.test(`${titlePrefix}: single array test`, (t) => {
      tool.reset();
      log[level]([1, 2, 3]);
      t.equal(tool.jsonOut.msg, "");
      t.deepEqual(tool.jsonOut.data, [1, 2, 3]);
      t.equal(tool.objOut.msg, "");
      t.deepEqual(tool.objOut.data, [1, 2, 3]);
      t.end();
    });

    // Test with an object
    t.test(`${titlePrefix}: single object test`, (t) => {
      tool.reset();
      log[level]({ key: "value" });
      t.equal(tool.jsonOut.msg, "");
      t.deepEqual(tool.jsonOut.data, { key: "value" });
      t.equal(tool.objOut.msg, "");
      t.deepEqual(tool.objOut.data, { key: "value" });
      t.end();
    });

    // Test with a boolean
    t.test(`${titlePrefix}: single boolean test`, (t) => {
      tool.reset();
      log[level](true);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.jsonOut.data, true);
      t.equal(tool.objOut.msg, "");
      t.equal(tool.objOut.data, true);
      t.end();
    });

    // Test with a Date object
    t.test(`${titlePrefix}: single date test`, (t) => {
      tool.reset();
      const date = new Date();
      log[level](date);
      t.equal(tool.jsonOut.msg, "");
      t.equal(typeof Date.parse(tool.jsonOut.data), "number");
      t.equal(tool.objOut.msg, "");
      t.equal(typeof Date.parse(tool.objOut.data), "number");
      t.end();
    });

    // Test with an Error object
    t.test(`${titlePrefix}: single error test`, (t) => {
      tool.reset();
      log[level](new Error());
      t.equal(tool.jsonOut.msg, "");
      t.ok(typeof tool.jsonOut.data === "object");
      t.equal(tool.objOut.msg, "");
      t.ok(typeof tool.objOut.data === "object");
      t.end();
    });

    // Test with null
    t.test(`${titlePrefix}: single null test`, (t) => {
      tool.reset();
      log[level](null);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.jsonOut.data, null);
      t.equal(tool.objOut.msg, "");
      t.equal(tool.objOut.data, null);
      t.end();
    });

    // Test with undefined
    t.test(`${titlePrefix}: single undefined test`, (t) => {
      tool.reset();
      log[level](undefined);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.jsonOut.data, null);
      t.equal(tool.objOut.msg, "");
      t.equal(tool.objOut.data, null);
      t.end();
    });

    // Test with an empty object
    t.test(`${titlePrefix}: single empty object test`, (t) => {
      tool.reset();
      log[level]({});
      t.equal(tool.jsonOut.msg, "");
      t.deepEqual(tool.jsonOut.data, {});
      t.equal(tool.objOut.msg, "");
      t.deepEqual(tool.objOut.data, {});
      t.end();
    });

    // Test with a function
    t.test(`${titlePrefix}: single function test`, (t) => {
      tool.reset();
      log[level](function () {});
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.jsonOut.data, null);
      t.equal(tool.objOut.msg, "");
      t.equal(tool.objOut.data, null);
      t.end();
    });

    // Test with a circular object
    t.test(`${titlePrefix}: single circular object test`, (t) => {
      tool.reset();
      let circ = { key: 1 };
      circ.inner = circ;
      log[level](circ);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.jsonOut.data.key, 1);
      t.equal(tool.jsonOut.data.inner, "[Circular]");
      t.equal(tool.objOut.msg, "");
      t.equal(tool.objOut.data.key, 1);
      t.equal(tool.objOut.data.inner, "[Circular]");
      t.end();
    });

    // Test with a circular function
    t.test(`${titlePrefix}: single circular function test`, (t) => {
      tool.reset();
      let circFun = function () {};
      circFun.key = 2;
      circFun.repeat = circFun;
      log[level](circFun);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.jsonOut.data, null);
      t.equal(tool.objOut.msg, "");
      t.equal(tool.objOut.data, null);
      t.end();
    });

    // Test with an object containing a Buffer
    t.test(`${titlePrefix}: object with buffer test`, (t) => {
      tool.reset();
      let obj = { foo: Buffer.from("bar") };
      log[level](obj);
      t.equal(tool.jsonOut.msg, "");
      t.equal(tool.jsonOut.data.foo.type, "Buffer");
      t.equal(tool.jsonOut.data.foo.utf8, "bar");
      t.equal(tool.objOut.msg, "");
      t.equal(tool.objOut.data.foo.type, "Buffer");
      t.equal(tool.objOut.data.foo.utf8, "bar");
      t.end();
    });
  }
  t.end();
});
