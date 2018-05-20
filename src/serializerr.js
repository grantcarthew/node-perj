/*

Following code is from the serializerr package.
https://www.npmjs.com/package/serializerr

See the LICENSE file for license details.

*/

const protochain = require('./protochain')

module.exports = serializerr

function serializerr (obj = {}) {
  const chain = protochain(obj)
    .filter(obj => obj !== Object.prototype)
  return [obj]
    .concat(chain)
    .map(item => Object.getOwnPropertyNames(item))
    .reduce((result, names) => {
      names.forEach(name => {
        result[name] = obj[name]
      })
      return result
    }, {})
}
