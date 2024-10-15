if (!global.BigInt) {
  global.BigInt = Number;
} // Fix Node.js v8 testing.
import test from "tape";
import tc from "test-constructs";
import { notationCopy } from "../src/notation-copy.js";
import { assertObjectSubsetMatch } from "./asserts.js";

test("notation copy tests", (t) => {
  t.test("simple value copy test", (t) => {
    let target = {};
    let result = notationCopy({}, "str");
    t.deepEqual(result, {});
    target = {};
    result = notationCopy(target, 1);
    t.deepEqual(result, {});
    t.equal(result, target);
    target = {};
    result = notationCopy(target, true);
    t.deepEqual(result, {});
    t.equal(result, target);
    target = {};
    result = notationCopy(target, false);
    t.deepEqual(result, {});
    t.equal(result, target);
    target = {};
    result = notationCopy(target, []);
    t.deepEqual(result, {});
    t.equal(result, target);
    target = {};
    result = notationCopy(target, new Date());
    t.deepEqual(result, {});
    t.equal(result, target);
    target = {};
    result = notationCopy(target, new Error());
    t.equal(typeof result.stack, "string");
    t.equal(result, target);
    target = {};
    result = notationCopy(target, () => {});
    t.deepEqual(result, {});
    t.equal(result, target);
    target = {};
    result = notationCopy({}, { foo: "bar" });
    t.deepEqual(result, { foo: "bar" });
    t.end();
  });
  t.test("simple object copy test", (t) => {
    const result = notationCopy({}, tc.objects.bySize.small);
    t.deepEqual(result, tc.objects.bySize.small);
    t.end();
  });
  t.test("two simple object merge test", (t) => {
    const result = notationCopy({}, tc.objects.bySize.small, tc.objects.bySize.tiny);
    assertObjectSubsetMatch(t, result, tc.objects.bySize.small);
    assertObjectSubsetMatch(t, result, tc.objects.bySize.tiny);
    t.end();
  });
  t.test("multiple simple object merge test", (t) => {
    const result = notationCopy({ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 });
    assertObjectSubsetMatch(t, result, { a: 1 });
    assertObjectSubsetMatch(t, result, { b: 2 });
    assertObjectSubsetMatch(t, result, { c: 3 });
    assertObjectSubsetMatch(t, result, { d: 4 });
    t.end();
  });
  t.test("two simple object overwrite test", (t) => {
    const result = notationCopy({}, tc.objects.bySize.small, tc.objects.bySize.medium);
    assertObjectSubsetMatch(t, result, tc.objects.bySize.medium);
    t.equal(result.name, tc.objects.bySize.small.name);
    t.equal(result.class, tc.objects.bySize.medium.class);
    t.end();
  });
  t.test("deep object copy test", (t) => {
    const result = notationCopy({}, tc.objects.special.deep);
    t.deepEqual(result, tc.objects.special.deep);
    t.end();
  });
  t.test("cicular object copy test", (t) => {
    const tag = "[Circular]";
    const obj = { name: "obj", foo: "bar" };
    obj.circ = obj;
    obj.arr = [1, "two", obj, 4, "five", obj, "seven", [11, 22, obj]];
    obj.child = obj;
    obj.objCirc = { name: "bar", bar: obj };
    const result = notationCopy({}, obj);
    t.equal(result.foo, "bar");
    t.equal(result.circ, tag);
    t.equal(result.arr[0], 1);
    t.equal(result.arr[1], "two");
    t.equal(result.arr[2], tag);
    t.equal(result.arr[3], 4);
    t.equal(result.arr[4], "five");
    t.equal(result.arr[5], tag);
    t.equal(result.arr[6], "seven");
    t.equal(result.arr[7][0], 11);
    t.equal(result.arr[7][1], 22);
    t.equal(result.arr[7][2], tag);
    t.equal(result.child, tag);
    t.equal(result.objCirc.bar, tag);
    t.end();
  });
  t.test("types object copy test", (t) => {
    const result = notationCopy({}, tc.objects.special.types);
    t.equal(result.name, "JavaScript Types");
    t.equal(typeof result.Atomics, "object");
    t.equal(Array.isArray(result.Array), true);
    t.equal(typeof result.ArrayBuffer, "object");
    t.equal(result.BooleanTrue, true);
    t.equal(result.BooleanFalse, false);
    t.equal(typeof result.DataView, "object");
    t.equal(new Date(result.Date) instanceof Date, true);
    t.equal(typeof result.Error.stack, "string");
    t.equal(typeof result.Error.message, "string");
    t.equal(typeof result.Float32Array, "object");
    t.equal(typeof result.Float64Array, "object");
    t.equal(typeof result.Generator, "object");
    t.equal(result.Infinity, Infinity);
    t.equal(typeof result.Int16Array, "object");
    t.equal(typeof result.Int32Array, "object");
    t.equal(typeof result.Int8Array, "object");
    t.equal(typeof result.Map, "object");
    t.equal(result.NaN, NaN);
    t.equal(result.null, null);
    t.equal(result.Number, 42);
    t.equal(result.Object.is, true);
    t.equal(typeof result.Promise, "object");
    t.equal(typeof result.RegEx, "object");
    t.equal(typeof result.Set, "object");
    t.equal(typeof result.SharedArrayBuffer, "object");
    t.equal(typeof result.String, "string");
    t.equal(typeof result.Uint16Array, "object");
    t.equal(typeof result.Uint32Array, "object");
    t.equal(typeof result.Uint8Array, "object");
    t.equal(typeof result.Uint8ClampedArray, "object");
    t.equal(typeof result.WeakMap, "object");
    t.equal(typeof result.WeakSet, "object");
    t.end();
  });
  t.test("buffer object copy test", (t) => {
    let barStr = "bar";
    let bar = Buffer.from(barStr);
    let obj = { foo: bar };
    let result = notationCopy({}, bar);
    t.deepEqual(result, {});
    result = notationCopy({}, obj);
    t.equal(result.foo.type, "Buffer");
    t.equal(result.foo.hex, "626172");
    t.equal(result.foo.utf8, "bar");
    t.equal(result.foo.base64, "YmFy");
    barStr = "bar".repeat(100);
    bar = Buffer.from(barStr);
    let obj2 = { foo: bar };
    result = notationCopy({}, obj2);
    t.equal(result.foo.type, "Buffer");
    t.equal(
      result.foo.hex,
      "6261726261726261726261726261726261726261726261726261726261726261726261726261726261726261726261726261...",
    );
    t.equal(result.foo.utf8, "barbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarba...");
    t.equal(result.foo.base64, "YmFyYmFyYmFyYmFyYmFyYmFyYmFyYmFyYmFyYmFyYmFyYmFyYmFyYmFyYmFyYmFyYmE=...");
    t.end();
  });
  t.test("object with array copy test", (t) => {
    const fruit = { name: "fruit", favourite: "banana" };
    const drink = { name: "drink", water: "often" };
    fruit.array = [1, 2, fruit, fruit, drink, [11, 22, fruit]];
    fruit.array.push(fruit.array);
    fruit.fruitCircular = fruit;
    fruit.drinkReference = drink;
    drink.drinkCircular = drink;
    const result = notationCopy({}, fruit);
    t.ok(result);
    t.equal(result.name, "fruit");
    t.equal(result.favourite, "banana");
    t.deepEqual(result.array, [
      1,
      2,
      "[Circular]",
      "[Circular]",
      { name: "drink", water: "often", drinkCircular: "[Circular]" },
      [11, 22, "[Circular]"],
      "[Circular]",
    ]);
    t.equal(result.fruitCircular, "[Circular]");
    t.equal(result.drinkReference, "[Circular]");
    t.end();
  });
  t.test("maximum recursive calls test", (t) => {
    const orgWarn = console.warn;
    let warnItem;
    console.warn = (item) => {
      warnItem = item;
    };
    const deep = {};
    let cache = deep;
    for (let i = 0; i < 2000; i++) {
      cache.child = {};
      cache = cache.child;
    }
    notationCopy({}, deep);
    t.equal(warnItem, "[Perj] Maximum of 2000 recursive calls has been reached.");
    console.warn = orgWarn;
    t.end();
  });
});
