const Perj = require("../src/perj");
const Tool = require("./tool");
const tool = new Tool();
const data = require("../data");
const write = tool.write.bind(tool);
const passThrough = true;
const serializerTardis = { tardis: tardisSerializer };
const serializerSerenity = { serenity: serenitySerializer };
const serializerBoth = { tardis: tardisSerializer, serenity: serenitySerializer };

beforeEach(() => {
  tool.reset();
});

describe("object serialize tests", () => {
  test("first serializer test", () => {
    let log = new Perj({ serializers: serializerTardis, passThrough, write });
    log.info("tardis", { tardis: data.tardis });
    t.equal(Object.keys(tool.jsonOut.data).length, 1);
    t.equal(Object.keys(tool.jsonOut.data.tardis).length, 3);
    t.equal(tool.getType(tool.jsonOut.data.tardis), "Object");
    t.equal(tool.getType(tool.objOut.data.tardis), "Object");
    t.equal(tool.jsonOut.data.tardis.name, data.tardis.name);
    t.equal(tool.objOut.data.tardis.name, data.tardis.name);
    t.equal(tool.jsonOut.data.tardis.features).toEqual(data.tardis.features);
    t.equal(tool.objOut.data.tardis.features).toEqual(data.tardis.features);
    t.equal(tool.jsonOut.data.tardis.exterior).toEqual(data.tardis.exterior);
    t.equal(tool.objOut.data.tardis.exterior).toEqual(data.tardis.exterior);
    t.ok(tool.jsonOut.data.tardis.manufacturer === undefined);
    t.ok(tool.objOut.data.tardis.manufacturer === undefined);
  });
  test("second serializer test", () => {
    let log = new Perj({ serializers: serializerSerenity, passThrough, write });
    log.info("serenity", { serenity: data.serenity });
    t.equal(Object.keys(tool.jsonOut.data).length, 1);
    t.equal(Object.keys(tool.jsonOut.data.serenity).length, 3);
    t.equal(tool.getType(tool.jsonOut.data.serenity), "Object");
    t.equal(tool.getType(tool.objOut.data.serenity), "Object");
    t.equal(tool.jsonOut.data.serenity.classCode, data.serenity.classCode);
    t.equal(tool.objOut.data.serenity.classCode, data.serenity.classCode);
    t.equal(tool.jsonOut.data.serenity.engine).toEqual(data.serenity.engine);
    t.equal(tool.objOut.data.serenity.engine).toEqual(data.serenity.engine);
    t.equal(tool.jsonOut.data.serenity.upper).toEqual(data.serenity.interior.upperDeck);
    t.equal(tool.objOut.data.serenity.upper).toEqual(data.serenity.interior.upperDeck);
    t.ok(tool.jsonOut.data.serenity.url === undefined);
    t.ok(tool.objOut.data.serenity.url === undefined);
  });
  test("two serializers test", () => {
    let log = new Perj({ serializers: serializerBoth, passThrough, write });
    log.info("tardis", { tardis: data.tardis });
    t.equal(Object.keys(tool.jsonOut.data).length, 1);
    t.equal(Object.keys(tool.jsonOut.data.tardis).length, 3);
    t.equal(tool.getType(tool.jsonOut.data.tardis), "Object");
    t.equal(tool.getType(tool.objOut.data.tardis), "Object");
    t.equal(tool.jsonOut.data.tardis.name, data.tardis.name);
    t.equal(tool.objOut.data.tardis.name, data.tardis.name);
    t.equal(tool.jsonOut.data.tardis.features).toEqual(data.tardis.features);
    t.equal(tool.objOut.data.tardis.features).toEqual(data.tardis.features);
    t.equal(tool.jsonOut.data.tardis.exterior).toEqual(data.tardis.exterior);
    t.equal(tool.objOut.data.tardis.exterior).toEqual(data.tardis.exterior);
    t.ok(tool.jsonOut.data.tardis.manufacturer === undefined);
    t.ok(tool.objOut.data.tardis.manufacturer === undefined);
    log.info("serenity", { serenity: data.serenity });
    t.equal(Object.keys(tool.jsonOut.data).length, 1);
    t.equal(Object.keys(tool.jsonOut.data.serenity).length, 3);
    t.equal(tool.getType(tool.jsonOut.data.serenity), "Object");
    t.equal(tool.getType(tool.objOut.data.serenity), "Object");
    t.equal(tool.jsonOut.data.serenity.classCode, data.serenity.classCode);
    t.equal(tool.objOut.data.serenity.classCode, data.serenity.classCode);
    t.equal(tool.jsonOut.data.serenity.engine).toEqual(data.serenity.engine);
    t.equal(tool.objOut.data.serenity.engine).toEqual(data.serenity.engine);
    t.equal(tool.jsonOut.data.serenity.upper).toEqual(data.serenity.interior.upperDeck);
    t.equal(tool.objOut.data.serenity.upper).toEqual(data.serenity.interior.upperDeck);
    t.ok(tool.jsonOut.data.serenity.url === undefined);
    t.ok(tool.objOut.data.serenity.url === undefined);
  });
  test("serializer with other objects test", () => {
    let log = new Perj({ serializers: serializerTardis, passThrough, write });
    log.info("death star", data.deathStar);
    t.equal(Object.keys(tool.jsonOut.data).length, 5);
    t.equal(tool.getType(tool.jsonOut.data), "Object");
    t.equal(tool.getType(tool.objOut.data), "Object");
    t.equal(tool.jsonOut.data.url, data.deathStar.url);
    t.equal(tool.objOut.data.url, data.deathStar.url);
    t.equal(tool.jsonOut.data.production).toEqual(data.deathStar.production);
    t.equal(tool.objOut.data.production).toEqual(data.deathStar.production);
    t.equal(tool.jsonOut.data.specifications).toEqual(data.deathStar.specifications);
    t.equal(tool.objOut.data.specifications).toEqual(data.deathStar.specifications);
    t.equal(tool.jsonOut.data.locationInformation).toEqual(data.deathStar.locationInformation);
    t.equal(tool.objOut.data.locationInformation).toEqual(data.deathStar.locationInformation);
    t.equal(tool.jsonOut.data.usage).toEqual(data.deathStar.usage);
    t.equal(tool.objOut.data.usage).toEqual(data.deathStar.usage);
  });
  test("serializer with two objects test", () => {
    let log = new Perj({ serializers: serializerTardis, passThrough, write });
    log.info("tardis", { tardis: data.tardis }, data.deathStar);
    t.equal(tool.jsonOut.data.length, 2);
    t.equal(Object.keys(tool.jsonOut.data[0]).length, 1);
    t.equal(Object.keys(tool.jsonOut.data[0].tardis).length, 3);
    t.equal(tool.getType(tool.jsonOut.data[0].tardis), "Object");
    t.equal(tool.getType(tool.objOut.data[0].tardis), "Object");
    t.equal(tool.jsonOut.data[0].tardis.name, data.tardis.name);
    t.equal(tool.objOut.data[0].tardis.name, data.tardis.name);
    t.equal(tool.jsonOut.data[0].tardis.features).toEqual(data.tardis.features);
    t.equal(tool.objOut.data[0].tardis.features).toEqual(data.tardis.features);
    t.equal(tool.jsonOut.data[0].tardis.exterior).toEqual(data.tardis.exterior);
    t.equal(tool.objOut.data[0].tardis.exterior).toEqual(data.tardis.exterior);
    t.ok(tool.jsonOut.data[0].tardis.manufacturer === undefined);
    t.ok(tool.objOut.data[0].tardis.manufacturer === undefined);
    t.equal(Object.keys(tool.jsonOut.data[1]).length, 5);
    t.equal(tool.getType(tool.jsonOut.data[1]), "Object");
    t.equal(tool.getType(tool.objOut.data[1]), "Object");
    t.equal(tool.jsonOut.data[1].url, data.deathStar.url);
    t.equal(tool.objOut.data[1].url, data.deathStar.url);
    t.equal(tool.jsonOut.data[1].production).toEqual(data.deathStar.production);
    t.equal(tool.objOut.data[1].production).toEqual(data.deathStar.production);
    t.equal(tool.jsonOut.data[1].specifications).toEqual(data.deathStar.specifications);
    t.equal(tool.objOut.data[1].specifications).toEqual(data.deathStar.specifications);
    t.equal(tool.jsonOut.data[1].locationInformation).toEqual(data.deathStar.locationInformation);
    t.equal(tool.objOut.data[1].locationInformation).toEqual(data.deathStar.locationInformation);
    t.equal(tool.jsonOut.data[1].usage).toEqual(data.deathStar.usage);
    t.equal(tool.objOut.data[1].usage).toEqual(data.deathStar.usage);
  });
  test("serializer with child test", () => {
    let log = new Perj({ serializers: serializerTardis, passThrough, write });
    let child = log.child({ foo: "bar" });
    child.info("tardis", { tardis: data.tardis });
    t.equal(Object.keys(tool.jsonOut.data).length, 1);
    t.equal(Object.keys(tool.jsonOut.data.tardis).length, 3);
    t.equal(tool.getType(tool.jsonOut.data.tardis), "Object");
    t.equal(tool.getType(tool.objOut.data.tardis), "Object");
    t.equal(tool.jsonOut.data.tardis.name, data.tardis.name);
    t.equal(tool.objOut.data.tardis.name, data.tardis.name);
    t.equal(tool.jsonOut.data.tardis.features).toEqual(data.tardis.features);
    t.equal(tool.objOut.data.tardis.features).toEqual(data.tardis.features);
    t.equal(tool.jsonOut.data.tardis.exterior).toEqual(data.tardis.exterior);
    t.equal(tool.objOut.data.tardis.exterior).toEqual(data.tardis.exterior);
    t.ok(tool.jsonOut.data.tardis.manufacturer === undefined);
    t.ok(tool.objOut.data.tardis.manufacturer === undefined);
  });
  test("serializer type test", () => {
    let log = new Perj({ serializers: serializerTardis, passThrough, write });
    log.info(null);
    t.equal(tool.getType(tool.jsonOut.data), "Null");
    t.equal(tool.getType(tool.objOut.data), "Null");
    log.info(undefined);
    t.equal(tool.getType(tool.jsonOut.data), "Null");
    t.equal(tool.getType(tool.objOut.data), "Null");
    log.info(undefined, null);
    t.equal(tool.getType(tool.jsonOut.data[0]), "Null");
    t.equal(tool.getType(tool.objOut.data[0]), "Null");
    t.equal(tool.getType(tool.jsonOut.data[1]), "Null");
    t.equal(tool.getType(tool.objOut.data[1]), "Null");
    log.info(null, undefined);
    t.equal(tool.getType(tool.jsonOut.data[0]), "Null");
    t.equal(tool.getType(tool.objOut.data[0]), "Null");
    t.equal(tool.getType(tool.jsonOut.data[1]), "Null");
    t.equal(tool.getType(tool.objOut.data[1]), "Null");
  });
});

function tardisSerializer(value) {
  const { name, features, exterior } = value;
  return { name, features, exterior };
}

function serenitySerializer(value) {
  const { classCode, engine } = value;
  const upper = value.interior.upperDeck;
  return { classCode, engine, upper };
}
