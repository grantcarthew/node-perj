const dateTimeFunctions = require('./date-time')

module.exports = {
  levels: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },
  level: 'info',
  levelKey: 'level',
  levelNumberKey: 'lvl',
  dateTimeKey: 'time',
  dateTimeFunction: dateTimeFunctions.epoch,
  messageKey: 'msg',
  dataKey: 'data',
  separatorString: ':',
  passThrough: false,
  write: defaultWriter()
}

function defaultWriter () {
  const isNode = Object.prototype.toString.call(process) === '[object process]'
  return isNode ? process.stdout.write.bind(process.stdout) : console.log
}
