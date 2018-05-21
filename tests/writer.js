require('console-probe').apply()

class Writer {
  constructor () {
    this.jsonOut = {}
    this.objOut = {}
  }

  write (json, obj) {
    console.dir(json)
    this.jsonOut = JSON.parse(json)
    this.objOut = obj
  }

  reset () {
    this.jsonOut = {reset: true}
    this.objOut = {reset: true}
  }

  show () {
    console.dir(this.jsonOut)
    console.dir(this.objOut)
  }

  probe () {
    console.probe(this.jsonOut)
  }

  getType (value) {
    return Object.prototype.toString.call(value).slice(8).slice(0, -1)
  }
}

module.exports = Writer
