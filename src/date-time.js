module.exports = Object.freeze({
  epoch () { return Date.now() },
  unix () { return Math.round(Date.now() / 1000.0) },
  iso () { return '"' + (new Date()).toISOString() + '"' }
})
