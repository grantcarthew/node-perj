const log = require('./logger').child(module, { name: 'auth' })

module.exports = function (req, res, next) {
  // Check user is authenticated here.
  log.info('user authenticated')
  next()
}
