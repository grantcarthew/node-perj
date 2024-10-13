import consoleProbe from 'console-probe';
consoleProbe.apply();
// require('console-probe').apply()

export class Tool {
  constructor () {
    this.jsonOut = {}
    this.objOut = {}
  }

  write (json, obj) {
    try {
      this.jsonOut = JSON.parse(json)
    } catch (error) {
      console.log(error.message)
      console.log(json)
    }
    this.objOut = obj
  }

  reset () {
    this.jsonOut = {}
    this.objOut = {}
  }

  dir () {
    console.dir(this.jsonOut)
    console.dir(this.objOut)
  }

  json () {
    console.log(JSON.stringify(this.jsonOut, null, 2))
    console.log(JSON.stringify(this.objOut, null, 2))
  }

  probe () {
    console.probe(this.jsonOut)
  }

  getType (value) {
    return Object.prototype.toString.call(value).slice(8).slice(0, -1)
  }
}
