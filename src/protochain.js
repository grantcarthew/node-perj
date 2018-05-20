/*

Following code is from the protochain package.
https://www.npmjs.com/package/protochain

See the LICENSE file for license details.

*/

module.exports = protochain

function protochain (obj) {
  const chain = []
  let target = getPrototypeOf(obj)
  while (target) {
    chain.push(target)
    target = getPrototypeOf(target)
  }

  return chain
}

function getPrototypeOf (obj) {
  if (obj == null) return null
  return Object.getPrototypeOf(Object(obj))
}
