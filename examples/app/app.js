const express = require('express')
const app = express()
const log = require('./logger')
const auth = require('./auth')

app.use(function (req, res, next) {
  // Nesting 'req' under a 'req' key to enable the 'req' serializer.
  // Equivalent to log.info({ req: req })
  log.info({ req })
  next()
})

app.use(auth)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, () => {
  log.info('Example app listening on port 3000!')
})
