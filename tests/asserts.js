/**
 * Asserts that an object matches a subset of the properties of another object
 * @param {Object} t - The tape test object.
 * @param {Object} fullObject - The object to test.
 * @param {Object} subsetObject - The object to match against.
 */
export function assertObjectSubsetMatch(t, fullObject, subsetObject) {
  if (
    typeof fullObject !== "object" ||
    fullObject === null ||
    typeof subsetObject !== "object" ||
    subsetObject === null
  ) {
    t.fail("Both fullObject and subsetObject must be non-null objects");
    return;
  }

  for (const [key, value] of Object.entries(subsetObject)) {
    if (!fullObject.hasOwnProperty(key)) {
      t.fail(`Expected ${key} to exist in fullObject`);
      continue;
    }

    if (Array.isArray(value)) {
      t.true(Array.isArray(fullObject[key]), `Expected ${key} to be an array`);
      t.deepEqual(fullObject[key], value, `Expected ${key} array to match`);
    } else if (typeof value === "object" && value !== null) {
      // Recursively check nested objects
      assertObjectSubsetMatch(t, fullObject[key], value);
    } else {
      // Use strict equality for primitives
      t.equal(fullObject[key], value, `Expected ${key} to strictly match`);
    }
  }
}
