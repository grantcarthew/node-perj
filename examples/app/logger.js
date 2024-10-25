import os from 'os';
import path from 'path';
import Perj from 'perj';

const ver = 1;
const host = os.hostname();
const pid = process.pid;
const name = 'app';

/**
 * Custom Logger class extending Perj.
 */
class Logger extends Perj {
  /**
   * Creates a child logger with additional context.
   * @param {Object} mod - The module object.
   * @param {Object} [tops] - Additional top-level properties.
   * @returns {Logger} A new child logger instance.
   */
  child(filename, tops = {}) {
    tops.name = path.basename(filename, '.js');
    return Perj.prototype.child.call(this, tops);
  }
}

/**
 * Serializes the request object for logging.
 * @param {Object} reqObj - The request object.
 * @returns {Object} Serialized request data.
 */
function reqSerializer(reqObj) {
  const { method, url, headers, params, query, connection } = reqObj;
  const remoteAddress = connection && connection.remoteAddress;
  const remotePort = connection && connection.remotePort;
  return { method, url, headers, params, query, remoteAddress, remotePort };
}

export default new Logger({ ver, host, pid, name, serializers: { req: reqSerializer } });
