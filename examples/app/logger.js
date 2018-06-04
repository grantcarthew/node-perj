const os = require('os')
const path = require('path')
const { Perj } = require('perj')
const ver = 1
const host = os.hostname()
const pid = process.pid
const name = 'app'

class Logger extends Perj {
  child (mod, tops) {
    if (tops == null) { tops = {} }
    tops.name = path.basename(mod.filename, '.js')
    return Perj.prototype.child.call(this, tops)
  }
}

module.exports = new Logger({ ver, host, pid, name, serializers: { req: reqSerializer } })

function reqSerializer (reqObj) {
  const { method, url, headers, params, query, connection } = reqObj
  const remoteAddress = connection && connection.remoteAddress
  const remotePort = connection && connection.remotePort
  return { method, url, headers, params, query, remoteAddress, remotePort }
}
