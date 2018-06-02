require('console-probe').apply()

class Tool {
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

module.exports = Tool
